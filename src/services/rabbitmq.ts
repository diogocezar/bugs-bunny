import axios from "axios";
import * as dotenv from "dotenv";
dotenv.config();

const {
  RABBITMQ_PORT,
  RABBITMQ_HOSTNAME,
  RABBITMQ_USERNAME,
  RABBITMQ_PASSWORD,
} = process.env;

console.log(RABBITMQ_HOSTNAME);

const url = `http://${RABBITMQ_HOSTNAME}:${RABBITMQ_PORT}/api`;
const token = `${process.env.RABBITMQ_USERNAME}:${process.env.RABBITMQ_PASSWORD}`;
const auth = `Basic ${Buffer.from(token).toString("base64")}`;

const api = {
  get: (resource: string, params?: any) =>
    axios.get(`${url}/${resource}`, {
      params,
      headers: { Authorization: auth },
    }),
};

export default api;
