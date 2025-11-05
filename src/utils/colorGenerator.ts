import { ColorPalette } from '../types'
import { getContrastRatio, getBestTextColor } from './contrastChecker'

// Generate random WCAG-compliant color palettes
export const generateRandomPalettes = (count: number = 6): ColorPalette[] => {
  const palettes: ColorPalette[] = []

  for (let i = 0; i < count; i++) {
    palettes.push({
      id: `palette-${i}`,
      colors: generateAccessibleColors(),
    })
  }

  return palettes
}

// Generate an accessible color palette with proper contrast
const generateAccessibleColors = (): string[] => {
  // Randomly choose light or dark theme
  const isDark = Math.random() > 0.5

  // Generate background
  const background = isDark
    ? hslToHex(
        Math.floor(Math.random() * 360),
        15,
        Math.floor(Math.random() * 10 + 10)
      ) // Dark: 10-20% lightness
    : hslToHex(
        Math.floor(Math.random() * 360),
        10,
        Math.floor(Math.random() * 10 + 90)
      ) // Light: 90-100% lightness

  // Generate primary accent color (vibrant)
  const accentHue = Math.floor(Math.random() * 360)
  const primary = hslToHex(
    accentHue,
    Math.floor(Math.random() * 30 + 60),
    isDark ? 65 : 45
  ) // 60-90% sat, adjusted lightness

  // Text color - ensure proper contrast
  let textColor = getBestTextColor(background)

  // Secondary accent (complementary to primary)
  const secondary = hslToHex(
    (accentHue + 180) % 360,
    Math.floor(Math.random() * 20 + 50),
    isDark ? 60 : 50
  )

  return [background, primary, textColor, secondary]
}

// Convert HSL to HEX
const hslToHex = (h: number, s: number, l: number): string => {
  l /= 100
  const a = (s * Math.min(l, 1 - l)) / 100
  const f = (n: number) => {
    const k = (n + h / 30) % 12
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1)
    return Math.round(255 * color)
      .toString(16)
      .padStart(2, '0')
  }
  return `#${f(0)}${f(8)}${f(4)}`
}

// Validate hex color
export const isValidHex = (color: string): boolean => {
  return /^#[0-9A-F]{6}$/i.test(color)
}

// Ensure color has # prefix
export const normalizeColor = (color: string): string => {
  return color.startsWith('#') ? color : `#${color}`
}

// Professional preset color palettes - all WCAG AA compliant
// Format: [background, primary, text, secondary]
export const presetPalettes: ColorPalette[] = [
  {
    id: 'classic-black',
    name: 'Classic Black & Gold',
    colors: ['#1A1A1A', '#D4AF37', '#FFFFFF', '#C9A962'],
  },
  {
    id: 'navy-professional',
    name: 'Navy Professional',
    colors: ['#FFFFFF', '#1E3A5F', '#1A1A1A', '#4A90E2'],
  },
  {
    id: 'modern-dark',
    name: 'Modern Dark',
    colors: ['#0F172A', '#38BDF8', '#FFFFFF', '#818CF8'],
  },
  {
    id: 'elegant-minimal',
    name: 'Elegant Minimal',
    colors: ['#FAFAFA', '#2C3E50', '#1A1A1A', '#E74C3C'],
  },
  {
    id: 'forest-earth',
    name: 'Forest Earth',
    colors: ['#FFFFFF', '#2D5016', '#1F1F1F', '#7A9D54'],
  },
  {
    id: 'burgundy-luxe',
    name: 'Burgundy Luxe',
    colors: ['#F5F5F5', '#6B1B3D', '#1A1A1A', '#C94277'],
  },
  {
    id: 'ocean-blue',
    name: 'Ocean Blue',
    colors: ['#FFFFFF', '#005F73', '#000000', '#0A9396'],
  },
  {
    id: 'charcoal-modern',
    name: 'Charcoal Modern',
    colors: ['#2B2D42', '#EDF2F4', '#FFFFFF', '#EF233C'],
  },
  {
    id: 'mint-fresh',
    name: 'Mint Fresh',
    colors: ['#FFFFFF', '#0A6847', '#1A1A1A', '#7ABA78'],
  },
  {
    id: 'sunset-warm',
    name: 'Sunset Warm',
    colors: ['#FFF8F0', '#C1666B', '#2B2D2F', '#E4959E'],
  },
]

// Ensure custom palette has accessible contrast
export const validateAndFixPalette = (colors: string[]): string[] => {
  if (colors.length < 2) return colors

  const fixed = [...colors]
  const background = fixed[0]

  // Fix text color if contrast is insufficient
  if (fixed[2]) {
    const contrast = getContrastRatio(fixed[2], background)
    if (contrast < 4.5) {
      fixed[2] = getBestTextColor(background)
    }
  } else {
    fixed[2] = getBestTextColor(background)
  }

  return fixed
}
