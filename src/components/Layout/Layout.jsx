import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import Notifications from '../Notifications/Notifications'
import './Layout.css'

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <Header />
      <Notifications />
      <main className="main-content">
        <div className="container">
          {children}
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default Layout
