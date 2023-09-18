import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import { styled } from "@mui/material/styles";
import {
  Grid,
  IconButton,
  TableContainer,
  TableRow,
  TextField,
  debounce,
} from "@mui/material";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import { deleteSelectedTask } from "../Redux/counterSlice";
import ModalContainer from "../ModalContainer/ModalContainer";
import Paper from "@mui/material/Paper";
import "./listview.css";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export const ListView = ({ deleteTask, update }) => {
  const [open, setOpen] = useState(false);

  const selectedTasks = useSelector((state) => state.counter.selectedTask);
  const task = useSelector((state) => state.counter.taskData);
  const dispatch = useDispatch();
  const [modalData, setModaData] = useState([]);
  const [tasks, setTasks] = useState([]);

  const handleDeleteTask = (item) => {
    deleteTask(item);
    const tasks = selectedTasks.filter((i) => i.id !== item.id);
    dispatch(deleteSelectedTask(tasks));
  };

  useEffect(() => {
    setTasks(task);
  }, [update, open, deleteTask]);

  const handleModal = (item) => {
    if (!open) {
      setModaData(item);
    }
    setOpen(!open);
  };

  const handleSearch = debounce((e) => {
    const { value } = e.target;

    if (value) {
      const filteredData = tasks.filter((item) => item.name === value);
      setTasks(filteredData);
    } else {
      setTasks(task);
    }
  }, 500);

  return (
    <div className="container">
      <Grid xs={12} sm={6} md={4}></Grid>
      <TextField
        id="filled-basic"
        label="Search"
        variant="filled"
        sx={{ marginBottom: "10px" }}
        onChange={handleSearch}
      />
      <TableContainer
        component={Paper}
        sx={{ maxWidth: 700 }}
        aria-label="customized table"
        xs={12}
        sm={6}
        md={4}
      >
        <Table>
          <TableHead>
            <StyledTableRow>
              <StyledTableCell>Task Name</StyledTableCell>
              <StyledTableCell align="right">Date</StyledTableCell>
              <StyledTableCell align="right">Deadline</StyledTableCell>
              <StyledTableCell align="right">Description</StyledTableCell>
              <StyledTableCell align="right"> Action</StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {tasks.map((row, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell>{row.name}</StyledTableCell>
                <StyledTableCell align="right">{row.date}</StyledTableCell>
                <StyledTableCell align="right">{row.deadline}</StyledTableCell>
                <StyledTableCell align="right">
                  {row.description}
                </StyledTableCell>
                <StyledTableCell align="right" sx={{ display: "flex" }}>
                  {" "}
                  <div onClick={() => handleDeleteTask(row)}>
                    {" "}
                    <IconButton aria-label="delete">
                      <DeleteIcon />
                    </IconButton>
                  </div>
                  <div onClick={() => handleModal(row)}>
                    <IconButton aria-label="update">
                      <DriveFileRenameOutlineIcon />
                    </IconButton>
                  </div>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <ModalContainer open={open} handleModal={handleModal} data={modalData} />
    </div>
  );
};
