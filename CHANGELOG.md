# Changelog

All notable changes to the Business Card Generator project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.2.0] - 2026-02-21

### Added
- **User data persistence**: Card details now saved to browser localStorage across all 3 card types (Print, Digital, Email Signature)
- **Shared localStorage key**: All 3 pages share a single `bizcard-data` key — common fields (name, title, company, email, etc.) pre-populate when switching between card types
- **Merge-on-save**: Each page only updates its own fields in localStorage, preserving page-specific data (e.g. print card address, email signature image URL) set on other pages
- **Clear Saved Data button**: Added to all 3 pages, clears localStorage and resets all fields
- **Updated footer disclaimer**: Now explicitly mentions local storage use — "Your card details are saved in your browser's local storage for convenience and are never sent to a server"

### Changed
- **Button layout**: Fill Test Data and Clear Saved Data buttons now displayed side by side with individual helper text beneath each for clarity
- **Clear button helper text**: Explicitly states data is cleared across all 3 card types

### Fixed
- **localStorage initialisation**: Used `useState` lazy initialiser to read from localStorage synchronously before first render, preventing initial empty state from overwriting saved data on mount

## [1.1.0] - 2025-11-08

### Policy Changes
- **Repository is now public for transparency but not accepting contributions**
- Added CONTRIBUTING.md explaining no-contribution policy
- Updated README with transparency notice and contribution policy
- Repository remains MIT licensed but official version only at davidtiong.com
- All contact information updated to david@davidtiong.com

### Added
- **Professional Print-Ready PDFs**: Export now includes proper bleed (1/8") and crop marks for professional printing
- **300 DPI Resolution**: Print exports now use 300 DPI quality (pixelRatio: 6) for professional printing standards
- **DIY Print Options**: Separate front/back PDF files for services like VistaPrint
- **Comprehensive Input Sanitization**: All user inputs now sanitized to prevent XSS attacks
  - Email validation and sanitization
  - Phone number sanitization (allows only valid characters)
  - URL validation (blocks dangerous protocols like javascript:, data:, file:)
  - Image data URL validation with MIME type checking
  - HTML tag and script removal from text fields
- **Enhanced Image Upload Security**:
  - Triple-layer validation (MIME type, file extension, data URL)
  - File size limits (5MB for profile images, 2MB for logos)
  - Invalid image rejection before state update
- **Fixed Pixel Dimensions for Print Preview**: Preview now displays at consistent size regardless of browser window size (140 pixels per inch)
- **Favicon**: Added custom favicon with business card icon design
- **CMYK Conversion Notice**: User-facing warnings about RGB→CMYK conversion requirement for professional printing

### Changed
- **Rebranded from "CardCraft" to "Business Card Generator"**: Avoided potential trademark issues, more descriptive name
- **Switched from html2canvas to html-to-image library**: Better text spacing preservation and layout fidelity in PDF exports
- **Modernized Home Page Header**: Removed gradient background, added clean white design with green border and accent
- **Enhanced Footer Disclaimer**: Added "no warranty, use at your own risk" language and privacy notice
- **Updated All Page Headers**: Consistent modern design across Print Card, Digital Card, and Email Signature pages
- **Removed Print PDF Text Labels**: Professional print PDFs no longer include "FRONT/BACK" or "TRIM/BLEED" text (crop marks only)
- **Fixed Bleed Area Alignment**: Card design now centered with equal 1/8" margins on all sides (was top-aligned)
- **Rounded Corners on Both Sides**: Back of cards now properly respects corner style preference

### Fixed
- **PDF Export Text Spacing**: Words no longer join together on back of cards (e.g., "Passionate about" instead of "Passionateabout")
- **PDF Export Image Aspect Ratio**: Images no longer stretched or distorted in PDF exports
- **Preview Consistency**: Preview no longer changes size when browser window is resized
- **Font Overflow in PDF**: Fixed fonts being too large and overflowing off card in PDF export
- **Crop Mark Positioning**: Crop marks now correctly positioned around centered design without cutting off content

### Security
- All user inputs now sanitized before rendering
- XSS protection through input validation and React's automatic escaping
- Image upload validation prevents malicious file uploads
- URL protocol validation prevents javascript: URI attacks
- No dangerouslySetInnerHTML usage anywhere in codebase

### Documentation
- Created CHANGELOG.md
- Updated README.md with current features and security notes
- Added code documentation for print PDF generation process
- Documented RGB→CMYK conversion requirements

### Developer Experience
- Code formatted with Prettier (all files pass formatting checks)
- Zero ESLint warnings
- All TypeScript types verified
- Zero npm security vulnerabilities
- Quality script runs all checks: `npm run quality`

## [1.0.0] - 2025-11-07

### Initial Release
- Print business card generation with 8 templates
- Digital business card HTML export
- Email signature generator with 4 templates
- 6 preset color palettes plus random generator
- Custom color palette support (up to 4 colors)
- Image upload for profile photos and logos
- Real-time preview
- 4 standard print sizes (US 3.5×2, European 3.5×2.5, Slim 3×2, Square 2.5×2)
- Social media link integration (LinkedIn, Twitter, Instagram, GitHub)
- Font size control (0.8x to 1.2x scaling)
- Corner style options (rounded or square)
- Font family selection
- Client-side processing (no data stored on servers)
- React 18 + TypeScript + Vite
- ESLint, Prettier, TypeScript type checking
- Responsive design
