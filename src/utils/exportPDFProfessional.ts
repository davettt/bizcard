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

    // Capture front with high quality
    const frontCanvas = await captureElement(frontElement, dimensions)
    const frontImgData = frontCanvas.toDataURL('image/png', 1.0)

    // Add front with crop marks
    addPageWithCropMarks(pdf, frontImgData, dimensions, 'FRONT')

    // Add back if exists
    if (backElement) {
      pdf.addPage()
      const backCanvas = await captureElement(backElement, dimensions)
      const backImgData = backCanvas.toDataURL('image/png', 1.0)
      addPageWithCropMarks(pdf, backImgData, dimensions, 'BACK')
    }

    // Save
    pdf.save(fileName)
  } catch (error) {
    console.error('Error exporting professional PDF:', error)
    throw new Error('Failed to export PDF')
  }
}

/**
 * Export individual sides as separate files for DIY printing
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

    const frontCanvas = await captureElement(frontElement, dimensions, false)
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
      // Small delay to ensure browser doesn't block
      await new Promise(resolve => setTimeout(resolve, 500))

      const backPDF = new jsPDF({
        orientation: 'landscape',
        unit: 'in',
        format: [dimensions.trim.height, dimensions.trim.width],
      })

      const backCanvas = await captureElement(backElement, dimensions, false)
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
 * Capture element as canvas with proper scaling
 */
const captureElement = async (
  element: HTMLElement,
  dimensions: PDFDimensions,
  includeBleed: boolean = true
): Promise<HTMLCanvasElement> => {
  // Clone the element to avoid modifying the original
  const clone = element.cloneNode(true) as HTMLElement

  // Apply inline styles to ensure consistency
  clone.style.position = 'absolute'
  clone.style.left = '-9999px'
  clone.style.top = '-9999px'
  clone.style.width = `${includeBleed ? dimensions.width : dimensions.trim.width}in`
  clone.style.height = `${includeBleed ? dimensions.height : dimensions.trim.height}in`

  document.body.appendChild(clone)

  try {
    const canvas = await html2canvas(clone, {
      scale: 4, // Very high quality for print (300 DPI equivalent)
      useCORS: true,
      backgroundColor: '#ffffff',
      logging: false,
      imageTimeout: 0,
      removeContainer: false,
      // Prevent stretching/skewing
      width: clone.offsetWidth,
      height: clone.offsetHeight,
      windowWidth: clone.offsetWidth,
      windowHeight: clone.offsetHeight,
    })

    return canvas
  } finally {
    document.body.removeChild(clone)
  }
}

/**
 * Add crop marks and bleed indicators to PDF page
 */
const addPageWithCropMarks = (
  pdf: jsPDF,
  imageData: string,
  dimensions: PDFDimensions,
  label: string
): void => {
  // Add the card image with bleed
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
  pdf.setLineWidth(0.01)

  const bleed = dimensions.bleed
  const w = dimensions.width
  const h = dimensions.height
  const markLength = 0.125 // 1/8 inch crop mark

  // Corner crop marks (outside the bleed area)
  // Top-left
  pdf.line(bleed - markLength, bleed, bleed, bleed)
  pdf.line(bleed, bleed - markLength, bleed, bleed)

  // Top-right
  pdf.line(w - bleed, bleed, w - bleed + markLength, bleed)
  pdf.line(w - bleed, bleed - markLength, w - bleed, bleed)

  // Bottom-left
  pdf.line(bleed - markLength, h - bleed, bleed, h - bleed)
  pdf.line(bleed, h - bleed, bleed, h - bleed + markLength)

  // Bottom-right
  pdf.line(w - bleed, h - bleed, w - bleed + markLength, h - bleed)
  pdf.line(w - bleed, h - bleed, w - bleed, h - bleed + markLength)

  // Add label
  pdf.setFontSize(8)
  pdf.setTextColor(0, 0, 0)
  pdf.text(label, w / 2, h - bleed / 2, { align: 'center' })

  // Add bleed instructions
  pdf.setFontSize(6)
  pdf.text(
    `${dimensions.trim.width}" × ${dimensions.trim.height}" with ${bleed}" bleed`,
    w / 2,
    bleed / 2,
    { align: 'center' }
  )
}

/**
 * Get PDF dimensions with bleed for print
 */
const getPDFDimensions = (size: PrintSize): PDFDimensions => {
  const bleed = 0.125 // 1/8 inch bleed (standard for print)

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
