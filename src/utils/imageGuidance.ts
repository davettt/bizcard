export interface ImageGuidance {
  width: number
  height: number
  aspectRatio: string
  purpose: 'headshot' | 'logo' | 'full-bleed' | 'background'
  description: string
}

export interface TemplateImageRequirements {
  primary?: ImageGuidance
  logo?: ImageGuidance
  optional?: ImageGuidance[]
}

// Image requirements for each template
export const templateImageRequirements: Record<
  string,
  TemplateImageRequirements
> = {
  minimal: {
    primary: {
      width: 400,
      height: 400,
      aspectRatio: '1:1',
      purpose: 'headshot',
      description: 'Square headshot photo, centered on your face',
    },
    logo: {
      width: 200,
      height: 200,
      aspectRatio: '1:1',
      purpose: 'logo',
      description: 'Company logo, square or circular format',
    },
  },
  modern: {
    primary: {
      width: 600,
      height: 900,
      aspectRatio: '2:3',
      purpose: 'full-bleed',
      description: 'Portrait photo for left side, will extend to edges',
    },
    logo: {
      width: 300,
      height: 100,
      aspectRatio: '3:1',
      purpose: 'logo',
      description: 'Horizontal logo format',
    },
  },
  professional: {
    primary: {
      width: 500,
      height: 700,
      aspectRatio: '5:7',
      purpose: 'headshot',
      description: 'Professional headshot, portrait orientation',
    },
    logo: {
      width: 200,
      height: 200,
      aspectRatio: '1:1',
      purpose: 'logo',
      description: 'Square company logo',
    },
  },
  bold: {
    primary: {
      width: 800,
      height: 600,
      aspectRatio: '4:3',
      purpose: 'background',
      description: 'Background image or pattern, landscape orientation',
    },
    logo: {
      width: 300,
      height: 300,
      aspectRatio: '1:1',
      purpose: 'logo',
      description: 'Large square logo',
    },
  },
  elegant: {
    logo: {
      width: 250,
      height: 250,
      aspectRatio: '1:1',
      purpose: 'logo',
      description: 'Company logo, elegant and refined',
    },
  },
  classic: {
    primary: {
      width: 400,
      height: 400,
      aspectRatio: '1:1',
      purpose: 'headshot',
      description: 'Circular headshot crop',
    },
    logo: {
      width: 300,
      height: 100,
      aspectRatio: '3:1',
      purpose: 'logo',
      description: 'Horizontal logo',
    },
  },
  creative: {
    primary: {
      width: 600,
      height: 800,
      aspectRatio: '3:4',
      purpose: 'full-bleed',
      description: 'Creative photo, will cover background',
    },
    logo: {
      width: 200,
      height: 200,
      aspectRatio: '1:1',
      purpose: 'logo',
      description: 'Square logo',
    },
  },
  simple: {
    logo: {
      width: 150,
      height: 150,
      aspectRatio: '1:1',
      purpose: 'logo',
      description: 'Small square logo',
    },
  },
}

// Get image requirements for a template
export const getImageRequirements = (
  templateId: string
): TemplateImageRequirements => {
  return templateImageRequirements[templateId] || {}
}
