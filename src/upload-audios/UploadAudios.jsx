import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Typography,
  TextField,
} from "@mui/material";
import { useState, useEffect, useCallback } from "react";
import { v4 as uuidv4 } from "uuid";
import { uploadAudio } from "../services/upload-audios";
import { classify } from "../services/classify";

const UploadAudios = () => {
  const [file, setFile] = useState(null);
  const [audioTag, setAudioTag] = useState("");
  const [tag, setTag] = useState("");
  const [description, setDescription] = useState("");
  const [copyright, setCopyright] = useState("");
  const [reference, setReference] = useState("");

  const onChangeFile = (event) => {
    setFile(event.target.files[0]);
  };
  const handleChangeTag = (event) => {
    setTag(event.target.value);
  };

  const handleChangeDescription = (event) => {
    setDescription(event.target.value);
  };

  const handleChangeCopyright = (event) => {
    setCopyright(event.target.value);
  };

  const handleChangeReference = (event) => {
    setReference(event.target.value);
  };

  const getAudioTag = async (file) => {
    try {
      if (!file) return;
      const res = await classify(file);
      console.log(res);
      const words = res.category.split(" ");
      setAudioTag(words[5]);
      console.log(audioTag);
      return res;
    } catch (error) {}
  };

  useEffect(() => {
    getAudioTag(file);
  }, [getAudioTag]);

  const uuid = uuidv4();

  const onSubmitForm = async (event) => {
    event.preventDefault();
    try {
      const body = {
        id: uuid,
        description,
        reference,
        type: "Sonido",
        copyright,
        tag,
        file,
        work_id: "",
        author_id: "",
        publication_id: "",
      };
      const response = await uploadAudio(body);
      console.log(response);
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        margin: "30px",
        overflowY: "auto",
      }}
      component="form"
      onSubmit={onSubmitForm}
    >
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
          display: "flex",
          gap: "10px",
          flexDirection: "column",
          width: "100%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            gap: "10px",
          }}
        >
          <TextField
            required
            id="description"
            label="Título"
            onChange={handleChangeDescription}
            sx={{ width: "50%" }}
          />
          <FormControl required sx={{ width: "50%" }}>
            <InputLabel>Etiqueta</InputLabel>
            <Select id="tag" onChange={handleChangeTag} label="Etiqueta">
              <MenuItem value={"musica"}>Música</MenuItem>
              <MenuItem value={"animal"}>Animal</MenuItem>
              <MenuItem value={"ambiental"}>Ambiental</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <TextField
          required
          id="copyright"
          label="Derechos de autor"
          onChange={handleChangeCopyright}
        />

        <TextField
          required
          id="reference"
          label="Referencia"
          onChange={handleChangeReference}
        />
        <TextField variant="standard" type="file" onChange={onChangeFile} />
      </Box>

      {file && audioTag ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            marginTop: "10px",
            alignItems: "center",
          }}
        >
          <Typography sx={{ fontFamily: "inter" }}>
            La clasificación es:
          </Typography>
          <Typography
            sx={{
              marginLeft: "10px",
              background: "#425DD2",
              borderRadius: "6px",
              px: "10px",
              py: "2px",
              color: "white",
              textTransform: "capitalize",
              fontFamily: "inter",
            }}
          >
            {audioTag}
          </Typography>
        </Box>
      ) : (
        <Box
          sx={{
            marginTop: "20px",
            display: "flex",
            width: "100%",
            alignContent: "center",
            justifyContent: "center",
          }}
        >
          <Typography sx={{}}>No se han subido audios</Typography>
        </Box>
      )}

      <Button
        sx={{
          display: "flex",
          alignSelf: "center",
          width: "100px",
          backgroundColor: "#007ea7",
          "&:hover": {
            backgroundColor: "#003459",
          },
          textTransform: "capitalize",
          fontFamily: "inter",
          fontSize: "16px",
          marginTop: "10px",
        }}
        variant="contained"
        type="submit"
      >
        Guardar
      </Button>
    </Box>
  );
};

export default UploadAudios;
