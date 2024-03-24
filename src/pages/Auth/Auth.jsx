// CSS
import "./Auth.css";

// Material Ui
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';

// Firebase
import { auth } from "../../config/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

// Cookies
import Cookies from "universal-cookie";

// Notification
import Notification from "../../components/Notification/Notification";

// Hooks
import { useState } from "react";

const cookies = new Cookies();

const Auth = () => {
  const [user, setUser] = useState({
    email: '',
    password: ''
  });

  const handleInputs = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  const handleSignIn = async () => {
    try {
      await createUserWithEmailAndPassword(auth, user.email, user.password);
  
      cookies.set("token", auth.currentUser.accessToken);
      window.location.reload();

    } catch (error) {
      let text;
      console.log(error.code);
      // console.log(error.customData);
      // console.log(error);

      // for (const property in error) {
      //   console.log(`${property}: ${error[property]}`);
      // }

      switch (error.code) {
        case "auth/invalid-email":
          text = "E-mail inválido!";
          break;

        case "auth/weak-password":
          text = "A senha deve conter ao menos 6 caracteres!";
          break;
      
        default:
          break;
      }

      Notification({text, type: "error"});
    }
  }

  return (
    <div className="authContainer">
      <div className="authInputs">        
        <div className="emailInputContainer">
          <InputLabel>E-mail</InputLabel>

          <TextField
            id="email"
            helperText="ex: tiago.souza@email.com"
            type="email"
            name="email"
            autoFocus
            value={user.email}
            onChange={handleInputs}
            autoComplete="do-not-autofill"
          />
        </div>

        <div className="passwordInputContainer">
          <InputLabel>Senha</InputLabel>

          <TextField
            id="password"
            helperText="ex: tiagoSouza123"
            type="password"
            name="password"
            value={user.password}
            onChange={handleInputs}
          />
        </div>
      </div>

      <div className="buttonContainer">
        <Button variant="outlined" size="medium" onClick={handleSignIn}>
          Entrar
        </Button>
      </div>
    </div>
  )
}

export default Auth