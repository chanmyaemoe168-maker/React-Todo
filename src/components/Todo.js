import React, { useRef, useState } from 'react'

export default function Todo({ todo, deleteTodo, updateTodo }) {
  let [isEditing, setIsEditing] = useState(false);
  let [title, setTitle] = useState(todo.title);
  let isEditingRef = useRef(false);

  let startEditing = () => {
    setTitle(todo.title);
    isEditingRef.current = true;
    setIsEditing(true);
  };

  let cancelEditing = () => {
    isEditingRef.current = false;
    setTitle(todo.title);
    setIsEditing(false);
  };

  let saveEditing = (event) => {
    event.preventDefault();
    if (!isEditingRef.current) {
      return;
    }
    isEditingRef.current = false;
    setIsEditing(false);

    let nextTitle = title.trim();
    if (!nextTitle || nextTitle === todo.title) {
      setTitle(todo.title);
      return;
    }
    updateTodo(todo.id, nextTitle);
  };

  return (
   <li
     className="todo-item-container"
     onDoubleClick={(event) => {
       if (event.target.closest("input, button, form")) {
         return;
       }
       startEditing();
     }}
   >
            <div className="todo-item">
              <input type="checkbox" />
              {!isEditing && (
                <span className={`todo-item-label ${todo.completed ? 'line-through' : ''}`}>
                  {todo.title}
                </span>
              )}
              {isEditing && (
                <form onSubmit={saveEditing}>
                  <input
                    type="text"
                    className="todo-item-input"
                    value={title}
                    autoFocus
                    onChange={(event) => setTitle(event.target.value)}
                    onBlur={saveEditing}
                    onKeyDown={(event) => {
                      if (event.key === "Escape") {
                        cancelEditing();
                      }
                    }}
                  />
                </form>
              )}
            </div>
            <button className="x-button" onClick={() => deleteTodo(todo.id)}>
              <svg
                className="x-button-icon"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </li>
  )
}
