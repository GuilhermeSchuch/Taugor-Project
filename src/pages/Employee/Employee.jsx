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

// Notification
import Notification from "../../components/Notification/Notification";

// Components
import Header from "../../components/Header/Header";

// Firebase
import { db } from "../../config/firebase";
import { collection, addDoc } from "firebase/firestore";

// Lodash
var _ = require('lodash');

const Employee = () => {
  const employeesCollectionRef = collection(db, "employees");
  
  const [employee, setEmployee] = useState({
    name: '',
    lastname: '',
    job: '',
    address: '',
    email: '',
    phone: '',
    nationality: '',
    birthday: '',
    about: '',
    languages: '',
    skills: '',
    position: '',
    dateAdmission: '',
    sector: '',
    salary: '',
    sex: '',
    history: [],
  })

  const handleEmployee = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  }

  console.log(employee);

  const [stepCounter, setStepCounter] = useState(1);

  const [experiences, setExperiences] = useState([]);
  const [courses, setCourses] = useState([]);
  const [experience, setExperience] = useState({
    id: '',
    date: '',
    position: '',
    location: '',
    aboutPosition: ''
  });
  const [course, setCourse] = useState({
    id: '',
    dateEducation: '',
    course: '',
    locationEducation: ''
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

  const deleteExperience = (id) => {
    setExperiences(experiences.filter((experience) => experience.id != id));
  }

  const handleCourse = (e) => {
    setCourse({ ...course, [e.target.name]: e.target.value, id: _.uniqueId() });
  }

  const handleCourses = (e) => {
    if(course.dateEducation !== '' && course.course !== '' && course.locationEducation !== '') {
      setCourses([...courses, course]);
      setCourse({
        id: '',
        dateEducation: '',
        course: '',
        locationEducation: '',
      });
    }
    else {
      Notification({text: "Ausência de dados para inclusão de educação", type: "error"})
    }
  }

  const deleteCourse = (id) => {
    setCourses(courses.filter((course) => course.id != id));
  }

  const handleSex = (e) => {
    
  }

  const createEmployee = async () => {
    try {
      await addDoc(employeesCollectionRef, {
        about: employee.about,
        address: employee.address,
        birthday: employee.birthday,
        dateAdmission: employee.dateAdmission,
        education: courses,
        email: employee.email,
        experiences: experiences,
        job: employee.job,
        languages: employee.languages,
        lastname: employee.lastname,
        name: employee.name,
        nationality: employee.nationality,
        phone: employee.phone,
        position: employee.position,
        salary: employee.salary,
        sector: employee.sector,
        sex: employee.sex,
        history: employee.history
      });
    } catch (error) {
      Notification({ text: "Algo deu errado, tente novamente", type: "error" });
    }
  }

  return (
    <>
      <Header counter={stepCounter} />

      <div className="authContainer">
        <div className="title">
          <h1>
            {stepCounter <= 3 ? "Informação de contato" : "Informação do funcionário"}
          </h1>
          <EditIcon fontSize="small"/>
        </div>

        {stepCounter === 1 && (
          <>
            <div className="firstSection">
              <div className="firstSectionInputs">
                <TextField
                  id="name"
                  name="name"
                  label="Nome"
                  value={employee.name}
                  onChange={handleEmployee}
                  helperText="ex: Tiago"
                />

                <TextField
                  id="lastname"
                  name="lastname"
                  label="Sobrenome"
                  helperText="ex: Souza"
                  value={employee.lastname}
                  onChange={handleEmployee}
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
                  name="job"
                  label="Emprego"
                  helperText="ex: Vendedor"
                  value={employee.job}
                  onChange={handleEmployee}
                />

                <TextField
                  id="address"
                  name="address"
                  label="Endereço"
                  helperText="ex: Avenida Paulista, 1234 - São Paulo - SP - 07010 001"
                  value={employee.address}
                  onChange={handleEmployee}
                />

                <TextField
                  id="email"
                  name="email"
                  label="E-mail"
                  helperText="ex: tiago.souza@email.com"
                  type="email"
                  value={employee.email}
                  onChange={handleEmployee}
                />
              </div>
            </div>

            <div className="thirdSection">
              <div className="thirdSectionInputGroup">
                <TextField
                  id="phone"
                  name="phone"
                  label="Telefone"
                  helperText="ex: (11) 9 9123-7676"
                  value={employee.phone}
                  onChange={handleEmployee}
                  sx={{ width: "223px" }}
                />

                <FormControl sx={{ width: "223px" }}>
                  <InputLabel id="sexLabel">Sexo</InputLabel>

                  <Select
                    id="sex"
                    name="sex"
                    labelId="sexLabel"
                    label="Sexo"
                    value={employee.sex}
                    onChange={handleSex}
                  >
                    <MenuItem value={"Masculino"}>Masculino</MenuItem>
                    <MenuItem value={"Feminino"}>Feminino</MenuItem>
                    

                    <TextField
                      id="otherSex"
                      name="sex"
                      label="Outro"
                      value={employee.sex}
                      onChange={handleSex}
                    />
                  </Select>

                  
                </FormControl>
              </div>

              <div className="thirdSectionInputGroup">
                <TextField
                  id="nationality"
                  name="nationality"
                  label="Nacionalidade"
                  helperText="ex: Brasileira"
                  value={employee.nationality}
                  onChange={handleEmployee}
                  sx={{ width: "223px" }}
                />

                <TextField
                  id="birthday"
                  name="birthday"
                  label="Data de Nascimento"
                  helperText="ex: 23 jun 1985"
                  value={employee.birthday}
                  onChange={handleEmployee}
                  sx={{ width: "223px" }}
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
                  name="about"
                  label="Sobre"
                  helperText="Breve resumo sobre o funcionário"
                  multiline
                  maxRows={4}
                  sx={{width: "100%"}}
                  value={employee.about}
                  onChange={handleEmployee}
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
                  sx={{ width: "223px" }}
                />

                <TextField
                  id="position"
                  name="position"
                  label="Cargo"
                  helperText="ex: Vendedor"
                  value={experience.position}
                  onChange={handleExperience}
                  sx={{ width: "223px" }}
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
                    onClick={() => deleteExperience(experience.id)}
                    className="experienceItem"
                  >
                    { experience.position } - { experience.location }
                  </p>
                ))}
              </div>
            </div>
          </>
        )}

        {stepCounter === 3 && (
          <>
            <div className="secondSection">
              <div className="secondSectionInputs">
                <TextField
                  id="languages"
                  name="languages"
                  label="Idiomas"
                  value={employee.languages}
                  onChange={handleEmployee}
                  helperText="ex: Inglês - Avançado, Espanhol - Intermediário, Português - Nativo"
                />

                <TextField
                  id="skills"
                  name="skills"
                  label="Habilidades"
                  value={employee.skills}
                  onChange={handleEmployee}
                  helperText="ex: NodeJs, Proativo, ReactJs"
                />
              </div>
            </div>

            <div className="thirdSection">
              <h3>Educação</h3>

              <div className="thirdSectionInputGroup">
                <TextField
                  id="dateEducation"
                  name="dateEducation"
                  label="Data"
                  helperText="ex: Jun 2010 - Mar 2017"
                  value={course.dateEducation}
                  onChange={handleCourse}
                  sx={{ width: "223px", marginRight: "10px" }}
                />

                <TextField
                  id="course"
                  name="course"
                  label="Curso ou Grau"
                  helperText="ex: Sistemas de Informação"
                  value={course.course}
                  onChange={handleCourse}
                  sx={{ width: "223px" }}
                />
              </div>

              <div className="thirdSectionInputGroup">
                <TextField
                  id="locationEducation"
                  name="locationEducation"
                  label="Local"
                  helperText="ex: Taugor - Novo Hamburgo, Brasil"
                  sx={{ width: "100%"}}
                  value={course.locationEducation}
                  onChange={handleCourse}
                />
              </div>

              <Button color="info" variant="outlined" size="medium" onClick={handleCourses}>
                Adicionar Escolaridade
              </Button>

              <div className="coursesContainer">
                {courses.map((course) => (
                  <p
                    key={course.id}
                    onClick={() => deleteCourse(course.id)}
                    className="courseItem"
                  >
                    { course.course } - { course.locationEducation }
                  </p>
                ))}
              </div>
            </div>
          </>
        )}

        {stepCounter === 4 && (
          <>
            <div className="secondSection">
              <div className="secondSectionInputs">
                <TextField
                  id="position"
                  name="position"
                  label="Cargo"
                  value={employee.position}
                  onChange={handleEmployee}
                  helperText="ex: Vendedor"
                />

                <TextField
                  id="dateAdmission"
                  name="dateAdmission"
                  label="Data de Admissão"
                  helperText="ex: Jun 2024"
                  value={employee.dateAdmission}
                  onChange={handleEmployee}
                />

                <TextField
                  id="sector"
                  name="sector"
                  label="Setor"
                  helperText="ex: Suporte"
                  value={employee.sector}
                  onChange={handleEmployee}
                />

                <TextField
                  id="salary"
                  name="salary"
                  label="Salário (mensal)"
                  helperText="ex: 1600"
                  value={employee.salary}
                  onChange={handleEmployee}
                />
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
            endIcon={stepCounter < 4 && <ArrowForwardIcon />}
            onClick={() => stepCounter < 4 ? setStepCounter(stepCounter + 1) : createEmployee()}
          >
            { stepCounter < 4 ? "Próximo" : "Finalizar" }
          </Button>
        </div>
      </div>
    </>
  )
}

export default Employee