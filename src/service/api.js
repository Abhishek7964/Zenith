const URL = "http://localhost:3001";

//Get all tasks
export async function allTasksByUser(user) {
  const tasks = await fetch(`${URL}/tasks?createdBy=${user}`);
  const data = await tasks.json();
  console.log(data);
}

//Add new task
export async function addNewTask(newTask) {
  try {
    const tasks = await fetch(`${URL}/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...newTask, createdAt: new Date().toISOString() }),
    });
    return tasks;
  } catch (error) {
    throw new Error(error);
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
    throw new Error(error);
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
    throw new Error(error);
  }
}
