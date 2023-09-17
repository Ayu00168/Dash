import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  taskData: [],
  selectedTask: [],
  list: [],
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    setTasksData: (state, action) => {
      state.taskData = action.payload;
    },
    deleteTasksData: (state, action) => {
      state.taskData = action.payload;
    },
    setSelectedTask: (state, action) => {
      state.selectedTask = action.payload;
    },
    deleteSelectedTask: (state, action) => {
      state.selectedTask = action.payload;
    },
    setList: (state, action) => {
      state.selectedTask = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setTasksData,
  deleteTasksData,
  deleteSelectedTask,
  setSelectedTask,
  setList,
} = counterSlice.actions;

export default counterSlice.reducer;
