import { Box, Button, Modal, TextField } from "@mui/material";
import {
  DatePicker,
  LocalizationProvider,
  TimePicker,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import React, { useState } from "react";
import { setSelectedTask, setTasksData, setList } from "../Redux/counterSlice";
import { convertToTimezone, formatDate } from "../utils/Date_Time";
import { useDispatch, useSelector } from "react-redux";
import "./modal.css";

const ModalContainer = ({ open, handleModal, data }) => {
  const [task, setTask] = useState("");
  const [date, setDate] = useState(dayjs("2023-09-16"));
  const [time, setTime] = useState(dayjs("2023-09-16T15:30"));
  const [description, setDescription] = useState("");
  const tasksData = useSelector((state) => state.counter.taskData);
  const dispatch = useDispatch();

  const updateData = () => {
    const newDate = formatDate(date.$d);
    const newTime = convertToTimezone(time.$d);
    const newData = {
      id: data?.id,
      name: task,
      date: newDate,
      deadline: newTime,
      description: description,
    };

    let taskData = tasksData;

    const removeData = taskData.filter((item) => item.id !== data.id);

    taskData = removeData;

    taskData.unshift(newData);
    dispatch(setSelectedTask(taskData));
    dispatch(setTasksData(taskData));
    dispatch(setList(taskData));
    handleModal();
  };

  return (
    <div>
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
          <div className="form">
            <h3>UPDATE TASK</h3>

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
                  sx={{ minWidth: "100%" }}
                  value={date}
                  onChange={(newValue) => setDate(newValue)}
                />
              </LocalizationProvider>
            </div>

            <div style={{ marginTop: "10px" }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <TimePicker
                  label="Deadline"
                  sx={{ minWidth: "100%" }}
                  value={time}
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
                sx={{ minWidth: "100%" }}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <Button
              variant="contained"
              size="medium"
              style={{ marginTop: "10px" }}
              onClick={updateData}
            >
              Update Task
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default ModalContainer;
