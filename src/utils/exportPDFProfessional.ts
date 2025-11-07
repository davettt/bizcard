import jsPDF from 'jspdf'
import { toPng } from 'html-to-image'
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
 * Using html-to-image library for better text spacing and layout preservation
 */
export const exportToPDFProfessional = async (
  frontElement: HTMLElement,
  backElement: HTMLElement | null,
  size: PrintSize,
  fileName: string
): Promise<void> => {
  try {
    const dimensions = getPDFDimensions(size)

    const pdf = new jsPDF({
      orientation: 'landscape',
      unit: 'in',
      format: [dimensions.height, dimensions.width],
    })

    // Scale factor to convert trim size to bleed size
    const scaleForBleed = dimensions.width / dimensions.trim.width

    // Capture front using html-to-image (better text handling)
    const frontImgData = await toPng(frontElement, {
      quality: 1.0,
      pixelRatio: 3, // High quality 3x
      cacheBust: true,
      backgroundColor: '#ffffff',
    })

    // Place image scaled to fill bleed area
    pdf.addImage(
      frontImgData,
      'PNG',
      0,
      0,
      dimensions.trim.width * scaleForBleed,
      dimensions.trim.height * scaleForBleed,
      undefined,
      'FAST'
    )

    addCropMarks(pdf, dimensions, 'FRONT')

    if (backElement) {
      pdf.addPage()

      // Capture back using html-to-image
      const backImgData = await toPng(backElement, {
        quality: 1.0,
        pixelRatio: 3,
        cacheBust: true,
        backgroundColor: '#ffffff',
      })

      pdf.addImage(
        backImgData,
        'PNG',
        0,
        0,
        dimensions.trim.width * scaleForBleed,
        dimensions.trim.height * scaleForBleed,
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
 * Using html-to-image library for better text spacing and layout preservation
 */
export const exportSeparateSides = async (
  frontElement: HTMLElement,
  backElement: HTMLElement | null,
  size: PrintSize,
  fileBaseName: string
): Promise<void> => {
  try {
    const dimensions = getPDFDimensions(size)

    const frontPDF = new jsPDF({
      orientation: 'landscape',
      unit: 'in',
      format: [dimensions.trim.height, dimensions.trim.width],
    })

    // Capture front using html-to-image
    const frontImgData = await toPng(frontElement, {
      quality: 1.0,
      pixelRatio: 3,
      cacheBust: true,
      backgroundColor: '#ffffff',
    })

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

    if (backElement) {
      await new Promise(resolve => setTimeout(resolve, 500))

      const backPDF = new jsPDF({
        orientation: 'landscape',
        unit: 'in',
        format: [dimensions.trim.height, dimensions.trim.width],
      })

      // Capture back using html-to-image
      const backImgData = await toPng(backElement, {
        quality: 1.0,
        pixelRatio: 3,
        cacheBust: true,
        backgroundColor: '#ffffff',
      })

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
