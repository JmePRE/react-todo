import React from 'react';
import './App.css';

//from https://www.digitalocean.com/community/tutorials/how-to-build-a-react-to-do-app-with-react-hooks

function App() {
  //hook to set state
  const [todos, setTodos] = React.useState([
    { text: "Learn about React" },
    { text: "Meet friend for lunch" },
    { text: "Build really cool todo app" }
  ]);

  const addTodo = text => {
    //...todos --> Array/Object spread operator: basically copies all the params from todos, and adds another text
    const newTodos = [...todos, { text }];
    setTodos(newTodos);
  };

  //adds a <div> for app, a <div> for todo-list, and a map of the todos to Todo components.
  return (
    <div className="app">
      
      <div className="todo-list">
        {todos.map((todo, index) => (
          <Todo key={index} index={index} todo={todo} />
        ))}
        <TodoForm addTodo={addTodo} />
      </div>
    </div>
  );
}

//renders each item in todo list
function Todo({ todo }) {
  return (<div className="todo">{todo.text}</div>
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