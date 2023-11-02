import { useState, useEffect } from 'react';


import { getTodos, postTodo, putTodo, deleteTodo } from './actions/todos';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState('');

  const getData = () => {
    getTodos().then(setTodos);
  };
  
  const addTodo = () => {
    postTodo(todo).then(getData);
  };

  const completeTodo = (todo) => {
    const newTodo = {...todo, isDone: true}
    putTodo(newTodo).then(() => {
      getData();
    })
  };

  const delTodo = (todo) => {
    deleteTodo(todo).then(() => {
      getData();
    })
  };
  
  useEffect(() => { getData() }, []);

  return (
    <div className="App">
      <input value={todo} onChange={(e) => setTodo(e.target.value)} />
      <button onClick={e => addTodo()} >Submit</button>
      {
        todos.map((td, index) => {
          return (
            <div key={index}>
              <span className={td.isDone ? 'done' : ''}>{td.description}</span>
              <span>
                {td.isDone ? <button onClick={() => delTodo(td)}>delete</button> : <button onClick={() => completeTodo(td)}>complete</button>}
              </span>
            </div>
          )
        })
      }
    </div>
  );
}

export default App;
