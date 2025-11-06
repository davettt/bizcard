import { CardData } from '../types'
import SocialLinks from '../components/SocialLinks'
import SocialHandles from '../components/SocialHandles'
import './PrintCardTemplates.css'

interface TemplateProps {
  data: CardData
  colors: string[]
  isBack?: boolean
}

// Helper to get border-radius based on corner style preference
const getBorderRadius = (
  cornerStyle: 'rounded' | 'square' | undefined,
  defaultRadius: string
) => {
  return cornerStyle === 'square' ? '0' : defaultRadius
}

// Helper to get font family
const getFontFamily = (fontFamily: string | undefined) => {
  if (!fontFamily || fontFamily === 'system') {
    return "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
  }
  return fontFamily
}

// Helper to get responsive padding based on font scale
// When font increases, padding decreases to prevent overflow
const getResponsivePadding = (
  fontScale: number = 1.0,
  basePadding: number = 28
) => {
  // Inverse relationship: larger font = smaller padding
  // At scale 0.8, padding increases by 20%
  // At scale 1.2, padding decreases by 20%
  const paddingMultiplier = 1.4 - fontScale * 0.4
  return Math.round(basePadding * paddingMultiplier)
}

// Professional typography system with tighter spacing
// Scale parameter allows adjusting font sizes (0.8x to 1.2x)
const getTypography = (scale: number = 1.0) => ({
  name: {
    fontSize: `${22 * scale}px`,
    fontWeight: '700',
    letterSpacing: '0.02em',
  },
  title: {
    fontSize: `${12 * scale}px`,
    fontWeight: '500',
    letterSpacing: '0.05em',
  },
  company: {
    fontSize: `${13 * scale}px`,
    fontWeight: '600',
    letterSpacing: '0.01em',
  },
  contact: {
    fontSize: `${10 * scale}px`,
    fontWeight: '400',
    lineHeight: '1.5',
  },
  large: {
    fontSize: `${26 * scale}px`,
    fontWeight: '800',
    letterSpacing: '-0.01em',
  },
  back: { fontSize: `${11 * scale}px`, lineHeight: '1.7' },
})

// 1. MINIMAL - Clean, centered, compact layout
export const MinimalTemplate = ({ data, colors, isBack }: TemplateProps) => {
  const typography = getTypography(data.fontScale || 1.0)

  if (isBack && data.includeBack && data.backText) {
    return (
      <div
        className="card-template minimal-back"
        style={{ background: colors[0], color: colors[2] }}
      >
        <div style={{ ...typography.back }}>{data.backText}</div>
        {(data.linkedin || data.twitter || data.instagram || data.github) && (
          <div style={{ marginTop: '16px' }}>
            <SocialHandles
              linkedin={data.linkedin}
              twitter={data.twitter}
              instagram={data.instagram}
              github={data.github}
              color={colors[1]}
              textColor={colors[2]}
            />
          </div>
        )}
      </div>
    )
  }

  // Show logo if available, otherwise show smaller image
  const showLogo = data.logo
  const showImage = !data.logo && data.image

  const padding = getResponsivePadding(data.fontScale, 28)

  return (
    <div
      className="card-template minimal-template"
      style={{
        background: colors[0],
        borderRadius: getBorderRadius(data.cornerStyle, '8px'),
        fontFamily: getFontFamily(data.fontFamily),
        padding: `${padding}px ${Math.round(padding * 0.79)}px`,
      }}
    >
      {showLogo && <img src={data.logo} alt="Logo" className="minimal-logo" />}
      {showImage && (
        <img
          src={data.image}
          alt={data.name}
          className="minimal-image-small"
          style={{ borderColor: colors[1] }}
        />
      )}
      <h1
        style={{
          ...typography.name,
          color: colors[2],
          marginTop: showLogo || showImage ? '8px' : '0',
          marginBottom: '0',
        }}
      >
        {data.name}
      </h1>
      <p
        style={{
          ...typography.title,
          color: colors[1],
          textTransform: 'uppercase',
          marginTop: '3px',
          marginBottom: '0',
        }}
      >
        {data.title}
      </p>
      {data.company && (
        <p
          style={{
            ...typography.company,
            color: colors[2],
            marginTop: '2px',
            marginBottom: '0',
            opacity: 0.8,
          }}
        >
          {data.company}
        </p>
      )}
      <div
        style={{
          ...typography.contact,
          color: colors[2],
          marginTop: '8px',
          opacity: 0.9,
        }}
      >
        {data.email && <div style={{ marginBottom: '1px' }}>{data.email}</div>}
        {data.phone && <div style={{ marginBottom: '1px' }}>{data.phone}</div>}
        {data.website && (
          <div style={{ marginBottom: '1px' }}>{data.website}</div>
        )}
      </div>
      {(data.linkedin || data.twitter || data.instagram || data.github) && (
        <div style={{ marginTop: '8px' }}>
          <SocialLinks
            linkedin={data.linkedin}
            twitter={data.twitter}
            instagram={data.instagram}
            github={data.github}
            color={colors[1]}
          />
        </div>
      )}
    </div>
  )
}

