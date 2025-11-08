import './About.css'

const About = () => {
  return (
    <div className="about">
      <h1>About This Project</h1>

      <div className="card">
        <h2>React Full Flow Application</h2>
        <p>
          This is a comprehensive React application that demonstrates the complete
          development flow and best practices for building modern web applications.
        </p>
      </div>

      <div className="card">
        <h2>Technologies Used</h2>
        <ul className="tech-list">
          <li><strong>React 18</strong> - Modern React with hooks</li>
          <li><strong>Vite</strong> - Fast build tool and dev server</li>
          <li><strong>React Router</strong> - Client-side routing</li>
          <li><strong>Context API</strong> - State management</li>
          <li><strong>Axios</strong> - HTTP client for API calls</li>
          <li><strong>Custom Hooks</strong> - Reusable logic patterns</li>
        </ul>
      </div>

      <div className="card">
        <h2>Architecture</h2>
        <div className="architecture">
          <div className="arch-section">
            <h3>📁 Components</h3>
            <p>Reusable UI components like Header, Footer, Layout, and Notifications</p>
          </div>

          <div className="arch-section">
            <h3>📄 Pages</h3>
            <p>Route-level components for different views (Home, About, Dashboard)</p>
          </div>

          <div className="arch-section">
            <h3>🎣 Hooks</h3>
            <p>Custom hooks for data fetching, forms, and localStorage</p>
          </div>

          <div className="arch-section">
            <h3>🌐 Services</h3>
            <p>API layer with Axios interceptors and organized endpoints</p>
          </div>

          <div className="arch-section">
            <h3>📦 Context</h3>
            <p>Global state management for user, theme, and notifications</p>
          </div>
        </div>
      </div>

      <div className="card">
        <h2>Key Features</h2>
        <ul className="feature-list">
          <li>Component-based architecture</li>
          <li>Global state management with Context API</li>
          <li>Custom hooks for reusable logic</li>
          <li>API integration with error handling</li>
          <li>Form handling with validation</li>
          <li>Toast notification system</li>
          <li>Responsive design</li>
          <li>Dark/Light theme support</li>
        </ul>
      </div>
    </div>
  )
}

export default About
