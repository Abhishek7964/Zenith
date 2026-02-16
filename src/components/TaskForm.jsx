import {
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { validateTaskForm } from "../utils/validateTaskForm";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { addNewTask } from "../service/api";
import { useSelector } from "react-redux";

function TaskForm() {
  const [taskFormData, setTaskFormData] = useState({
    taskName: "",
    taskPriority: "",
  });
  const [error, setError] = useState({});
  const [taskDeadline, setTaskDeadline] = useState(null);

  const loggedInUser = useSelector((state) => state.auth.currentUser);

  useEffect(() => {
    if (taskDeadline) {
      setTaskFormData((prev) => {
        return { ...prev, taskDeadline: taskDeadline.format("DD-MM-YYYY") };
      });
      setError((prev) => {
        const { taskDeadline: removed, ...rest } = prev;
        return rest;
      });
    }
  }, [taskDeadline]);

  const handleTaskFormChange = (e) => {
    const { name, value } = e.target;
    setTaskFormData((prev) => {
      return { ...prev, [name]: value };
    });
    setError((prev) => {
      const { [name]: removed, ...rest } = prev;
      return rest;
    });
  };

  const handleTaskFormSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateTaskForm(taskFormData);

    if (Object.keys(validationErrors).length > 0) {
      setError(validationErrors);
      return;
    }

    setError({});
    try {
      addNewTask(taskFormData, loggedInUser);
      alert("Task successfully created!");
      setTaskFormData({ taskName: "", taskPriority: "" });
      setTaskDeadline(null);
    } catch (error) {
      console.error("Failed to create a task", error);
    }
  };

  return (
    <form noValidate onSubmit={handleTaskFormSubmit}>
      <TextField
        variant="outlined"
        label="Task Name"
        type="text"
        name="taskName"
        value={taskFormData.taskName}
        required
        onChange={handleTaskFormChange}
        error={error.taskName}
        helperText={error.taskName}
      />
      <FormControl fullWidth required error={Boolean(error.taskPriority)}>
        <InputLabel>Task Priority</InputLabel>
        <Select
          label="Task Priority"
          name="taskPriority"
          value={taskFormData.taskPriority}
          onChange={handleTaskFormChange}
        >
          <MenuItem value="low">🟢 Low</MenuItem>
          <MenuItem value="medium">🟡 Medium</MenuItem>
          <MenuItem value="high">🔴 High</MenuItem>
        </Select>
        {error.taskPriority && (
          <FormHelperText>{error.taskPriority}</FormHelperText>
        )}
      </FormControl>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="Task Deadline"
          name="taskDeadline"
          value={taskDeadline}
          onChange={(newValue) => setTaskDeadline(newValue)}
          slotProps={{
            textField: {
              required: true,
              error: Boolean(error.taskDeadline),
              helperText: error.taskDeadline,
            },
          }}
        />
      </LocalizationProvider>
      <Button variant="contained" type="submit">
        Create Task
      </Button>
    </form>
  );
}

export default TaskForm;
