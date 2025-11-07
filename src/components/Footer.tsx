import './Footer.css'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="app-footer">
      <div className="container">
        <div className="footer-content">
          <p className="footer-disclaimer">
            <strong>Disclaimer:</strong> This free tool is provided "as is"
            without warranty of any kind. All data is processed locally in your
            browser - we do not store or transmit your personal information.
            Please review all content for accuracy before printing or
            distribution. For professional printing, consult with your print
            service provider about file requirements and color accuracy. Use at
            your own risk.
          </p>
          <p className="footer-copy">
            © {currentYear} Business Card Generator. Open source project.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
