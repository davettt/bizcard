import { CardData, TemplateId } from '../types'
import './PrintCardTemplates.css'

interface TemplateProps {
  data: CardData
  colors: string[]
  isBack?: boolean
}

export const MinimalTemplate = ({ data, colors, isBack }: TemplateProps) => {
  if (isBack && data.includeBack && data.backText) {
    return (
      <div
        className="card-template minimal-back"
        style={{ background: colors[0] }}
      >
        <div className="back-content" style={{ color: colors[2] }}>
          {data.backText}
        </div>
      </div>
    )
  }

  return (
    <div className="card-template minimal" style={{ background: colors[0] }}>
      {data.image && (
        <img src={data.image} alt={data.name} className="card-image" />
      )}
      <div className="card-content" style={{ color: colors[2] }}>
        <h2 style={{ color: colors[1] }}>{data.name}</h2>
        <p className="title">{data.title}</p>
        {data.company && <p className="company">{data.company}</p>}
        <div className="contact-info">
          {data.email && <p>{data.email}</p>}
          {data.phone && <p>{data.phone}</p>}
          {data.website && <p>{data.website}</p>}
        </div>
      </div>
    </div>
  )
}

export const ClassicTemplate = ({ data, colors, isBack }: TemplateProps) => {
  if (isBack && data.includeBack && data.backText) {
    return (
      <div
        className="card-template classic-back"
        style={{ background: colors[3] }}
      >
        <div className="back-content" style={{ color: colors[0] }}>
          {data.backText}
        </div>
      </div>
    )
  }

  return (
    <div className="card-template classic">
      <div className="classic-header" style={{ background: colors[1] }}>
        {data.image && (
          <img src={data.image} alt={data.name} className="card-image-circle" />
        )}
      </div>
      <div className="classic-body" style={{ background: colors[0] }}>
        <h2 style={{ color: colors[2] }}>{data.name}</h2>
        <p className="title" style={{ color: colors[1] }}>
          {data.title}
        </p>
        {data.company && <p className="company">{data.company}</p>}
        <div className="contact-info">
          {data.email && <p>{data.email}</p>}
          {data.phone && <p>{data.phone}</p>}
          {data.website && <p>{data.website}</p>}
        </div>
      </div>
    </div>
  )
}

export const ModernTemplate = ({ data, colors, isBack }: TemplateProps) => {
  if (isBack && data.includeBack && data.backText) {
    return (
      <div
        className="card-template modern-back"
        style={{ background: colors[1] }}
      >
        <div className="back-content" style={{ color: 'white' }}>
          {data.backText}
        </div>
      </div>
    )
  }

  return (
    <div className="card-template modern">
      <div className="modern-left" style={{ background: colors[1] }}>
        {data.image && (
          <img src={data.image} alt={data.name} className="card-image" />
        )}
      </div>
      <div className="modern-right" style={{ background: colors[0] }}>
        <h2 style={{ color: colors[2] }}>{data.name}</h2>
        <p className="title" style={{ color: colors[1] }}>
          {data.title}
        </p>
        {data.company && <p className="company">{data.company}</p>}
        <div className="contact-info" style={{ color: colors[3] }}>
          {data.email && <p>{data.email}</p>}
          {data.phone && <p>{data.phone}</p>}
          {data.website && <p>{data.website}</p>}
        </div>
      </div>
    </div>
  )
}

export const ElegantTemplate = ({ data, colors, isBack }: TemplateProps) => {
  if (isBack && data.includeBack && data.backText) {
    return (
      <div
        className="card-template elegant-back"
        style={{ background: colors[0], borderTop: `4px solid ${colors[1]}` }}
      >
        <div className="back-content" style={{ color: colors[2] }}>
          {data.backText}
        </div>
      </div>
    )
  }

  return (
    <div
      className="card-template elegant"
      style={{ background: colors[0], borderTop: `4px solid ${colors[1]}` }}
    >
      {data.image && (
        <img src={data.image} alt={data.name} className="card-image-small" />
      )}
      <div className="card-content">
        <h2 style={{ color: colors[2] }}>{data.name}</h2>
        <p className="title" style={{ color: colors[1] }}>
          {data.title}
        </p>
        {data.company && (
          <p className="company" style={{ color: colors[3] }}>
            {data.company}
          </p>
        )}
        <div className="divider" style={{ background: colors[1] }}></div>
        <div className="contact-info">
          {data.email && <p>{data.email}</p>}
          {data.phone && <p>{data.phone}</p>}
          {data.website && <p>{data.website}</p>}
        </div>
      </div>
    </div>
  )
}

