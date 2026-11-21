import React from 'react'
import Todo from'../components/Todo.js'

export default function TodoList({ todo,deleteTodo}) {
  return (
     <ul className="todo-list">
         {todo.map(todolists => (
           
          <Todo todo={todolists} key={todolists.id} deleteTodo={deleteTodo}/>
         ))}
        
        </ul>
  )
}
