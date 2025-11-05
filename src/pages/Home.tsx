import { useNavigate } from 'react-router-dom'
import './Home.css'

const Home = () => {
  const navigate = useNavigate()

  const features = [
    {
      title: 'Print Business Cards',
      description:
        'Create high-resolution, print-ready business cards in PDF format. Choose from 8 templates and multiple print sizes.',
      icon: '🖨️',
      path: '/print-card',
    },
    {
      title: 'Digital Business Card',
      description:
        'Generate a single HTML file for your digital business card. Perfect for sharing online.',
      icon: '💳',
      path: '/digital-card',
    },
    {
      title: 'Email Signature',
      description:
        'Design professional email signatures with clickable links. Choose from 4 templates.',
      icon: '✉️',
      path: '/email-signature',
    },
  ]

  return (
    <div className="home">
      <header className="home-header">
        <h1>BizCard Generator</h1>
        <p className="tagline">
          Create professional business cards and email signatures in minutes
        </p>
      </header>

      <div className="container">
        <div className="features-grid">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="feature-card"
              onClick={() => navigate(feature.path)}
            >
              <div className="feature-icon">{feature.icon}</div>
              <h2>{feature.title}</h2>
              <p>{feature.description}</p>
              <button className="feature-btn">Get Started →</button>
            </div>
          ))}
        </div>

        <div className="info-section">
          <h3>How It Works</h3>
          <div className="steps">
            <div className="step">
              <span className="step-number">1</span>
              <p>Choose a creation mode above</p>
            </div>
            <div className="step">
              <span className="step-number">2</span>
              <p>Fill in your information and select a template</p>
            </div>
            <div className="step">
              <span className="step-number">3</span>
              <p>Customize colors and design to match your brand</p>
            </div>
            <div className="step">
              <span className="step-number">4</span>
              <p>Download your professional business materials</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
