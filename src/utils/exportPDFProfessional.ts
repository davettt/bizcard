import jsPDF from 'jspdf'
import { PrintSize, CardData } from '../types'
import { renderCardToCanvas } from './canvasRenderer'

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
  cardData: CardData,
  colors: string[],
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

    // Render front to canvas
    const frontCanvas = await renderCardToCanvas(
      cardData,
      colors,
      dimensions.pixels.width,
      dimensions.pixels.height,
      false
    )
    const frontImgData = frontCanvas.toDataURL('image/png', 1.0)
    addPageWithCropMarks(pdf, frontImgData, dimensions, 'FRONT')

    // Add back if exists
    if (cardData.includeBack && cardData.backText) {
      pdf.addPage()
      const backCanvas = await renderCardToCanvas(
        cardData,
        colors,
        dimensions.pixels.width,
        dimensions.pixels.height,
        true
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
  cardData: CardData,
  colors: string[],
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

    // Render at trim size (no bleed for DIY)
    const frontCanvas = await renderCardToCanvas(
      cardData,
      colors,
      dimensions.pixels.trim.width,
      dimensions.pixels.trim.height,
      false
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
    if (cardData.includeBack && cardData.backText) {
      await new Promise(resolve => setTimeout(resolve, 500))

      const backPDF = new jsPDF({
        orientation: 'landscape',
        unit: 'in',
        format: [dimensions.trim.height, dimensions.trim.width],
      })

      const backCanvas = await renderCardToCanvas(
        cardData,
        colors,
        dimensions.pixels.trim.width,
        dimensions.pixels.trim.height,
        true
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
