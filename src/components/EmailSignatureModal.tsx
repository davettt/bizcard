import React, { useState } from 'react'
import Modal from './Modal'
import Button from './Button'
import './EmbedCodeModal.css'

interface EmailSignatureModalProps {
  isOpen: boolean
  onClose: () => void
  signatureHTML: string
}

const EmailSignatureModal: React.FC<EmailSignatureModalProps> = ({
  isOpen,
  onClose,
  signatureHTML,
}) => {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(signatureHTML)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea')
      textArea.value = signatureHTML
      textArea.style.position = 'fixed'
      textArea.style.opacity = '0'
      document.body.appendChild(textArea)
      textArea.select()
      try {
        document.execCommand('copy')
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      } catch (err) {
        console.error('Failed to copy:', err)
      }
      document.body.removeChild(textArea)
    }
  }

  const handleDownload = () => {
    const blob = new Blob([signatureHTML], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'email-signature.html'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Email Signature HTML">
      <div className="embed-code-modal">
        <p className="embed-instructions">
          Copy the HTML code below and paste it into your email client's
          signature settings. Most email clients support HTML signatures in
          their settings or preferences section.
        </p>
        <div className="code-container">
          <textarea
            className="code-textarea"
            value={signatureHTML}
            readOnly
            rows={15}
          />
        </div>
        <div className="embed-actions">
          <Button onClick={handleCopy} variant="primary">
            {copied ? '✓ Copied!' : '📋 Copy to Clipboard'}
          </Button>
          <Button onClick={handleDownload} variant="secondary">
            ⬇ Download as .html
          </Button>
        </div>
      </div>
    </Modal>
  )
}

export default EmailSignatureModal
