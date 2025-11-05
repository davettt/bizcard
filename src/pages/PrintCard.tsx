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
    includeBack: false,
    backText: '',
  })

  const [selectedTemplate, setSelectedTemplate] =
    useState<TemplateId>('minimal')
  const [selectedPalette, setSelectedPalette] = useState<ColorPalette>()
  const [selectedSize, setSelectedSize] = useState<PrintSize>('3.5x2')
  const [isExporting, setIsExporting] = useState(false)

  const handleInputChange = (
    field: keyof CardData,
    value: string | boolean
  ) => {
    setCardData(prev => ({ ...prev, [field]: value }))
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
        <button onClick={() => navigate('/')} className="back-btn">
          ← Back to Home
        </button>
        <h1>Create Print Business Card</h1>
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

              <ImageUpload
                label="Profile Image"
                onImageSelect={img => handleInputChange('image', img)}
                currentImage={cardData.image}
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
    </div>
  )
}

export default PrintCard
