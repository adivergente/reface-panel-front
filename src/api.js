import axios from "axios";
export const api = axios.create({
  //baseURL: "http://10.5.0.7:61"
  baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:61/api' : 'http://tiendavirtual.dyndns.org:61/api'
})

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('reface')

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },

  (error) => {
    return Promise.reject(error)
  }
)

// export default api
