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
}

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

    // Capture front with bleed
    const frontCanvas = await captureWithBleed(frontElement, dimensions)
    const frontImgData = frontCanvas.toDataURL('image/png', 1.0)

    // Fill entire page including bleed
    pdf.addImage(
      frontImgData,
      'PNG',
      0,
      0,
      dimensions.width,
      dimensions.height,
      undefined,
      'FAST'
    )

    addCropMarks(pdf, dimensions, 'FRONT')

    // Add back if exists
    if (backElement) {
      pdf.addPage()
      const backCanvas = await captureWithBleed(backElement, dimensions)
      const backImgData = backCanvas.toDataURL('image/png', 1.0)

      pdf.addImage(
        backImgData,
        'PNG',
        0,
        0,
        dimensions.width,
        dimensions.height,
        undefined,
        'FAST'
      )

      addCropMarks(pdf, dimensions, 'BACK')
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

    // For DIY, we just need trim size (no bleed)
    // Export front
    const frontPDF = new jsPDF({
      orientation: 'landscape',
      unit: 'in',
      format: [dimensions.trim.height, dimensions.trim.width],
    })

    const frontCanvas = await captureAtSize(
      frontElement,
      dimensions.trim.width,
      dimensions.trim.height
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

      const backCanvas = await captureAtSize(
        backElement,
        dimensions.trim.width,
        dimensions.trim.height
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
 * Capture element with bleed extended
 */
const captureWithBleed = async (
  element: HTMLElement,
  dimensions: PDFDimensions
): Promise<HTMLCanvasElement> => {
  // Capture at full size with bleed
  return captureAtSize(element, dimensions.width, dimensions.height)
}

/**
 * Capture element at specific dimensions
 */
const captureAtSize = async (
  element: HTMLElement,
  widthInches: number,
  heightInches: number
): Promise<HTMLCanvasElement> => {
  // Create offscreen container
  const container = document.createElement('div')
  container.style.position = 'fixed'
  container.style.left = '-99999px'
  container.style.top = '0'
  container.style.zIndex = '-9999'

  // Clone the element
  const clone = element.cloneNode(true) as HTMLElement

  // Set explicit pixel dimensions for rendering
  // Using 300 DPI for print quality
  const pixelWidth = Math.round(widthInches * 300)
  const pixelHeight = Math.round(heightInches * 300)

  // Apply size to clone
  clone.style.width = `${pixelWidth}px`
  clone.style.height = `${pixelHeight}px`
  clone.style.minWidth = `${pixelWidth}px`
  clone.style.minHeight = `${pixelHeight}px`
  clone.style.maxWidth = `${pixelWidth}px`
  clone.style.maxHeight = `${pixelHeight}px`
  clone.style.position = 'relative'
  clone.style.display = 'block'
  clone.style.margin = '0'
  clone.style.padding = '0'
  clone.style.boxSizing = 'border-box'

  // Remove aspect-ratio which interferes with fixed dimensions
  clone.style.aspectRatio = 'auto'

  container.appendChild(clone)
  document.body.appendChild(container)

  try {
    // Wait for any images to load
    const images = clone.querySelectorAll('img')
    await Promise.all(
      Array.from(images).map(
        img =>
          new Promise<void>(resolve => {
            if (img.complete) {
              resolve()
            } else {
              img.onload = () => resolve()
              img.onerror = () => resolve()
              setTimeout(() => resolve(), 5000)
            }
          })
      )
    )

    // Allow time for fonts and rendering
    await new Promise(resolve => setTimeout(resolve, 100))

    // Capture with html2canvas
    const canvas = await html2canvas(clone, {
      width: pixelWidth,
      height: pixelHeight,
      scale: 1, // Already at target size
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      logging: false,
      windowWidth: pixelWidth,
      windowHeight: pixelHeight,
      imageTimeout: 15000,
    })

    return canvas
  } finally {
    document.body.removeChild(container)
  }
}

/**
 * Add crop marks at trim edges
 */
const addCropMarks = (
  pdf: jsPDF,
  dimensions: PDFDimensions,
  label: string
): void => {
  pdf.setDrawColor(0, 0, 0)
  pdf.setLineWidth(0.005)

  const bleed = dimensions.bleed
  const w = dimensions.width
  const h = dimensions.height
  const markLength = 0.125

  // Crop marks at trim edge (where to cut)
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

  // Labels
  pdf.setFontSize(8)
  pdf.setTextColor(0, 0, 0)
  pdf.text(label, w / 2, h - bleed / 3, { align: 'center' })

  pdf.setFontSize(6)
  pdf.text(
    `TRIM: ${dimensions.trim.width}" × ${dimensions.trim.height}" | BLEED: ${bleed}"`,
    w / 2,
    bleed / 3,
    { align: 'center' }
  )
}

/**
 * Get PDF dimensions
 */
const getPDFDimensions = (size: PrintSize): PDFDimensions => {
  const bleed = 0.125

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

  return {
    width: trim.width + bleed * 2,
    height: trim.height + bleed * 2,
    bleed,
    trim,
  }
}
