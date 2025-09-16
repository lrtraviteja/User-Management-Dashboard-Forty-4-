import { createContext, useContext, useEffect, useLayoutEffect, useState } from 'react'
import { getUsers, createUser, updateUser as apiUpdateUser, deleteUser as apiDeleteUser, getUser } from '../api/userService'

const UserContext = createContext(null)

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [theme, setTheme] = useState(() => {
    const stored = localStorage.getItem('theme')
    if (stored === 'light' || stored === 'dark') return stored
    // system preference as fallback
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark'
    return 'light'
  })

  const refresh = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await getUsers()
      setUsers(res.data.data || [])
    } catch (e) {
      setError('Failed to load users')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { refresh() }, [])

  // Persist theme
  useLayoutEffect(() => {
    const root = document.documentElement
    if (theme === 'dark') root.classList.add('dark')
    else root.classList.remove('dark')
    localStorage.setItem('theme', theme)
    // debug log (can be removed later)
    if (process.env.NODE_ENV !== 'production') {
      // eslint-disable-next-line no-console
      console.log('[Theme]', theme, 'html.classes=', root.className)
    }
  }, [theme])

  const addUser = async (data) => {
    await createUser(data)
    await refresh()
  }

  const modifyUser = async (id, data) => {
    await apiUpdateUser(id, data)
    setUsers(prev => prev.map(u => u.id === id ? { ...u, ...data } : u))
  }

  const removeUser = async (id) => {
    await apiDeleteUser(id)
    setUsers(prev => prev.filter(u => u.id !== id))
  }

  const fetchUserById = async (id) => {
    const res = await getUser(id)
    return res.data.data
  }

  return (
    <UserContext.Provider value={{
      users,
      loading,
      error,
      refresh,
      addUser,
      modifyUser,
      removeUser,
      fetchUserById,
      theme,
      setTheme
    }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUsers = () => useContext(UserContext)