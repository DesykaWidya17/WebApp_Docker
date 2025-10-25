import React, { useState } from 'react';
import './App.css';

function App() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('');
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos([...todos, { id: Date.now(), text: newTodo.trim(), completed: false }]);
      setNewTodo('');
    }
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id) => {
    if (window.confirm('Are you sure you want to delete this todo?')) {
      setTodos(todos.filter(todo => todo.id !== id));
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Simple Web App</h1>
        <p>Welcome to my dockerized React app!</p>
        
        <div className="counter-section">
          <h2>Counter: {count}</h2>
          <button onClick={() => setCount(count + 1)}>+</button>
          <button onClick={() => setCount(count - 1)}>-</button>
          <button onClick={() => setCount(0)}>Reset</button>
        </div>

        <div className="greeting-section">
          <input 
            type="text" 
            placeholder="Enter your name" 
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {name && <p>Hello, {name}! 👋</p>}
        </div>

        <div className="todo-section">
          <h2>Todo List</h2>
          <div className="todo-input">
            <input 
              type="text" 
              placeholder="Add a new todo" 
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addTodo()}
            />
            <button onClick={addTodo}>Add</button>
          </div>
          <div className="todo-list">
            {todos.map(todo => (
              <div key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
                <input 
                  type="checkbox" 
                  checked={todo.completed}
                  onChange={() => toggleTodo(todo.id)}
                />
                <span className="todo-text">{todo.text}</span>
                <button 
                  className="delete-btn"
                  onClick={() => deleteTodo(todo.id)}
                >
                  🗑️
                </button>
              </div>
            ))}
          </div>
          {todos.length === 0 && <p className="no-todos">No todos yet. Add one above! 📝</p>}
        </div>

        <div className="info-section">
          <p>This app is running in Docker! 🐳</p>
          <p>Built with React and containerized for easy deployment.</p>
        </div>
      </header>
    </div>
  );
}

export default App;