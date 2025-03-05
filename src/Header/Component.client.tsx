'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState, useCallback } from 'react'
import type { Header } from '@/payload-types'
import { Logo } from '@/components/Logo/Logo'
import { HeaderNav } from './Nav'

interface HeaderClientProps {
  data: Header
}

interface User {
  fullName: string
}

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoggedIn, setIsLoggedIn] = useState(true)

  const logout = useCallback(() => {
    setUser(null)
    setIsLoggedIn(false)
  }, [])

  return {
    user,
    isLoggedIn,
    logout
  }
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  const [theme, setTheme] = useState<string | null>(null)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()
  const { isLoggedIn, user, logout } = useAuth()

  useEffect(() => {
    setHeaderTheme(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) setTheme(headerTheme)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headerTheme])

  return (
    <header className="header relative bg-blue-950 text-white shadow-sm shadow-gray-300 z-20" {...(theme ? { 'data-theme': theme } : {})}>
      <div className='container'>
        <div className="py-8 flex items-center justify-between">
          <Link href="/">
            <Logo loading="eager" priority="high" className="invert dark:invert-0" />
          </Link>
          <div className="flex items-center space-x-8">
            <HeaderNav data={data} />
            <div className="flex items-center space-x-4">
              {isLoggedIn ? (
                <div className="flex items-center space-x-4">
                  <Link 
                    href="/add-lawyer-profile"
                    className="text-white hover:text-gray-200 px-4 py-2 bg-green-600 rounded-md hover:bg-green-700 transition-colors"
                  >
                    Add Lawyer Profile
                  </Link>
                  <Link href="/profile" className="text-white hover:text-gray-200">
                    {user?.fullName}
                  </Link>
                  <button
                    onClick={logout}
                    className="px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-700 transition-colors"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="text-white hover:text-gray-200"
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    className="px-4 py-2 bg-white text-blue-950 rounded-md hover:bg-gray-100 transition-colors"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
