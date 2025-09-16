
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import DashboardPage from './pages/DashboardPage'
import UserDetailsPage from './pages/UserDetailsPage'
import { UserProvider, useUsers } from './context/UserContext'
import Header from './components/Header'
import Footer from './components/Footer'
import './index.css'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useEffect } from 'react'

function AppInner() {
  const { theme } = useUsers() || { theme: 'light' }
  useEffect(() => {
    if (theme === 'dark') document.body.classList.add('dark')
    else document.body.classList.remove('dark')
  }, [theme])
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 flex flex-col bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/users/:id" element={<UserDetailsPage />} />
          </Routes>
        </main>
        <Footer />
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme={theme === 'dark' ? 'dark' : 'light'}
        />
      </div>
    </div>
  )
}

export default function App() {
  return (
    <UserProvider>
      <Router>
        <AppInner />
      </Router>
    </UserProvider>
  )
}