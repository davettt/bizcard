// Color contrast utilities for WCAG compliance

export interface ContrastResult {
  ratio: number
  level: 'AAA' | 'AA' | 'AA18' | 'fail'
  passes: boolean
}

// Calculate relative luminance
const getLuminance = (color: string): number => {
  const hex = color.replace('#', '')
  const r = parseInt(hex.substr(0, 2), 16) / 255
  const g = parseInt(hex.substr(2, 2), 16) / 255
  const b = parseInt(hex.substr(4, 2), 16) / 255

  const [rL, gL, bL] = [r, g, b].map(c => {
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
  })

  return 0.2126 * rL + 0.7152 * gL + 0.0722 * bL
}

// Calculate contrast ratio between two colors
export const getContrastRatio = (color1: string, color2: string): number => {
  const lum1 = getLuminance(color1)
  const lum2 = getLuminance(color2)
  const lighter = Math.max(lum1, lum2)
  const darker = Math.min(lum1, lum2)
  return (lighter + 0.05) / (darker + 0.05)
}

// Check if contrast meets WCAG standards
export const checkContrast = (
  foreground: string,
  background: string,
  isLargeText: boolean = false
): ContrastResult => {
  const ratio = getContrastRatio(foreground, background)

  let level: ContrastResult['level'] = 'fail'
  let passes = false

  if (ratio >= 7) {
    level = 'AAA'
    passes = true
  } else if (ratio >= 4.5) {
    level = 'AA'
    passes = true
  } else if (ratio >= 3 && isLargeText) {
    level = 'AA18'
    passes = true
  }

  return { ratio, level, passes }
}

// Get best text color (black or white) for a background
export const getBestTextColor = (backgroundColor: string): string => {
  const whiteContrast = getContrastRatio('#FFFFFF', backgroundColor)
  const blackContrast = getContrastRatio('#000000', backgroundColor)
  return whiteContrast > blackContrast ? '#FFFFFF' : '#000000'
}

// Ensure a palette has accessible colors
export const ensureAccessiblePalette = (colors: string[]): string[] => {
  if (colors.length < 3) return colors

  // colors[0] = background, colors[1] = primary accent
  // colors[2] = text color, colors[3] = secondary accent

  const adjustedColors = [...colors]

  // Ensure text color has good contrast with background
  const textContrast = getContrastRatio(colors[2] || colors[0], colors[0])
  if (textContrast < 4.5) {
    adjustedColors[2] = getBestTextColor(colors[0])
  }

  return adjustedColors
}
