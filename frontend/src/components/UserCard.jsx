import { useNavigate } from 'react-router-dom'
import { FiEdit, FiTrash2 } from 'react-icons/fi'

export default function UserCard({ user, onEdit, onDelete }) {
  const navigate = useNavigate()

  return (
    <div className="relative group bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 p-6 border border-gray-100 dark:border-gray-700">
      <div className="flex items-center mb-4">
        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
          {user.name.charAt(0).toUpperCase()}
        </div>
        <div className="ml-3">
          <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-lg">{user.name}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">ID: {user.id}</p>
        </div>
      </div>

      <div className="mb-3">
        <p className="text-sm text-gray-600 dark:text-gray-300 break-all">{user.email}</p>
      </div>

      <div className="flex flex-wrap gap-2 text-xs text-gray-500 dark:text-gray-400 mb-4">
        {user.phone && <span className="inline-flex items-center">� {user.phone}</span>}
        {user.city && <span className="inline-flex items-center">📍 {user.city}</span>}
      </div>

      <div className="flex space-x-2">
        <button
          className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 px-4 rounded-lg font-medium hover:from-blue-600 hover:to-purple-700 transition-colors"
          onClick={() => navigate(`/users/${user.id}`)}
        >Details</button>
        <button
          onClick={() => onEdit && onEdit(user)}
          aria-label="Edit user"
          className="p-2 rounded border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
        ><FiEdit /></button>
        <button
          onClick={() => onDelete && onDelete(user.id)}
          aria-label="Delete user"
          className="p-2 rounded border border-red-300 text-red-600 hover:bg-red-50 dark:border-red-600 dark:hover:bg-red-900/30"
        ><FiTrash2 /></button>
      </div>
    </div>
  )
}