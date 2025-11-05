import { CardData } from '../types'
import './PrintCardTemplates.css'

interface TemplateProps {
  data: CardData
  colors: string[]
  isBack?: boolean
}

// Professional typography system
const typography = {
  name: { fontSize: '24px', fontWeight: '700', letterSpacing: '0.02em' },
  title: { fontSize: '13px', fontWeight: '500', letterSpacing: '0.05em' },
  company: { fontSize: '14px', fontWeight: '600', letterSpacing: '0.01em' },
  contact: { fontSize: '11px', fontWeight: '400', lineHeight: '1.6' },
  large: { fontSize: '28px', fontWeight: '800', letterSpacing: '-0.01em' },
}

// 1. MINIMAL - Clean, centered, small logo, professional headshot
export const MinimalTemplate = ({ data, colors, isBack }: TemplateProps) => {
  if (isBack && data.includeBack && data.backText) {
    return (
      <div
        className="card-template minimal-back"
        style={{ background: colors[0], color: colors[2] }}
      >
        <div style={{ fontSize: '12px', lineHeight: '1.8' }}>
          {data.backText}
        </div>
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
      <h1 style={{ ...typography.name, color: colors[2], marginTop: '16px' }}>
        {data.name}
      </h1>
      <p
        style={{
          ...typography.title,
          color: colors[1],
          textTransform: 'uppercase',
          marginTop: '6px',
        }}
      >
        {data.title}
      </p>
      {data.company && (
        <p
          style={{
            ...typography.company,
            color: colors[2],
            marginTop: '8px',
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
          marginTop: '14px',
          opacity: 0.9,
        }}
      >
        {data.email && <div>{data.email}</div>}
        {data.phone && <div>{data.phone}</div>}
        {data.website && <div>{data.website}</div>}
      </div>
    </div>
  )
}

// 2. MODERN - Split layout, full-bleed image, geometric accent
export const ModernTemplate = ({ data, colors, isBack }: TemplateProps) => {
  if (isBack && data.includeBack && data.backText) {
    return (
      <div
        className="card-template modern-back"
        style={{ background: colors[0], color: colors[2] }}
      >
        <div className="geometric-accent" style={{ background: colors[1] }} />
        <div style={{ fontSize: '12px', lineHeight: '1.8', padding: '32px' }}>
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
          style={{ ...typography.large, color: colors[2], marginBottom: '6px' }}
        >
          {data.name}
        </h1>
        <p
          style={{
            ...typography.title,
            color: colors[1],
            textTransform: 'uppercase',
            marginBottom: '4px',
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
              marginBottom: '16px',
            }}
          >
            {data.company}
          </p>
        )}
        <div style={{ ...typography.contact, color: colors[2], opacity: 0.85 }}>
          {data.email && <div>{data.email}</div>}
          {data.phone && <div>{data.phone}</div>}
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
  if (isBack && data.includeBack && data.backText) {
    return (
      <div
        className="card-template professional-back"
        style={{ background: colors[0], color: colors[2] }}
      >
        <div style={{ fontSize: '12px', lineHeight: '1.8' }}>
          {data.backText}
        </div>
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
        <h1 style={{ ...typography.name, color: colors[2] }}>{data.name}</h1>
        <p
          style={{
            ...typography.title,
            color: colors[1],
            textTransform: 'uppercase',
            marginTop: '4px',
          }}
        >
          {data.title}
        </p>
        {data.company && (
          <p
            style={{
              ...typography.company,
              color: colors[2],
              marginTop: '6px',
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
            marginTop: '12px',
            marginBottom: '12px',
          }}
        />
        <div style={{ ...typography.contact, color: colors[2], opacity: 0.9 }}>
          {data.email && <div>{data.email}</div>}
          {data.phone && <div>{data.phone}</div>}
          {data.website && <div>{data.website}</div>}
        </div>
      </div>
    </div>
  )
}

// 4. ELEGANT - Maximum white space, refined typography
export const ElegantTemplate = ({ data, colors, isBack }: TemplateProps) => {
  if (isBack && data.includeBack && data.backText) {
    return (
      <div
        className="card-template elegant-back"
        style={{ background: colors[0], borderTop: `3px solid ${colors[1]}` }}
      >
        <div style={{ fontSize: '12px', lineHeight: '1.9', color: colors[2] }}>
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
      <h1 style={{ ...typography.name, color: colors[2], marginBottom: '8px' }}>
        {data.name}
      </h1>
      <p
        style={{
          ...typography.title,
          color: colors[1],
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          marginBottom: '4px',
        }}
      >
        {data.title}
      </p>
      {data.company && (
        <p
          style={{
            ...typography.company,
            color: colors[3],
            marginBottom: '18px',
            fontWeight: '400',
          }}
        >
          {data.company}
        </p>
      )}
      <div style={{ ...typography.contact, color: colors[2], opacity: 0.85 }}>
        {data.email && <div>{data.email}</div>}
        {data.phone && <div>{data.phone}</div>}
        {data.website && <div>{data.website}</div>}
      </div>
    </div>
  )
}

// 5. BOLD - Dark, striking, modern
export const BoldTemplate = ({ data, colors, isBack }: TemplateProps) => {
  if (isBack && data.includeBack && data.backText) {
    return (
      <div
        className="card-template bold-back"
        style={{ background: colors[0], color: colors[2] }}
      >
        <div style={{ fontSize: '13px', lineHeight: '1.8' }}>
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
      <h1
        style={{ ...typography.large, color: colors[2], marginBottom: '8px' }}
      >
        {data.name}
      </h1>
      <p
        style={{
          ...typography.title,
          color: colors[1],
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          marginBottom: '6px',
        }}
      >
        {data.title}
      </p>
      {data.company && (
        <p
          style={{
            ...typography.company,
            color: colors[3],
            marginBottom: '16px',
            fontWeight: '600',
          }}
        >
          {data.company}
        </p>
      )}
      <div style={{ ...typography.contact, color: colors[2], opacity: 0.95 }}>
        {data.email && <div>{data.email}</div>}
        {data.phone && <div>{data.phone}</div>}
        {data.website && <div>{data.website}</div>}
      </div>
    </div>
  )
}

// 6. CLASSIC - Traditional, centered, circular headshot
export const ClassicTemplate = ({ data, colors, isBack }: TemplateProps) => {
  if (isBack && data.includeBack && data.backText) {
    return (
      <div
        className="card-template classic-back"
        style={{ background: colors[3], color: colors[0] }}
      >
        <div style={{ fontSize: '12px', lineHeight: '1.8' }}>
          {data.backText}
        </div>
      </div>
    )
  }

  return (
    <div className="card-template classic-template">
      <div
        className="classic-header"
        style={{ background: colors[1], padding: '20px 0' }}
      >
        {data.image && (
          <img
            src={data.image}
            alt={data.name}
            className="classic-headshot"
            style={{ border: `4px solid ${colors[0]}` }}
          />
        )}
      </div>
      <div
        className="classic-body"
        style={{ background: colors[0], padding: '20px 24px' }}
      >
        {data.logo && (
          <img src={data.logo} alt="Logo" className="classic-logo" />
        )}
        <h1
          style={{
            ...typography.name,
            color: colors[2],
            textAlign: 'center',
            marginBottom: '6px',
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
            marginBottom: '4px',
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
              marginBottom: '14px',
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
          {data.email && <div>{data.email}</div>}
          {data.phone && <div>{data.phone}</div>}
          {data.website && <div>{data.website}</div>}
        </div>
      </div>
    </div>
  )
}

// 7. CREATIVE - Asymmetric, dynamic, modern
export const CreativeTemplate = ({ data, colors, isBack }: TemplateProps) => {
  if (isBack && data.includeBack && data.backText) {
    return (
      <div
        className="card-template creative-back"
        style={{
          background: `linear-gradient(135deg, ${colors[1]} 0%, ${colors[3]} 100%)`,
          color: colors[2],
        }}
      >
        <div style={{ fontSize: '12px', lineHeight: '1.8' }}>
          {data.backText}
        </div>
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
          style={{ ...typography.large, color: colors[2], marginBottom: '6px' }}
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
            marginBottom: '4px',
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
              marginBottom: '14px',
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
          {data.email && <div>{data.email}</div>}
          {data.phone && <div>{data.phone}</div>}
          {data.website && <div>{data.website}</div>}
        </div>
      </div>
    </div>
  )
}

// 8. SIMPLE - Ultra minimal, text only
export const SimpleTemplate = ({ data, colors, isBack }: TemplateProps) => {
  if (isBack && data.includeBack && data.backText) {
    return (
      <div
        className="card-template simple-back"
        style={{ background: colors[0], color: colors[2] }}
      >
        <div style={{ fontSize: '12px', lineHeight: '1.9' }}>
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
      <h1 style={{ ...typography.name, color: colors[2], marginBottom: '6px' }}>
        {data.name}
      </h1>
      <p
        style={{
          ...typography.title,
          color: colors[1],
          textTransform: 'uppercase',
          letterSpacing: '0.12em',
          marginBottom: '4px',
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
            marginBottom: '18px',
            fontWeight: '400',
          }}
        >
          {data.company}
        </p>
      )}
      <div style={{ ...typography.contact, color: colors[2], opacity: 0.85 }}>
        {data.email && <div>{data.email}</div>}
        {data.phone && <div>{data.phone}</div>}
        {data.website && <div>{data.website}</div>}
      </div>
    </div>
  )
}
