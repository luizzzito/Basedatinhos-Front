import { useEffect, useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import { classifyExisting } from "../services/classify-existing";
import useDownloadAudio from "../show-audios-list/DownloadAudio";
import AudioFileIcon from "@mui/icons-material/AudioFile";

const AudioCard = ({ audio }) => {
  const [autoTag, setAutoTag] = useState("");

  const downloadAudio = useDownloadAudio(audio);

  const getAutoTag = async (audio) => {
    try {
      if (!audio) return;
      console.log(audio);
      const res = await classifyExisting(audio.source);
      console.log(res);
      const words = res.category.split(" ");
      setAutoTag(words[5]);
      console.log(autoTag);
      return res;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAutoTag(audio);
  }, [getAutoTag]);

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        background: "white",
        borderRadius: "10px",
      }}
    >
      <Box
        sx={{
          width: "100%",
          height: "100px",
          background: "linear-gradient(180deg, #42D2B8 0%, #425DD2 100%)",
          borderRadius: "10px 10px 0 0",
        }}
      />
      <Box
        sx={{
          margin: "20px",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <Typography
          sx={{ fontFamily: "inter", fontSize: "28px", fontWeight: "600" }}
        >
          {audio.description}
        </Typography>

        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Typography
              sx={{ fontFamily: "inter", fontSize: "18px", fontWeight: "600" }}
            >
              Derechos de Autor:
            </Typography>
            <Typography
              sx={{ fontFamily: "inter", fontSize: "18px", fontWeight: "400" }}
            >
              {audio.copyright}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography
              sx={{ fontFamily: "inter", fontSize: "18px", fontWeight: "600" }}
            >
              Referencias:
            </Typography>
            <Typography
              sx={{ fontFamily: "inter", fontSize: "18px", fontWeight: "400" }}
            >
              {audio.reference}
            </Typography>
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "50%",
            }}
          >
            <Typography
              sx={{
                fontFamily: "inter",
                fontSize: "18px",
                fontWeight: "600",
                textAlign: "center",
              }}
            >
              Clasificación Manual:
            </Typography>
            <Typography
              sx={{
                fontFamily: "inter",
                fontSize: "18px",
                fontWeight: "600",
                background: "#42D2B8",
                textAlign: "center",
                color: "white",
                textTransform: "capitalize",
                mx: "80px",
                borderRadius: "8px",
              }}
            >
              {audio.tag}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", width: "50%" }}>
            <Typography
              sx={{
                fontFamily: "inter",
                fontSize: "18px",
                fontWeight: "600",
                textAlign: "center",
              }}
            >
              Clasificación Automática (I.A):
            </Typography>
            <Typography
              sx={{
                fontFamily: "inter",
                fontSize: "18px",
                fontWeight: "600",
                textAlign: "center",
                background: "#425DD2",
                color: "white",
                textTransform: "capitalize",
                mx: "80px",
                borderRadius: "8px",
              }}
            >
              {autoTag}
            </Typography>
          </Box>
        </Box>

        <Button
          variant="contained"
          sx={{
            textTransform: "capitalize",
            fontFamily: "inter",
            width: "200px",
          }}
          onClick={() => downloadAudio(audio)}
        >
          Descargar Audio
          <AudioFileIcon />
        </Button>
      </Box>
    </Box>
  );
};

export default AudioCard;
