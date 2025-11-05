import { ColorPalette } from '../types'

// Generate random color palettes
export const generateRandomPalettes = (count: number = 6): ColorPalette[] => {
  const palettes: ColorPalette[] = []

  for (let i = 0; i < count; i++) {
    palettes.push({
      id: `palette-${i}`,
      colors: generateHarmoniousColors(),
    })
  }

  return palettes
}

// Generate a harmonious color palette
const generateHarmoniousColors = (): string[] => {
  // Base hue (0-360)
  const baseHue = Math.floor(Math.random() * 360)

  // Generate complementary colors using color theory
  return [
    hslToHex(baseHue, 70, 50), // Primary
    hslToHex((baseHue + 30) % 360, 60, 60), // Secondary
    hslToHex((baseHue + 180) % 360, 65, 55), // Complementary
    hslToHex((baseHue + 60) % 360, 50, 70), // Accent
  ]
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

// Popular preset color palettes
export const presetPalettes: ColorPalette[] = [
  {
    id: 'ocean',
    name: 'Ocean Breeze',
    colors: ['#0077B6', '#00B4D8', '#90E0EF', '#CAF0F8'],
  },
  {
    id: 'sunset',
    name: 'Sunset Glow',
    colors: ['#F72585', '#B5179E', '#7209B7', '#560BAD'],
  },
  {
    id: 'forest',
    name: 'Forest Green',
    colors: ['#2D6A4F', '#40916C', '#52B788', '#74C69D'],
  },
  {
    id: 'corporate',
    name: 'Corporate Blue',
    colors: ['#1E3A8A', '#3B82F6', '#60A5FA', '#93C5FD'],
  },
  {
    id: 'elegant',
    name: 'Elegant Black',
    colors: ['#1F2937', '#4B5563', '#6B7280', '#D1D5DB'],
  },
  {
    id: 'vibrant',
    name: 'Vibrant Pop',
    colors: ['#EC4899', '#F59E0B', '#10B981', '#3B82F6'],
  },
]
