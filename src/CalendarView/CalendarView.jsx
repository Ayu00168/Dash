import React, { useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import { setSelectedTask, deleteSelectedTask } from "../Redux/counterSlice";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Grid, IconButton, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CardHeader from "@mui/material/CardHeader";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import { useDispatch, useSelector } from "react-redux";

import "./calendar.css";
import { formatDate } from "../utils/Date_Time";
import ModalContainer from "../ModalContainer/ModalContainer";

const CalendarView = ({ deleteTask }) => {
  const [open, setOpen] = useState(false);
  const [modalData, setModaData] = useState([]);
  const task = useSelector((state) => state.counter.taskData);
  const selectedTasks = useSelector((state) => state.counter.selectedTask);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const date = formatDate(e.$d);
    const filteredTask = task.filter((item) => item.date === date);
    dispatch(setSelectedTask(filteredTask));
  };

  const handleModal = (item) => {
    setOpen(!open);
    setModaData(item);
  };

  const handleDeleteTask = (item) => {
    deleteTask(item);
    const tasks = selectedTasks.filter((i) => i.id !== item.id);
    dispatch(deleteSelectedTask(tasks));
  };

  return (
    <div className="mainContainer">
      <Grid xs={12} sm={6} md={4}>
        <div className="dateContainer">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <StaticDatePicker orientation="portrait" onChange={handleChange} />
          </LocalizationProvider>
        </div>
      </Grid>
      <Grid xs={12} sm={6} md={4} sx={{ maxWidth: 370 }}>
        {selectedTasks.length > 0 ? (
          selectedTasks.map((item) => (
            <Card xs={12} sm={6} md={4}>
              <CardHeader
                title={item.name}
                subheader={item.date + item.deadline}
              />
              <CardContent>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    whiteSpace: "break-all",
                    maxWidth: 300,
                    flexWrap: "wrap",
                    fontWeight: 600,
                    fontSize: "1rem",
                  }}
                >
                  {item.description}
                </Typography>
              </CardContent>
              <div style={{ display: "flex" }}>
                <div onClick={() => handleDeleteTask(item)}>
                  {" "}
                  <IconButton aria-label="delete">
                    <DeleteIcon />
                  </IconButton>
                </div>

                <div onClick={() => handleModal(item)}>
                  <IconButton aria-label="update">
                    <DriveFileRenameOutlineIcon />
                  </IconButton>
                </div>
              </div>
            </Card>
          ))
        ) : (
          <Card xs={12} sm={6} md={4} sx={{ minWidth: 300 }}>
            <CardHeader title="Create Task" subheader="Date" />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                Create a task
              </Typography>
            </CardContent>
          </Card>
        )}
      </Grid>
      <ModalContainer open={open} handleModal={handleModal} data={modalData} />
    </div>
  );
};

export default CalendarView;
