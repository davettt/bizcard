import { EmailSignatureData } from '../types'

/** Only allow http/https protocols in URLs to prevent javascript: XSS */
const safeHref = (url: string): string => {
  const trimmed = url.trim()
  if (/^https?:\/\//i.test(trimmed)) return trimmed
  if (!/^[a-z]+:/i.test(trimmed)) return trimmed
  return ''
}

interface EmailTemplateProps {
  data: EmailSignatureData
  colors: string[]
}

export const SimpleEmailTemplate = ({ data, colors }: EmailTemplateProps) => {
  return (
    <table
      cellPadding="0"
      cellSpacing="0"
      style={{
        fontFamily: 'Arial, sans-serif',
        fontSize: '14px',
        color: colors[2],
      }}
    >
      <tr>
        <td>
          {data.imageUrl && (
            <img
              src={data.imageUrl}
              alt={data.name}
              style={{
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                marginRight: '15px',
              }}
            />
          )}
        </td>
        <td>
          <div
            style={{
              fontWeight: 'bold',
              fontSize: '16px',
              color: colors[1],
              marginBottom: '8px',
            }}
          >
            {data.name}
          </div>
          <div style={{ color: colors[2], marginBottom: '6px' }}>
            {data.title}
          </div>
          <div style={{ color: colors[3], marginBottom: '12px' }}>
            {data.company}
          </div>
          <div style={{ fontSize: '12px', lineHeight: '1.6' }}>
            {data.email && (
              <div style={{ marginBottom: '4px' }}>
                <a
                  href={`mailto:${data.email}`}
                  style={{ color: colors[1], textDecoration: 'none' }}
                >
                  {data.email}
                </a>
              </div>
            )}
            {data.phone && (
              <div style={{ marginBottom: '4px' }}>{data.phone}</div>
            )}
            {data.website && (
              <div style={{ marginBottom: '4px' }}>
                <a
                  href={safeHref(data.website)}
                  style={{ color: colors[1], textDecoration: 'none' }}
                >
                  {data.website}
                </a>
              </div>
            )}
          </div>
          {(data.linkedin || data.twitter || data.instagram) && (
            <div style={{ marginTop: '12px', fontSize: '11px' }}>
              {data.linkedin && (
                <a
                  href={safeHref(data.linkedin)}
                  style={{
                    marginRight: '10px',
                    color: colors[1],
                    textDecoration: 'none',
                  }}
                >
                  LinkedIn
                </a>
              )}
              {data.twitter && (
                <a
                  href={safeHref(data.twitter)}
                  style={{
                    marginRight: '10px',
                    color: colors[1],
                    textDecoration: 'none',
                  }}
                >
                  Twitter
                </a>
              )}
              {data.instagram && (
                <a
                  href={safeHref(data.instagram)}
                  style={{ color: colors[1], textDecoration: 'none' }}
                >
                  Instagram
                </a>
              )}
            </div>
          )}
        </td>
      </tr>
    </table>
  )
}

export const ModernEmailTemplate = ({ data, colors }: EmailTemplateProps) => {
  return (
    <table
      cellPadding="0"
      cellSpacing="0"
      style={{
        fontFamily: 'Arial, sans-serif',
        fontSize: '14px',
        borderLeft: `4px solid ${colors[1]}`,
        paddingLeft: '15px',
      }}
    >
      <tr>
        <td>
          <div
            style={{
              fontWeight: 'bold',
              fontSize: '18px',
              color: colors[2],
              marginBottom: '8px',
            }}
          >
            {data.name}
          </div>
          <div
            style={{ color: colors[1], fontSize: '14px', marginBottom: '6px' }}
          >
            {data.title}
          </div>
          <div
            style={{ color: colors[3], fontSize: '13px', marginBottom: '16px' }}
          >
            {data.company}
          </div>
          {data.imageUrl && (
            <img
              src={data.imageUrl}
              alt={data.name}
              style={{
                width: '100%',
                maxWidth: '200px',
                height: 'auto',
                marginBottom: '16px',
                borderRadius: '8px',
              }}
            />
          )}
          <div
            style={{ fontSize: '13px', color: colors[2], lineHeight: '1.6' }}
          >
            {data.email && (
              <div style={{ marginBottom: '6px' }}>
                <a
                  href={`mailto:${data.email}`}
                  style={{ color: colors[1], textDecoration: 'none' }}
                >
                  {data.email}
                </a>
              </div>
            )}
            {data.phone && (
              <div style={{ marginBottom: '6px' }}>{data.phone}</div>
            )}
            {data.website && (
              <div style={{ marginBottom: '6px' }}>
                <a
                  href={safeHref(data.website)}
                  style={{ color: colors[1], textDecoration: 'none' }}
                >
                  {data.website}
                </a>
              </div>
            )}
          </div>
          {(data.linkedin || data.twitter || data.instagram) && (
            <div style={{ marginTop: '16px', display: 'flex', gap: '10px' }}>
              {data.linkedin && (
                <a
                  href={safeHref(data.linkedin)}
                  style={{
                    color: colors[1],
                    textDecoration: 'none',
                    fontSize: '12px',
                  }}
                >
                  in
                </a>
              )}
              {data.twitter && (
                <a
                  href={safeHref(data.twitter)}
                  style={{
                    color: colors[1],
                    textDecoration: 'none',
                    fontSize: '12px',
                  }}
                >
                  tw
                </a>
              )}
              {data.instagram && (
                <a
                  href={safeHref(data.instagram)}
                  style={{
                    color: colors[1],
                    textDecoration: 'none',
                    fontSize: '12px',
                  }}
                >
                  ig
                </a>
              )}
            </div>
          )}
        </td>
      </tr>
    </table>
  )
}

export const ProfessionalEmailTemplate = ({
  data,
  colors,
}: EmailTemplateProps) => {
  return (
    <table
      cellPadding="0"
      cellSpacing="0"
      style={{
        fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
        fontSize: '13px',
        color: colors[2],
        maxWidth: '500px',
        borderTop: `3px solid ${colors[1]}`,
        paddingTop: '16px',
      }}
    >
      <tr>
        <td
          style={{ verticalAlign: 'top', paddingRight: '20px', width: '90px' }}
        >
          {data.imageUrl && (
            <img
              src={data.imageUrl}
              alt={data.name}
              style={{
                width: '90px',
                height: '90px',
                borderRadius: '4px',
              }}
            />
          )}
        </td>
        <td
          style={{
            verticalAlign: 'top',
            borderLeft: `1px solid ${colors[3]}`,
            paddingLeft: '20px',
          }}
        >
          <div
            style={{
              fontWeight: 'bold',
              fontSize: '17px',
              color: colors[2],
              marginBottom: '4px',
              letterSpacing: '-0.3px',
            }}
          >
            {data.name}
          </div>
          <div
            style={{
              color: colors[1],
              fontSize: '13px',
              marginBottom: '2px',
              fontWeight: '500',
            }}
          >
            {data.title}
          </div>
          <div
            style={{
              color: colors[3],
              fontSize: '12px',
              marginBottom: '14px',
              fontWeight: '500',
            }}
          >
            {data.company}
          </div>
          <div
            style={{ fontSize: '12px', lineHeight: '1.7', color: colors[2] }}
          >
            {data.email && (
              <div style={{ marginBottom: '4px' }}>
                <span
                  style={{
                    color: colors[3],
                    fontWeight: '500',
                    display: 'inline-block',
                    width: '50px',
                  }}
                >
                  Email:
                </span>
                <a
                  href={`mailto:${data.email}`}
                  style={{ color: colors[1], textDecoration: 'none' }}
                >
                  {data.email}
                </a>
              </div>
            )}
            {data.phone && (
              <div style={{ marginBottom: '4px' }}>
                <span
                  style={{
                    color: colors[3],
                    fontWeight: '500',
                    display: 'inline-block',
                    width: '50px',
                  }}
                >
                  Phone:
                </span>
                <span>{data.phone}</span>
              </div>
            )}
            {data.website && (
              <div style={{ marginBottom: '4px' }}>
                <span
                  style={{
                    color: colors[3],
                    fontWeight: '500',
                    display: 'inline-block',
                    width: '50px',
                  }}
                >
                  Web:
                </span>
                <a
                  href={safeHref(data.website)}
                  style={{ color: colors[1], textDecoration: 'none' }}
                >
                  {data.website}
                </a>
              </div>
            )}
          </div>
          {(data.linkedin || data.twitter || data.instagram) && (
            <div
              style={{
                marginTop: '12px',
                fontSize: '10px',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
              }}
            >
              {data.linkedin && (
                <a
                  href={safeHref(data.linkedin)}
                  style={{
                    marginRight: '12px',
                    color: colors[1],
                    textDecoration: 'none',
                    fontWeight: '600',
                  }}
                >
                  LinkedIn
                </a>
              )}
              {data.twitter && (
                <a
                  href={safeHref(data.twitter)}
                  style={{
                    marginRight: '12px',
                    color: colors[1],
                    textDecoration: 'none',
                    fontWeight: '600',
                  }}
                >
                  Twitter
                </a>
              )}
              {data.instagram && (
                <a
                  href={safeHref(data.instagram)}
                  style={{
                    color: colors[1],
                    textDecoration: 'none',
                    fontWeight: '600',
                  }}
                >
                  Instagram
                </a>
              )}
            </div>
          )}
        </td>
      </tr>
    </table>
  )
}

export const CreativeEmailTemplate = ({ data, colors }: EmailTemplateProps) => {
  return (
    <table
      cellPadding="24"
      cellSpacing="0"
      style={{
        fontFamily: 'Arial, sans-serif',
        fontSize: '14px',
        backgroundColor: colors[0],
        background: `linear-gradient(135deg, ${colors[0]} 0%, ${colors[1]} 100%)`,
        color: 'white',
        borderRadius: '12px',
        maxWidth: '450px',
      }}
    >
      <tr>
        <td style={{ textAlign: 'center', padding: '24px' }}>
          {data.imageUrl && (
            <img
              src={data.imageUrl}
              alt={data.name}
              style={{
                width: '110px',
                height: '110px',
                borderRadius: '50%',
                marginBottom: '16px',
                border: '4px solid white',
              }}
            />
          )}
          <div
            style={{
              fontWeight: 'bold',
              fontSize: '22px',
              marginBottom: '8px',
            }}
          >
            {data.name}
          </div>
          <div style={{ fontSize: '16px', marginBottom: '6px', opacity: 0.95 }}>
            {data.title}
          </div>
          <div style={{ fontSize: '15px', marginBottom: '20px', opacity: 0.9 }}>
            {data.company}
          </div>
          <div
            style={{
              fontSize: '12px',
              lineHeight: '1.8',
              wordBreak: 'break-word',
              overflowWrap: 'break-word',
            }}
          >
            {data.email && (
              <div style={{ marginBottom: '6px' }}>
                <a
                  href={`mailto:${data.email}`}
                  style={{ color: 'white', textDecoration: 'none' }}
                >
                  {data.email}
                </a>
              </div>
            )}
            {data.phone && (
              <div style={{ marginBottom: '6px' }}>{data.phone}</div>
            )}
            {data.website && (
              <div style={{ marginBottom: '6px' }}>
                <a
                  href={safeHref(data.website)}
                  style={{ color: 'white', textDecoration: 'none' }}
                >
                  {data.website}
                </a>
              </div>
            )}
          </div>
          {(data.linkedin || data.twitter || data.instagram) && (
            <div style={{ marginTop: '20px', fontSize: '11px' }}>
              {data.linkedin && (
                <a
                  href={safeHref(data.linkedin)}
                  style={{
                    marginRight: '15px',
                    color: 'white',
                    textDecoration: 'none',
                  }}
                >
                  LinkedIn
                </a>
              )}
              {data.twitter && (
                <a
                  href={safeHref(data.twitter)}
                  style={{
                    marginRight: '15px',
                    color: 'white',
                    textDecoration: 'none',
                  }}
                >
                  Twitter
                </a>
              )}
              {data.instagram && (
                <a
                  href={safeHref(data.instagram)}
                  style={{ color: 'white', textDecoration: 'none' }}
                >
                  Instagram
                </a>
              )}
            </div>
          )}
        </td>
      </tr>
    </table>
  )
}
