import axios, { AxiosResponse } from 'axios'

const {
  RENDERER_VITE_RABBITMQ_PORT,
  RENDERER_VITE_RABBITMQ_HOSTNAME,
  RENDERER_VITE_RABBITMQ_USERNAME,
  RENDERER_VITE_RABBITMQ_PASSWORD
} = import.meta.env

const url = `http://${RENDERER_VITE_RABBITMQ_HOSTNAME}:${RENDERER_VITE_RABBITMQ_PORT}/api`

const api = {
  get: async (resource: string): Promise<AxiosResponse> =>
    axios.get(`${url}/${resource}`, {
      auth: {
        username: RENDERER_VITE_RABBITMQ_USERNAME,
        password: RENDERER_VITE_RABBITMQ_PASSWORD
      }
    })
}

export default api
