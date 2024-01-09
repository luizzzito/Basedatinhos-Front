import { Box, TextField, InputAdornment, Button, Icon } from "@mui/material";
import { useState, useEffect, useRef, useCallback } from "react";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import netflix from "./assets/netflix.wav";
import canserbero1 from "./assets/canserbero1.wav";
import canserbero2 from "./assets/canserbero2.wav";
import canserbero3 from "./assets/canserbero3.wav";
import canserbero4 from "./assets/canserbero4.wav";
import canserbero5 from "./assets/canserbero5.wav";
import WaveSurfer from "wavesurfer.js";

const audiosAux = [
  {
    type: "1",
    title: "Prueba 1",
    wav: canserbero1,
  },
  {
    type: "2",
    title: "Prueba 2",
    wav: canserbero2,
  },
  {
    type: "3",
    title: "Prueba 3",
    wav: canserbero3,
  },
  {
    type: "5",
    title: "Prueba 5",
    wav: canserbero5,
  },
  {
    type: "6",
    title: "Prueba 6",
    wav: netflix,
  },
];

function App() {
  const [showClearIcon, setShowClearIcon] = useState("none");
  const [audios, setAudios] = useState([]);
  const handleChange = (event) => {
    setShowClearIcon(event.target.value === "" ? "none" : "flex");
  };
  const handleClick = () => {
    console.log("clicked the clear icon...");
  };

  const audioRef = useRef();
  const canvasRef = useRef();

  const wavesurferRefs = useRef([]);

  const generateAudioSpectrums = useCallback(() => {
    setAudios(audiosAux);
    if (audios) {
      audios.forEach((audio, index) => {
        const wavesurfer = WaveSurfer.create({
          container: `#waveform${audio.type}`,
          waveColor: "#00A8E8",
          progressColor: "#007EA7",
        });

        wavesurfer.load(audio.wav);
        wavesurferRefs.current[index] = wavesurfer;

        return () => {
          wavesurfer.destroy();
        };
      });
    }
  }, [audios]);

  const handlePlay = (index) => {
    wavesurferRefs.current[index].play();
  };

  useEffect(() => {
    generateAudioSpectrums();
  }, [generateAudioSpectrums]);

  return (
    <Box>
      <Box>
        <TextField
          size="small"
          variant="outlined"
          onChange={handleChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment
                position="end"
                style={{ display: showClearIcon }}
                onClick={handleClick}
              >
                <ClearIcon />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "100px",
          maxWidth: "100%",
        }}
      >
        {audios.map((audio, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              width: "100%",
            }}
          >
            <Button
              sx={{

                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              onClick={() => handlePlay(index)}
            >
              <Icon sx={{ height: "100px", width: "100px" }}>
                <PlayCircleIcon sx={{ height: "100px", width: "100px" }} />
              </Icon>
            </Button>
            <Box sx={{ flexGrow: 1 }}>
              <Box
                component="div"
                id={`waveform${audio.type}`}
                sx={{
                  width: "30%",
                  height: "100%",
                  position: "absolute",
                }}
              />
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export default App;
