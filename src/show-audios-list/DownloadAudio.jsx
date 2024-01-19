import { useCallback } from "react";
import { fetchAudioFileById } from "../services/get-audio-by-id";

const useDownloadAudio = (audio) => {
  const downloadAudio = useCallback(async () => {
    try {
      console.log(audio);
      if (!audio) return;

      const response = await fetchAudioFileById(audio.id);

      const file = new Blob([response.data], { type: "audio/wav" });
      const fileURL = URL.createObjectURL(file);
      const link = document.createElement("a");

      link.href = fileURL;
      link.download = `${audio.description}.wav`;
      link.click();

      URL.revokeObjectURL(fileURL);
      return response;
    } catch (error) {
      console.log(error);
    }
  }, [audio]);

  return downloadAudio;
};

export default useDownloadAudio;
