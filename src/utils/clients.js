import axios from "axios";

const appClient = axios.create({
  baseURL: 'http://localhost:3001'
})

export {
  appClient
}