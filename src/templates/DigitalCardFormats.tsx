import { CardData } from '../types'
import SocialLinks from '../components/SocialLinks'
import { getBestTextColor } from '../utils/contrastChecker'
import './DigitalCardFormats.css'

/** Ensure URL has a protocol, without double-prefixing */
const normalizeUrl = (url: string): string => {
  if (/^https?:\/\//i.test(url)) return url
  return `https://${url}`
}

interface FormatProps {
  data: CardData
  colors: string[]
}

// 1. PORTRAIT - Vertical business card (400x600px)
export const PortraitFormat = ({ data, colors }: FormatProps) => {
  return (
    <div
      className="digital-card portrait-format"
      style={{
        background: `linear-gradient(135deg, ${colors[0]} 0%, ${colors[3]} 100%)`,
      }}
    >
      {/* Header with image */}
      {data.image && (
        <div
          className="portrait-image-header"
          style={{
            background: `linear-gradient(135deg, ${colors[1]}dd 0%, ${colors[3]}dd 100%)`,
          }}
        >
          <img src={data.image} alt={data.name} className="portrait-image" />
        </div>
      )}

      {/* Content */}
      <div className="portrait-content">
        {data.logo && (
          <img src={data.logo} alt="Logo" className="portrait-logo" />
        )}

        <h1 style={{ color: colors[2] }}>{data.name}</h1>
        <p className="portrait-title" style={{ color: colors[1] }}>
          {data.title}
        </p>
        {data.company && (
          <p className="portrait-company" style={{ color: colors[2] }}>
            {data.company}
          </p>
        )}

        <div className="portrait-divider" style={{ background: colors[1] }} />

        <div className="portrait-contact" style={{ color: colors[2] }}>
          {data.email && (
            <a href={`mailto:${data.email}`} style={{ color: colors[2] }}>
              {data.email}
            </a>
          )}
          {data.phone && (
            <a href={`tel:${data.phone}`} style={{ color: colors[2] }}>
              {data.phone}
            </a>
          )}
          {data.website && (
            <a
              href={normalizeUrl(data.website)}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: colors[2] }}
            >
              {data.website}
            </a>
          )}
        </div>

        {(data.linkedin || data.twitter || data.instagram || data.github) && (
          <div className="portrait-social">
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

// 2. BANNER - Wide format for websites/emails (800x400px)
export const BannerFormat = ({ data, colors }: FormatProps) => {
  return (
    <div
      className="digital-card banner-format"
      style={{ background: colors[0] }}
    >
      {/* Left: Image */}
      {data.image && (
        <div className="banner-image-section" style={{ background: colors[3] }}>
          <img src={data.image} alt={data.name} className="banner-image" />
        </div>
      )}

      {/* Center: Content */}
      <div className="banner-content">
        {data.logo && (
          <img src={data.logo} alt="Logo" className="banner-logo" />
        )}

        <h1 style={{ color: colors[2] }}>{data.name}</h1>
        <p className="banner-title" style={{ color: colors[1] }}>
          {data.title}
        </p>
        {data.company && (
          <p className="banner-company" style={{ color: colors[2] }}>
            {data.company}
          </p>
        )}

        {(data.linkedin || data.twitter || data.instagram || data.github) && (
          <div className="banner-social">
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

      {/* Right: Contact */}
      <div
        className="banner-contact"
        style={{
          background: `linear-gradient(135deg, ${colors[1]}15 0%, ${colors[3]}15 100%)`,
          borderLeft: `2px solid ${colors[1]}`,
        }}
      >
        <div style={{ color: colors[2] }}>
          {data.email && (
            <a href={`mailto:${data.email}`} style={{ color: colors[2] }}>
              {data.email}
            </a>
          )}
          {data.phone && (
            <a href={`tel:${data.phone}`} style={{ color: colors[2] }}>
              {data.phone}
            </a>
          )}
          {data.website && (
            <a
              href={normalizeUrl(data.website)}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: colors[2] }}
            >
              {data.website}
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

// 3. SQUARE - Social media friendly (500x500px)
export const SquareFormat = ({ data, colors }: FormatProps) => {
  return (
    <div
      className="digital-card square-format"
      style={{
        background: `linear-gradient(135deg, ${colors[0]} 0%, ${colors[3]} 100%)`,
      }}
    >
      {/* Background image */}
      {data.image && (
        <div className="square-bg-image">
          <img src={data.image} alt="" />
          <div
            className="square-overlay"
            style={{
              background: `linear-gradient(135deg, ${colors[0]}ee 0%, ${colors[3]}dd 100%)`,
            }}
          />
        </div>
      )}

      {/* Content */}
      <div className="square-content">
        {data.logo && (
          <img src={data.logo} alt="Logo" className="square-logo" />
        )}

        <h1 style={{ color: colors[2] }}>{data.name}</h1>
        <p className="square-title" style={{ color: colors[1] }}>
          {data.title}
        </p>
        {data.company && (
          <p className="square-company" style={{ color: colors[2] }}>
            {data.company}
          </p>
        )}

        <div className="square-contact" style={{ color: colors[2] }}>
          {data.email && (
            <a href={`mailto:${data.email}`} style={{ color: colors[2] }}>
              {data.email}
            </a>
          )}
          {data.phone && (
            <a href={`tel:${data.phone}`} style={{ color: colors[2] }}>
              {data.phone}
            </a>
          )}
          {data.website && (
            <a
              href={normalizeUrl(data.website)}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: colors[2] }}
            >
              {data.website}
            </a>
          )}
        </div>

        {(data.linkedin || data.twitter || data.instagram || data.github) && (
          <div className="square-social">
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

// 4. MOBILE - Phone contact card style (375x667px)
export const MobileFormat = ({ data, colors }: FormatProps) => {
  return (
    <div
      className="digital-card mobile-format"
      style={{ background: colors[0] }}
    >
      {/* Header */}
      <div
        className="mobile-header"
        style={{
          background: `linear-gradient(135deg, ${colors[1]} 0%, ${colors[3]} 100%)`,
        }}
      >
        {data.image && (
          <img src={data.image} alt={data.name} className="mobile-avatar" />
        )}
      </div>

      {/* Content */}
      <div className="mobile-content">
        {data.logo && (
          <img src={data.logo} alt="Logo" className="mobile-logo" />
        )}

        <h1 style={{ color: colors[2] }}>{data.name}</h1>
        <p className="mobile-title" style={{ color: colors[1] }}>
          {data.title}
        </p>
        {data.company && (
          <p className="mobile-company" style={{ color: colors[2] }}>
            {data.company}
          </p>
        )}

        <div className="mobile-actions">
          {data.email && (
            <a
              href={`mailto:${data.email}`}
              className="mobile-action-btn"
              style={{
                background: colors[1],
                color: getBestTextColor(colors[1]),
              }}
            >
              Email
            </a>
          )}
          {data.phone && (
            <a
              href={`tel:${data.phone}`}
              className="mobile-action-btn"
              style={{
                background: colors[1],
                color: getBestTextColor(colors[1]),
              }}
            >
              Call
            </a>
          )}
        </div>

        <div className="mobile-info">
          {data.email && (
            <div className="mobile-info-row">
              <span style={{ color: colors[1] }}>Email</span>
              <a href={`mailto:${data.email}`} style={{ color: colors[2] }}>
                {data.email}
              </a>
            </div>
          )}
          {data.phone && (
            <div className="mobile-info-row">
              <span style={{ color: colors[1] }}>Phone</span>
              <a href={`tel:${data.phone}`} style={{ color: colors[2] }}>
                {data.phone}
              </a>
            </div>
          )}
          {data.website && (
            <div className="mobile-info-row">
              <span style={{ color: colors[1] }}>Website</span>
              <a
                href={normalizeUrl(data.website)}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: colors[2] }}
              >
                {data.website}
              </a>
            </div>
          )}
        </div>

        {(data.linkedin || data.twitter || data.instagram || data.github) && (
          <div className="mobile-social">
            <p style={{ color: colors[1], fontSize: '14px', fontWeight: 600 }}>
              Connect
            </p>
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
