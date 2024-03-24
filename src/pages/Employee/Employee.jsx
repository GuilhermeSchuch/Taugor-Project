// CSS
import "./Employee.css";

// Material Ui
import EditIcon from '@mui/icons-material/Edit';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import FormControlLabel from '@mui/material/FormControlLabel';
import TextField from '@mui/material/TextField';
import Switch from '@mui/material/Switch';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

// Hooks
import { useState } from "react";

const Employee = () => {
  const [name, setName] = useState('');

  return (
    <div className="authContainer">

      <div className="title">
        <h1>Informação de contato</h1>
        <EditIcon fontSize="small"/>
      </div>

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
    </div>
  )
}

export default Employee