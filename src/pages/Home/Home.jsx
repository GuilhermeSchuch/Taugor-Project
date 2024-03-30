// CSS
import "./Home.css";

// Components
import { EmployeeTable, Loading } from "../../components";

// Material Ui
import Button from '@mui/material/Button';

// Router
import { useNavigate } from "react-router-dom";

// Hooks
import { useEffect, useState } from "react";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { setLoading } from '../../features/loadingSlice';

// Notification
import Notification from "../../components/Notification/Notification";

// Firebase
import { db } from "../../config/firebase";
import { collection, getDocs } from "firebase/firestore";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [employees, setEmployees] = useState([]);
  const { loading } = useSelector((state) => state.loading);

  const employeesCollectionRef = collection(db, "employees");

  useEffect(() => {
    const getEmployees = async () => {
      try {
        dispatch(setLoading({loading: true}));

        const data = await getDocs(employeesCollectionRef);
        const filteredData = data.docs.map((doc) => ({...doc.data(), id: doc.id}));
        
        setEmployees(filteredData.reverse());        
        dispatch(setLoading({loading: false}));
      } catch (error) {
        dispatch(setLoading({loading: false}));
        Notification({ text: "Algo deu errado, tente novamente mais tarde", type: "error" })
      }
    }
    
    getEmployees();
  }, [])

  console.log(employees);

  return (
    <div className="homeContainer">
      {loading && <Loading isLoading={loading}/>}
      {employees && <EmployeeTable data={employees} />}

      <div className="createEmployee">
        <Button
          variant="outlined"
          sx={{ width: "100%" }}
          size="small"
          onClick={() => navigate("/employee")}
        >
          Cadastrar funcionário
        </Button>
      </div>
    </div>
  )
}

export default Home