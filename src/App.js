import Header from "./components/Header";
import Tasks from "./components/Tasks";
import {useEffect, useState} from "react";
import AddTask from "./components/AddTask";
import Footer from "./components/Footer";
import About from "./components/About";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
    const [showAddTask, setShowAddTask] = useState(false);

    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const getTasks = async () => {
            const tasksFromServer = await fetchTasks();

            setTasks(tasksFromServer);
        }

        getTasks();
    }, [])

    const fetchTasks = async () => {
        const res = await fetch("http://localhost:5000/tasks");
        return await res.json();
    }

    const fetchTask = async (id) => {
        const res = await fetch(`http://localhost:5000/tasks/${id}`);
        return await res.json();
    }

    const addTask = async (task) => {
        // const id = Math.floor(Math.random() * 10) + 1;
        // const newTask = {id, ...task};
        // setTasks([...tasks, newTask]);
        
        const res = await fetch("http://localhost:5000/tasks", {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(task)
        });

        const data = await res.json();

        setTasks([...tasks, data]);
    }

    const deleteTask = async (id) => {
        await fetch(`http://localhost:5000/tasks/${id}`, {
            method: 'DELETE'
        })

        setTasks(tasks.filter((task) => task.id !== id));
    }

    const toggleReminder = async (id) => {
        const taskToToggle = await fetchTask(id)
        const updTask = {...taskToToggle, reminder: !taskToToggle.reminder}
        const res = await fetch(`http://localhost:5000/tasks/${id}`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(updTask)
        })
        const data = await res.json();

        setTasks(tasks.map((task) => task.id === id ? { ...task, reminder: data.reminder } : task));
    }

    const showTaskForm = () => {
        setShowAddTask(!showAddTask);
    }

    return (
        <Router>
            <div className="container">
                <Header onShowAddTask={showTaskForm} showAddTaskValue={showAddTask} title='Task Tracker' />

                <Routes>
                    <Route path='/' exact element={
                        <>
                            {showAddTask && (
                                <AddTask onAddTask={addTask} />
                            )}

                            {tasks.length > 0 ? (
                                <Tasks tasks={tasks} onToggle={toggleReminder} onDelete={deleteTask} />
                            ) : (
                                'No available task'
                            )}
                        </>
                    } />

                    <Route path='/about' element={<About />} />
                </Routes>

                <Footer />
            </div>
        </Router>
    );
}

export default App;
