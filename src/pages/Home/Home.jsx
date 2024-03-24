// CSS
import "./Home.css";

// Components
import { EmployeeTable } from "../../components";

// Material Ui
import Button from '@mui/material/Button';

// Router
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="homeContainer">
      <EmployeeTable />

      <div className="createEmployee">
        <Button variant="contained" size="medium" onClick={() => navigate("/employee")}>
          Cadastrar funcionário
        </Button>
      </div>
    </div>
  )
}

export default Home