// 2. MODERN - Split layout, full-bleed image, geometric accent
export const ModernTemplate = ({ data, colors, isBack }: TemplateProps) => {
  const typography = getTypography(data.fontScale || 1.0)

  if (isBack && data.includeBack && data.backText) {
    return (
      <div
        className="card-template modern-back"
        style={{ background: colors[0], color: colors[2] }}
      >
        <div className="geometric-accent" style={{ background: colors[1] }} />
        <div style={{ ...typography.back, padding: '28px' }}>
          {data.backText}
          {(data.linkedin || data.twitter || data.instagram || data.github) && (
            <div style={{ marginTop: '16px' }}>
              <SocialHandles
                linkedin={data.linkedin}
                twitter={data.twitter}
                instagram={data.instagram}
                github={data.github}
                color={colors[1]}
                textColor={colors[2]}
              />
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div
      className="card-template modern-template"
      style={{
        borderRadius: getBorderRadius(data.cornerStyle, '8px'),
        fontFamily: getFontFamily(data.fontFamily),
      }}
    >
      {data.image && (
        <div className="modern-image-panel" style={{ background: colors[3] }}>
          <img src={data.image} alt={data.name} className="modern-image" />
        </div>
      )}
      <div
        className="modern-content"
        style={{ background: colors[0], color: colors[2] }}
      >
        <div className="geometric-accent" style={{ background: colors[1] }} />
        {data.logo && (
          <img src={data.logo} alt="Logo" className="modern-logo" />
        )}
        <h1
          style={{
            ...typography.large,
            color: colors[2],
            marginBottom: '4px',
            marginTop: '0',
          }}
        >
          {data.name}
        </h1>
        <p
          style={{
            ...typography.title,
            color: colors[1],
            textTransform: 'uppercase',
            marginBottom: '3px',
            marginTop: '0',
          }}
        >
          {data.title}
        </p>
        {data.company && (
          <p
            style={{
              ...typography.company,
              color: colors[2],
              opacity: 0.7,
              marginBottom: '12px',
              marginTop: '0',
            }}
          >
            {data.company}
          </p>
        )}
        <div style={{ ...typography.contact, color: colors[2], opacity: 0.85 }}>
          {data.email && (
            <div style={{ marginBottom: '1px' }}>{data.email}</div>
          )}
          {data.phone && (
            <div style={{ marginBottom: '1px' }}>{data.phone}</div>
          )}
          {data.website && (
            <div style={{ marginBottom: '1px' }}>{data.website}</div>
          )}
        </div>
        {(data.linkedin || data.twitter || data.instagram || data.github) && (
          <div style={{ marginTop: '8px' }}>
            <SocialLinks
              linkedin={data.linkedin}
              twitter={data.twitter}
              instagram={data.instagram}
              github={data.github}
              color={colors[1]}
            />
          </div>
        )}
      </div>
    </div>
  )
}

// 3. PROFESSIONAL - Two-column layout with left content, right image/logo
export const ProfessionalTemplate = ({
  data,
  colors,
  isBack,
}: TemplateProps) => {
  const typography = getTypography(data.fontScale || 1.0)

  if (isBack && data.includeBack && data.backText) {
    return (
      <div
        className="card-template professional-back"
        style={{ background: colors[0], color: colors[2] }}
      >
        <div style={{ ...typography.back }}>{data.backText}</div>
        {(data.linkedin || data.twitter || data.instagram || data.github) && (
          <div style={{ marginTop: '16px' }}>
            <SocialHandles
              linkedin={data.linkedin}
              twitter={data.twitter}
              instagram={data.instagram}
              github={data.github}
              color={colors[1]}
              textColor={colors[2]}
            />
          </div>
        )}
      </div>
    )
  }

  return (
    <div
      className="card-template professional-template"
      style={{
        background: colors[0],
        borderRadius: getBorderRadius(data.cornerStyle, '8px'),
        fontFamily: getFontFamily(data.fontFamily),
      }}
    >
      <div className="professional-content">
        {data.logo && (
          <img src={data.logo} alt="Logo" className="professional-logo-top" />
        )}
        <h1
          style={{
            ...typography.name,
            color: colors[2],
            marginTop: data.logo ? '8px' : '0',
            marginBottom: '0',
          }}
        >
          {data.name}
        </h1>
        <p
          style={{
            ...typography.title,
            color: colors[1],
            textTransform: 'uppercase',
            marginTop: '3px',
            marginBottom: '0',
          }}
        >
          {data.title}
        </p>
        {data.company && (
          <p
            style={{
              ...typography.company,
              color: colors[2],
              marginTop: '2px',
              marginBottom: '0',
              opacity: 0.8,
            }}
          >
            {data.company}
          </p>
        )}
        <div
          className="professional-divider"
          style={{
            background: colors[1],
            marginTop: '8px',
            marginBottom: '8px',
          }}
        />
        <div style={{ ...typography.contact, color: colors[2], opacity: 0.9 }}>
          {data.email && (
            <div style={{ marginBottom: '1px' }}>{data.email}</div>
          )}
          {data.phone && (
            <div style={{ marginBottom: '1px' }}>{data.phone}</div>
          )}
          {data.website && (
            <div style={{ marginBottom: '1px' }}>{data.website}</div>
          )}
        </div>
        {(data.linkedin || data.twitter || data.instagram || data.github) && (
          <div style={{ marginTop: '8px' }}>
            <SocialLinks
              linkedin={data.linkedin}
              twitter={data.twitter}
              instagram={data.instagram}
              github={data.github}
              color={colors[1]}
            />
          </div>
        )}
      </div>
      {/* Right panel: show image when available */}
      {data.image && (
        <div className="professional-image-side">
          {/* When both logo and image: show single large centered decorative image */}
          {data.logo ? (
            <img
              src={data.image}
              alt=""
              className="professional-decorative-image"
            />
          ) : (
            /* When only image (no logo): show as primary headshot */
            <img
              src={data.image}
              alt={data.name}
              className="professional-headshot-large"
            />
          )}
        </div>
      )}
    </div>
  )
}

// 4. ELEGANT - Left-aligned, refined typography, compact
export const ElegantTemplate = ({ data, colors, isBack }: TemplateProps) => {
  const typography = getTypography(data.fontScale || 1.0)

  if (isBack && data.includeBack && data.backText) {
    return (
      <div
        className="card-template elegant-back"
        style={{ background: colors[0], borderTop: `3px solid ${colors[1]}` }}
      >
        <div
          style={{ ...typography.back, lineHeight: '1.8', color: colors[2] }}
        >
          {data.backText}
        </div>
        {(data.linkedin || data.twitter || data.instagram || data.github) && (
          <div style={{ marginTop: '16px' }}>
            <SocialHandles
              linkedin={data.linkedin}
              twitter={data.twitter}
              instagram={data.instagram}
              github={data.github}
              color={colors[1]}
              textColor={colors[2]}
            />
          </div>
        )}
      </div>
    )
  }

  // When both logo and image: logo primary, image as decorative badge
  const showLogo = data.logo
  const showDecorativeImage = data.logo && data.image
  const padding = getResponsivePadding(data.fontScale, 32)

  return (
    <div
      className="card-template elegant-template"
      style={{
        background: colors[0],
        borderTop: `3px solid ${colors[1]}`,
        position: 'relative',
        borderRadius: getBorderRadius(data.cornerStyle, '8px'),
        fontFamily: getFontFamily(data.fontFamily),
        padding: `${padding}px ${Math.round(padding * 0.88)}px`,
      }}
    >
      {/* Small decorative badge in bottom-right when both logo and image provided */}
      {showDecorativeImage && (
        <img
          src={data.image}
          alt=""
          className="elegant-badge"
          style={{ borderColor: colors[1] }}
        />
      )}

      {/* Primary logo */}
      {showLogo && <img src={data.logo} alt="Logo" className="elegant-logo" />}

      {/* If only image (no logo), show it as primary */}
      {!showLogo && data.image && (
        <img src={data.image} alt={data.name} className="elegant-image-small" />
      )}
      <h1
        style={{
          ...typography.name,
          color: colors[2],
          marginBottom: '3px',
          marginTop: showLogo || data.image ? '6px' : '0',
        }}
      >
        {data.name}
      </h1>
      <p
        style={{
          ...typography.title,
          color: colors[1],
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          marginBottom: '2px',
          marginTop: '0',
        }}
      >
        {data.title}
      </p>
      {data.company && (
        <p
          style={{
            ...typography.company,
            color: colors[3],
            marginBottom: '8px',
            marginTop: '0',
            fontWeight: '400',
          }}
        >
          {data.company}
        </p>
      )}
      <div style={{ ...typography.contact, color: colors[2], opacity: 0.85 }}>
        {data.email && <div style={{ marginBottom: '1px' }}>{data.email}</div>}
        {data.phone && <div style={{ marginBottom: '1px' }}>{data.phone}</div>}
        {data.website && (
          <div style={{ marginBottom: '1px' }}>{data.website}</div>
        )}
      </div>
      {(data.linkedin || data.twitter || data.instagram || data.github) && (
        <div style={{ marginTop: '8px' }}>
          <SocialLinks
            linkedin={data.linkedin}
            twitter={data.twitter}
            instagram={data.instagram}
            github={data.github}
            color={colors[1]}
          />
        </div>
      )}
    </div>
  )
}

// 5. BOLD - Dark, striking, centered, compact
export const BoldTemplate = ({ data, colors, isBack }: TemplateProps) => {
  const typography = getTypography(data.fontScale || 1.0)

  if (isBack && data.includeBack && data.backText) {
    return (
      <div
        className="card-template bold-back"
        style={{ background: colors[0], color: colors[2] }}
      >
        <div
          style={{
            fontSize: `${12 * (data.fontScale || 1.0)}px`,
            lineHeight: '1.7',
          }}
        >
          {data.backText}
        </div>
        {(data.linkedin || data.twitter || data.instagram || data.github) && (
          <div style={{ marginTop: '16px' }}>
            <SocialHandles
              linkedin={data.linkedin}
              twitter={data.twitter}
              instagram={data.instagram}
              github={data.github}
              color={colors[1]}
              textColor={colors[2]}
            />
          </div>
        )}
      </div>
    )
  }

  // When both logo and image: logo primary, image as decorative pattern
  const showLogo = data.logo
  const showDecorativeImage = data.logo && data.image
  const padding = getResponsivePadding(data.fontScale, 26)

  return (
    <div
      className="card-template bold-template"
      style={{
        background: colors[0],
        position: 'relative',
        borderRadius: getBorderRadius(data.cornerStyle, '8px'),
        fontFamily: getFontFamily(data.fontFamily),
        padding: `${padding}px ${Math.round(padding * 1.23)}px`,
      }}
    >
      <div className="bold-accent" style={{ background: colors[1] }} />

      {/* Large prominent decorative image overlapping bottom-right when both logo and image provided */}
      {showDecorativeImage && (
        <div className="bold-decorative-overlay">
          <img src={data.image} alt="" className="bold-decorative-image" />
        </div>
      )}

      {/* Primary logo */}
      {showLogo && <img src={data.logo} alt="Logo" className="bold-logo" />}

      {/* If only image (no logo), show it as primary */}
      {!showLogo && data.image && (
        <img src={data.image} alt={data.name} className="bold-image-small" />
      )}
      <h1
        style={{
          ...typography.name,
          fontSize: `${23 * (data.fontScale || 1.0)}px`,
          color: colors[2],
          marginBottom: '4px',
          marginTop: showLogo || data.image ? '6px' : '0',
          fontWeight: '800',
        }}
      >
        {data.name}
      </h1>
      <p
        style={{
          ...typography.title,
          color: colors[1],
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          marginBottom: '2px',
          marginTop: '0',
        }}
      >
        {data.title}
      </p>
      {data.company && (
        <p
          style={{
            ...typography.company,
            color: colors[3],
            marginBottom: '8px',
            marginTop: '0',
            fontWeight: '600',
          }}
        >
          {data.company}
        </p>
      )}
      <div style={{ ...typography.contact, color: colors[2], opacity: 0.95 }}>
        {data.email && <div style={{ marginBottom: '1px' }}>{data.email}</div>}
        {data.phone && <div style={{ marginBottom: '1px' }}>{data.phone}</div>}
        {data.website && (
          <div style={{ marginBottom: '1px' }}>{data.website}</div>
        )}
      </div>
      {(data.linkedin || data.twitter || data.instagram || data.github) && (
        <div style={{ marginTop: '8px' }}>
          <SocialLinks
            linkedin={data.linkedin}
            twitter={data.twitter}
            instagram={data.instagram}
            github={data.github}
            color={colors[1]}
          />
        </div>
      )}
    </div>
  )
}

// 6. CLASSIC - Traditional centered layout with accent border
export const ClassicTemplate = ({ data, colors, isBack }: TemplateProps) => {
  const typography = getTypography(data.fontScale || 1.0)

  if (isBack && data.includeBack && data.backText) {
    return (
      <div
        className="card-template classic-back"
        style={{ background: colors[3], color: colors[0] }}
      >
        <div style={{ ...typography.back }}>{data.backText}</div>
        {(data.linkedin || data.twitter || data.instagram || data.github) && (
          <div style={{ marginTop: '16px' }}>
            <SocialHandles
              linkedin={data.linkedin}
              twitter={data.twitter}
              instagram={data.instagram}
              github={data.github}
              color={colors[1]}
              textColor={colors[0]}
            />
          </div>
        )}
      </div>
    )
  }

  // Show logo or small image at top
  const showVisual = data.logo || data.image
  const padding = getResponsivePadding(data.fontScale, 28)

  return (
    <div
      className="card-template classic-template"
      style={{
        background: colors[0],
        borderLeft: `4px solid ${colors[1]}`,
        borderRadius: getBorderRadius(data.cornerStyle, '8px'),
        fontFamily: getFontFamily(data.fontFamily),
        padding: `${padding}px ${Math.round(padding * 0.86)}px`,
      }}
    >
      {data.logo && <img src={data.logo} alt="Logo" className="classic-logo" />}
      {!data.logo && data.image && (
        <img
          src={data.image}
          alt={data.name}
          className="classic-image-small"
          style={{ border: `2px solid ${colors[1]}` }}
        />
      )}
      <h1
        style={{
          ...typography.name,
          color: colors[2],
          textAlign: 'center',
          marginBottom: '3px',
          marginTop: showVisual ? '8px' : '0',
        }}
      >
        {data.name}
      </h1>
      <p
        style={{
          ...typography.title,
          color: colors[1],
          textAlign: 'center',
          textTransform: 'uppercase',
          marginBottom: '2px',
          marginTop: '0',
        }}
      >
        {data.title}
      </p>
      {data.company && (
        <p
          style={{
            ...typography.company,
            color: colors[2],
            opacity: 0.8,
            textAlign: 'center',
            marginBottom: '8px',
            marginTop: '0',
          }}
        >
          {data.company}
        </p>
      )}
      <div
        className="classic-divider"
        style={{
          background: colors[1],
          margin: '8px auto',
        }}
      />
      <div
        style={{
          ...typography.contact,
          color: colors[2],
          opacity: 0.9,
          textAlign: 'center',
        }}
      >
        {data.email && <div style={{ marginBottom: '1px' }}>{data.email}</div>}
        {data.phone && <div style={{ marginBottom: '1px' }}>{data.phone}</div>}
        {data.website && (
          <div style={{ marginBottom: '1px' }}>{data.website}</div>
        )}
      </div>
      {(data.linkedin || data.twitter || data.instagram || data.github) && (
        <div style={{ marginTop: '8px', textAlign: 'center' }}>
          <SocialLinks
            linkedin={data.linkedin}
            twitter={data.twitter}
            instagram={data.instagram}
            github={data.github}
            color={colors[1]}
          />
        </div>
      )}
    </div>
  )
}

// 7. CREATIVE - Asymmetric, dynamic, modern
export const CreativeTemplate = ({ data, colors, isBack }: TemplateProps) => {
  const typography = getTypography(data.fontScale || 1.0)

  if (isBack && data.includeBack && data.backText) {
    return (
      <div
        className="card-template creative-back"
        style={{
          background: `linear-gradient(135deg, ${colors[1]} 0%, ${colors[3]} 100%)`,
          color: colors[2],
        }}
      >
        <div style={{ ...typography.back }}>{data.backText}</div>
        {(data.linkedin || data.twitter || data.instagram || data.github) && (
          <div style={{ marginTop: '16px' }}>
            <SocialHandles
              linkedin={data.linkedin}
              twitter={data.twitter}
              instagram={data.instagram}
              github={data.github}
              color={colors[2]}
              textColor={colors[2]}
            />
          </div>
        )}
      </div>
    )
  }

  return (
    <div
      className="card-template creative-template"
      style={{
        borderRadius: getBorderRadius(data.cornerStyle, '8px'),
        fontFamily: getFontFamily(data.fontFamily),
      }}
    >
      {data.image && (
        <div className="creative-image-bg">
          <img src={data.image} alt={data.name} className="creative-image" />
          <div
            className="creative-overlay"
            style={{
              background: `linear-gradient(135deg, ${colors[0]}dd 0%, ${colors[1]}99 100%)`,
            }}
          />
        </div>
      )}
      <div className="creative-content">
        {data.logo && (
          <img src={data.logo} alt="Logo" className="creative-logo" />
        )}
        <h1
          style={{
            ...typography.large,
            color: colors[2],
            marginBottom: '4px',
            marginTop: '0',
          }}
        >
          {data.name}
        </h1>
        <p
          style={{
            ...typography.title,
            color: colors[2],
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
            opacity: 0.9,
            marginBottom: '3px',
            marginTop: '0',
          }}
        >
          {data.title}
        </p>
        {data.company && (
          <p
            style={{
              ...typography.company,
              color: colors[2],
              opacity: 0.85,
              marginBottom: '10px',
              marginTop: '0',
            }}
          >
            {data.company}
          </p>
        )}
        <div
          style={{
            ...typography.contact,
            color: colors[2],
            opacity: 0.95,
          }}
        >
          {data.email && (
            <div style={{ marginBottom: '1px' }}>{data.email}</div>
          )}
          {data.phone && (
            <div style={{ marginBottom: '1px' }}>{data.phone}</div>
          )}
          {data.website && (
            <div style={{ marginBottom: '1px' }}>{data.website}</div>
          )}
        </div>
        {(data.linkedin || data.twitter || data.instagram || data.github) && (
          <div style={{ marginTop: '8px' }}>
            <SocialLinks
              linkedin={data.linkedin}
              twitter={data.twitter}
              instagram={data.instagram}
              github={data.github}
              color={colors[2]}
            />
          </div>
        )}
      </div>
    </div>
  )
}

// 8. SIMPLE - Ultra minimal, centered, clean
export const SimpleTemplate = ({ data, colors, isBack }: TemplateProps) => {
  const typography = getTypography(data.fontScale || 1.0)

  if (isBack && data.includeBack && data.backText) {
    return (
      <div
        className="card-template simple-back"
        style={{ background: colors[0], color: colors[2] }}
      >
        <div style={{ ...typography.back, lineHeight: '1.8' }}>
          {data.backText}
        </div>
        {(data.linkedin || data.twitter || data.instagram || data.github) && (
          <div style={{ marginTop: '16px' }}>
            <SocialHandles
              linkedin={data.linkedin}
              twitter={data.twitter}
              instagram={data.instagram}
              github={data.github}
              color={colors[1]}
              textColor={colors[2]}
            />
          </div>
        )}
      </div>
    )
  }

  // When both logo and image: logo primary, image as small badge
  const showLogo = data.logo
  const showDecorativeImage = data.logo && data.image
  const padding = getResponsivePadding(data.fontScale, 32)

  return (
    <div
      className="card-template simple-template"
      style={{
        background: colors[0],
        position: 'relative',
        borderRadius: getBorderRadius(data.cornerStyle, '8px'),
        fontFamily: getFontFamily(data.fontFamily),
        padding: `${padding}px ${Math.round(padding * 0.88)}px`,
      }}
    >
      {/* Fade pattern on right when both logo and image provided */}
      {showDecorativeImage && (
        <div className="simple-fade-pattern">
          <img src={data.image} alt="" className="simple-pattern-image" />
        </div>
      )}

      {/* Primary logo */}
      {showLogo && <img src={data.logo} alt="Logo" className="simple-logo" />}

      {/* If only image (no logo), show it as primary */}
      {!showLogo && data.image && (
        <img src={data.image} alt={data.name} className="simple-image-small" />
      )}
      <h1
        style={{
          ...typography.name,
          color: colors[2],
          marginBottom: '3px',
          marginTop: showLogo || data.image ? '8px' : '0',
        }}
      >
        {data.name}
      </h1>
      <p
        style={{
          ...typography.title,
          color: colors[1],
          textTransform: 'uppercase',
          letterSpacing: '0.12em',
          marginBottom: '2px',
          marginTop: '0',
        }}
      >
        {data.title}
      </p>
      {data.company && (
        <p
          style={{
            ...typography.company,
            color: colors[2],
            opacity: 0.7,
            marginBottom: '8px',
            marginTop: '0',
            fontWeight: '400',
          }}
        >
          {data.company}
        </p>
      )}
      <div style={{ ...typography.contact, color: colors[2], opacity: 0.85 }}>
        {data.email && <div style={{ marginBottom: '1px' }}>{data.email}</div>}
        {data.phone && <div style={{ marginBottom: '1px' }}>{data.phone}</div>}
        {data.website && (
          <div style={{ marginBottom: '1px' }}>{data.website}</div>
        )}
      </div>
      {(data.linkedin || data.twitter || data.instagram || data.github) && (
        <div style={{ marginTop: '8px' }}>
          <SocialLinks
            linkedin={data.linkedin}
            twitter={data.twitter}
            instagram={data.instagram}
            github={data.github}
            color={colors[1]}
          />
        </div>
      )}
    </div>
  )
}
