import axios from 'axios'
import config from 'config/config'

const API = {
  isAuthAndGetUser: async () => {
    return await axios.get(config.isAuthAndGetUser, {
      withCredentials: true,
    })
  },

  getUser: async () => {
    return await axios.get('http://localhost:8000/api/v1/auth/user', {
      withCredentials: true,
    })
  },
}

export default API
