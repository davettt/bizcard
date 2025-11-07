import { CardData } from '../types'

/**
 * Render card directly to canvas for perfect PDF export
 */
export const renderCardToCanvas = async (
  data: CardData,
  colors: string[],
  width: number,
  height: number,
  isBack: boolean = false
): Promise<HTMLCanvasElement> => {
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext('2d')!

  // Fill background
  ctx.fillStyle = colors[0]
  ctx.fillRect(0, 0, width, height)

  // Apply corner style
  if (data.cornerStyle !== 'square') {
    // Clip to rounded rectangle
    const radius = Math.round(width * 0.015) // ~8px at standard size
    ctx.save()
    roundRect(ctx, 0, 0, width, height, radius)
    ctx.clip()
    ctx.fillStyle = colors[0]
    ctx.fillRect(0, 0, width, height)
  }

  if (isBack && data.includeBack && data.backText) {
    await renderBack(ctx, data, colors, width, height)
  } else {
    await renderFront(ctx, data, colors, width, height)
  }

  return canvas
}

/**
 * Render front of card
 */
const renderFront = async (
  ctx: CanvasRenderingContext2D,
  data: CardData,
  colors: string[],
  width: number,
  height: number
): Promise<void> => {
  const fontScale = data.fontScale || 1.0
  const padding = Math.round(width * 0.04) // ~4% padding
  const baseFontSize = Math.round(height * 0.08) // Base font size relative to height

  let y = padding

  // Load custom font if specified
  const fontFamily = getFontFamily(data.fontFamily)

  // Render logo or image if exists
  if (data.logo || data.image) {
    const imgSize = Math.round(height * 0.25)
    y += imgSize + padding * 0.5
    try {
      const img = await loadImage(data.logo || data.image!)
      const x = padding
      ctx.drawImage(img, x, padding, imgSize, imgSize)
    } catch (e) {
      console.warn('Failed to load image:', e)
    }
  }

  // Name
  ctx.fillStyle = colors[2]
  ctx.font = `bold ${baseFontSize * 1.1 * fontScale}px ${fontFamily}`
  ctx.textBaseline = 'top'
  wrapText(ctx, data.name, padding, y, width - padding * 2, baseFontSize * 1.3 * fontScale)
  y += baseFontSize * 1.3 * fontScale + padding * 0.15

  // Title
  ctx.fillStyle = colors[1]
  ctx.font = `600 ${baseFontSize * 0.55 * fontScale}px ${fontFamily}`
  wrapText(ctx, data.title.toUpperCase(), padding, y, width - padding * 2, baseFontSize * 0.7 * fontScale)
  y += baseFontSize * 0.7 * fontScale + padding * 0.1

  // Company
  if (data.company) {
    ctx.fillStyle = colors[2]
    ctx.globalAlpha = 0.8
    ctx.font = `${baseFontSize * 0.5 * fontScale}px ${fontFamily}`
    wrapText(ctx, data.company, padding, y, width - padding * 2, baseFontSize * 0.65 * fontScale)
    ctx.globalAlpha = 1.0
    y += baseFontSize * 0.65 * fontScale + padding * 0.3
  }

  // Contact info
  ctx.fillStyle = colors[2]
  ctx.globalAlpha = 0.9
  ctx.font = `${baseFontSize * 0.45 * fontScale}px ${fontFamily}`
  const lineHeight = baseFontSize * 0.55 * fontScale

  if (data.email) {
    ctx.fillText(data.email, padding, y)
    y += lineHeight
  }
  if (data.phone) {
    ctx.fillText(data.phone, padding, y)
    y += lineHeight
  }
  if (data.website) {
    ctx.fillText(data.website, padding, y)
    y += lineHeight
  }

  ctx.globalAlpha = 1.0
}

/**
 * Render back of card
 */
