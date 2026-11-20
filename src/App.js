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
  //update data at server site
  fetch("http://localhost:3001/todos",{
    method:"POST",
    headers: {
      'Content-Type':'application/json'
    },
    body:JSON.stringify(todo)
  })

  //update data at client site
  setTodos(prevState => [...prevState,todo])

}

  return (
    <div className="todo-app-container">
      <div className="todo-app">
        <h2>Todo App</h2>
        <TodoForm addTodo={addTodo}/>
        <TodoList todo={todos}/>
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
