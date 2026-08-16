import { useEffect, useState } from "react";

function App() {
  const [title, setTitle] = useState("");
  const [tasks, setTasks] = useState([]);

  const getTasks = async () => {
    const response = await fetch("https://task-backend-seven-topaz.vercel.app/tasks");
    const data = await response.json();
    setTasks(data);
  };

  const addTask = async () => {
    if (!title.trim()) return;

    await fetch("https://task-backend-seven-topaz.vercel.app/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title }),
    });

    setTitle("");
    getTasks();
  };

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <div>
      <h1>Task App</h1>

      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter task"
      />

      <button onClick={addTask}>Add</button>

      <ul>
        {tasks.map((task) => (
          <li key={task.id}>{task.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;