import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addNewTask,
  allTasksByUser,
  deleteTask,
  updateTask,
} from "../../service/api";

//Get all task details
export const getAllTasksByUser = createAsyncThunk(
  "tasks/getAllTasksByUser",
  async (user, { rejectWithValue }) => {
    try {
      const tasks = await allTasksByUser(user);
      return tasks;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

//Add new task
export const addTask = createAsyncThunk(
  "tasks/addNewTask",
  async ({ newTask, loggedInUser }, { rejectWithValue }) => {
    try {
      const tasks = await addNewTask(newTask, loggedInUser);
      return tasks;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

//Update task
export const updateTasks = createAsyncThunk(
  "tasks/updateTask",
  async ({ taskId, update }, { rejectWithValue }) => {
    try {
      const tasks = await updateTask(taskId, update);
      return tasks;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

//Delete task
export const deleteTasks = createAsyncThunk(
  "tasks/deleteTasks",
  async (taskId, { rejectWithValue }) => {
    try {
      const tasks = await deleteTask(taskId);
      return taskId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const initialState = {
  tasks: [],
  loading: false,
  error: null,
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      //Fetch tasks
      .addCase(getAllTasksByUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllTasksByUser.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(getAllTasksByUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //Add task
      .addCase(addTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks.push(action.payload);
      })
      .addCase(addTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //Update task
      .addCase(updateTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateTasks.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.tasks.findIndex((t) => t.id === action.payload.id);
        if (index !== -1) {
          state.tasks[index] = action.payload;
        }
      })
      .addCase(updateTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //Delete task
      .addCase(deleteTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = state.tasks.filter((t) => t.id !== action.payload);
      })
      .addCase(deleteTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError } = taskSlice.actions;
export default taskSlice.reducer;
