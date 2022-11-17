import axios from "axios";

// const baseURL = "http://localhost:5000/";
// const baseURL = "https://floating-temple-76128.herokuapp.com/";
const baseURL = "https://food-recipe-app-backend.onrender.com";

const app = axios.create({
  baseURL,
  withCredentials: true,
});

app.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default app;
