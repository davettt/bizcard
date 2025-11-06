import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { EmailSignatureData, ColorPalette, EmailTemplateId } from '../types'
import {
  emailTemplateComponents,
  emailTemplateNames,
} from '../templates/emailTemplateConfig'
import { exportEmailSignatureHTML } from '../utils/exportHTML'
import Input from '../components/Input'
import ColorPicker from '../components/ColorPicker'
import Button from '../components/Button'
import './EmailSignature.css'

const EmailSignature = () => {
  const navigate = useNavigate()
  const signatureRef = useRef<HTMLDivElement>(null)

  const [signatureData, setSignatureData] = useState<EmailSignatureData>({
    name: '',
    title: '',
    company: '',
    email: '',
    phone: '',
    website: '',
    imageUrl: '',
    linkedin: '',
    twitter: '',
    instagram: '',
  })

  const [selectedTemplate, setSelectedTemplate] =
    useState<EmailTemplateId>('simple')
  const [selectedPalette, setSelectedPalette] = useState<ColorPalette>()

  const handleInputChange = (
    field: keyof EmailSignatureData,
    value: string
  ) => {
    setSignatureData(prev => ({ ...prev, [field]: value }))
  }

  const handleCopyToClipboard = () => {
    if (!signatureRef.current) return

    const range = document.createRange()
    range.selectNode(signatureRef.current)
    window.getSelection()?.removeAllRanges()
    window.getSelection()?.addRange(range)

    try {
      document.execCommand('copy')
      alert('Signature copied! Paste it into your email client settings.')
    } catch (_err) {
      alert('Failed to copy. Please try the download option instead.')
    }

    window.getSelection()?.removeAllRanges()
  }

  const handleExport = () => {
    if (!signatureRef.current || !selectedPalette) {
      alert('Please complete all required fields and select a color palette')
      return
    }

    const htmlContent = signatureRef.current.innerHTML
    exportEmailSignatureHTML(
      htmlContent,
      `email-signature-${signatureData.name.replace(/\s+/g, '-').toLowerCase()}.html`
    )
  }

  const TemplateComponent = emailTemplateComponents[selectedTemplate]
  const colors = selectedPalette?.colors || [
    '#000000',
    '#333333',
    '#666666',
    '#999999',
  ]

  return (
    <div className="email-signature-page">
      <div className="page-header">
        <div className="container">
          <button onClick={() => navigate('/')} className="back-btn">
            ← Back to Home
          </button>
          <h1>Create Email Signature</h1>
        </div>
      </div>

      <div className="container">
        <div className="content-grid">
          {/* Form Section */}
          <div className="form-section">
            <div className="form-card">
              <h2>Signature Information</h2>
              <Input
                label="Full Name"
                value={signatureData.name}
                onChange={val => handleInputChange('name', val)}
                placeholder="John Doe"
                required
              />
              <Input
                label="Job Title"
                value={signatureData.title}
                onChange={val => handleInputChange('title', val)}
                placeholder="Senior Developer"
                required
              />
              <Input
                label="Company"
                value={signatureData.company}
                onChange={val => handleInputChange('company', val)}
                placeholder="Tech Corp"
                required
              />
              <Input
                label="Email"
                type="email"
                value={signatureData.email}
                onChange={val => handleInputChange('email', val)}
                placeholder="john@example.com"
                required
              />
              <Input
                label="Phone"
                type="tel"
                value={signatureData.phone || ''}
                onChange={val => handleInputChange('phone', val)}
                placeholder="+1 234 567 8900"
              />
              <Input
                label="Website"
                value={signatureData.website || ''}
                onChange={val => handleInputChange('website', val)}
                placeholder="www.example.com"
              />
              <Input
                label="Image URL"
                value={signatureData.imageUrl || ''}
                onChange={val => handleInputChange('imageUrl', val)}
                placeholder="https://example.com/photo.jpg"
              />
              <Input
                label="LinkedIn"
                value={signatureData.linkedin || ''}
                onChange={val => handleInputChange('linkedin', val)}
                placeholder="https://linkedin.com/in/username"
              />
              <Input
                label="Twitter"
                value={signatureData.twitter || ''}
                onChange={val => handleInputChange('twitter', val)}
                placeholder="https://twitter.com/username"
              />
              <Input
                label="Instagram"
                value={signatureData.instagram || ''}
                onChange={val => handleInputChange('instagram', val)}
                placeholder="https://instagram.com/username"
              />
            </div>

            <div className="form-card">
              <h2>Template</h2>
              <div className="template-grid">
                {(Object.keys(emailTemplateNames) as EmailTemplateId[]).map(
                  id => (
                    <button
                      key={id}
                      className={`template-option ${selectedTemplate === id ? 'selected' : ''}`}
                      onClick={() => setSelectedTemplate(id)}
                    >
                      {emailTemplateNames[id]}
                    </button>
                  )
                )}
              </div>
            </div>

            <ColorPicker
              onSelectPalette={setSelectedPalette}
              selectedPalette={selectedPalette}
            />
          </div>

          {/* Preview Section */}
          <div className="preview-section">
            <h2>Preview</h2>
            <div className="preview-container">
              <div ref={signatureRef} className="signature-preview">
                <TemplateComponent data={signatureData} colors={colors} />
              </div>
            </div>

            <div className="info-box">
              <p>
                💡 <strong>How to use:</strong> Copy the signature and paste it
                into your email client's signature settings, or download the
                HTML file.
              </p>
            </div>

            <div className="button-group">
              <Button
                onClick={handleCopyToClipboard}
                disabled={
                  !signatureData.name ||
                  !signatureData.title ||
                  !signatureData.company ||
                  !selectedPalette
                }
                variant="outline"
                fullWidth
              >
                Copy to Clipboard
              </Button>
              <Button
                onClick={handleExport}
                disabled={
                  !signatureData.name ||
                  !signatureData.title ||
                  !signatureData.company ||
                  !selectedPalette
                }
                fullWidth
              >
                Download HTML
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EmailSignature
