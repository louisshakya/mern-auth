import axios from "axios";

const instance = axios.create({
  baseURL: "https://mern-auth-backend.vercel.app/",
  timeout: 2000,
});

export default instance;
