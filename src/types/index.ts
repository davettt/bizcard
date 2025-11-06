export interface ColorPalette {
  id: string
  colors: string[]
  name?: string
}

export interface CardData {
  name: string
  title: string
  company?: string
  email?: string
  phone?: string
  website?: string
  address?: string
  linkedin?: string
  twitter?: string
  instagram?: string
  github?: string
  image?: string
  logo?: string
  backText?: string
  includeBack?: boolean
  fontScale?: number // 0.8 to 1.2, default 1.0
  cornerStyle?: 'rounded' | 'square' // default 'rounded'
}

export interface EmailSignatureData {
  name: string
  title: string
  company: string
  email: string
  phone?: string
  website?: string
  imageUrl?: string
  linkedin?: string
  twitter?: string
  instagram?: string
  github?: string
}

export type PrintSize = '3.5x2' | '3.5x2.5' | '3x2' | '2.5x2'

export interface PrintSizeOption {
  value: PrintSize
  label: string
  width: number
  height: number
  unit: 'in'
}

export type TemplateId =
  | 'minimal'
  | 'classic'
  | 'modern'
  | 'elegant'
  | 'bold'
  | 'creative'
  | 'professional'
  | 'simple'

export type EmailTemplateId = 'simple' | 'modern' | 'professional' | 'creative'
