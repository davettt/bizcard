import {
  PortraitFormat,
  BannerFormat,
  SquareFormat,
  MobileFormat,
} from './DigitalCardFormats'

export type DigitalFormatId = 'portrait' | 'banner' | 'square' | 'mobile'

export const digitalFormatComponents = {
  portrait: PortraitFormat,
  banner: BannerFormat,
  square: SquareFormat,
  mobile: MobileFormat,
}

export const digitalFormatNames = {
  portrait: 'Portrait Card',
  banner: 'Wide Banner',
  square: 'Square Post',
  mobile: 'Mobile Contact',
}

export const digitalFormatDescriptions = {
  portrait: '400×600px - Perfect for digital business cards',
  banner: '800×400px - Great for email headers & websites',
  square: '500×500px - Ideal for social media sharing',
  mobile: '375×667px - Optimized for mobile contact cards',
}

export const digitalFormatSizes = {
  portrait: { width: 400, height: 600 },
  banner: { width: 800, height: 400 },
  square: { width: 500, height: 500 },
  mobile: { width: 375, height: 667 },
}
