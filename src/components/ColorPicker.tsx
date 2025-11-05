import React, { useState } from 'react'
import { ColorPalette } from '../types'
import {
  generateRandomPalettes,
  presetPalettes,
  isValidHex,
  normalizeColor,
} from '../utils/colorGenerator'
import './ColorPicker.css'

interface ColorPickerProps {
  onSelectPalette: (palette: ColorPalette) => void
  selectedPalette?: ColorPalette
}

const ColorPicker: React.FC<ColorPickerProps> = ({
  onSelectPalette,
  selectedPalette,
}) => {
  const [randomPalettes, setRandomPalettes] = useState<ColorPalette[]>(
    generateRandomPalettes(6)
  )
  const [customColors, setCustomColors] = useState<string[]>([
    '#000000',
    '#FFFFFF',
    '#2563EB',
    '#10B981',
  ])
  const [showCustom, setShowCustom] = useState(false)

  const handleRegenerateRandom = () => {
    setRandomPalettes(generateRandomPalettes(6))
  }

  const handleCustomColorChange = (index: number, color: string) => {
    const newColors = [...customColors]
    newColors[index] = normalizeColor(color)
    setCustomColors(newColors)
  }

  const handleApplyCustom = () => {
    if (customColors.every(c => isValidHex(c))) {
      onSelectPalette({
        id: 'custom',
        name: 'Custom',
        colors: customColors,
      })
    }
  }

  return (
    <div className="color-picker">
      <h3>Choose Color Palette</h3>

      <div className="palette-section">
        <h4>Preset Palettes</h4>
        <div className="palette-grid">
          {presetPalettes.map(palette => (
            <div
              key={palette.id}
              className={`palette-item ${selectedPalette?.id === palette.id ? 'selected' : ''}`}
              onClick={() => onSelectPalette(palette)}
            >
              <div className="color-swatches">
                {palette.colors.map((color, idx) => (
                  <div
                    key={idx}
                    className="color-swatch"
                    style={{ background: color }}
                  />
                ))}
              </div>
              {palette.name && <p className="palette-name">{palette.name}</p>}
            </div>
          ))}
        </div>
      </div>

      <div className="palette-section">
        <div className="section-header">
          <h4>Random Palettes</h4>
          <button onClick={handleRegenerateRandom} className="btn-regenerate">
            Regenerate
          </button>
        </div>
        <div className="palette-grid">
          {randomPalettes.map(palette => (
            <div
              key={palette.id}
              className={`palette-item ${selectedPalette?.id === palette.id ? 'selected' : ''}`}
              onClick={() => onSelectPalette(palette)}
            >
              <div className="color-swatches">
                {palette.colors.map((color, idx) => (
                  <div
                    key={idx}
                    className="color-swatch"
                    style={{ background: color }}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="palette-section">
        <button
          onClick={() => setShowCustom(!showCustom)}
          className="btn-custom-toggle"
        >
          {showCustom ? 'Hide' : 'Show'} Custom Colors
        </button>

        {showCustom && (
          <div className="custom-colors">
            <div className="custom-inputs">
              {customColors.map((color, idx) => (
                <div key={idx} className="custom-color-input">
                  <input
                    type="color"
                    value={color}
                    onChange={e => handleCustomColorChange(idx, e.target.value)}
                  />
                  <input
                    type="text"
                    value={color}
                    onChange={e => handleCustomColorChange(idx, e.target.value)}
                    placeholder="#000000"
                  />
                </div>
              ))}
            </div>
            <button onClick={handleApplyCustom} className="btn-apply-custom">
              Apply Custom Palette
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default ColorPicker
