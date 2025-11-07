import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { EmailSignatureData, ColorPalette, EmailTemplateId } from '../types'
import {
  emailTemplateComponents,
  emailTemplateNames,
} from '../templates/emailTemplateConfig'
import Input from '../components/Input'
import ColorPicker from '../components/ColorPicker'
import Button from '../components/Button'
import EmailSignatureModal from '../components/EmailSignatureModal'
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
  const [showSignatureModal, setShowSignatureModal] = useState(false)
  const [signatureHTML, setSignatureHTML] = useState('')

  const handleInputChange = (
    field: keyof EmailSignatureData,
    value: string
  ) => {
    setSignatureData(prev => ({ ...prev, [field]: value }))
  }

  const fillTestData = () => {
    setSignatureData({
      name: 'Sarah Anderson',
      title: 'Senior Product Designer',
      company: 'TechVision Inc.',
      email: 'sarah.anderson@techvision.com',
      phone: '+1 (555) 123-4567',
      website: 'www.sarahdesigns.io',
      imageUrl:
        'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="200"%3E%3Cdefs%3E%3ClinearGradient id="grad" x1="0%25" y1="0%25" x2="100%25" y2="100%25"%3E%3Cstop offset="0%25" style="stop-color:%23FF6B6B;stop-opacity:1" /%3E%3Cstop offset="100%25" style="stop-color:%234ECDC4;stop-opacity:1" /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width="200" height="200" fill="url(%23grad)"/%3E%3Ccircle cx="100" cy="100" r="60" fill="white" opacity="0.3"/%3E%3C/svg%3E',
      linkedin: 'linkedin.com/in/sarahanderson',
      twitter: 'twitter.com/sarahdesigns',
      instagram: 'instagram.com/sarah.creates',
    })
  }

  const handleShowSignature = () => {
    if (!signatureRef.current || !selectedPalette) {
      alert('Please complete all required fields and select a color palette')
      return
    }

    const htmlContent = signatureRef.current.innerHTML
    setSignatureHTML(htmlContent)
    setShowSignatureModal(true)
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
            <div
              style={{
                marginBottom: '20px',
                padding: '16px',
                background: '#f0fdf4',
                borderRadius: '8px',
                border: '1px solid #bbf7d0',
              }}
            >
              <Button onClick={fillTestData} variant="secondary" fullWidth>
                🧪 Fill Test Data
              </Button>
              <p
                style={{
                  margin: '8px 0 0 0',
                  fontSize: '13px',
                  color: '#15803d',
                }}
              >
                Quickly populate all fields with sample data to preview the
                design
              </p>
            </div>
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
                💡 <strong>How to use:</strong> Click the button below to get
                the HTML code for your email signature. You can then copy it to
                paste into your email client's signature settings, or download
                it as an HTML file.
              </p>
            </div>

            <div className="button-group">
              <Button
                onClick={handleShowSignature}
                disabled={
                  !signatureData.name ||
                  !signatureData.title ||
                  !signatureData.company ||
                  !selectedPalette
                }
                fullWidth
              >
                Get Signature HTML
              </Button>
            </div>
          </div>
        </div>
      </div>

      <EmailSignatureModal
        isOpen={showSignatureModal}
        onClose={() => setShowSignatureModal(false)}
        signatureHTML={signatureHTML}
      />
    </div>
  )
}

export default EmailSignature
