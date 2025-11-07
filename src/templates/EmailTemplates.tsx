import { EmailSignatureData } from '../types'

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
            {data.phone && <div style={{ marginBottom: '4px' }}>{data.phone}</div>}
            {data.website && (
              <div style={{ marginBottom: '4px' }}>
                <a
                  href={data.website}
                  style={{ color: colors[1], textDecoration: 'none' }}
                >
                  {data.website}
                </a>
              </div>
            )}
          </div>
          {(data.linkedin || data.twitter || data.instagram) && (
            <div style={{ marginTop: '12px' }}>
              {data.linkedin && (
                <a
                  href={data.linkedin}
                  style={{ marginRight: '10px', color: colors[1], textDecoration: 'none' }}
                >
                  LinkedIn
                </a>
              )}
              {data.twitter && (
                <a
                  href={data.twitter}
                  style={{ marginRight: '10px', color: colors[1], textDecoration: 'none' }}
                >
                  Twitter
                </a>
              )}
              {data.instagram && (
                <a href={data.instagram} style={{ color: colors[1], textDecoration: 'none' }}>
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
          <div style={{ fontSize: '13px', color: colors[2], lineHeight: '1.6' }}>
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
                  href={data.website}
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
                  href={data.linkedin}
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
                  href={data.twitter}
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
                  href={data.instagram}
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
        fontFamily: 'Georgia, serif',
        fontSize: '14px',
        color: colors[2],
        maxWidth: '500px',
      }}
    >
      <tr>
        <td
          style={{
            paddingBottom: '16px',
            borderBottom: `2px solid ${colors[1]}`,
          }}
        >
          <div
            style={{
              fontWeight: 'bold',
              fontSize: '20px',
              color: colors[2],
              marginBottom: '6px',
            }}
          >
            {data.name}
          </div>
          <div
            style={{ fontStyle: 'italic', color: colors[1], fontSize: '14px' }}
          >
            {data.title}
          </div>
        </td>
      </tr>
      <tr>
        <td style={{ paddingTop: '16px' }}>
          <table cellPadding="0" cellSpacing="0">
            <tr>
              <td style={{ verticalAlign: 'top', paddingRight: '20px' }}>
                {data.imageUrl && (
                  <img
                    src={data.imageUrl}
                    alt={data.name}
                    style={{
                      width: '100px',
                      height: '100px',
                      borderRadius: '8px',
                    }}
                  />
                )}
              </td>
              <td style={{ verticalAlign: 'top' }}>
                <div
                  style={{
                    fontWeight: 'bold',
                    color: colors[3],
                    marginBottom: '12px',
                    fontSize: '15px',
                  }}
                >
                  {data.company}
                </div>
                <div style={{ fontSize: '13px', lineHeight: '1.6' }}>
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
                  {data.phone && <div style={{ marginBottom: '6px' }}>{data.phone}</div>}
                  {data.website && (
                    <div style={{ marginBottom: '6px' }}>
                      <a
                        href={data.website}
                        style={{ color: colors[1], textDecoration: 'none' }}
                      >
                        {data.website}
                      </a>
                    </div>
                  )}
                </div>
                {(data.linkedin || data.twitter || data.instagram) && (
                  <div style={{ marginTop: '14px', fontSize: '12px' }}>
                    {data.linkedin && (
                      <a
                        href={data.linkedin}
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
                        href={data.twitter}
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
                        href={data.instagram}
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
        </td>
      </tr>
    </table>
  )
}

export const CreativeEmailTemplate = ({ data, colors }: EmailTemplateProps) => {
  return (
    <table
      cellPadding="15"
      cellSpacing="0"
      style={{
        fontFamily: 'Arial, sans-serif',
        fontSize: '14px',
        background: `linear-gradient(135deg, ${colors[0]} 0%, ${colors[1]} 100%)`,
        color: 'white',
        borderRadius: '12px',
        maxWidth: '500px',
      }}
    >
      <tr>
        <td style={{ textAlign: 'center' }}>
          {data.imageUrl && (
            <img
              src={data.imageUrl}
              alt={data.name}
              style={{
                width: '120px',
                height: '120px',
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
          <div style={{ fontSize: '13px', lineHeight: '1.8' }}>
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
            {data.phone && <div style={{ marginBottom: '6px' }}>{data.phone}</div>}
            {data.website && (
              <div style={{ marginBottom: '6px' }}>
                <a
                  href={data.website}
                  style={{ color: 'white', textDecoration: 'none' }}
                >
                  {data.website}
                </a>
              </div>
            )}
          </div>
          {(data.linkedin || data.twitter || data.instagram) && (
            <div style={{ marginTop: '20px', fontSize: '13px' }}>
              {data.linkedin && (
                <a
                  href={data.linkedin}
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
                  href={data.twitter}
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
                  href={data.instagram}
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
