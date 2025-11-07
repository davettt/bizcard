import React, { useRef } from 'react'
import './ImageUpload.css'

interface ImageUploadProps {
  onImageSelect: (imageDataUrl: string) => void
  currentImage?: string
  label?: string
  helpText?: string
  maxSizeMB?: number
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  onImageSelect,
  currentImage,
  label = 'Upload Image',
  helpText,
  maxSizeMB = 5,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Check file size
      const fileSizeMB = file.size / (1024 * 1024)
      if (fileSizeMB > maxSizeMB) {
        alert(
          `Image is too large (${fileSizeMB.toFixed(1)}MB). Please use an image under ${maxSizeMB}MB.`
        )
        return
      }

      const reader = new FileReader()
      reader.onloadend = () => {
        onImageSelect(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className="image-upload">
      <label className="input-label">{label}</label>
      {helpText && <p className="help-text">{helpText}</p>}
      <div className="upload-area" onClick={handleClick}>
        {currentImage ? (
          <img src={currentImage} alt="Preview" className="preview-image" />
        ) : (
          <div className="upload-placeholder">
            <svg
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21 15 16 10 5 21" />
            </svg>
            <p>Click to upload image</p>
          </div>
        )}
      </div>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
    </div>
  )
}

export default ImageUpload
