import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'
import { PrintSize } from '../types'

interface PDFDimensions {
  width: number
  height: number
  bleed: number
  trim: {
    width: number
    height: number
  }
  pixels: {
    width: number
    height: number
    trim: {
      width: number
      height: number
    }
  }
}

const DPI = 300 // Print resolution

/**
 * Export professional print-ready PDF with bleed and crop marks
 */
export const exportToPDFProfessional = async (
  frontElement: HTMLElement,
  backElement: HTMLElement | null,
  size: PrintSize,
  fileName: string
): Promise<void> => {
  try {
    const dimensions = getPDFDimensions(size)

    // Create PDF with bleed area
    const pdf = new jsPDF({
      orientation: 'landscape',
      unit: 'in',
      format: [dimensions.height, dimensions.width],
    })

    // Capture and add front
    const frontCanvas = await captureElementAtExactSize(
      frontElement,
      dimensions.pixels.width,
      dimensions.pixels.height
    )
    const frontImgData = frontCanvas.toDataURL('image/png', 1.0)
    addPageWithCropMarks(pdf, frontImgData, dimensions, 'FRONT')

    // Add back if exists
    if (backElement) {
      pdf.addPage()
      const backCanvas = await captureElementAtExactSize(
        backElement,
        dimensions.pixels.width,
        dimensions.pixels.height
      )
      const backImgData = backCanvas.toDataURL('image/png', 1.0)
      addPageWithCropMarks(pdf, backImgData, dimensions, 'BACK')
    }

    pdf.save(fileName)
  } catch (error) {
    console.error('Error exporting professional PDF:', error)
    throw new Error('Failed to export PDF')
  }
}

/**
 * Export separate front/back files for DIY printing
 */
export const exportSeparateSides = async (
  frontElement: HTMLElement,
  backElement: HTMLElement | null,
  size: PrintSize,
  fileBaseName: string
): Promise<void> => {
  try {
    const dimensions = getPDFDimensions(size)

    // Export front
    const frontPDF = new jsPDF({
      orientation: 'landscape',
      unit: 'in',
      format: [dimensions.trim.height, dimensions.trim.width],
    })

    const frontCanvas = await captureElementAtExactSize(
      frontElement,
      dimensions.pixels.trim.width,
      dimensions.pixels.trim.height
    )
    const frontImgData = frontCanvas.toDataURL('image/png', 1.0)
    frontPDF.addImage(
      frontImgData,
      'PNG',
      0,
      0,
      dimensions.trim.width,
      dimensions.trim.height,
      undefined,
      'FAST'
    )
    frontPDF.save(`${fileBaseName}-front.pdf`)

    // Export back if exists
    if (backElement) {
      await new Promise(resolve => setTimeout(resolve, 500))

      const backPDF = new jsPDF({
        orientation: 'landscape',
        unit: 'in',
        format: [dimensions.trim.height, dimensions.trim.width],
      })

      const backCanvas = await captureElementAtExactSize(
        backElement,
        dimensions.pixels.trim.width,
        dimensions.pixels.trim.height
      )
      const backImgData = backCanvas.toDataURL('image/png', 1.0)
      backPDF.addImage(
        backImgData,
        'PNG',
        0,
        0,
        dimensions.trim.width,
        dimensions.trim.height,
        undefined,
        'FAST'
      )
      backPDF.save(`${fileBaseName}-back.pdf`)
    }
  } catch (error) {
    console.error('Error exporting separate sides:', error)
    throw new Error('Failed to export separate sides')
  }
}

/**
 * Capture element at exact pixel dimensions for print
 */
