import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000";

export const fetchAllAudios = async () => {
  try {
    const { data } = await axios.get(`${BASE_URL}/sounds`);
    return data;
  } catch (error) {
    console.log(error);
  }
};
