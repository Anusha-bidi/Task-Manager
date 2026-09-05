import { useEffect, useState } from "react";
import Taskform from "./Taskform";
import Tasklist from "./Tasklist";
import "./App.css";
import Progresstracker from "./progresstracker";

export default function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task) => {
    setTasks([...tasks, task]);
  };

  const updateTask = (updatedTask, index) => {
    const newtasks = [...tasks];
    newtasks[index] = updatedTask;
    setTasks(newtasks);
  };

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const clearTasks = () => {
    setTasks([]);
  };

 const [search, setSearch] = useState("");
 const [darkMode, setDarkMode] = useState(false);


  const filteredTasks = tasks.filter(task =>
  task.text.toLowerCase().includes(search.toLowerCase())
  );

  return (
  <div className={darkMode ? "app dark" : "app"}>
    <h1>TaskMan</h1>
    <p>Friendly Task manager</p>

    <button
      className="theme-btn"
      onClick={() => setDarkMode(!darkMode)}
    >
      {darkMode ? "☀ Light Mode" : "🌙 Dark Mode"}
    </button>

    <Taskform addTask={addTask} />

    <input
      type="text"
      placeholder="Search tasks..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="search-box"
    />

    <Tasklist
      tasks={filteredTasks}
      updateTask={updateTask}
      deleteTask={deleteTask}
    />

    <Progresstracker tasks={tasks} />

    {tasks.length > 0 && (
      <button
        className="clear-btn"
        onClick={clearTasks}
      >
        Clear All Tasks
      </button>
    )}
  </div>
  );
}