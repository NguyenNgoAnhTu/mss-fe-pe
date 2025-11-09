import './About.css'

const About = () => {
  return (
    <div className="about">
      <h1>About MSS BlindBox System</h1>

      <div className="card">
        <h2>System Overview</h2>
        <p>
          A full-stack brand and product management system built with React frontend
          and Spring Boot microservices backend.
        </p>
      </div>

      <div className="card">
        <h2>Technology Stack</h2>
        <div className="tech-stack">
          <div className="tech-item">
            <strong>Frontend</strong>
            <ul>
              <li>React 18</li>
              <li>React Router v6</li>
              <li>Axios</li>
              <li>Vite</li>
            </ul>
          </div>
          <div className="tech-item">
            <strong>Backend</strong>
            <ul>
              <li>Spring Boot</li>
              <li>API Gateway</li>
              <li>JWT Authentication</li>
              <li>PostgreSQL</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="card">
        <h2>Features</h2>
        <ul className="feature-list">
          <li>Brand Management (CRUD)</li>
          <li>BlindBox Product Catalog</li>
          <li>Role-Based Access Control</li>
          <li>Admin Dashboard with Statistics</li>
          <li>JWT Authentication</li>
          <li>Real-time Notifications</li>
        </ul>
      </div>

      <div className="card">
        <h2>User Roles</h2>
        <div className="roles">
          <div className="role-item">
            <strong>Admin</strong>
            <p>Full access to create, edit, and delete brands and products</p>
          </div>
          <div className="role-item">
            <strong>User</strong>
            <p>View-only access to browse products</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
