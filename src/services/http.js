import axios from 'axios'

const http = axios.create({
  baseURL: process.env.VUE_APP_API_URL || 'http://localhost:8000/api',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  }
})

class BaseHttpAPIService {
  HTTP_AUTHORIZATION_HEADER = process.env.VUE_API_HTTP_AUTHORIZATION_HEADER || 'JWT'
  
  constructor() {
    this.http = http
    this.token = undefined
    this.headers = {}
  }

  getToken() {
    return this.token
  }

  setToken(token) {
    this.token = token
  }

  getHeaders() {
    const token = this.getToken()

    if (! token) {
      return this.headers
    }

    return {
      ...this.headers,
      'Authorization': `${this.HTTP_AUTHORIZATION_HEADER} ${this.getToken()}`
    }
  }

  getUrl(...params) {
    return params.join('/')
  }

  async get(url, params={}, config={}) {
    const headers = this.getHeaders()
    return this.http.get(url, { params, headers, ...config })
  }

  async post(url, data, params={}, config={}) {
    const headers = this.getHeaders()
    return this.http.post(url, data, { headers, params, ...config })    
  }

  async put(url, data, params={}, config={}) {
    const headers = this.getHeaders()
    return this.http.put(url, data, { headers, params, ...config })
  }

  async delete(url, params={}, config={}) {
    const headers = this.getHeaders()
    return this.http.delete(url, { headers, params, ...config })
  }
}

export default BaseHttpAPIService
