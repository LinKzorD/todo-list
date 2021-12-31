import React, { useReducer, useState } from "react";
import { array } from "./array";
import "./App.css";

function reducer(state, action) {
  switch (action.type) {
    case "add-todo":
      return {
        todos: [
          ...state.todos,
          {
            id: new Date().valueOf(),
            text: action.text,
            date: action.date,
            completed: false,
          },
        ],
      };
    case "del-todo":
      return {
        todos: state.todos.map((t, idx) =>
          idx === action.idx ? { ...t, completed: !t.completed } : t
        ),
      };
    default:
      return state;
  }
}

function App() {
  const [{ todos }, dispatch] = useReducer(reducer, { todos: array });
  const [text, textSet] = useState("");
  const [date, dateSet] = useState("");

  return (
    <div className='App'>
      <h1>TODO LIST:</h1>
      <div className='todo'>
        {todos.map((todo, idx) => {
          if (!todo.completed) {
            return (
              <div key={todo.id} className='todolist'>
                <div className='todolistele'>
                  <div>
                    <h2>{todo.text}</h2>
                  </div>
                  <div>
                    <p> {todo.date} </p>
                  </div>
                  <button
                    type='button'
                    className='btn'
                    onClick={() => dispatch({ type: "del-todo", idx })}
                  >
                    Done
                  </button>
                </div>
              </div>
            );
          }
        })}
      </div>
      <div className='form-div'>
        <h3>Add task:</h3>
        <form className='form'>
          <input
            value={text}
            placeholder='Todo'
            onChange={(e) => textSet(e.target.value)}
          />
          <input
            value={date}
            placeholder='Date'
            onChange={(e) => dateSet(e.target.value)}
          />
          <button
            className='btn'
            onClick={(e) => {
              e.preventDefault();
              dispatch({ type: "add-todo", text, date });
              textSet("");
              dateSet("");
            }}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
