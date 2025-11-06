import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { CardData, ColorPalette, TemplateId } from '../types'
import { templateComponents, templateNames } from '../templates/printCardConfig'
import { exportToHTML, imageToBase64 } from '../utils/exportHTML'
import Input from '../components/Input'
import ImageUpload from '../components/ImageUpload'
import ColorPicker from '../components/ColorPicker'
import Button from '../components/Button'
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

  const [selectedTemplate, setSelectedTemplate] =
    useState<TemplateId>('minimal')
  const [selectedPalette, setSelectedPalette] = useState<ColorPalette>()
  const [isExporting, setIsExporting] = useState(false)

  const handleInputChange = (field: keyof CardData, value: string) => {
    setCardData(prev => ({ ...prev, [field]: value }))
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

  const TemplateComponent = templateComponents[selectedTemplate]
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
              />
            </div>

            <div className="form-card">
              <h2>Template</h2>
              <div className="template-grid">
                {(Object.keys(templateNames) as TemplateId[]).map(id => (
                  <button
                    key={id}
                    className={`template-option ${selectedTemplate === id ? 'selected' : ''}`}
                    onClick={() => setSelectedTemplate(id)}
                  >
                    {templateNames[id]}
                  </button>
                ))}
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
              <div
                ref={cardRef}
                className="card-preview"
                style={{ aspectRatio: '3.5/2' }}
              >
                <TemplateComponent data={cardData} colors={colors} />
              </div>
            </div>

            <div className="info-box">
              <p>
                💡 <strong>Tip:</strong> The exported HTML file will be
                self-contained with all styles and images embedded.
              </p>
            </div>

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
            >
              {isExporting ? 'Generating HTML...' : 'Download HTML File'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DigitalCard
