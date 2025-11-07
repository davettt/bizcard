// Input sanitization utilities for security

/**
 * Sanitize text input to prevent XSS attacks
 * Removes potentially dangerous HTML/script tags and attributes
 */
export const sanitizeText = (input: string): string => {
  if (!input) return ''

  // Remove any HTML tags
  let sanitized = input.replace(/<[^>]*>/g, '')

  // Remove any script-related content
  sanitized = sanitized.replace(/javascript:/gi, '')
  sanitized = sanitized.replace(/on\w+\s*=/gi, '') // Remove event handlers like onclick=

  // Decode HTML entities to prevent double-encoding attacks
  const textarea = document.createElement('textarea')
  textarea.innerHTML = sanitized
  sanitized = textarea.value

  return sanitized.trim()
}

/**
 * Sanitize and validate URL input
 * Ensures URLs use safe protocols (http/https)
 */
export const sanitizeURL = (input: string): string => {
  if (!input) return ''

  let url = input.trim()

  // Remove any HTML tags
  url = url.replace(/<[^>]*>/g, '')

  // Remove javascript: and data: protocols
  url = url.replace(/^(javascript|data|vbscript|file):/gi, '')

  // If URL doesn't have a protocol, don't add one (let the browser handle it)
  // This allows for relative URLs like "www.example.com"

  // Validate that if protocol exists, it's http or https
  if (url.match(/^[a-z]+:/i)) {
    if (!url.match(/^https?:/i)) {
      // Invalid protocol, remove it
      url = url.replace(/^[a-z]+:/i, '')
    }
  }

  return url.trim()
}

/**
 * Sanitize email address
 * Basic validation and sanitization
 */
export const sanitizeEmail = (input: string): string => {
  if (!input) return ''

  let email = input.trim().toLowerCase()

  // Remove any HTML tags
  email = email.replace(/<[^>]*>/g, '')

  // Remove spaces
  email = email.replace(/\s/g, '')

  // Basic email validation pattern
  const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i

  if (!emailPattern.test(email)) {
    // If it doesn't match, return the cleaned version anyway
    // The UI can show validation errors
    return email
  }

  return email
}

/**
 * Sanitize phone number
 * Allows common phone number formats
 */
export const sanitizePhone = (input: string): string => {
  if (!input) return ''

  let phone = input.trim()

  // Remove any HTML tags
  phone = phone.replace(/<[^>]*>/g, '')

  // Allow only: digits, spaces, dashes, parentheses, plus sign, dots
  phone = phone.replace(/[^0-9\s\-()+ .]/g, '')

  return phone.trim()
}

/**
 * Validate data URL (for images)
 * Ensures it's a valid image data URL
 */
export const isValidImageDataURL = (dataURL: string): boolean => {
  if (!dataURL) return false

  // Must start with data:image/
  if (!dataURL.startsWith('data:image/')) return false

  // Check for valid image MIME types
  const validMimeTypes = [
    'data:image/jpeg',
    'data:image/jpg',
    'data:image/png',
    'data:image/gif',
    'data:image/webp',
    'data:image/svg+xml',
  ]

  return validMimeTypes.some(mime => dataURL.startsWith(mime))
}

/**
 * Sanitize general text that may be displayed in HTML
 * More lenient than sanitizeText, allows basic formatting
 */
export const sanitizeDisplayText = (input: string): string => {
  if (!input) return ''

  // Allow basic line breaks but escape everything else
  let text = input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')

  return text.trim()
}
