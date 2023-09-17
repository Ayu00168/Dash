import React, { useState } from "react";
import { ListView } from "../ListView/ListView";
import CalendarView from "../CalendarView/CalendarView";
import Modal from "@mui/material/Modal";
import Switch from "@mui/material/Switch";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import dayjs from "dayjs";
import { setTasksData, deleteTasksData } from "../Redux/counterSlice";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import "./mainview.css";
import { TimePicker } from "@mui/x-date-pickers";
import { formatDate, convertToTimezone } from "../utils/Date_Time";
import { useDispatch, useSelector } from "react-redux";
import { Divider } from "@mui/material";

const MainView = () => {
  const [open, setOpen] = useState(false);
  const [checked, setChecked] = useState(false);

  const [task, setTask] = useState("");
  const [date, setDate] = useState(dayjs("2023-09-16"));
  const [time, setTime] = useState(dayjs("2023-09-16T15:30"));
  let [idCount, setIdCount] = useState(1);
  const [description, setDescription] = useState("");
  const tasksData = useSelector((state) => state.counter.taskData);
  const dispatch = useDispatch();
  console.log(tasksData);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    borderRadius: "5px",
    boxShadow: 24,
    p: 4,
  };

  const handleChange = (e) => {
    setChecked(e.target.checked);
  };

  const handleModal = () => {
    setOpen(!open);
    setTask("");
    setDescription("");
  };

  const createTaskData = () => {
    const newDate = formatDate(date.$d);
    const newTime = convertToTimezone(time.$d);
    const newData = {
      id: idCount,
      name: task,
      date: newDate,
      deadline: newTime,
      description: description,
    };
    let data;

    data = [...tasksData, newData];
    dispatch(setTasksData(data));
    setOpen(!open);
    setIdCount((idCount += 1));
  };

  const deleteTask = (item) => {
    console.log(item.name);
    const newValue = tasksData.filter((i) => i.id !== item.id);
    dispatch(deleteTasksData(newValue));
  };

  return (
    <div>
      <div
        style={{ display: "flex", alignItems: "center", justifyContent: "end" }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          {checked ? <h3>Calendar View</h3> : <h3>List View</h3>}
          <Switch onChange={handleChange} />{" "}
        </div>
        <Button
          variant="contained"
          size="medium"
          style={{ marginRight: "10px" }}
          onClick={handleModal}
        >
          Create Task
        </Button>

        <Modal open={open} onClose={handleModal}>
          <Box
            xs={12}
            sm={6}
            md={4}
            sx={{
              borderRadius: "5px",
              boxShadow: 24,
              p: 4,
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",

              width: "80%",
              bgcolor: "background.paper",
            }}
          >
            <h3>CREATE TASK</h3>
            <div className="form">
              <TextField
                id="outlined-basic"
                label="Task Name"
                variant="outlined"
                value={task}
                sx={{ minWidth: "100%" }}
                onChange={(e) => setTask(e.target.value)}
                size="small"
              />
              <div style={{ marginTop: "10px" }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Date"
                    size="small"
                    value={date}
                    sx={{ minWidth: "100%" }}
                    onChange={(newValue) => setDate(newValue)}
                  />
                </LocalizationProvider>
              </div>

              <div style={{ marginTop: "10px" }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <TimePicker
                    label="Deadline"
                    value={time}
                    sx={{ minWidth: "100%" }}
                    onChange={(newValue) => setTime(newValue)}
                  />
                </LocalizationProvider>
              </div>
              <div style={{ marginTop: "10px" }}>
                <TextField
                  id="outlined-multiline-static"
                  label="Description"
                  multiline
                  rows={4}
                  value={description}
                  sx={{ minWidth: "100%" }}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <Button
                variant="contained"
                size="medium"
                style={{ marginTop: "10px" }}
                onClick={createTaskData}
              >
                Create Task
              </Button>
            </div>
          </Box>
        </Modal>
      </div>
      <Divider />
      {checked ? (
        <CalendarView task={tasksData} deleteTask={deleteTask} />
      ) : (
        <ListView taskData={tasksData} deleteTask={deleteTask} />
      )}
    </div>
  );
};

export default MainView;
