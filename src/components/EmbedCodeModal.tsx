import { useState } from 'react'
import Modal from './Modal'
import Button from './Button'
import './EmbedCodeModal.css'

interface EmbedCodeModalProps {
  isOpen: boolean
  onClose: () => void
  embedCode: string
}

const EmbedCodeModal = ({
  isOpen,
  onClose,
  embedCode,
}: EmbedCodeModalProps) => {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(embedCode)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea')
      textArea.value = embedCode
      textArea.style.position = 'fixed'
      textArea.style.opacity = '0'
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand('copy')
      document.body.removeChild(textArea)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const handleDownload = () => {
    const blob = new Blob([embedCode], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'digital-card-embed.txt'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Embed Code">
      <div className="embed-code-modal">
        <p className="embed-instructions">
          Copy this code and paste it into your website where you want your
          digital card to appear. All styles and images are included.
        </p>

        <div className="code-container">
          <textarea
            className="code-textarea"
            value={embedCode}
            readOnly
            rows={15}
            spellCheck={false}
          />
        </div>

        <div className="embed-actions">
          <Button onClick={handleCopy} fullWidth size="large">
            {copied ? '✓ Copied!' : '📋 Copy to Clipboard'}
          </Button>
          <Button
            onClick={handleDownload}
            fullWidth
            size="large"
            variant="secondary"
          >
            ⬇ Download as .txt
          </Button>
        </div>
      </div>
    </Modal>
  )
}

export default EmbedCodeModal
