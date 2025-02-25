'use client'
import { LoginForm } from "@/components/Auth/LoginForm"
import { RegisterForm } from "@/components/Auth/RegisterForm"
import { useState } from "react"

type Props = {
  title?: string
  description?: string
}

export const LoginSignupBlock: React.FC<Props> = ({ 
  title = 'Login or Sign Up',
  description = 'Join our community of legal professionals and clients.'
}) => {
  const [isLogin, setIsLogin] = useState(true)

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          {title}
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          {description}
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="flex justify-center space-x-4 mb-6">
            <button
              onClick={() => setIsLogin(true)}
              className={`px-4 py-2 rounded ${
                isLogin ? 'bg-indigo-600 text-white' : 'text-gray-700'
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`px-4 py-2 rounded ${
                !isLogin ? 'bg-indigo-600 text-white' : 'text-gray-700'
              }`}
            >
              Sign Up
            </button>
          </div>
          {isLogin ? <LoginForm /> : <RegisterForm />}
        </div>
      </div>
    </div>
  )
}
