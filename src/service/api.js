const URL = "http://localhost:3001";

//Get all tasks
export async function allTasksByUser(user) {
  const data = await fetch(`${URL}/tasks?createdBy=${user}`);
  const tasks = await data.json();
  return tasks;
}

//Add new task
export async function addNewTask(newTask, loggedInUser) {
  try {
    const { taskName, ...rest } = newTask;
    const tasks = await fetch(`${URL}/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        createdBy: loggedInUser,
        taskName: taskName,
        taskStage: 0,
        ...rest,
        createdAt: new Date().toISOString(),
      }),
    });
    return tasks;
  } catch (error) {
    console.error("Something went wrong while creating a new task", error);
  }
}

//Update task
export async function updateTask(taskId, update) {
  try {
    const tasks = await fetch(`${URL}/tasks/${taskId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...update }),
    });
    return tasks;
  } catch (error) {
    console.error("Something went wrong while updating task", error);
  }
}

//Delete task
export async function deleteTask(taskId) {
  try {
    const tasks = await fetch(`${URL}/tasks/${taskId}`, {
      method: "DELETE",
    });
    return true;
  } catch (error) {
    console.error("Something went wrong while deleting task", error);
  }
}
