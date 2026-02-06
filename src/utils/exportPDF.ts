import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'
import { PrintSize } from '../types'

export const exportToPDF = async (
  frontElement: HTMLElement,
  backElement: HTMLElement | null,
  size: PrintSize,
  fileName: string
): Promise<void> => {
  try {
    // Get dimensions based on print size
    const dimensions = getPDFDimensions(size)

    // Create PDF
    const pdf = new jsPDF({
      orientation: 'landscape',
      unit: 'in',
      format: [dimensions.height, dimensions.width],
    })

    // Capture front
    const frontCanvas = await html2canvas(frontElement, {
      scale: 3, // High quality
      useCORS: true,
      backgroundColor: '#ffffff',
    })

    const frontImgData = frontCanvas.toDataURL('image/jpeg', 1.0)
    pdf.addImage(
      frontImgData,
      'JPEG',
      0,
      0,
      dimensions.width,
      dimensions.height
    )

    // Add back if exists
    if (backElement) {
      pdf.addPage()
      const backCanvas = await html2canvas(backElement, {
        scale: 3,
        useCORS: true,
        backgroundColor: '#ffffff',
      })
      const backImgData = backCanvas.toDataURL('image/jpeg', 1.0)
      pdf.addImage(
        backImgData,
        'JPEG',
        0,
        0,
        dimensions.width,
        dimensions.height
      )
    }

    // Save
    pdf.save(fileName)
  } catch (error) {
    console.error('Error exporting PDF:', error)
    throw new Error('Failed to export PDF')
  }
}

const getPDFDimensions = (size: PrintSize) => {
  const dimensions: Record<PrintSize, { width: number; height: number }> = {
    '3.5x2': { width: 3.5, height: 2 },
    '3.5x2.5': { width: 3.5, height: 2.5 },
    '3x2': { width: 3, height: 2 },
    '2.5x2': { width: 2.5, height: 2 },
  }
  return dimensions[size]
}
