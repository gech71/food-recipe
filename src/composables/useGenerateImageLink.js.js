import axios from "../axios/axiosConfig";

const useGenerateImageLink = async (filename, base64img) => {
  try {
    const response = await axios.post("/fileUpload", {
      filename,
      base64img: base64img.split(",")[1],
    });
    return response.data.imgUrl;
  } catch (error) {}
};

export default useGenerateImageLink;
