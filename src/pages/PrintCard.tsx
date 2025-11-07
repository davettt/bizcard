import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { CardData, ColorPalette, PrintSize, TemplateId } from '../types'
import { templateComponents, templateNames } from '../templates/printCardConfig'
import { printSizes } from '../utils/printSizes'
import { exportToPDF } from '../utils/exportPDF'
import Input from '../components/Input'
import ImageUpload from '../components/ImageUpload'
import ColorPicker from '../components/ColorPicker'
import Button from '../components/Button'
import FontSizeControl from '../components/FontSizeControl'
import Footer from '../components/Footer'
import './PrintCard.css'

const PrintCard = () => {
  const navigate = useNavigate()
  const frontRef = useRef<HTMLDivElement>(null)
  const backRef = useRef<HTMLDivElement>(null)

  const [cardData, setCardData] = useState<CardData>({
    name: '',
    title: '',
    company: '',
    email: '',
    phone: '',
    website: '',
    address: '',
    linkedin: '',
    twitter: '',
    instagram: '',
    github: '',
    includeBack: false,
    backText: '',
    fontScale: 1.0,
  })

  const [selectedTemplate, setSelectedTemplate] =
    useState<TemplateId>('minimal')
  const [selectedPalette, setSelectedPalette] = useState<ColorPalette>()
  const [selectedSize, setSelectedSize] = useState<PrintSize>('3.5x2')
  const [isExporting, setIsExporting] = useState(false)

  const handleInputChange = (
    field: keyof CardData,
    value: string | boolean | number
  ) => {
    setCardData(prev => ({ ...prev, [field]: value }))
  }

  const fillTestData = () => {
    // Sample logo (simple colored square as data URI)
    const testLogo =
      'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100"%3E%3Crect width="100" height="100" fill="%234A90E2"/%3E%3Ctext x="50" y="55" font-family="Arial" font-size="40" fill="white" text-anchor="middle"%3ELG%3C/text%3E%3C/svg%3E'

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
      address: '123 Innovation Drive, San Francisco, CA 94103',
      linkedin: 'linkedin.com/in/sarahanderson',
      twitter: 'twitter.com/sarahdesigns',
      instagram: 'instagram.com/sarah.creates',
      github: 'github.com/sarahanderson',
      logo: testLogo,
      image: testImage,
      includeBack: true,
      backText:
        'Passionate about creating intuitive user experiences that solve real problems. Available for freelance projects and consulting.',
      fontScale: 1.0,
      cornerStyle: 'rounded',
    })
  }

  const handleExport = async () => {
    if (!frontRef.current || !selectedPalette) {
      alert('Please complete all required fields and select a color palette')
      return
    }

    setIsExporting(true)
    try {
      const backElement =
        cardData.includeBack && backRef.current ? backRef.current : null
      await exportToPDF(
        frontRef.current,
        backElement,
        selectedSize,
        `business-card-${cardData.name.replace(/\s+/g, '-').toLowerCase()}.pdf`
      )
    } catch (_error) {
      alert('Failed to export PDF. Please try again.')
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
    <div className="print-card-page">
      <div className="page-header">
        <div className="container">
          <button onClick={() => navigate('/')} className="back-btn">
            ← Back to Home
          </button>
          <h1>Create Print Business Card</h1>
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
                background: '#f0f9ff',
                borderRadius: '8px',
                border: '1px solid #bae6fd',
              }}
            >
              <Button onClick={fillTestData} variant="secondary" fullWidth>
                🧪 Fill Test Data
              </Button>
              <p
                style={{
                  margin: '8px 0 0 0',
                  fontSize: '13px',
                  color: '#0369a1',
                  textAlign: 'center',
                }}
              >
                Quickly populate all fields with sample data for testing
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
              <Input
                label="GitHub"
                value={cardData.github || ''}
                onChange={val => handleInputChange('github', val)}
                placeholder="https://github.com/username"
              />

              <ImageUpload
                label="Profile Image"
                onImageSelect={img => handleInputChange('image', img)}
                currentImage={cardData.image}
                helpText="Formats: JPEG, PNG, GIF, WebP, or SVG. Recommended: 500×500px square, min 300×300px. Max 5MB. Use high-quality images for best print results."
                maxSizeMB={5}
              />

              <ImageUpload
                label="Company Logo (Optional)"
                onImageSelect={img => handleInputChange('logo', img)}
                currentImage={cardData.logo}
                helpText="Formats: JPEG, PNG, GIF, WebP, or SVG. Recommended: Square format (e.g., 300×300px). PNG with transparent background works best. Max 2MB."
                maxSizeMB={2}
              />

              <div className="checkbox-group">
                <label>
                  <input
                    type="checkbox"
                    checked={cardData.includeBack}
                    onChange={e =>
                      handleInputChange('includeBack', e.target.checked)
                    }
                  />
                  Include back side
                </label>
              </div>

              {cardData.includeBack && (
                <div className="input-group">
                  <label className="input-label">Back Side Text</label>
                  <textarea
                    value={cardData.backText || ''}
                    onChange={e =>
                      handleInputChange('backText', e.target.value)
                    }
                    placeholder="Enter text for the back of the card..."
                    className="input textarea"
                    rows={4}
                  />
                </div>
              )}
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

            <div className="form-card">
              <h2>Print Size</h2>
              <div className="size-grid">
                {printSizes.map(size => (
                  <button
                    key={size.value}
                    className={`size-option ${selectedSize === size.value ? 'selected' : ''}`}
                    onClick={() => setSelectedSize(size.value)}
                  >
                    {size.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="form-card">
              <h2>Typography</h2>
              <FontSizeControl
                value={cardData.fontScale || 1.0}
                onChange={val => handleInputChange('fontScale', val)}
              />
            </div>

            <div className="form-card">
              <h2>Corner Style</h2>
              <div className="corner-style-grid">
                <button
                  className={`corner-option ${!cardData.cornerStyle || cardData.cornerStyle === 'rounded' ? 'selected' : ''}`}
                  onClick={() => handleInputChange('cornerStyle', 'rounded')}
                >
                  <div className="corner-preview rounded"></div>
                  <span>Rounded</span>
                </button>
                <button
                  className={`corner-option ${cardData.cornerStyle === 'square' ? 'selected' : ''}`}
                  onClick={() => handleInputChange('cornerStyle', 'square')}
                >
                  <div className="corner-preview square"></div>
                  <span>Square</span>
                </button>
              </div>
            </div>

            <div className="form-card">
              <h2>Font Family</h2>
              <select
                value={cardData.fontFamily || 'system'}
                onChange={e => handleInputChange('fontFamily', e.target.value)}
                className="font-select"
              >
                <option value="system">System Default</option>
                <option value="Arial, sans-serif">Arial</option>
                <option value="'Helvetica Neue', Helvetica, sans-serif">
                  Helvetica
                </option>
                <option value="'Times New Roman', Times, serif">
                  Times New Roman
                </option>
                <option value="Georgia, serif">Georgia</option>
                <option value="'Courier New', Courier, monospace">
                  Courier New
                </option>
                <option value="Verdana, sans-serif">Verdana</option>
                <option value="'Trebuchet MS', sans-serif">Trebuchet MS</option>
                <option value="'Palatino Linotype', 'Book Antiqua', Palatino, serif">
                  Palatino
                </option>
                <option value="Impact, sans-serif">Impact</option>
              </select>
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
              <div className="preview-label">Front</div>
              <div
                ref={frontRef}
                className="card-preview"
                style={{
                  aspectRatio:
                    selectedSize === '3.5x2'
                      ? '3.5/2'
                      : selectedSize === '3.5x2.5'
                        ? '3.5/2.5'
                        : selectedSize === '3x2'
                          ? '3/2'
                          : '2.5/2',
                }}
              >
                <TemplateComponent data={cardData} colors={colors} />
              </div>

              {cardData.includeBack && (
                <>
                  <div className="preview-label" style={{ marginTop: '2rem' }}>
                    Back
                  </div>
                  <div
                    ref={backRef}
                    className="card-preview"
                    style={{
                      aspectRatio:
                        selectedSize === '3.5x2'
                          ? '3.5/2'
                          : selectedSize === '3.5x2.5'
                            ? '3.5/2.5'
                            : selectedSize === '3x2'
                              ? '3/2'
                              : '2.5/2',
                    }}
                  >
                    <TemplateComponent data={cardData} colors={colors} isBack />
                  </div>
                </>
              )}
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
              {isExporting ? 'Generating PDF...' : 'Download PDF'}
            </Button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default PrintCard
