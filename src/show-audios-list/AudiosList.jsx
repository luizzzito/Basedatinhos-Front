import {
  Box,
  TextField,
  InputAdornment,
  Button,
  IconButton,
  Typography,
  Modal,
} from "@mui/material";
import { useState, useEffect, useRef, useCallback } from "react";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import UploadAudios from "../upload-audios/UploadAudios";
import AudioCard from "../audio-card/AudioCard";
import { fetchAllAudios } from "../services/get-all-audios";
import DownloadIcon from "@mui/icons-material/Download";
import ReadMoreIcon from "@mui/icons-material/ReadMore";
import useDownloadAudio from "./DownloadAudio";

function App() {
  const [showClearIcon, setShowClearIcon] = useState("none");
  const [audios, setAudios] = useState([]);
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [audio, setAudio] = useState(null);

  const getAllAudios = useCallback(async () => {
    try {
      const { sounds } = await fetchAllAudios();
      setAudios(sounds);
      return sounds;
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    getAllAudios();
  }, [getAllAudios]);

  const handleChange = (event) => {
    setShowClearIcon(event.target.value === "" ? "none" : "flex");
  };
  const handleClick = () => {
    console.log("clicked the clear icon...");
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "40%",
    bgcolor: "background.paper",
    boxShadow: 24,
    display: "flex",
    borderRadius: "10px",
    height: "60%",
  };

  const style2 = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "40%",
    bgcolor: "background.paper",
    boxShadow: 24,
    display: "flex",
    borderRadius: "10px",
    height: "60%",
  };

  const downloadAudio = useDownloadAudio(audio);

  return (
    <Box
      sx={{
        background: "linear-gradient(180deg, #42D2B8 0%, #425DD2 100%)",
        py: "100px",
        minHeight: "100vh",
      }}
    >
      {console.log(audios)}
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
          height: "auto",
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
              justifyContent: "flex-end",
            }}
          >
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

        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            backgroundColor: "white",
            width: "100%",
            height: "auto",
            overflowY: "auto",
            alignContent: "center",
            px: "20px",
            py: "50px",
            gap: "30px",
            borderRadius: "10px",
            flexWrap: "wrap",
            justifyContent: "space-between",
          }}
        >
          {audios &&
            audios.length > 0 &&
            audios.map((audio, index) => (
              <Box
                key={index}
                sx={{
                  borderRadius: "6px",
                  border: "solid 2px",
                  borderColor: "#007EA7",
                  paddingBottom: "30px",
                  height: "250px",
                  width: "250px",
                  padding: "15px",
                  backgroundColor: "#FFFFFF",
                  overflowY: "auto",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    flexWrap: "wrap",
                    wordWrap: "break-word",
                  }}
                >
                  <Typography
                    sx={{
                      color: "#003459",
                      fontFamily: "inter",
                      display: "flex",
                      fontSize: "20px",
                      fontWeight: "600",
                      wordWrap: "break-word",
                    }}
                  >
                    Título: {audio.description}
                  </Typography>
                  <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <Typography
                      sx={{
                        color: "#003459",
                        fontFamily: "inter",
                        display: "flex",
                        fontSize: "20px",
                        wordWrap: "break-word",
                      }}
                    >
                      Derechos Reservados: {audio.copyright}
                    </Typography>
                    <Typography
                      sx={{
                        color: "#003459",
                        fontFamily: "inter",
                        display: "flex",
                        fontSize: "20px",
                        wordWrap: "break-word",
                      }}
                    >
                      Referencias:
                    </Typography>
                    <Typography
                      sx={{
                        color: "#003459",
                        fontFamily: "inter",
                        display: "flex",
                        fontSize: "20px",
                        wordWrap: "break-word",
                      }}
                    >
                      {audio.reference}
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      width: "100%",
                      justifyContent: "space-evenly",
                      alignContent: "flex-end",
                      marginTop: "20px",
                    }}
                  >
                    <IconButton
                      onClick={() => {
                        setAudio(audio);
                        downloadAudio(audio);
                      }}
                      sx={{
                        display: "flex",
                        backgroundColor: "#007ea7",
                        "&:hover": {
                          backgroundColor: "#003459",
                        },
                        textTransform: "capitalize",
                        fontFamily: "inter",
                        fontSize: "16px",
                        height: "40px",
                        width: "40px",
                        marginBottom: "10px",
                      }}
                    >
                      <DownloadIcon sx={{ color: "white" }} />
                    </IconButton>

                    <IconButton
                      onClick={() => {
                        setOpen2(true);
                        setAudio(audio);
                      }}
                      sx={{
                        display: "flex",
                        backgroundColor: "#007ea7",
                        "&:hover": {
                          backgroundColor: "#003459",
                        },
                        textTransform: "capitalize",
                        fontFamily: "inter",
                        fontSize: "16px",
                        height: "40px",
                        width: "40px",
                        marginBottom: "10px",
                      }}
                    >
                      <ReadMoreIcon sx={{ color: "white" }} />
                    </IconButton>
                  </Box>
                </Box>
              </Box>
            ))}
        </Box>
      </Box>
      <div>
        <Modal open={open} onClose={() => setOpen(false)}>
          <Box sx={style}>
            <UploadAudios setOpen={setOpen} />
          </Box>
        </Modal>
      </div>
      <div>
        <Modal open={open2} onClose={() => setOpen2(false)}>
          <Box sx={style2}>
            <AudioCard audio={audio} />
          </Box>
        </Modal>
      </div>
    </Box>
  );
}

export default App;
