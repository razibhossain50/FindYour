const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'

async function fetchWithError(url: string, options: RequestInit = {}) {
  const response = await fetch(url, options)
  const data = await response.json()
  
  if (!response.ok) {
    throw new Error(data.message || 'An error occurred')
  }
  
  return data
}

export const payloadClient = {
  async login({ collection, data }: { collection: string; data: any }) {
    return fetchWithError(`${SERVER_URL}/api/${collection}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
      credentials: 'include',
    })
  },

  async logout() {
    document.cookie = 'regular-user-token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;'
    return fetchWithError(`${SERVER_URL}/api/regular-users/logout`, {
      method: 'POST',
      credentials: 'include',
    })
  },

  async me({ collection }: { collection: string }) {
    return fetchWithError(`${SERVER_URL}/api/${collection}/me`, {
      credentials: 'include',
    })
  },

  async regularLogin(data: { email: string; password: string }) {
    return fetchWithError(`${SERVER_URL}/api/regular-users/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
      credentials: 'include',
    })
  },

  async regularLogout() {
    return fetchWithError(`${SERVER_URL}/api/regular-users/logout`, {
      method: 'POST',
      credentials: 'include',
    })
  },

  async regularMe() {
    return fetchWithError(`${SERVER_URL}/api/regular-users/regular-me`, {
      credentials: 'include',
    })
  },

  async create({ collection, data }: { collection: string; data: any }) {
    return fetchWithError(`${SERVER_URL}/api/${collection}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
      credentials: 'include',
    })
  },

  async regularRegister(data: { fullName: string; email: string; password: string }) {
    return fetchWithError(`${SERVER_URL}/api/regular-users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fullName: data.fullName,
        email: data.email,
        password: data.password,
        role: 'user',
      }),
      credentials: 'include',
    })
  }
}
