import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000";

export const fetchAudioFileById = async (id) => {
  try {
    const data = await axios.get(`${BASE_URL}/sounds/${id}/file`, {
      responseType: "blob",
    });
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};