export const BoldTemplate = ({ data, colors, isBack }: TemplateProps) => {
  if (isBack && data.includeBack && data.backText) {
    return (
      <div
        className="card-template bold-back"
        style={{ background: colors[1] }}
      >
        <div className="back-content" style={{ color: 'white' }}>
          {data.backText}
        </div>
      </div>
    )
  }

  return (
    <div className="card-template bold" style={{ background: colors[1] }}>
      <div className="bold-content">
        {data.image && (
          <img src={data.image} alt={data.name} className="card-image-circle" />
        )}
        <h2 style={{ color: 'white' }}>{data.name}</h2>
        <p className="title" style={{ color: colors[0] }}>
          {data.title}
        </p>
        {data.company && (
          <p className="company" style={{ color: colors[3] }}>
            {data.company}
          </p>
        )}
        <div className="contact-info" style={{ color: 'white' }}>
          {data.email && <p>{data.email}</p>}
          {data.phone && <p>{data.phone}</p>}
          {data.website && <p>{data.website}</p>}
        </div>
      </div>
    </div>
  )
}

export const CreativeTemplate = ({ data, colors, isBack }: TemplateProps) => {
  if (isBack && data.includeBack && data.backText) {
    return (
      <div
        className="card-template creative-back"
        style={{
          background: `linear-gradient(135deg, ${colors[1]} 0%, ${colors[2]} 100%)`,
        }}
      >
        <div className="back-content" style={{ color: 'white' }}>
          {data.backText}
        </div>
      </div>
    )
  }

  return (
    <div
      className="card-template creative"
      style={{
        background: `linear-gradient(135deg, ${colors[1]} 0%, ${colors[2]} 100%)`,
      }}
    >
      <div className="creative-content">
        {data.image && (
          <img
            src={data.image}
            alt={data.name}
            className="card-image-rounded"
          />
        )}
        <h2 style={{ color: 'white' }}>{data.name}</h2>
        <p className="title" style={{ color: colors[0] }}>
          {data.title}
        </p>
        {data.company && (
          <p className="company" style={{ color: colors[3] }}>
            {data.company}
          </p>
        )}
        <div className="contact-info" style={{ color: 'white' }}>
          {data.email && <p>{data.email}</p>}
          {data.phone && <p>{data.phone}</p>}
          {data.website && <p>{data.website}</p>}
        </div>
      </div>
    </div>
  )
}

export const ProfessionalTemplate = ({
  data,
  colors,
  isBack,
}: TemplateProps) => {
  if (isBack && data.includeBack && data.backText) {
    return (
      <div
        className="card-template professional-back"
        style={{ background: colors[0] }}
      >
        <div className="back-content" style={{ color: colors[2] }}>
          {data.backText}
        </div>
      </div>
    )
  }

  return (
    <div
      className="card-template professional"
      style={{ background: colors[0] }}
    >
      <div className="professional-sidebar" style={{ background: colors[1] }}>
        {data.image && (
          <img src={data.image} alt={data.name} className="card-image" />
        )}
      </div>
      <div className="professional-main">
        <h2 style={{ color: colors[2] }}>{data.name}</h2>
        <p className="title" style={{ color: colors[1] }}>
          {data.title}
        </p>
        {data.company && (
          <p className="company" style={{ color: colors[3] }}>
            {data.company}
          </p>
        )}
        <div className="contact-info" style={{ color: colors[2] }}>
          {data.email && <p>{data.email}</p>}
          {data.phone && <p>{data.phone}</p>}
          {data.website && <p>{data.website}</p>}
        </div>
      </div>
    </div>
  )
}

export const SimpleTemplate = ({ data, colors, isBack }: TemplateProps) => {
  if (isBack && data.includeBack && data.backText) {
    return (
      <div
        className="card-template simple-back"
        style={{ background: colors[0] }}
      >
        <div className="back-content" style={{ color: colors[1] }}>
          {data.backText}
        </div>
      </div>
    )
  }

  return (
    <div className="card-template simple" style={{ background: colors[0] }}>
      {data.image && (
        <img src={data.image} alt={data.name} className="card-image-small" />
      )}
      <h2 style={{ color: colors[1] }}>{data.name}</h2>
      <p className="title" style={{ color: colors[2] }}>
        {data.title}
      </p>
      {data.company && <p className="company">{data.company}</p>}
      <div className="contact-info">
        {data.email && <p>{data.email}</p>}
        {data.phone && <p>{data.phone}</p>}
        {data.website && <p>{data.website}</p>}
      </div>
    </div>
  )
}

export const templateComponents: Record<TemplateId, React.FC<TemplateProps>> = {
  minimal: MinimalTemplate,
  classic: ClassicTemplate,
  modern: ModernTemplate,
  elegant: ElegantTemplate,
  bold: BoldTemplate,
  creative: CreativeTemplate,
  professional: ProfessionalTemplate,
  simple: SimpleTemplate,
}

export const templateNames: Record<TemplateId, string> = {
  minimal: 'Minimal',
  classic: 'Classic',
  modern: 'Modern',
  elegant: 'Elegant',
  bold: 'Bold',
  creative: 'Creative',
  professional: 'Professional',
  simple: 'Simple',
}
