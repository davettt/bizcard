# Business Card Generator

A modern, user-friendly web application for creating professional business cards, digital business cards, and email signatures. Built with React, TypeScript, and Vite.

**Official Hosted Version**: [davidtiong.com](https://davidtiong.com)

> **Note**: This repository is public for transparency so users can verify our privacy and security claims. The codebase is maintained solely by davidtiong.com and is **not accepting contributions**. See [CONTRIBUTING.md](CONTRIBUTING.md) for details.

## Features

### 🖨️ Print Business Cards
- **Professional Print-Ready PDFs**: Includes 1/8" bleed and crop marks for professional printers
- **DIY Print Options**: Export separate front/back files for services like VistaPrint
- **True 300 DPI Quality**: High-resolution exports at professional printing standards
- **8 Professional Templates**: Minimal, Classic, Modern, Elegant, Bold, Creative, Professional, Simple
- **4 Standard Print Sizes**: US (3.5×2"), European (3.5×2.5"), Slim (3×2"), Square (2.5×2")
- **Customizable Back Side**: Add custom text with proper word spacing
- **Fixed Preview Dimensions**: Consistent true-to-life size regardless of browser window
- **Corner Style Options**: Rounded or square corners on both front and back
- **CMYK Conversion Notice**: Guidance for converting RGB to CMYK for accurate printing

### 💳 Digital Business Cards
- Generate single HTML files for digital sharing
- All styles and images embedded for portability
- Same template options as print cards
- Perfect for websites, portfolios, or email attachments

### ✉️ Email Signatures
- Create professional HTML email signatures
- 4 specialized email-friendly templates
- Copy to clipboard or download HTML
- Clickable links for email, phone, website, and social media
- Compatible with major email clients

### 🎨 Design Customization
- **Color Palettes**: 6 preset palettes, random palette generator, or custom brand colors (up to 4 colors)
- **Templates**: 8 business card templates + 4 email signature templates
- **Secure Image Upload**: Add profile photos or company logos with validation
  - Supports JPEG, PNG, GIF, WebP, and SVG formats
  - File size limits (5MB for photos, 2MB for logos)
  - Triple-layer security validation (MIME type, extension, data URL)
- **Font Customization**: Adjust font size (0.8x - 1.2x) and choose from 10 font families
- **Real-time Preview**: See changes instantly with fixed dimensions
- **Test Data Button**: Quickly fill all fields with sample data for testing

## Getting Started

### Prerequisites
- Node.js 18+ and npm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/davettt/bizcard.git
cd bizcard
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Usage

### Creating a Print Business Card

1. Navigate to **Print Business Cards** from the home page
2. Fill in your information (name, title, company, etc.) or click **Fill Test Data** for a quick demo
3. Upload a profile image and/or company logo (optional, with security validation)
4. Select a template from the 8 available options
5. Choose your preferred print size (US, European, Slim, or Square)
6. Select or customize a color palette
7. Adjust font size and select font family
8. Choose corner style (rounded or square)
9. Preview your card in real-time at fixed dimensions
10. Optionally add text for the back side
11. Choose export option:
    - **Professional Print-Ready PDF**: Includes bleed and crop marks for professional printers
    - **DIY Separate Files**: Front and back as separate PDFs for services like VistaPrint
12. **Before printing**: Convert PDF from RGB to CMYK using Adobe Acrobat or ask your printer to convert

### Creating a Digital Business Card

1. Navigate to **Digital Business Card**
2. Fill in your details and social media links
3. Upload an image and select a template
4. Choose colors that match your brand
5. Preview the card
6. Click **Download HTML File** to get a self-contained HTML file
7. Share the file or embed it in your website

### Creating an Email Signature

1. Navigate to **Email Signature**
2. Fill in your information (note: use an external URL for images)
3. Select one of the 4 email-optimized templates
4. Customize colors
5. Preview the signature
6. **Copy to Clipboard** to paste into your email client, or
7. **Download HTML** to import into email settings

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting
- `npm run type-check` - Run TypeScript type checking
- `npm run security` - Run npm security audit
- `npm run quality` - Run all quality checks (format, lint, type-check, security)

### Code Quality

This project uses multiple tools to ensure code quality:

- **ESLint**: JavaScript/TypeScript linting
- **Prettier**: Code formatting
- **TypeScript**: Type safety
- **npm audit**: Security vulnerability scanning

Before committing code, run:
```bash
npm run quality
```

This will check formatting, lint the code, verify types, and scan for security issues.

### Project Structure

```
bizcard/
├── src/
│   ├── components/      # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── ImageUpload.tsx
│   │   └── ColorPicker.tsx
│   ├── pages/          # Main page components
│   │   ├── Home.tsx
│   │   ├── PrintCard.tsx
│   │   ├── DigitalCard.tsx
│   │   └── EmailSignature.tsx
│   ├── templates/      # Card and signature templates
│   │   ├── PrintCardTemplates.tsx
│   │   └── EmailTemplates.tsx
│   ├── utils/          # Utility functions
│   │   ├── colorGenerator.ts
│   │   ├── printSizes.ts
│   │   ├── exportPDF.ts
│   │   ├── exportPDFProfessional.ts
│   │   ├── exportHTML.ts
│   │   └── sanitize.ts
│   ├── types/          # TypeScript type definitions
│   │   └── index.ts
│   ├── App.tsx         # Main app component
│   ├── main.tsx        # Entry point
│   └── index.css       # Global styles
├── public/             # Static assets
├── index.html          # HTML entry point
├── package.json        # Dependencies and scripts
├── tsconfig.json       # TypeScript configuration
├── vite.config.ts      # Vite configuration
├── eslint.config.js    # ESLint configuration
├── .prettierrc         # Prettier configuration
└── README.md           # This file
```

## Deployment

### Cloudflare Pages

This project is optimized for deployment on Cloudflare Pages:

1. Push your code to GitHub
2. Connect your repository to Cloudflare Pages
3. Configure build settings:
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
   - **Node version**: 18 or higher
4. Deploy!

### Other Platforms

The app can be deployed to any static hosting platform:

- **Vercel**: Connect GitHub repo, auto-detects Vite
- **Netlify**: Set build command to `npm run build`, publish directory to `dist`
- **GitHub Pages**: Use `vite-plugin-github-pages` or deploy the `dist` folder

## Security & Privacy

### Input Sanitization
All user inputs are sanitized before processing to prevent XSS attacks:
- **Email addresses**: Validated and sanitized
- **Phone numbers**: Only valid characters allowed (digits, spaces, dashes, parentheses, +, dots)
- **URLs**: Protocol validation (blocks javascript:, data:, file: schemes)
- **Text fields**: HTML tags and script content removed
- **Images**: Triple-layer validation (MIME type, file extension, data URL format)

### Privacy
- **100% Client-Side Processing**: All card generation happens in your browser
- **No Server Storage**: Your personal information is never transmitted or stored on any server
- **No Tracking**: No analytics or user tracking
- **Local Data Only**: Everything stays on your device

### Reporting Security Issues
Found a security vulnerability? Please report it privately to: **david@davidtiong.com**

### Best Practices (For Developers)
If you're learning from or forking this code, run `npm run quality` before committing:
- ✅ Code formatting (Prettier)
- ✅ No linting errors (ESLint)
- ✅ Type safety (TypeScript)
- ✅ No security vulnerabilities (npm audit)

## Technologies Used

- **React 18** - UI framework
- **TypeScript** - Type safety and developer experience
- **Vite** - Lightning-fast build tool and dev server
- **React Router** - Client-side routing
- **jsPDF** - Professional PDF generation
- **html-to-image** - High-fidelity HTML to image conversion
- **file-saver** - File download utility
- **ESLint** - Code linting with strict rules
- **Prettier** - Automated code formatting

## Browser Compatibility

- Modern browsers (Chrome, Firefox, Safari, Edge)
- ES2020+ support required
- HTML5 Canvas support required

## Contributing

**This project is not accepting contributions.**

This repository is maintained solely by davidtiong.com for the official hosted version. For security and liability reasons, we cannot accept external contributions.

**Why is the code public?**
- For transparency - users can verify our privacy and security claims
- You can inspect the code to confirm no tracking or data storage
- Learn from the implementation for your own projects

**Found a bug or security issue?**
Please email: **david@davidtiong.com** (GitHub Issues are disabled)

See [CONTRIBUTING.md](CONTRIBUTING.md) for full details.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

**Note**: While the code is open source under MIT, the **official production version** is maintained and hosted exclusively at [davidtiong.com](https://davidtiong.com). This is the only version guaranteed to be secure, up-to-date, and properly maintained.

## Author

**David Tiong**
- Website: [davidtiong.com](https://davidtiong.com)
- Email: david@davidtiong.com
- GitHub: [@davettt](https://github.com/davettt)

## Acknowledgments

- Inspired by the need for quick, professional business card generation
- Built with modern web technologies for optimal performance
- Designed with a minimalist, user-friendly interface

---

## 🔒 Security & Privacy Commitment

**This application is designed with privacy and security as top priorities:**

- ✅ **100% Client-Side**: All processing happens in your browser
- ✅ **No Server Storage**: Your data never leaves your device
- ✅ **No Tracking**: Zero analytics or user tracking
- ✅ **Input Sanitization**: All inputs validated and sanitized against XSS attacks
- ✅ **Secure Image Uploads**: Triple-layer validation for uploaded images
- ✅ **Open Source for Transparency**: Inspect the code yourself to verify these claims

**Your data is yours.** We don't see it, store it, or transmit it. Period.

---

**Official Version**: The verified, secure version is hosted at [davidtiong.com](https://davidtiong.com)
**Questions or Issues?**: Contact david@davidtiong.com
