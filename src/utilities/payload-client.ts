const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'

interface PayloadClientOptions {
  collection: string;
  data?: Record<string, any>;
  depth?: number;
}

export const payloadClient = {
  async login({ collection, data }: PayloadClientOptions) {
    const response = await fetch(`${SERVER_URL}/api/${collection}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(data),
    })
    
    const result = await response.json()
    
    if (!response.ok) {
      throw new Error(result.errors?.[0]?.message || 'Login failed')
    }
    
    return result
  },

  async create({ collection, data }: PayloadClientOptions) {
    const response = await fetch(`${SERVER_URL}/api/${collection}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(data),
    })
    
    const result = await response.json()
    
    if (!response.ok) {
      throw new Error(result.errors?.[0]?.message || 'Creation failed')
    }
    
    return result
  },

  async me({ collection }: PayloadClientOptions) {
    const response = await fetch(`${SERVER_URL}/api/${collection}/me`, {
      credentials: 'include',
    })

    if (response.status === 401) {
      return { user: null }
    }
    
    const result = await response.json()
    
    if (!response.ok) {
      throw new Error(result.errors?.[0]?.message || 'Failed to fetch user')
    }
    
    return result
  },

  async logout({ collection }: PayloadClientOptions) {
    const response = await fetch(`${SERVER_URL}/api/${collection}/logout`, {
      method: 'POST',
      credentials: 'include',
    })
    
    return response.json()
  },
}
