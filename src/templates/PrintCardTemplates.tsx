import { CardData } from '../types'
import './PrintCardTemplates.css'

interface TemplateProps {
  data: CardData
  colors: string[]
  isBack?: boolean
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

// 1. MINIMAL - Clean, centered, small logo, professional headshot
export const MinimalTemplate = ({ data, colors, isBack }: TemplateProps) => {
  const typography = getTypography(data.fontScale || 1.0)

  if (isBack && data.includeBack && data.backText) {
    return (
      <div
        className="card-template minimal-back"
        style={{ background: colors[0], color: colors[2] }}
      >
        <div style={{ ...typography.back }}>{data.backText}</div>
      </div>
    )
  }

  return (
    <div
      className="card-template minimal-template"
      style={{ background: colors[0] }}
    >
      {data.logo && <img src={data.logo} alt="Logo" className="minimal-logo" />}
      {data.image && (
        <img
          src={data.image}
          alt={data.name}
          className="minimal-headshot"
          style={{ borderColor: colors[1] }}
        />
      )}
      <h1
        style={{
          ...typography.name,
          color: colors[2],
          marginTop: '12px',
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
          marginTop: '4px',
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
            marginTop: '4px',
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
          marginTop: '10px',
          opacity: 0.9,
        }}
      >
        {data.email && <div style={{ marginBottom: '1px' }}>{data.email}</div>}
        {data.phone && <div style={{ marginBottom: '1px' }}>{data.phone}</div>}
        {data.website && <div>{data.website}</div>}
      </div>
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
        </div>
      </div>
    )
  }

  return (
    <div className="card-template modern-template">
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
          {data.website && <div>{data.website}</div>}
        </div>
      </div>
    </div>
  )
}

// 3. PROFESSIONAL - Traditional business card, clean layout
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
      </div>
    )
  }

  return (
    <div
      className="card-template professional-template"
      style={{ background: colors[0] }}
    >
      <div className="professional-header">
        {data.logo && (
          <img src={data.logo} alt="Logo" className="professional-logo" />
        )}
        {data.image && (
          <img
            src={data.image}
            alt={data.name}
            className="professional-headshot"
          />
        )}
      </div>
      <div className="professional-body">
        <h1
          style={{
            ...typography.name,
            color: colors[2],
            marginTop: '0',
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
              marginTop: '4px',
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
            marginTop: '10px',
            marginBottom: '10px',
          }}
        />
        <div style={{ ...typography.contact, color: colors[2], opacity: 0.9 }}>
          {data.email && (
            <div style={{ marginBottom: '1px' }}>{data.email}</div>
          )}
          {data.phone && (
            <div style={{ marginBottom: '1px' }}>{data.phone}</div>
          )}
          {data.website && <div>{data.website}</div>}
        </div>
      </div>
    </div>
  )
}

// 4. ELEGANT - Maximum white space, refined typography
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
      </div>
    )
  }

  return (
    <div
      className="card-template elegant-template"
      style={{ background: colors[0], borderTop: `3px solid ${colors[1]}` }}
    >
      {data.logo && <img src={data.logo} alt="Logo" className="elegant-logo" />}
      {data.image && (
        <img src={data.image} alt={data.name} className="elegant-image" />
      )}
      <h1
        style={{
          ...typography.name,
          color: colors[2],
          marginBottom: '6px',
          marginTop: '0',
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
            color: colors[3],
            marginBottom: '14px',
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
        {data.website && <div>{data.website}</div>}
      </div>
    </div>
  )
}

// 5. BOLD - Dark, striking, modern
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
      </div>
    )
  }

  return (
    <div
      className="card-template bold-template"
      style={{ background: colors[0] }}
    >
      <div className="bold-accent" style={{ background: colors[1] }} />
      {data.logo && <img src={data.logo} alt="Logo" className="bold-logo" />}
      {data.image && (
        <img src={data.image} alt={data.name} className="bold-image" />
      )}
      <h1
        style={{
          ...typography.large,
          color: colors[2],
          marginBottom: '6px',
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
          letterSpacing: '0.08em',
          marginBottom: '4px',
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
            marginBottom: '12px',
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
        {data.website && <div>{data.website}</div>}
      </div>
    </div>
  )
}

// 6. CLASSIC - Traditional, centered, circular headshot
export const ClassicTemplate = ({ data, colors, isBack }: TemplateProps) => {
  const typography = getTypography(data.fontScale || 1.0)

  if (isBack && data.includeBack && data.backText) {
    return (
      <div
        className="card-template classic-back"
        style={{ background: colors[3], color: colors[0] }}
      >
        <div style={{ ...typography.back }}>{data.backText}</div>
      </div>
    )
  }

  return (
    <div className="card-template classic-template">
      <div
        className="classic-header"
        style={{ background: colors[1], padding: '16px 0' }}
      >
        {data.image && (
          <img
            src={data.image}
            alt={data.name}
            className="classic-headshot"
            style={{ border: `3px solid ${colors[0]}` }}
          />
        )}
      </div>
      <div
        className="classic-body"
        style={{ background: colors[0], padding: '16px 20px' }}
      >
        {data.logo && (
          <img src={data.logo} alt="Logo" className="classic-logo" />
        )}
        <h1
          style={{
            ...typography.name,
            color: colors[2],
            textAlign: 'center',
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
            textAlign: 'center',
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
              opacity: 0.8,
              textAlign: 'center',
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
            opacity: 0.9,
            textAlign: 'center',
          }}
        >
          {data.email && (
            <div style={{ marginBottom: '1px' }}>{data.email}</div>
          )}
          {data.phone && (
            <div style={{ marginBottom: '1px' }}>{data.phone}</div>
          )}
          {data.website && <div>{data.website}</div>}
        </div>
      </div>
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
      </div>
    )
  }

  return (
    <div className="card-template creative-template">
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
          {data.website && <div>{data.website}</div>}
        </div>
      </div>
    </div>
  )
}

// 8. SIMPLE - Ultra minimal, text only
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
      </div>
    )
  }

  return (
    <div
      className="card-template simple-template"
      style={{ background: colors[0] }}
    >
      {data.logo && <img src={data.logo} alt="Logo" className="simple-logo" />}
      {data.image && (
        <img src={data.image} alt={data.name} className="simple-image" />
      )}
      <h1
        style={{
          ...typography.name,
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
          letterSpacing: '0.12em',
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
            marginBottom: '14px',
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
        {data.website && <div>{data.website}</div>}
      </div>
    </div>
  )
}
