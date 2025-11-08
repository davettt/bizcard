import React from 'react'
import './FontSizeControl.css'

interface FontSizeControlProps {
  value: number
  onChange: (value: number) => void
}

const FontSizeControl: React.FC<FontSizeControlProps> = ({
  value = 1.0,
  onChange,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(parseFloat(e.target.value))
  }

  const getLabel = (scale: number) => {
    if (scale < 0.9) return 'Small'
    if (scale > 1.1) return 'Large'
    return 'Normal'
  }

  return (
    <div className="font-size-control">
      <label className="input-label">
        Font Size: <span className="font-size-value">{getLabel(value)}</span>
      </label>
      <div className="slider-container">
        <span className="slider-label">0.8x</span>
        <input
          type="range"
          min="0.8"
          max="1.2"
          step="0.05"
          value={value}
          onChange={handleChange}
          className="font-slider"
        />
        <span className="slider-label">1.2x</span>
      </div>
      <p className="help-text">
        Adjust if text doesn't fit or needs to be larger
      </p>
    </div>
  )
}

export default FontSizeControl
