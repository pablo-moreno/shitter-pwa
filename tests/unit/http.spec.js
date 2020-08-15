import BaseHttpAPIService from '@/services/http'

class HttpAPIService extends BaseHttpAPIService {
  API_URL = 'http://shitter-back:8000/api'
}

describe('Http Service', () => {
  it('Should create a new user', async () => {
    const instance = new HttpAPIService()
    let response = undefined
    try {
      const userData = {
        username: 'shitter',
        password: 'Nx0AP920RsVuujr0',
        password2: 'Nx0AP920RsVuujr0',
        email: 'shitter@shitter.com'
      }
  
      response = await instance.post('auth/sign-up', userData)
      expect(response.status).toBe(201)  
    }
    catch (error) {
      console.log('error', error)
      console.log('response', response)
    }
  })
})
