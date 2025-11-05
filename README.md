# BizCard Generator

A modern, user-friendly web application for creating professional business cards, digital business cards, and email signatures. Built with React, TypeScript, and Vite.

## Features

### 🖨️ Print Business Cards
- Create high-resolution, print-ready business cards in PDF format
- Choose from 8 professionally designed templates
- Select from 4 standard print sizes (US, European, Slim, Square)
- Option to include custom text on the back side
- 300 DPI export quality

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
- **Image Upload**: Add profile photos or company logos
- **Real-time Preview**: See changes instantly

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
2. Fill in your information (name, title, company, etc.)
3. Upload a profile image (optional)
4. Select a template from the 8 available options
5. Choose your preferred print size
6. Select or customize a color palette
7. Preview your card in real-time
8. Optionally add text for the back side
9. Click **Download PDF** to get your print-ready file

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
│   │   └── exportHTML.ts
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

## Technologies Used

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **jsPDF** - PDF generation
- **html2canvas** - HTML to canvas conversion
- **file-saver** - File download utility
- **ESLint** - Code linting
- **Prettier** - Code formatting

## Browser Compatibility

- Modern browsers (Chrome, Firefox, Safari, Edge)
- ES2020+ support required
- HTML5 Canvas support required

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Run quality checks (`npm run quality`)
4. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
5. Push to the branch (`git push origin feature/AmazingFeature`)
6. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Author

**David Tiong**
- Email: mail@davidtiong.com.au
- GitHub: [@davettt](https://github.com/davettt)

## Acknowledgments

- Inspired by the need for quick, professional business card generation
- Built with modern web technologies for optimal performance
- Designed with a minimalist, user-friendly interface

---

**Note**: This application runs entirely in the browser. No data is stored on servers - all processing happens client-side for your privacy and security.
