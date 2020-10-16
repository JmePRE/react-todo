import React from 'react';
//import './App.css';
import style from "./styles/dist/App.css";

//from https://www.digitalocean.com/community/tutorials/how-to-build-a-react-to-do-app-with-react-hooks

function App() {
  //hook to set state
  //state constant todos, update method is setTodos
	const [todos, setTodos] = React.useState([
		{ text: "Learn about React", isCompleted: false},
		{ text: "Meet friend for lunch", isCompleted: false },
		{ text: "Build really cool todo app", isCompleted: false }
	]);

  	//Editing functions---------------------------------------------------------------------------------------

	const addTodo = text => {
		//...todos --> Array/Object spread operator: basically copies all the params from todos, and adds another text
		const newTodos = [...todos, { text }];
		setTodos(newTodos);
	};

	const completeTodo = index => {
		//this time, copy todo again, but we're not adding anything
		const newTodos = [...todos];
		newTodos[index].isCompleted = true;
		//finally, update
		//note: never change value of newtodos directly, always access it through a getter function like so
		setTodos(newTodos);
	};

	const removeTodo = index => {
		const newTodos = [...todos];
		newTodos.splice(index, 1);
		setTodos(newTodos);
	};

//--------------------------------------------------------------------------------------------------

  //adds a <div> for app, a <div> for todo-list, and a map of the todos to Todo components.
	return (
		
		<div className="app">
		<div className="todo-list">
			
			{todos.map((todo, index) => (
				<Todo 
				key={index} 
				index={index} 
				todo={todo} 
				completeTodo={completeTodo}
				removeTodo={removeTodo}
				/>
			))}
			<TodoForm addTodo={addTodo} />
		</div>
		</div>
	);
	}

//renders each item in todo list
function Todo({ todo, index, completeTodo, removeTodo }) {
	return (<div 
		className="todo"
		//ternary operator --> (condition) ? expression on true : expression on false
		style = {{ textDecoration: (todo.isCompleted) ? "line-through" : ""}}
		>
		{todo.text}
		<div>
			<button onClick={() => completeTodo(index)}>Complete</button>
			<button onClick={() => removeTodo(index)}>x</button>

		</div>
		</div>
	);
};

// ...

function TodoForm({ addTodo }) {
	//local state for the todo form
	const [value, setValue] = React.useState("");

	const handleSubmit = e => {
		//returns 'false' to prevent default handle behavior
		e.preventDefault();
		//blocking(?)
		if (!value) return;
		addTodo(value);
		setValue("");
	};

	//displays form
	return (
		<form onSubmit={handleSubmit} className={style.container}>
		<input
			type="text"
			className="input"
			value={value}
			onChange={e => setValue(e.target.value)}
		/>
		</form>
	);
}

// ...

export default App;