import { useState } from 'react'
import './App.css'

interface Task {
  id: number;
  title: string;
  status: 'todo' | 'inprogress' | 'done';
}

function App() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, title: 'Learn React', status: 'todo' },
    { id: 2, title: 'Build todo app', status: 'inprogress' },
    { id: 3, title: 'Deploy app', status: 'done' },
  ]);

  const [newTask, setNewTask] = useState('');

  const addTask = () => {
    if (newTask.trim()) {
      const task: Task = {
        id: Date.now(),
        title: newTask,
        status: 'todo',
      };
      setTasks([...tasks, task]);
      setNewTask('');
    }
  };

  const moveTask = (id: number, newStatus: 'todo' | 'inprogress' | 'done') => {
    setTasks(tasks.map(task => task.id === id ? { ...task, status: newStatus } : task));
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const getTasksByStatus = (status: 'todo' | 'inprogress' | 'done') => {
    return tasks.filter(task => task.status === status);
  };

  return (
    <div className="app">
      <h1>Kanban Todo App</h1>
      <div className="add-task">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add new task"
        />
        <button onClick={addTask}>Add Task</button>
      </div>
      <div className="columns">
        <div className="column">
          <h2>To Do</h2>
          <ul>
            {getTasksByStatus('todo').map(task => (
              <li key={task.id} className="task">
                {task.title}
                <div>
                  <button onClick={() => moveTask(task.id, 'inprogress')}>Start</button>
                  <button onClick={() => deleteTask(task.id)}>Delete</button>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="column">
          <h2>In Progress</h2>
          <ul>
            {getTasksByStatus('inprogress').map(task => (
              <li key={task.id} className="task">
                {task.title}
                <div>
                  <button onClick={() => moveTask(task.id, 'done')}>Complete</button>
                  <button onClick={() => deleteTask(task.id)}>Delete</button>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="column">
          <h2>Done</h2>
          <ul>
            {getTasksByStatus('done').map(task => (
              <li key={task.id} className="task">
                {task.title}
                <div>
                  <button onClick={() => moveTask(task.id, 'todo')}>Restart</button>
                  <button onClick={() => deleteTask(task.id)}>Delete</button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;