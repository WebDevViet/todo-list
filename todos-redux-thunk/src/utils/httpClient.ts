import axios, { AxiosInstance } from 'axios'

class HttpClient {
  instance: AxiosInstance

  constructor() {
    this.instance = axios.create({
      baseURL: 'http://localhost:4000/',
      timeout: 10000
    })
  }
}

export default new HttpClient().instance
