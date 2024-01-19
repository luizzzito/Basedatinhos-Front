import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000";

export const classify = async (file) => {
  try {
    const formData = new FormData();
    formData.append("file", file, { type: "audio/wav" });

    const { data } = await axios.post(`${BASE_URL}/sounds/classify`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};
