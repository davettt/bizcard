import React from 'react'
import './Input.css'

interface InputProps {
  label?: string
  type?: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
  required?: boolean
  error?: string
  helpText?: string
}

const Input: React.FC<InputProps> = ({
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  required = false,
  error,
  helpText,
}) => {
  return (
    <div className="input-group">
      {label && (
        <label className="input-label">
          {label}
          {required && <span className="required">*</span>}
        </label>
      )}
      {helpText && <p className="help-text">{helpText}</p>}
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        className={`input ${error ? 'input-error' : ''}`}
      />
      {error && <span className="error-message">{error}</span>}
    </div>
  )
}

export default Input
