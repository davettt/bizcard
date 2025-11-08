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
 *
 * IMPORTANT NOTES FOR PROFESSIONAL PRINTING:
 * 1. This PDF is generated in RGB color space (browser limitation)
 * 2. For professional printing, convert to CMYK using Adobe Acrobat or similar
 * 3. Resolution: 300 DPI equivalent (pixelRatio: 6)
 * 4. Fonts are embedded (rasterized as images)
 * 5. Crop marks indicate trim area with 1/8" bleed on all sides
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

    // Capture front at high resolution for professional printing (300 DPI equivalent)
    const frontImgData = await toPng(frontElement, {
      quality: 1.0,
      pixelRatio: 6, // 6x for true 300 DPI quality
      cacheBust: true,
      backgroundColor: '#ffffff',
    })

    // Place image at trim size, centered with bleed offset on all sides
    // This ensures crop marks don't cut off content
    pdf.addImage(
      frontImgData,
      'PNG',
      dimensions.bleed, // Offset by bleed amount (left)
      dimensions.bleed, // Offset by bleed amount (top)
      dimensions.trim.width, // Keep at trim size (don't stretch)
      dimensions.trim.height,
      undefined,
      'FAST'
    )

    addCropMarks(pdf, dimensions)

    if (backElement) {
      pdf.addPage()

      // Capture back at high resolution
      const backImgData = await toPng(backElement, {
        quality: 1.0,
        pixelRatio: 6, // 6x for true 300 DPI quality
        cacheBust: true,
        backgroundColor: '#ffffff',
      })

      // Place image centered with bleed offset
      pdf.addImage(
        backImgData,
        'PNG',
        dimensions.bleed,
        dimensions.bleed,
        dimensions.trim.width,
        dimensions.trim.height,
        undefined,
        'FAST'
      )

      addCropMarks(pdf, dimensions)
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

    // Capture front using html-to-image at high resolution
    const frontImgData = await toPng(frontElement, {
      quality: 1.0,
      pixelRatio: 6, // 6x for true 300 DPI quality
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

      // Capture back using html-to-image at high resolution
      const backImgData = await toPng(backElement, {
        quality: 1.0,
        pixelRatio: 6, // 6x for true 300 DPI quality
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
  dimensions: PDFDimensions
): void => {
  pdf.setDrawColor(0, 0, 0)
  pdf.setLineWidth(0.005)

  const bleed = dimensions.bleed
  const w = dimensions.width
  const h = dimensions.height
  const markLength = 0.125

  // Top-left corner crop marks
  pdf.line(bleed - markLength, bleed, bleed + 0.01, bleed)
  pdf.line(bleed, bleed - markLength, bleed, bleed + 0.01)

  // Top-right corner crop marks
  pdf.line(w - bleed - 0.01, bleed, w - bleed + markLength, bleed)
  pdf.line(w - bleed, bleed - markLength, w - bleed, bleed + 0.01)

  // Bottom-left corner crop marks
  pdf.line(bleed - markLength, h - bleed, bleed + 0.01, h - bleed)
  pdf.line(bleed, h - bleed - 0.01, bleed, h - bleed + markLength)

  // Bottom-right corner crop marks
  pdf.line(w - bleed - 0.01, h - bleed, w - bleed + markLength, h - bleed)
  pdf.line(w - bleed, h - bleed - 0.01, w - bleed, h - bleed + markLength)

  // NOTE: Text labels removed for final print file
  // Professional printers don't need the text - just the crop marks
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
