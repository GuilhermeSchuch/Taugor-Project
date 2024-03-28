// CSS
import "./Header.css";

// Router
import { useNavigate } from "react-router-dom";

// Material Ui
import HomeIcon from '@mui/icons-material/Home';

const Header = ({ counter }) => {
  const navigate = useNavigate();
  
  return (
    <div className="headerContainer">
      <div className="steps">
        <p>Passo { counter } de 4</p>
      </div>

      <div className="home" onClick={() => navigate("/")}>
        <HomeIcon htmlColor="#1976d2" sx={{ cursor: "pointer" }}/>
      </div>
    </div>
  )
}

export default Header