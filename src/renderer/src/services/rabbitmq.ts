import axios, { AxiosResponse } from 'axios'
import { Buffer } from 'buffer'

const {
  RENDERER_VITE_RABBITMQ_PORT,
  RENDERER_VITE_RABBITMQ_HOSTNAME,
  RENDERER_VITE_RABBITMQ_USERNAME,
  RENDERER_VITE_RABBITMQ_PASSWORD
} = import.meta.env

const url = `http://${RENDERER_VITE_RABBITMQ_HOSTNAME}:${RENDERER_VITE_RABBITMQ_PORT}/api`
const auth = `Basic ${Buffer.from(
  `${process.env.RENDERER_VITE_RABBITMQ_USERNAME}:${process.env.RENDERER_VITE_RABBITMQ_PASSWORD}`
).toString('base64')}`

const api = {
  get: async (resource: string): Promise<AxiosResponse> =>
    axios.get(`${url}/${resource}`, {
      headers: { Authorization: auth }
    })
}

export default api
