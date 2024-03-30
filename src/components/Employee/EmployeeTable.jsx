// Material Ui
import PropTypes from 'prop-types';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import FilePresentIcon from '@mui/icons-material/FilePresent';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import PostAddIcon from '@mui/icons-material/PostAdd';
import {
  Box,
  Collapse,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  Paper,
  Typography,
  TableRow,
  TableHead,
  IconButton
} from "@mui/material";

// Hooks
import { useState } from 'react';

// Components
import Loading from '../Loading/Loading';

// Router
import { useNavigate } from 'react-router-dom';

// Redux
import { useSelector, useDispatch } from "react-redux";
import { setLoading } from '../../features/loadingSlice';

// Notification
import Notification from '../Notification/Notification';

// Firebase
import { storage } from "../../config/firebase";
import { ref, listAll, getDownloadURL, deleteObject } from "firebase/storage";

const Row = (props) => {
  const { row } = props;
  const [open, setOpen] = useState(false);
  const [employeeCvs, setEmployeeCvs] = useState('');
  const [noCvFound, setNoCvFound] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDownloadCv = async (employeeId, employeeCv) => {
    try {
      dispatch(setLoading({loading: true}));

      listAll(ref(storage, `${employeeId}/`))
      .then((cvs) => {
        let url = '';

        if(employeeCv) url = `${employeeId}/${employeeCv}`;
        if(!employeeCv) url = `${employeeId}/${cvs.items.pop().name}`;

        getDownloadURL(ref(storage, url))
        .then((url) => {
          dispatch(setLoading({loading: false}));
          window.open(url);
        })
        .catch((error) => {
          dispatch(setLoading({loading: false}));
          console.log(error);          
        })
      })
      .catch((error) => {
        dispatch(setLoading({loading: false}));
        setNoCvFound(true);
        Notification({ text: "Currículo não encontrado!", type: "error" });
        Notification({ text: "Cadastre um currículo!", type: "info" });
      })
    
    } catch (error) {
      dispatch(setLoading({loading: false}));
      console.log(error);
      Notification({ text: "Algo deu errado...", type: "error" });
    }
  }

  const handleEmployeeHisyory = (employeeId) => {
    setOpen(!open);

    listAll(ref(storage, `${employeeId}/`))
      .then((cvs) => {
        setEmployeeCvs(cvs.items.reverse());
      })
      .catch((error) => {
        console.log(error);
        Notification({ text: "Algo deu errado...", type: "error" });
      })
  }

  const handleCvDelete = (employeeId, employeeCv) => {
    const cvRef = ref(storage, `${employeeId}/${employeeCv}`);

    deleteObject(cvRef)
    .then(() => {
      Notification({ text: "Currículo deletado!", type: "success" });
    })
    .catch((error) => {
      console.log(error);
      Notification({ text: "Algo deu errado...", type: "error" });
    });
  }

  return (
    <>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell component="th" scope="row">
          {`${row.name} ${row.lastname}`}
        </TableCell>

        <TableCell align="right">{row.email}</TableCell>

        <TableCell align="right">{row.position}</TableCell>

        <TableCell align="center">
          <button
            className="clearButton"
            onClick={noCvFound ? () => navigate(`/employee/${row.employeeId}`) : () => handleDownloadCv(row.employeeId)}
          >
            {noCvFound ? <PostAddIcon color='secondary'/> : <FilePresentIcon />}
          </button>
        </TableCell>

        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => handleEmployeeHisyory(row.employeeId)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Histórico
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Data</TableCell>
                    <TableCell>Currículo</TableCell>
                    <TableCell>Ações</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {employeeCvs.length > 0 ?
                    (employeeCvs?.map((cv) => (
                      <TableRow key={cv.name}>
                        <TableCell component="th" scope="row">
                          {new Date(parseInt(cv.name)).toLocaleString("pt-BR")}
                        </TableCell>

                        <TableCell align="left">
                          <button
                            className="clearButton"
                            onClick={() => handleDownloadCv(row.employeeId, cv.name)}
                          >
                            <FilePresentIcon sx={{ marginLeft: "15px" }}/>
                          </button>
                        </TableCell>

                        <TableCell>
                          <div className="employeeOptions">
                            <button
                              className="clearButton"
                              onClick={() => navigate(`/employee/${row.employeeId}`)}
                            >
                              <EditIcon color="primary"/>
                            </button>

                            <button
                              className="clearButton"
                              onClick={() => handleCvDelete(row.employeeId, cv.name)}
                            >
                              <DeleteForeverIcon htmlColor="#F44336" />
                            </button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))) : (
                      <>
                        
                      </>
                    )
                  }
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    lastname: PropTypes.string.isRequired,
    position: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired
  }).isRequired,
};

const EmployeeTable = ({ data }) => {
  const { loading } = useSelector((state) => state.loading);

  return (
    <>
      {loading && <Loading isLoading={loading}/>}

      <TableContainer component={Paper} sx={{ marginY: "30px" }}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell sx={{fontWeight: "700"}}>Nome</TableCell>
              <TableCell sx={{fontWeight: "700"}}>E-mail</TableCell>
              <TableCell sx={{fontWeight: "700"}}>Cargo</TableCell>
              <TableCell sx={{fontWeight: "700"}}>Currículo</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((row) => (
              <Row key={row.id} row={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default EmployeeTable