export function validateTaskForm(taskFormData) {
  const errors = {};

  if (taskFormData.taskName) taskFormData.taskName.trim();
  if (taskFormData.taskPriority) taskFormData.taskPriority.trim();
  if (taskFormData.taskDeadline) taskFormData.taskDeadline.trim();

  if (!taskFormData.taskName) {
    errors.taskName = "Tast Name is required";
  }

  if (!taskFormData.taskPriority) {
    errors.taskPriority = "Tast Priority is required";
  }

  if (!taskFormData.taskDeadline) {
    errors.taskDeadline = "Tast Deadline is required";
  }

  return errors;
}
