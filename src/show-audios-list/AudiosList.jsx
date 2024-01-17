import {
  Box,
  TextField,
  InputAdornment,
  Button,
  Icon,
  Typography,
  Divider,
  Modal,
} from "@mui/material";
import { useState, useEffect, useRef, useCallback } from "react";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import PauseCircleIcon from "@mui/icons-material/PauseCircle";
import netflix from "../assets/netflix.wav";
import aguila1 from "../assets/AguilaHarpia_1.wav";
import aguila2 from "../assets/AguilaHarpia_2.wav";
import aguila3 from "../assets/AguilaHarpia_3.wav";
import aguila4 from "../assets/AguilaHarpia_4.wav";
import rio1 from "../assets/Rio_1.wav";
import rio2 from "../assets/Rio_2.wav";
import WaveSurfer from "wavesurfer.js";
import UploadAudios from "../upload-audios/UploadAudios";
const audiosAux = [
  {
    type: "1",
    title: "Aguila Harpía 1",
    wav: aguila1,
  },
  {
    type: "2",
    title: "Aguila Harpía 2",
    wav: aguila2,
  },
  {
    type: "3",
    title: "Aguila Harpía 3",
    wav: aguila3,
  },
  {
    type: "4",
    title: "Aguila Harpía 4",
    wav: aguila4,
  },
  {
    type: "5",
    title: "Rio 1",
    wav: rio1,
  },
  {
    type: "6",
    title: "Rio 2",
    wav: rio2,
  },
];

function App() {
  const [showClearIcon, setShowClearIcon] = useState("none");
  const [audios, setAudios] = useState([]);
  const [playingIndex, setPlayingIndex] = useState(null);
  const [open, setOpen] = useState(false);
  const handleChange = (event) => {
    setShowClearIcon(event.target.value === "" ? "none" : "flex");
  };
  const handleClick = () => {
    console.log("clicked the clear icon...");
  };

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
    const wavesurfer = wavesurferRefs.current[index];
    if (wavesurfer.isPlaying()) {
      wavesurfer.pause();
      setPlayingIndex(null);
    } else {
      wavesurfer.play();
      setPlayingIndex(index);
    }
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "40%",
    bgcolor: "background.paper",
    boxShadow: 24,
    borderRadius: "",
    p: 4,
    display: "flex",
    borderRadius: "10px",
  };

  useEffect(() => {
    generateAudioSpectrums();
  }, [generateAudioSpectrums]);

  return (
    <Box
      sx={{
        background: "linear-gradient(180deg, #42D2B8 0%, #425DD2 100%)",
        py: "100px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "40px",
          maxWidth: "100%",
          width: "70%",
          mx: "130px",
          backgroundColor: "#F2F2F2",
          px: "100px",
          pt: "50px",
          pb: "100px",
          borderRadius: "10px",
        }}
      >
        <Typography
          sx={{
            fontFamily: "inter",
            fontSize: "48px",
            alignSelf: "center",
            fontWeight: "700",
            color: "#003459",
          }}
        >
          Clasificador de Audios
        </Typography>
        <Box>
          <Box
            sx={{
              display: "flex",
              width: "100%",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <TextField
              size="small"
              variant="outlined"
              onChange={handleChange}
              sx={{ display: "flex", backgroundColor: "white", width: "50%" }}
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
            <Button
              variant="contained"
              onClick={() => setOpen(true)}
              sx={{
                display: "flex",
                backgroundColor: "#007ea7",
                "&:hover": {
                  backgroundColor: "#003459",
                },
                textTransform: "capitalize",
                fontFamily: "inter",
                fontSize: "16px",
              }}
            >
              Subir Audio
            </Button>
          </Box>
        </Box>

        {audios.map((audio, index) => (
          <Box
            key={index}
            sx={{
              height: "100%",
              borderRadius: "6px",
              border: "solid 2px",
              borderColor: "#007EA7",
              paddingBottom: "30px",
              px: "30px",
              backgroundColor: "#FFFFFF",
            }}
          >
            <Typography
              sx={{
                color: "#003459",
                fontFamily: "inter",
                display: "flex",
                justifyContent: "center",
                fontSize: "20px",
              }}
            >
              Audio de tipo {audio.type}: {audio.title}
            </Typography>
            <Divider sx={{ marginBottom: "10px" }} />
            <Box
              key={index}
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
                }}
                onClick={() => handlePlay(index)}
              >
                <Icon sx={{ height: "100px", width: "100px" }}>
                  {playingIndex !== index ? (
                    <PlayCircleIcon sx={{ height: "100px", width: "100px" }} />
                  ) : (
                    <PauseCircleIcon sx={{ height: "100px", width: "100px" }} />
                  )}
                </Icon>
              </Button>
              <Box sx={{ flexGrow: 1 }}>
                <Box
                  component="div"
                  id={`waveform${audio.type}`}
                  sx={{
                    width: "55%",
                    height: "100%",
                    position: "absolute",
                  }}
                />
              </Box>
            </Box>
          </Box>
        ))}
      </Box>
      <div>
        <Modal open={open} onClose={() => setOpen(false)}>
          <Box sx={style}>
            <UploadAudios />
          </Box>
        </Modal>
      </div>
    </Box>
  );
}

export default App;
