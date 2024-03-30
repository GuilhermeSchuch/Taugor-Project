// CSS
import "./Auth.css";

// Material Ui
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';

// Firebase
import { auth } from "../../config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

// Components
import { Loading } from "../../components";

// Cookies
import Cookies from "universal-cookie";

// Notification
import Notification from "../../components/Notification/Notification";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { setLoading } from '../../features/loadingSlice';

// Hooks
import { useState } from "react";

const cookies = new Cookies();

const Auth = () => {
  const dispatch = useDispatch();

  const { loading } = useSelector((state) => state.loading);

  const [user, setUser] = useState({
    email: '',
    password: ''
  });

  const handleInputs = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  const handleSignIn = async () => {
    try {
      dispatch(setLoading({loading: true}));

      await signInWithEmailAndPassword(auth, user.email, user.password);
  
      cookies.set("token", auth.currentUser.accessToken);
      window.location.reload();

      dispatch(setLoading({loading: false}));
    } catch (error) {
      dispatch(setLoading({loading: false}));
      
      let text;
      console.log(error.code);
      
      switch (error.code) {
        case "auth/invalid-email":
          text = "E-mail inválido!";
          break;

        case "auth/invalid-credential":
          text = "Senha incorreta!";
          break;

        default:
          break;
      }

      Notification({text, type: "error"});
    }
  }

  return (
    <div className="authContainer">
      {loading && <Loading isLoading={loading}/>}

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
        <Button
          variant="outlined"
          size="small"
          sx={{ width: "100%" }}
          onClick={handleSignIn}
        >
          Entrar
        </Button>
      </div>
    </div>
  )
}

export default Auth