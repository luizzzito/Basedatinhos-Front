import { Box, Icon, Button, Typography, TextField } from "@mui/material";
import { useState, useRef, useEffect, useCallback } from "react";
import WaveSurfer from "wavesurfer.js";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import PauseCircleIcon from "@mui/icons-material/PauseCircle";

const UploadAudios = () => {
  const [file, setFile] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const wavesurfer = useRef(null);

  const onChange = (event) => {
    setFile(URL.createObjectURL(event.target.files[0]));
  };

  const generateAudioSpectrums = useCallback(() => {
    if (file) {
      wavesurfer.current = WaveSurfer.create({
        container: `#waveform`,
        waveColor: "#00A8E8",
        progressColor: "#007EA7",
      });

      wavesurfer.current.load(file);

      return () => {
        wavesurfer.current.destroy();
      };
    }
  }, [file]);

  const handlePlay = () => {
    if (wavesurfer.current.isPlaying()) {
      wavesurfer.current.pause();
      setIsPlaying(false);
    } else {
      wavesurfer.current.play();
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    generateAudioSpectrums();
  }, [generateAudioSpectrums]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
      <Typography
        sx={{
          fontFamily: "inter",
          fontSize: "20px",
          alignSelf: "center",
          marginBottom: "20px",
        }}
      >
        ¡Sube el audio que desees!
      </Typography>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          marginBottom: "25px",
        }}
      >
        <TextField
          sx={{
            display: "flex",
            width: "100%",
            alignItems: "center",
            justifyItems: "center",
          }}
          type="file"
          onChange={onChange}
        />
      </Box>
      {file ? (
        <>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              width: "100%",
              gap: "40px",
              height: "100%",
            }}
          >
            <Button
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                selfAlign: "center",
                marginLeft: " 100px",
              }}
              onClick={() => handlePlay()}
            >
              <Icon sx={{ height: "100px", width: "100px" }}>
                {isPlaying ? (
                  <PauseCircleIcon sx={{ height: "100px", width: "100px" }} />
                ) : (
                  <PlayCircleIcon sx={{ height: "100px", width: "100px" }} />
                )}
              </Icon>
            </Button>
            <Box sx={{ flexGrow: 1 }}>
              <Box
                component="div"
                id={"waveform"}
                sx={{
                  width: "55%",
                  height: "100%",
                  position: "absolute",
                }}
              />
            </Box>
          </Box>
        </>
      ) : (
        <Typography sx={{ display: "flex", alignSelf: "center" }}>
          No se han subido audios
        </Typography>
      )}
      <Button
        sx={{
          display: "flex",
          alignSelf: "center",
          width: "100px",
          marginTop: "50px",
          backgroundColor: "#007ea7",
          "&:hover": {
            backgroundColor: "#003459",
          },
          textTransform: "capitalize",
          fontFamily: "inter",
          fontSize: "16px",
        }}
        variant="contained"
      >
        Guardar
      </Button>
    </Box>
  );
};

export default UploadAudios;
