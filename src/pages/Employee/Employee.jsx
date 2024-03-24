// CSS
import "./Employee.css";

// Material Ui
import EditIcon from '@mui/icons-material/Edit';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import {
  Button,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Switch,
  TextField,
  FormControlLabel
} from "@mui/material";

// Hooks
import { useState } from "react";

// Components
import Notification from "../../components/Notification/Notification";

var _ = require('lodash');

const Employee = () => {
  const [name, setName] = useState('');
  const [stepCounter, setStepCounter] = useState(1);
  const [experiences, setExperiences] = useState([]);
  const [experience, setExperience] = useState({
    id: '',
    date: '',
    position: '',
    location: '',
    aboutPosition: ''
  });

  const handleExperience = (e) => {
    setExperience({ ...experience, [e.target.name]: e.target.value, id: _.uniqueId() });
  }

  const handleExperiences = (e) => {
    if(experience.date !== '' && experience.position !== '' && experience.location !== '' && experience.aboutPosition !== '' ) {
      setExperiences([...experiences, experience]);
      setExperience({
        id: '',
        date: '',
        position: '',
        location: '',
        aboutPosition: ''
      });
    }
    else {
      Notification({text: "Ausência de dados para inclusão de experiência", type: "error"})
    }
  }

  const deleteExperiente = (id) => {
    setExperiences(experiences.filter((experience) => experience.id != id));
  }

  return (
    <div className="authContainer">

      <p>{stepCounter}</p>

      <div className="title">
        <h1>
          {stepCounter <= 3 && "Informação de contato"}
        </h1>
        <EditIcon fontSize="small"/>
      </div>

      {stepCounter === 1 && (
        <>
          <div className="firstSection">
            <div className="firstSectionInputs">
              <TextField
                id="name"
                label="Nome"
                value={name}
                onChange={(e) => setName(e.target.value)}
                helperText="ex: Tiago"
              />

              <TextField
                id="lastname"
                label="Sobrenome"
                helperText="ex: Souza"
              />
            </div>

            <div className="firstSectionImgContainer">
              <div className="pictureContainer">
                <div className="image"></div>
              </div>

              <div className="pictureOptions">
                <h3>Foto do Perfil</h3>
                <label htmlFor="imgUplaod" className="labelContainer">
                  <ArrowCircleUpIcon fontSize="small" />
                  <input type="file" name="imgUplaod" id="imgUplaod" />
                  <span>Adicionar Foto</span>
                </label>

                <FormControlLabel control={<Switch />} label="Foto Redonda" />
              </div>
            </div>
          </div>

          <div className="secondSection">
            <div className="secondSectionInputs">
              <TextField
                id="job"
                label="Emprego"
                helperText="ex: Vendedor"
              />

              <TextField
                id="address"
                label="Endereço"
                helperText="ex: Avenida Paulista, 1234 - São Paulo - SP - 07010 001"
              />

              <TextField
                id="email"
                label="E-mail"
                helperText="ex: tiago.souza@email.com"
                type="email"
              />
            </div>
          </div>

          <div className="thirdSection">
            <div className="thirdSectionInputGroup">
              <TextField
                id="phone"
                label="Telefone"
                helperText="ex: (11) 9 9123-7676"
              />

              <FormControl sx={{ width: "223px" }}>
                <InputLabel id="sexLabel">Sexo</InputLabel>

                <Select
                  labelId="sexLabel"
                  id="sexSelector"
                  label="Sexo"
                >
                  <MenuItem value={"M"}>Masculino</MenuItem>
                  <MenuItem value={"F"}>Feminino</MenuItem>
                  <MenuItem value={"O"}>Outro</MenuItem>

                  {/* if value equal 'o' open input */}
                </Select>
              </FormControl>
            </div>

            <div className="thirdSectionInputGroup">
              <TextField
                id="nationality"
                label="Nacionalidade"
                helperText="ex: Brasileira"
              />

              <TextField
                id="birthday"
                label="Data de Nascimento"
                helperText="ex: 23 jun 1985"
              />
            </div>
          </div>
        </>
      )}

      {stepCounter === 2 && (
        <>
          <div className="firstSection">
            <div className="firstSectionInputs">
              <TextField
                id="about"
                label="Sobre"
                helperText="Breve resumo sobre o funcionário"
                multiline
                maxRows={4}
                sx={{width: "100%"}}
              />
            </div>
          </div>

          <div className="thirdSection">
            <h3>Experiência</h3>

            <div className="thirdSectionInputGroup">
              <TextField
                id="date"
                name="date"
                label="Data"
                helperText="ex: Jun 2010 - Mar 2017"
                value={experience.date}
                onChange={handleExperience}
              />

              <TextField
                id="position"
                name="position"
                label="Cargo"
                helperText="ex: Vendedor"
                value={experience.position}
                onChange={handleExperience}
              />
            </div>

            <div className="thirdSectionInputGroup">
              <TextField
                id="location"
                name="location"
                label="Local"
                helperText="ex: Taugor - Novo Hamburgo, Brasil"
                sx={{ width: "223px", marginRight: "10px" }}
                value={experience.location}
                onChange={handleExperience}
              />

              <TextField
                id="aboutPosition"
                name="aboutPosition"
                label="Sobre a vaga"
                multiline
                maxRows={4}
                helperText="Funções do funcionário na vaga"
                sx={{ width: "223px" }}
                value={experience.aboutPosition}
                onChange={handleExperience}
              />
            </div>

            <Button color="info" variant="outlined" size="medium" onClick={handleExperiences}>
              Adicionar experiência
            </Button>

            <div className="experiencesContainer">
              {experiences.map((experience) => (
                <p
                  key={experience.id}
                  onClick={() => deleteExperiente(experience.id)}
                >
                  { experience.position } - { experience.location }
                </p>
              ))}
            </div>
          </div>
        </>
      )}

      <div className="stepButtons">
        <Button
          variant="outlined"
          size="medium"
          startIcon={<ArrowBackIcon />}
          onClick={() => setStepCounter(stepCounter - 1)}
          disabled={stepCounter === 1 ? true : false}
        >
          Anterior
        </Button>

        <Button
          variant="contained"
          size="medium"
          endIcon={<ArrowForwardIcon />}
          onClick={() => setStepCounter(stepCounter + 1)}
        >
          Próximo
        </Button>
      </div>
    </div>
  )
}

export default Employee