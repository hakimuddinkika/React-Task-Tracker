import { useState, useEffect } from "react"
import AddTask from "./components/AddTask";
import Header from "./components/Header";
import Tasks from "./components/Tasks";

function App() {
	// const name = 'Hakimuddin';
	// const x = true;
	const [showAddTask, setShowAddTask] = useState(false)
	const [tasks, setTasks] = useState([])

	//Add Task
	const addTask = async (task) => {
		const res = await fetch('http://localhost:5000/tasks',{
			method : 'POST',
			headers:{
				'content-type' : 'application/json',
			},
			body: JSON.stringify(task)
		})

		const data = await res.json()

		setTasks([...tasks, data])
		// const id = Math.floor(Math.random() * 10000) + 1
		// const newTask = { id, ...task}

		// setTasks([...tasks, newTask])
	}

	//Delete Task
	const deleteTask = async (id) => {
		await fetch(`http://localhost:5000/tasks/${id}`, {
			method : 'DELETE'
		})
		
		setTasks(tasks.filter((task) => task.id !== id))
	}

	//Use Effect for getting data from Server
	useEffect(() => {
		const getTasks = async() => {
			const getTaskFromServer = await fetchTasks()
			setTasks(getTaskFromServer)
		}

		getTasks()
	}, [])

	//Fetch All Tasks function
	const fetchTasks = async() => {
		const res = await fetch('http://localhost:5000/tasks')

		const data = await res.json()
		console.log(data)
		return data
	}

	//Fetch Single Task with id
	const fetchTask = async(id) => {
		const res = await fetch(`http://localhost:5000/tasks/${id}`)
		const data = await res.json()
		return data
	}

	//Toggle Task Reminder
	const toggleReminder = async (id) => {
		const taskToToggle = await fetchTask(id)
		const updTask = { ...taskToToggle, reminder : !taskToToggle.reminder }

		const res = await fetch(`http://localhost:5000/tasks/${id}`,{
			method : 'PUT',
			headers : {
				'content-type' : 'application/json'
			},
			body: JSON.stringify(updTask)
		})

		const data = await res.json()
		setTasks(
			tasks.map((task) =>
				task.id === id ? { ...task, reminder : !task.reminder } : task
			)
		)
	}

	return (
		<div className="container">
			<Header onAdd={() => setShowAddTask(!showAddTask)} showAdd={showAddTask} />
			{showAddTask && <AddTask onAdd={addTask}/>}
			{ tasks.length > 0 ? (
				<Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder}/>
			) : (
				'No tasks to show'
			)
			}
		</div>
	);
}



export default App;
