import { useState } from 'react';
import './App.css';

function App() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Learn React basics', completed: false },
    { id: 2, text: 'Build my first application', completed: true },
  ]);
  const [input, setInput] = useState('');
  const [filter, setFilter] = useState('all');

  const addTodo = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    setTodos([...todos, { id: Date.now(), text: input, completed: false }]);
    setInput('');
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const clearCompleted = () => {
    setTodos(todos.filter((todo) => !todo.completed));
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  const remainingCount = todos.filter((t) => !t.completed).length;
  const completedCount = todos.filter((t) => t.completed).length;

  return (
    <div className="container">
      <div className="icon-badge">
        <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
      </div>

      <h1>My Tasks</h1>
      <p className="subtitle">Plan your day. Make progress.</p>

      <div className="card">
        <form onSubmit={addTodo} className="input-group">
          <input
            type="text"
            placeholder="What do you need to do?"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button type="submit" className="add-btn">+ Add</button>
        </form>

        <div className="status-row">
          <span>{remainingCount} remaining</span>
          <span>{completedCount} completed</span>
        </div>

        <div className="filter-group">
          <button className={filter === 'all' ? 'active' : ''} onClick={() => setFilter('all')}>All</button>
          <button className={filter === 'active' ? 'active' : ''} onClick={() => setFilter('active')}>Active</button>
          <button className={filter === 'completed' ? 'active' : ''} onClick={() => setFilter('completed')}>Completed</button>
        </div>

        <ul className="todo-list">
          {filteredTodos.map((todo) => (
            <li key={todo.id} className={todo.completed ? 'completed' : ''}>
              <label className="checkbox-container">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleTodo(todo.id)}
                />
                <span className="checkmark"></span>
                <span className="todo-text">{todo.text}</span>
              </label>
              <button className="delete-btn" onClick={() => deleteTodo(todo.id)}>✕</button>
            </li>
          ))}
        </ul>

        <div className="card-footer">
          <span>{todos.length} total tasks</span>
          {completedCount > 0 && (
            <button className="clear-btn" onClick={clearCompleted}>Clear completed</button>
          )}
        </div>
      </div>

      <p className="footer-quote">Small steps every day lead to big results.</p>
    </div>
  );
}

export default App;