import './Footer.css'

const Footer = () => {
  const currentYear = new Date().getFullYear()
  const startYear = 2025
  const copyrightYear =
    currentYear > startYear ? `${startYear}-${currentYear}` : startYear

  return (
    <footer className="app-footer">
      <div className="container">
        <div className="footer-content">
          <p className="footer-disclaimer">
            <strong>Disclaimer:</strong> This free tool is provided "as is"
            without warranty of any kind. All data is processed locally in your
            browser - we do not store or transmit your personal information.
            Your card details are saved in your browser's local storage for
            convenience and are never sent to a server. You can clear your saved
            data at any time using the clear button on each page. Please review
            all content for accuracy before printing or distribution. For
            professional printing, consult with your print service provider
            about file requirements and color accuracy. Use at your own risk.
          </p>
          <p className="footer-copy">
            © {copyrightYear} davidtiong.com · Free Business Tools
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
