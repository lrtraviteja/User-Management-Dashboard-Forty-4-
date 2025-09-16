import axios from 'axios'

// Determine API base URL: prefer explicit env, fallback to relative /api
const baseURL = (import.meta.env && import.meta.env.VITE_API_BASE) ? import.meta.env.VITE_API_BASE : '/api'

const api = axios.create({
  baseURL
})

export const getUsers = () => api.get('/users')
export const getUser = (id) => api.get(`/users/${id}`)
export const createUser = (data) => api.post('/users', data)
export const updateUser = (id, data) => api.put(`/users/${id}`, data)
export const deleteUser = (id) => api.delete(`/users/${id}`)

export default {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser
}