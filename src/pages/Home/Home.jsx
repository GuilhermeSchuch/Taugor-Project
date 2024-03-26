// CSS
import "./Home.css";

// Components
import { EmployeeTable } from "../../components";

// Material Ui
import Button from '@mui/material/Button';

// Router
import { useNavigate } from "react-router-dom";

// Hooks
import { useEffect, useState } from "react";

// Notification
import Notification from "../../components/Notification/Notification";

// Firebase
import { db } from "../../config/firebase";
import { collection, getDocs } from "firebase/firestore";

const Home = () => {
  const navigate = useNavigate();

  const [employees, setEmployees] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const employeesCollectionRef = collection(db, "employees");

  useEffect(() => {
    const getEmployees = async () => {
      try {
        setIsLoading(true);

        const data = await getDocs(employeesCollectionRef);
        const filteredData = data.docs.map((doc) => ({...doc.data(), id: doc.id}));
        
        setEmployees(filteredData);
        setIsLoading(false);
      } catch (error) {
        Notification({ text: "Algo deu errado, tente novamente mais tarde", type: "error" })
      }
    }

    getEmployees();
  }, [])

  return (
    <div className="homeContainer">
      {console.log(employees)}

      {!isLoading && <EmployeeTable data={employees} />}
      

      <div className="createEmployee">
        <Button variant="contained" size="medium" onClick={() => navigate("/employee")}>
          Cadastrar funcionário
        </Button>
      </div>
    </div>
  )
}

export default Home