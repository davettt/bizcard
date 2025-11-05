import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import PrintCard from './pages/PrintCard'
import DigitalCard from './pages/DigitalCard'
import EmailSignature from './pages/EmailSignature'

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/print-card" element={<PrintCard />} />
        <Route path="/digital-card" element={<DigitalCard />} />
        <Route path="/email-signature" element={<EmailSignature />} />
      </Routes>
    </div>
  )
}

export default App
