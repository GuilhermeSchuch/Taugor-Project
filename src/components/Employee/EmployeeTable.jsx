// Material Ui
import PropTypes from 'prop-types';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import FilePresentIcon from '@mui/icons-material/FilePresent';

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

// Notification
import Notification from '../Notification/Notification';

// Firebase
import { storage } from "../../config/firebase";
import { ref, listAll, getDownloadURL } from "firebase/storage";

const Row = (props) => {
  const { row } = props;
  const [open, setOpen] = useState(false);
  const [employeeCvs, setEmployeeCvs] = useState('');

  const handleDownloadCv = async (employeeId) => {
    try {
      listAll(ref(storage, `${employeeId}/`)).then((cvs) => {
        setEmployeeCvs(cvs.items);

        getDownloadURL(ref(storage, `${employeeId}/${cvs.items.pop().name}`)).then((url) => {
          window.open(url);
        }).catch((error) => {
          console.log(error);
          Notification({ text: "Algo deu errado...", type: "error" });
        })

      }).catch((error) => {
        console.log(error);
        Notification({ text: "Algo deu errado...", type: "error" });
      })
    
    } catch (error) {
      console.log(error);
      Notification({ text: "Algo deu errado...", type: "error" });
    }
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
          <button className="clearButton" onClick={() => handleDownloadCv(row.employeeId)}><FilePresentIcon /></button>
        </TableCell>

        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
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
                    <TableCell />
                  </TableRow>
                </TableHead>
                <TableBody>
                  {/* {row.history.map((historyRow) => (
                    <TableRow key={historyRow.date}>
                      <TableCell component="th" scope="row">
                        {historyRow.date}
                      </TableCell>
                      <TableCell>{historyRow.customerId}</TableCell>
                      <TableCell align="right">{historyRow.amount}</TableCell>
                      <TableCell align="right">
                        {Math.round(historyRow.amount * row.price * 100) / 100}
                      </TableCell>
                    </TableRow>
                  ))} */}
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
    email: PropTypes.string.isRequired,
    history: PropTypes.arrayOf(
      PropTypes.shape({
        amount: PropTypes.number.isRequired,
        customerId: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
      }),
    ).isRequired,
  }).isRequired,
};

const EmployeeTable = ({ data }) => {
  return (
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
  )
}

export default EmployeeTable