const renderBack = async (
  ctx: CanvasRenderingContext2D,
  data: CardData,
  colors: string[],
  width: number,
  height: number
): Promise<void> => {
  const fontScale = data.fontScale || 1.0
  const padding = Math.round(width * 0.05)
  const baseFontSize = Math.round(height * 0.07)
  const fontFamily = getFontFamily(data.fontFamily)

  // Back text
  ctx.fillStyle = colors[2]
  ctx.font = `${baseFontSize * 0.6 * fontScale}px ${fontFamily}`
  ctx.textBaseline = 'top'

  const lineHeight = baseFontSize * 0.85 * fontScale
  const maxWidth = width - padding * 2
  const lines = wrapTextToLines(ctx, data.backText, maxWidth)

  let y = padding
  lines.forEach(line => {
    ctx.fillText(line, padding, y)
    y += lineHeight
  })

  // Social handles at bottom
  if (data.linkedin || data.twitter || data.instagram || data.github) {
    y = height - padding - baseFontSize * 0.5 * fontScale * 2

    ctx.fillStyle = colors[1]
    ctx.font = `600 ${baseFontSize * 0.45 * fontScale}px ${fontFamily}`

    const socialHeight = baseFontSize * 0.55 * fontScale
    if (data.linkedin) {
      ctx.fillText(`LinkedIn: ${extractHandle(data.linkedin, 'linkedin')}`, padding, y)
      y += socialHeight
    }
    if (data.twitter) {
      ctx.fillText(`Twitter: ${extractHandle(data.twitter, 'twitter')}`, padding, y)
      y += socialHeight
    }
    if (data.instagram) {
      ctx.fillText(`Instagram: ${extractHandle(data.instagram, 'instagram')}`, padding, y)
      y += socialHeight
    }
    if (data.github) {
      ctx.fillText(`GitHub: ${extractHandle(data.github, 'github')}`, padding, y)
    }
  }
}

/**
 * Helper functions
 */
const getFontFamily = (fontFamily: string | undefined): string => {
  if (!fontFamily || fontFamily === 'system') {
    return 'Arial, sans-serif'
  }
  return fontFamily
}

const loadImage = (src: string): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => resolve(img)
    img.onerror = reject
    img.src = src
  })
}

const wrapText = (
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number
): void => {
  const lines = wrapTextToLines(ctx, text, maxWidth)
  lines.forEach((line, i) => {
    ctx.fillText(line, x, y + i * lineHeight)
  })
}

const wrapTextToLines = (
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number
): string[] => {
  const words = text.split(' ')
  const lines: string[] = []
  let currentLine = ''

  words.forEach(word => {
    const testLine = currentLine ? `${currentLine} ${word}` : word
    const metrics = ctx.measureText(testLine)

    if (metrics.width > maxWidth && currentLine) {
      lines.push(currentLine)
      currentLine = word
    } else {
      currentLine = testLine
    }
  })

  if (currentLine) {
    lines.push(currentLine)
  }

  return lines
}

const extractHandle = (url: string, platform: string): string => {
  try {
    const cleaned = url.replace(/^https?:\/\/(www\.)?/, '')
    switch (platform) {
      case 'linkedin': {
        const match = cleaned.match(/linkedin\.com\/(in|company)\/([^/?]+)/)
        return match ? match[2] : cleaned
      }
      case 'twitter': {
        const match = cleaned.match(/(?:twitter|x)\.com\/([^/?]+)/)
        return match ? `@${match[1]}` : cleaned
      }
      case 'instagram': {
        const match = cleaned.match(/instagram\.com\/([^/?]+)/)
        return match ? `@${match[1]}` : cleaned
      }
      case 'github': {
        const match = cleaned.match(/github\.com\/([^/?]+)/)
        return match ? match[1] : cleaned
      }
      default:
        return cleaned
    }
  } catch {
    return url
  }
}

const roundRect = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number
): void => {
  ctx.beginPath()
  ctx.moveTo(x + radius, y)
  ctx.lineTo(x + width - radius, y)
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius)
  ctx.lineTo(x + width, y + height - radius)
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height)
  ctx.lineTo(x + radius, y + height)
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius)
  ctx.lineTo(x, y + radius)
  ctx.quadraticCurveTo(x, y, x + radius, y)
  ctx.closePath()
}
