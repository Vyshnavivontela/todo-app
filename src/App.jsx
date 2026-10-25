import { useState } from 'react';

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

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

  return (
    <div style={{ maxWidth: '450px', margin: '40px auto', padding: '20px', fontFamily: 'Arial, sans-serif', textAlign: 'center' }}>
      <h1>My TODO App</h1>
      <form onSubmit={addTodo} style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Add a new task..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={{ flex: 1, padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        <button type="submit" style={{ padding: '10px 15px', borderRadius: '4px', backgroundColor: '#007bff', color: '#fff', border: 'none', cursor: 'pointer' }}>
          Add
        </button>
      </form>

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {todos.map((todo) => (
          <li
            key={todo.id}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '10px',
              marginBottom: '8px',
              backgroundColor: '#f4f4f4',
              borderRadius: '4px',
            }}
          >
            <span
              onClick={() => toggleTodo(todo.id)}
              style={{
                textDecoration: todo.completed ? 'line-through' : 'none',
                color: todo.completed ? '#888' : '#000',
                cursor: 'pointer',
              }}
            >
              {todo.text}
            </span>
            <button
              onClick={() => deleteTodo(todo.id)}
              style={{ backgroundColor: '#dc3545', color: '#fff', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer' }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;