import { PrintSize, PrintSizeOption } from '../types'

export const printSizes: PrintSizeOption[] = [
  {
    value: '3.5x2',
    label: 'Standard US (3.5" × 2")',
    width: 3.5,
    height: 2,
    unit: 'in',
  },
  {
    value: '3.5x2.5',
    label: 'European (3.5" × 2.5")',
    width: 3.5,
    height: 2.5,
    unit: 'in',
  },
  {
    value: '3x2',
    label: 'Slim (3" × 2")',
    width: 3,
    height: 2,
    unit: 'in',
  },
  {
    value: '2.5x2',
    label: 'Square (2.5" × 2")',
    width: 2.5,
    height: 2,
    unit: 'in',
  },
]

export const getPrintSize = (size: PrintSize): PrintSizeOption => {
  return printSizes.find(s => s.value === size) || printSizes[0]
}

// Convert inches to pixels at 300 DPI (print quality)
export const inchesToPixels = (inches: number): number => {
  return Math.round(inches * 300)
}