const captureElementAtExactSize = async (
  element: HTMLElement,
  width: number,
  height: number
): Promise<HTMLCanvasElement> => {
  // Create a hidden container at exact pixel size
  const container = document.createElement('div')
  container.style.position = 'fixed'
  container.style.left = '-99999px'
  container.style.top = '0'
  container.style.width = `${width}px`
  container.style.height = `${height}px`
  container.style.overflow = 'visible'
  container.style.zIndex = '-1000'

  // Deep clone the element
  const clone = element.cloneNode(true) as HTMLElement

  // Force exact dimensions on the clone
  clone.style.width = `${width}px`
  clone.style.height = `${height}px`
  clone.style.minWidth = `${width}px`
  clone.style.minHeight = `${height}px`
  clone.style.maxWidth = `${width}px`
  clone.style.maxHeight = `${height}px`
  clone.style.position = 'absolute'
  clone.style.top = '0'
  clone.style.left = '0'
  clone.style.margin = '0'
  clone.style.padding = '0'
  clone.style.border = 'none'
  clone.style.boxSizing = 'border-box'
  clone.style.transform = 'none'
  clone.style.transformOrigin = 'top left'

  // Remove aspect-ratio which can cause sizing issues
  clone.style.aspectRatio = 'auto'

  // Find and fix all images in the clone
  const images = clone.querySelectorAll('img')
  images.forEach(img => {
    const htmlImg = img as HTMLImageElement
    // Ensure images use object-fit to prevent distortion
    if (!htmlImg.style.objectFit) {
      htmlImg.style.objectFit = 'cover'
    }
  })

  container.appendChild(clone)
  document.body.appendChild(container)

  try {
    // Wait for all images to load
    const allImages = container.querySelectorAll('img')
    await Promise.all(
      Array.from(allImages).map(
        img =>
          new Promise<void>(resolve => {
            if (img.complete) {
              resolve()
            } else {
              img.onload = () => resolve()
              img.onerror = () => resolve()
              // Timeout after 3 seconds
              setTimeout(() => resolve(), 3000)
            }
          })
      )
    )

    // Small delay for rendering
    await new Promise(resolve => setTimeout(resolve, 200))

    // Capture with html2canvas at exact size
    const canvas = await html2canvas(clone, {
      width: width,
      height: height,
      scale: 1, // Don't scale - already at exact size
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      logging: false,
      windowWidth: width,
      windowHeight: height,
      x: 0,
      y: 0,
      scrollX: 0,
      scrollY: 0,
      foreignObjectRendering: false,
      imageTimeout: 0,
    })

    return canvas
  } finally {
    document.body.removeChild(container)
  }
}

/**
 * Add crop marks and bleed indicators
 */
const addPageWithCropMarks = (
  pdf: jsPDF,
  imageData: string,
  dimensions: PDFDimensions,
  label: string
): void => {
  // Add the card image
  pdf.addImage(
    imageData,
    'PNG',
    0,
    0,
    dimensions.width,
    dimensions.height,
    undefined,
    'FAST'
  )

  // Draw crop marks
  pdf.setDrawColor(0, 0, 0)
  pdf.setLineWidth(0.005)

  const bleed = dimensions.bleed
  const w = dimensions.width
  const h = dimensions.height
  const markLength = 0.125

  // Corner crop marks
  // Top-left
  pdf.line(bleed - markLength, bleed, bleed + 0.01, bleed)
  pdf.line(bleed, bleed - markLength, bleed, bleed + 0.01)

  // Top-right
  pdf.line(w - bleed - 0.01, bleed, w - bleed + markLength, bleed)
  pdf.line(w - bleed, bleed - markLength, w - bleed, bleed + 0.01)

  // Bottom-left
  pdf.line(bleed - markLength, h - bleed, bleed + 0.01, h - bleed)
  pdf.line(bleed, h - bleed - 0.01, bleed, h - bleed + markLength)

  // Bottom-right
  pdf.line(w - bleed - 0.01, h - bleed, w - bleed + markLength, h - bleed)
  pdf.line(w - bleed, h - bleed - 0.01, w - bleed, h - bleed + markLength)

  // Add labels
  pdf.setFontSize(8)
  pdf.setTextColor(0, 0, 0)
  pdf.text(label, w / 2, h - bleed / 3, { align: 'center' })

  pdf.setFontSize(6)
  pdf.text(
    `${dimensions.trim.width}" × ${dimensions.trim.height}" + ${bleed}" bleed`,
    w / 2,
    bleed / 3,
    { align: 'center' }
  )
}

/**
 * Get PDF dimensions with bleed
 */
const getPDFDimensions = (size: PrintSize): PDFDimensions => {
  const bleed = 0.125 // 1/8 inch bleed

  const trimDimensions: Record<
    PrintSize,
    { width: number; height: number }
  > = {
    '3.5x2': { width: 3.5, height: 2 },
    '3.5x2.5': { width: 3.5, height: 2.5 },
    '3x2': { width: 3, height: 2 },
    '2.5x2': { width: 2.5, height: 2 },
  }

  const trim = trimDimensions[size]

  // Calculate pixel dimensions at 300 DPI
  const trimPixels = {
    width: Math.round(trim.width * DPI),
    height: Math.round(trim.height * DPI),
  }

  const fullPixels = {
    width: Math.round((trim.width + bleed * 2) * DPI),
    height: Math.round((trim.height + bleed * 2) * DPI),
  }

  return {
    width: trim.width + bleed * 2,
    height: trim.height + bleed * 2,
    bleed,
    trim,
    pixels: {
      width: fullPixels.width,
      height: fullPixels.height,
      trim: trimPixels,
    },
  }
}
