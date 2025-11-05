import { saveAs } from 'file-saver'

export const exportToHTML = (
  element: HTMLElement,
  fileName: string,
  title: string = 'Business Card'
): void => {
  try {
    // Get the HTML content
    const cardHTML = element.outerHTML

    // Get all inline styles
    const styles = extractStyles()

    // Create complete HTML document
    const fullHTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      background: #f5f5f5;
      padding: 2rem;
    }
    ${styles}
  </style>
</head>
<body>
  ${cardHTML}
</body>
</html>`

    // Create blob and download
    const blob = new Blob([fullHTML], { type: 'text/html;charset=utf-8' })
    saveAs(blob, fileName)
  } catch (error) {
    console.error('Error exporting HTML:', error)
    throw new Error('Failed to export HTML')
  }
}

const extractStyles = (): string => {
  let styles = ''
  const styleSheets = document.styleSheets

  for (let i = 0; i < styleSheets.length; i++) {
    try {
      const sheet = styleSheets[i]
      if (sheet.cssRules) {
        for (let j = 0; j < sheet.cssRules.length; j++) {
          styles += sheet.cssRules[j].cssText + '\n'
        }
      }
    } catch (_e) {
      // Skip external stylesheets due to CORS
      continue
    }
  }

  return styles
}

export const exportEmailSignatureHTML = (
  htmlContent: string,
  fileName: string
): void => {
  try {
    // Create blob and download
    const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' })
    saveAs(blob, fileName)
  } catch (error) {
    console.error('Error exporting email signature:', error)
    throw new Error('Failed to export email signature')
  }
}

// Convert image to base64 for embedding in HTML
export const imageToBase64 = (imageUrl: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => {
      const canvas = document.createElement('canvas')
      canvas.width = img.width
      canvas.height = img.height
      const ctx = canvas.getContext('2d')
      ctx?.drawImage(img, 0, 0)
      resolve(canvas.toDataURL('image/jpeg'))
    }
    img.onerror = reject
    img.src = imageUrl
  })
}
