import './Footer.css'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="container">
        <p>&copy; {currentYear} React Full Flow App. All rights reserved.</p>
        <p className="footer-subtitle">Built with React, Vite, and Context API</p>
      </div>
    </footer>
  )
}

export default Footer
