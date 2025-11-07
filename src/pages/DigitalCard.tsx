import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { CardData, ColorPalette, DigitalFormatId } from '../types'
import {
  digitalFormatComponents,
  digitalFormatNames,
  digitalFormatDescriptions,
} from '../templates/digitalCardConfig'
import {
  exportToHTML,
  imageToBase64,
  generateEmbedCode,
} from '../utils/exportHTML'
import Input from '../components/Input'
import ImageUpload from '../components/ImageUpload'
import ColorPicker from '../components/ColorPicker'
import Button from '../components/Button'
import EmbedCodeModal from '../components/EmbedCodeModal'
import './DigitalCard.css'

const DigitalCard = () => {
  const navigate = useNavigate()
  const cardRef = useRef<HTMLDivElement>(null)

  const [cardData, setCardData] = useState<CardData>({
    name: '',
    title: '',
    company: '',
    email: '',
    phone: '',
    website: '',
    linkedin: '',
    twitter: '',
    instagram: '',
  })

  const [selectedFormat, setSelectedFormat] =
    useState<DigitalFormatId>('portrait')
  const [selectedPalette, setSelectedPalette] = useState<ColorPalette>()
  const [isExporting, setIsExporting] = useState(false)
  const [showEmbedModal, setShowEmbedModal] = useState(false)
  const [embedCode, setEmbedCode] = useState('')

  const handleInputChange = (field: keyof CardData, value: string) => {
    setCardData(prev => ({ ...prev, [field]: value }))
  }

  const fillTestData = () => {
    // Sample image (placeholder pattern)
    const testImage =
      'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="200"%3E%3Cdefs%3E%3ClinearGradient id="grad" x1="0%25" y1="0%25" x2="100%25" y2="100%25"%3E%3Cstop offset="0%25" style="stop-color:%23FF6B6B;stop-opacity:1" /%3E%3Cstop offset="100%25" style="stop-color:%234ECDC4;stop-opacity:1" /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width="200" height="200" fill="url(%23grad)"/%3E%3Ccircle cx="100" cy="100" r="60" fill="white" opacity="0.3"/%3E%3C/svg%3E'

    setCardData({
      name: 'Sarah Anderson',
      title: 'Senior Product Designer',
      company: 'TechVision Inc.',
      email: 'sarah.anderson@techvision.com',
      phone: '+1 (555) 123-4567',
      website: 'www.sarahdesigns.io',
      linkedin: 'linkedin.com/in/sarahanderson',
      twitter: 'twitter.com/sarahdesigns',
      instagram: 'instagram.com/sarah.creates',
      github: 'github.com/sarahanderson',
      image: testImage,
    })
  }

  const handleExport = async () => {
    if (!cardRef.current || !selectedPalette) {
      alert('Please complete all required fields and select a color palette')
      return
    }

    setIsExporting(true)
    try {
      // Convert image to base64 if exists
      if (cardData.image) {
        const base64Image = await imageToBase64(cardData.image)
        cardData.image = base64Image
      }

      exportToHTML(
        cardRef.current,
        `digital-card-${cardData.name.replace(/\s+/g, '-').toLowerCase()}.html`,
        `${cardData.name} - Digital Business Card`
      )
    } catch (_error) {
      alert('Failed to export HTML. Please try again.')
    } finally {
      setIsExporting(false)
    }
  }

  const handleShowEmbed = async () => {
    if (!cardRef.current || !selectedPalette) {
      alert('Please complete all required fields and select a color palette')
      return
    }

    try {
      // Convert image to base64 if exists
      if (cardData.image) {
        const base64Image = await imageToBase64(cardData.image)
        cardData.image = base64Image
      }

      const code = generateEmbedCode(cardRef.current)
      setEmbedCode(code)
      setShowEmbedModal(true)
    } catch (_error) {
      alert('Failed to generate embed code. Please try again.')
    }
  }

  const FormatComponent = digitalFormatComponents[selectedFormat]
  const colors = selectedPalette?.colors || [
    '#000000',
    '#333333',
    '#666666',
    '#999999',
  ]

  return (
    <div className="digital-card-page">
      <div className="page-header">
        <div className="container">
          <button onClick={() => navigate('/')} className="back-btn">
            ← Back to Home
          </button>
          <h1>Create Digital Business Card</h1>
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
              <h2>Card Information</h2>
              <Input
                label="Full Name"
                value={cardData.name}
                onChange={val => handleInputChange('name', val)}
                placeholder="John Doe"
                required
              />
              <Input
                label="Job Title"
                value={cardData.title}
                onChange={val => handleInputChange('title', val)}
                placeholder="Senior Developer"
                required
              />
              <Input
                label="Company"
                value={cardData.company || ''}
                onChange={val => handleInputChange('company', val)}
                placeholder="Tech Corp"
              />
              <Input
                label="Email"
                type="email"
                value={cardData.email || ''}
                onChange={val => handleInputChange('email', val)}
                placeholder="john@example.com"
              />
              <Input
                label="Phone"
                type="tel"
                value={cardData.phone || ''}
                onChange={val => handleInputChange('phone', val)}
                placeholder="+1 234 567 8900"
              />
              <Input
                label="Website"
                value={cardData.website || ''}
                onChange={val => handleInputChange('website', val)}
                placeholder="www.example.com"
              />
              <Input
                label="LinkedIn"
                value={cardData.linkedin || ''}
                onChange={val => handleInputChange('linkedin', val)}
                placeholder="https://linkedin.com/in/username"
              />
              <Input
                label="Twitter"
                value={cardData.twitter || ''}
                onChange={val => handleInputChange('twitter', val)}
                placeholder="https://twitter.com/username"
              />
              <Input
                label="Instagram"
                value={cardData.instagram || ''}
                onChange={val => handleInputChange('instagram', val)}
                placeholder="https://instagram.com/username"
              />

              <ImageUpload
                label="Profile Image"
                onImageSelect={img => handleInputChange('image', img)}
                currentImage={cardData.image}
                helpText="Formats: JPEG, PNG, GIF, WebP, or SVG. Recommended: 400×400px to 800×800px square. Portrait format works well for vertical layouts. Max 3MB."
                maxSizeMB={3}
              />
            </div>

            <div className="form-card">
              <h2>Format</h2>
              <div className="format-grid">
                {(Object.keys(digitalFormatNames) as DigitalFormatId[]).map(
                  id => (
                    <button
                      key={id}
                      className={`format-option ${selectedFormat === id ? 'selected' : ''}`}
                      onClick={() => setSelectedFormat(id)}
                    >
                      <div className="format-name">
                        {digitalFormatNames[id]}
                      </div>
                      <div className="format-desc">
                        {digitalFormatDescriptions[id]}
                      </div>
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
              <div ref={cardRef} className="card-preview">
                <FormatComponent data={cardData} colors={colors} />
              </div>
            </div>

            <div className="info-box">
              <p>
                💡 <strong>Tip:</strong> All exports are self-contained with
                styles and images embedded. Use <strong>Copy Embed Code</strong>{' '}
                to paste into your website, or{' '}
                <strong>Download Standalone</strong> for a ready-to-host HTML
                file.
              </p>
            </div>

            <div className="button-group">
              <Button
                onClick={handleShowEmbed}
                disabled={!cardData.name || !cardData.title || !selectedPalette}
                fullWidth
                size="large"
              >
                📋 Get Embed Code
              </Button>
              <Button
                onClick={handleExport}
                disabled={
                  !cardData.name ||
                  !cardData.title ||
                  !selectedPalette ||
                  isExporting
                }
                fullWidth
                size="large"
                variant="secondary"
              >
                {isExporting ? 'Generating...' : '⬇ Download Standalone'}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <EmbedCodeModal
        isOpen={showEmbedModal}
        onClose={() => setShowEmbedModal(false)}
        embedCode={embedCode}
      />
    </div>
  )
}

export default DigitalCard
