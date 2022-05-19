import axios from "../axios/axiosConfig";
const useRefresh = () => {
  const refresh = async () => {
    const response = await axios.get("/refresh", {
      withCredentials: true,
    });
    return response.data;
  };
  return refresh;
};

export default useRefresh;
