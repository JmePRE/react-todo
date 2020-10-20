import React from 'react';
//import './App.css';
import "./styles/dist/App.css";

//from https://www.digitalocean.com/community/tutorials/how-to-build-a-react-to-do-app-with-react-hooks

function Hero(props) {
	return (
		<div className='hero'>
			<h1>Welcome, {props.name}</h1>
		</div>
	);
}

function LoginForm({ uname, password }) {
	//local state for the todo form
	const [name, setName] = React.useState("");

	const handleLogin = e => {
		//returns 'false' to prevent default handle behavior
		e.preventDefault();
		//blocking(?)
		console.log(name);
		if (!name) return;
		setName("");
		//retrieve todos based on name
	};

	//displays form
	return (
		<div className="login-form">
		<form onSubmit={handleLogin}>
		<input
			type="text"
			className="username"
			value={name}
			onChange={e => setName(e.target.value)}
		/>
		<input
			type="text"
			className="password"
			value={password}
			//onChange={e => setName(e.target.value)}
		/>
		</form>
		</div>
	);
}

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
		if (newTodos[index].isCompleted === true) {
			newTodos[index].isCompleted = false;
		} else {
			newTodos[index].isCompleted = true;
		};
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
		<div>
		<Hero name="Jo"></Hero>
		<LoginForm />
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
			<button onClick={() => completeTodo(index)}>{(todo.isCompleted) ? "Mark Uncomplete" : "Mark Complete"}</button>
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
		<form onSubmit={handleSubmit}>
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