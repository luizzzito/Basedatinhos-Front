import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000";

export const classifyExisting = async (url) => {
  try {
    const response = await axios.get(url, { responseType: "blob" });
    const audioFile = new File([response.data], "audio.wav", {
      type: "audio/wav",
    });

    const formData = new FormData();
    formData.append("file", audioFile);

    const { data } = await axios.post(`${BASE_URL}/sounds/classify`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return data;
  } catch (error) {
    console.error(error);
  }
};
