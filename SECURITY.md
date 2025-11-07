# Security Measures

This document outlines the security measures implemented in the Business Card Generator application.

## File Upload Security

### Supported Image Formats
- **JPEG/JPG** (.jpg, .jpeg)
- **PNG** (.png)
- **GIF** (.gif)
- **WebP** (.webp)
- **SVG** (.svg)

### Validation Layers

#### 1. HTML Accept Attribute
The file input restricts selectable files using the `accept` attribute:
```html
<input accept="image/jpeg,image/jpg,image/png,image/gif,image/webp,image/svg+xml,.jpg,.jpeg,.png,.gif,.webp,.svg" />
```

#### 2. MIME Type Validation
Server-side validation checks the file's MIME type:
```typescript
const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml']
```

#### 3. File Extension Validation
Additional check on file extension as a security layer:
```typescript
const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg']
```

#### 4. File Size Limits
- **Print Card Profile Images**: 5MB maximum
- **Print Card Logos**: 2MB maximum
- **Digital Card Images**: 3MB maximum

#### 5. Data URL Validation
After FileReader processes the file, we validate the resulting data URL:
```typescript
if (result && result.startsWith('data:image/')) {
  // Valid image data URL
}
```

#### 6. Error Handling
FileReader errors are caught and reported to the user.

## Input Sanitization

### Text Inputs
React's built-in XSS protection escapes all text content by default. We don't use `dangerouslySetInnerHTML` anywhere in the application.

### URL Inputs
The `sanitize.ts` utility provides functions for URL sanitization:
- Removes HTML tags
- Blocks dangerous protocols (javascript:, data:, vbscript:, file:)
- Allows only http/https protocols

### Email Validation
Basic email format validation and sanitization:
- Converts to lowercase
- Removes spaces and HTML tags
- Validates against email pattern

### Phone Number Sanitization
Allows only valid phone number characters:
- Digits (0-9)
- Common separators (spaces, dashes, parentheses, dots)
- Plus sign for international format

## Safe HTML Usage

### innerHTML Usage
The application uses `.innerHTML` only for:
1. **Reading** rendered HTML from React components (EmailSignature.tsx)
2. **Exporting** HTML for download (exportHTML.ts)

We never set `.innerHTML` with user-provided content, which prevents XSS attacks.

### React's Built-in Protection
All user input rendered through React components is automatically escaped, preventing script injection.

## Data Storage

All data is stored locally in the browser:
- Images are converted to base64 data URLs
- No server-side storage or transmission
- Data never leaves the user's browser

## Best Practices Implemented

1. ✅ **Defense in Depth**: Multiple validation layers for file uploads
2. ✅ **Allow List Approach**: Only specific file types and formats allowed
3. ✅ **Size Limits**: Prevents memory exhaustion attacks
4. ✅ **No External Dependencies for Security**: Uses native browser APIs
5. ✅ **Client-Side Only**: No server vulnerabilities
6. ✅ **React's XSS Protection**: Leverages React's built-in escaping
7. ✅ **No Eval or Function Constructors**: Prevents code injection
8. ✅ **Content Security Policy Ready**: No inline scripts or styles in HTML

## Potential Improvements

While the current security measures are robust for a client-side application, potential future enhancements could include:

1. **Image Validation**: Validate image headers/magic bytes to ensure files are truly images
2. **SVG Sanitization**: If SVG support is critical, implement SVG sanitization to remove embedded scripts
3. **Content Security Policy**: Add CSP headers if deployed
4. **Subresource Integrity**: If using CDN resources, add SRI hashes

## Reporting Security Issues

If you discover a security vulnerability, please report it by creating an issue in the GitHub repository with the "security" label.
