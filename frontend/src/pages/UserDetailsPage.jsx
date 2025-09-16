import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useUsers } from '../context/UserContext'
import UserForm from '../components/UserForm'
import { toast } from 'react-toastify'

export default function UserDetailsPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { fetchUserById, removeUser } = useUsers()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [editing, setEditing] = useState(false)

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchUserById(Number(id))
        setUser(data)
      } catch {
        setError('Failed to load user')
      } finally {
        setLoading(false)
      }
    })()
  }, [id])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading user details...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md mx-auto">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Error Loading User</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={() => navigate(-1)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Go Back
          </button>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md mx-auto text-center">
          <div className="text-gray-400 text-6xl mb-4">👤</div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">User Not Found</h2>
          <p className="text-gray-600 mb-4">The user you're looking for doesn't exist.</p>
          <button 
            onClick={() => navigate(-1)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Go Back
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b dark:border-gray-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 mb-4"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Dashboard
          </button>
          <h1 className="text-3xl font-bold text-gray-900">User Details</h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700">
          {/* User Header */}
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 px-8 py-12">
            <div className="flex items-center">
              <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center text-white font-bold text-3xl">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div className="ml-6">
                <h2 className="text-3xl font-bold text-white">{user.name}</h2>
                <p className="text-blue-100 text-lg">User ID: {user.id}</p>
              </div>
              <div className="ml-auto flex space-x-3">
                <button
                  onClick={() => setEditing(true)}
                  className="px-3 py-1 bg-white/20 text-white rounded hover:bg-white/30 text-sm"
                >Edit</button>
                <button
                  onClick={async () => {
                    if (!confirm('Delete this user?')) return
                    try { await removeUser(user.id); toast.success('User deleted'); navigate('/'); } catch { toast.error('Delete failed') }
                  }}
                  className="px-3 py-1 bg-red-500/80 text-white rounded hover:bg-red-600 text-sm"
                >Delete</button>
              </div>
            </div>
          </div>

          {/* User Details */}
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Contact Information
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <span className="text-gray-500 w-20">Email:</span>
                    <span className="text-gray-900">{user.email}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-gray-500 w-20">Phone:</span>
                    <span className="text-gray-900">{user.phone || 'Not provided'}</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <svg className="w-5 h-5 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Address
                </h3>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <span className="text-gray-500 w-20">Street:</span>
                    <span className="text-gray-900">{user.street || 'Not provided'}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-gray-500 w-20">City:</span>
                    <span className="text-gray-900">{user.city || 'Not provided'}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-gray-500 w-20">Zip:</span>
                    <span className="text-gray-900">{user.zipcode || 'Not provided'}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Coordinates */}
            {(user.geo_lat || user.geo_lng) && (
              <div className="mt-8 pt-8 border-t border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <svg className="w-5 h-5 mr-2 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                  </svg>
                  Geographic Coordinates
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <span className="text-gray-500 block text-sm">Latitude</span>
                    <span className="text-gray-900 font-mono">{user.geo_lat || 'N/A'}</span>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <span className="text-gray-500 block text-sm">Longitude</span>
                    <span className="text-gray-900 font-mono">{user.geo_lng || 'N/A'}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {editing && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
          <div className="max-w-xl w-full">
            <UserForm
              mode="edit"
              initialUser={user}
              onSuccess={async () => {
                try { const updated = await fetchUserById(Number(id)); setUser(updated); toast.success('User updated'); } catch { toast.error('Refresh failed') }
                setEditing(false)
              }}
              onCancel={() => setEditing(false)}
            />
          </div>
        </div>
      )}
    </div>
  )
}