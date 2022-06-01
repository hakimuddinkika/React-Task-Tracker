import { useState } from "react"
import Header from "./components/Header";
import Tasks from "./components/Tasks";

function App() {
	// const name = 'Hakimuddin';
	// const x = true;

	const [tasks, setTasks] = useState([
		{
			id : 1,
			text : 'Doctors Appointment',
			day : 'Feb 5th at 2:30am',
			reminder : true,
		},
		{
			id : 2,
			text : 'Meeting at School',
			day : 'Feb 6th at 1:30am',
			reminder : true,
		},
		{
			id : 3,
			text : 'Food Shopping',
			day : 'Feb 7th at 3:30am',
			reminder : false,
		},
	])

	//Delete Task
	const deleteTask = (id) => {
		setTasks(tasks.filter((task) => task.id !== id))
	}

	return (
		<div className="container">
			<Header />
			{ tasks.length > 0 ? (
				<Tasks tasks={tasks} onDelete={deleteTask}/>
			) : (
				'No tasks to show'
			)
			}
		</div>
	);
}



export default App;
