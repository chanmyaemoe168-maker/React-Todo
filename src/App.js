import './reset.css';
import './App.css';
import TodoForm from './components/TodoForm.js';
import TodoList from './components/TodoList.js';
import CheckAllAndRemaning from './components/CheckAllAndRemaning.js';
import TodoFilter from './components/TodoFilter.js';
import ClearCompletedBtn from './components/ClearCompletedBtn.js';
import { useEffect, useState } from 'react';

function App() {
  let[todos, setTodos] = useState([]);
  
  useEffect(()=> {
    fetch("http://localhost:3001/todos"
    )
    .then(res => res.json())
    .then(todos=> {
      setTodos(todos)
})   
  },[])

let addTodo = (todo) => {
  fetch("http://localhost:3001/todos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todo),
  })
    .then((res) => res.json())
    .then((savedTodo) => {
      setTodos((prevState) => [...prevState, savedTodo]);
    });
};

let deleteTodo = (todoId) => {
  fetch(`http://localhost:3001/todos/${todoId}`, {
    method: "DELETE",
  }).then((res) => {
    if (res.ok) {
      setTodos((prevState) => prevState.filter((todo) => todo.id !== todoId));
    }
  });
};

let updateTodo = (todoId, title) => {
  fetch(`http://localhost:3001/todos/${todoId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title }),
  })
    .then((res) => res.json())
    .then((updatedTodo) => {
      setTodos((prevState) =>
        prevState.map((todo) => (todo.id === todoId ? updatedTodo : todo))
      );
    });
};

  return (
    <div className="todo-app-container">
      <div className="todo-app">
        <h2>Todo App</h2>
        <TodoForm addTodo={addTodo}/>
        <TodoList todo={todos} deleteTodo={deleteTodo} updateTodo={updateTodo} />
        <CheckAllAndRemaning/>

        {/* to do filter*/}
        <div className="other-buttons-container">
          <TodoFilter/>
          <ClearCompletedBtn/>
          
        </div>
      </div>
    </div>
  );
}

export default App;
