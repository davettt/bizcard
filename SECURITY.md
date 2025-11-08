# Security Policy

## Reporting a Vulnerability

**Please report security vulnerabilities privately.**

If you discover a security vulnerability in this project, please send an email to:

**📧 david@davidtiong.com**

### What to Include

Please include the following information in your report:

- **Description**: A clear description of the vulnerability
- **Impact**: What could an attacker do with this vulnerability?
- **Steps to Reproduce**: Detailed steps to reproduce the issue
- **Affected Versions**: Which version(s) are affected (if known)
- **Suggested Fix**: Any suggestions for how to fix it (optional)

### What to Expect

1. **Acknowledgment**: You'll receive an acknowledgment within 48 hours
2. **Assessment**: We'll assess the vulnerability and determine severity
3. **Fix**: We'll work on a fix and keep you updated
4. **Disclosure**: Once fixed, we'll coordinate disclosure timing with you
5. **Credit**: If you'd like, we'll credit you in the CHANGELOG

### Bug Bounty Program

⚠️ **This project does NOT have a bug bounty program.**

This is a free, open-source tool maintained by a single developer. While security reports are greatly appreciated and help improve the tool for everyone, there is no monetary compensation for bug reports.

### What NOT to Do

- ❌ Do NOT open a public GitHub Issue for security vulnerabilities
- ❌ Do NOT disclose the vulnerability publicly before it's fixed
- ❌ Do NOT attempt to exploit the vulnerability beyond proof-of-concept

---

## Security Measures

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

## Scope

This security policy covers:

- ✅ The code in this repository
- ✅ The official hosted version at davidtiong.com
- ❌ Third-party forks or deployments (not our responsibility)
- ❌ Third-party dependencies (report to those projects directly)

## Questions?

For general security questions (not vulnerability reports), you can:

- Email: david@davidtiong.com
- Open a public GitHub Issue (for non-sensitive questions only)

Thank you for helping keep this project secure for everyone!
