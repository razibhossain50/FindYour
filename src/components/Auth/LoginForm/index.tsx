'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { payloadClient } from '@/lib/payload-client'

export const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    
    try {
      console.log('Attempting login with:', formData.email) // Debug log
      const result = await payloadClient.login({
        collection: 'regular-users',
        data: {
          email: formData.email.toLowerCase().trim(), // Normalize email
          password: formData.password,
        },
        depth: 1,
      })
      
      if (result?.token) {
        console.log('Login successful, token received') // Debug log
        router.push('/')
        router.refresh()
      } else {
        console.log('Login failed, no token received') // Debug log
        setError('Login failed. Please check your credentials.')
      }
    } catch (err: any) {
      console.error('Login error details:', err) // Detailed error log
      setError(err?.response?.data?.message || 'Login failed. Please try again.')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          type="email"
          id="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        />
      </div>
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <input
          type="password"
          id="password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        />
      </div>
      {error && <div className="text-red-500 text-sm">{error}</div>}
      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
      >
        Sign in
      </button>
    </form>
  )
}
