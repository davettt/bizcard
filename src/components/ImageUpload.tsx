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
      // Validate file type (MIME type)
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml']
      if (!allowedTypes.includes(file.type)) {
        alert(
          'Invalid file type. Please upload an image file (JPEG, PNG, GIF, WebP, or SVG).'
        )
        return
      }

      // Validate file extension as an additional check
      const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg']
      const fileExtension = file.name.toLowerCase().match(/\.[^.]+$/)?.[0]
      if (!fileExtension || !allowedExtensions.includes(fileExtension)) {
        alert(
          'Invalid file extension. Please upload a file with extension: .jpg, .jpeg, .png, .gif, .webp, or .svg'
        )
        return
      }

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
        const result = reader.result as string
        // Additional validation: ensure result is a valid data URL
        if (result && result.startsWith('data:image/')) {
          onImageSelect(result)
        } else {
          alert('Failed to process image. Please try a different file.')
        }
      }
      reader.onerror = () => {
        alert('Failed to read image file. Please try again.')
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
        accept="image/jpeg,image/jpg,image/png,image/gif,image/webp,image/svg+xml,.jpg,.jpeg,.png,.gif,.webp,.svg"
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
    </div>
  )
}

export default ImageUpload
