import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000";

export const uploadAudio = async (body) => {
  try {
    console.log(body);

    const formData = new FormData();
    formData.append("id", body.id);
    formData.append("description", body.description);
    formData.append("reference", body.reference);
    formData.append("type", "audio");
    formData.append("copyright", body.copyright);
    formData.append("tag", body.tag);
    formData.append("work_id", body.work_id);
    formData.append("author_id", body.author_id);
    formData.append("publication_id", body.publication_id);
    formData.append("file", body.file, body.file.name, { type: "audio/wav" });
    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }

    console.log(formData);
    const { data } = await axios.post(`${BASE_URL}/sounds`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};
