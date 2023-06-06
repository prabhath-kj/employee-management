import axios from "axios"
const instance = axios.create({
  baseURL: "http://localhost:5000/",
  timeout: 1000,
  headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
});
export default instance;
