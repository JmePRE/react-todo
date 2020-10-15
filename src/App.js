import React from 'react';
import './App.css';

function App() {
  //hook to set state
  const [todos, setTodos] = React.useState([
    { text: "Learn about React" },
    { text: "Meet friend for lunch" },
    { text: "Build really cool todo app" }
  ]);

  //adds a <div> for app, a <div> for todo-list, and a map of the todos to Todo components.
  return (
    <div className="app">
      <div className="todo-list">
        {todos.map((todo, index) => (
          <Todo key={index} index={index} todo={todo} />
        ))}

      </div>
    </div>
  );
}

//renders each item in todo list
function Todo({ todo }) {
  return (<div className="todo">{todo.text}</div>
  );
};



export default App;