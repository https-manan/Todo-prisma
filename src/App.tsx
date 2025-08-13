import { useState } from 'react';
import Todo from './components/Todo';
import { useRecoilState } from 'recoil';
import AddTodo from './atoms/Todoatom';
import axios from 'axios';

function App() {
  const [todos, setTodos] = useRecoilState(AddTodo);
  const [title, setTitle] = useState('');
  const [isComplete,setIsComplete] = useState(false)

  async function addTodo() {
    if(title.trim()=== ""){
      alert('Add title')
      return
    }
    const res = await axios.post('http://localhost:8080/postTodos',{title,isComplete})
    setTodos([...todos, res.data]);
    setTitle('');
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center py-10">
    
      <div className="text-center mb-10">
        <div className="text-4xl font-extrabold">
          TODO APP <span className="text-blue-500">w/SERVER ACTIONS</span>
        </div>
        <br />
        <span className="text-gray-400">Manan's todo application</span>
      </div>

      {/* Input + Button */}
      <div className="flex items-center gap-2 mb-10">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add Todo Here..."
          className="px-4 py-2 rounded-md border border-gray-700 bg-transparent text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
        />
        <button
          onClick={addTodo}
          className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-md font-medium"
        >
          Add
        </button>
      </div>

      {/* Todo List */}
      <div className="w-full max-w-2xl space-y-4">
        <Todo />
      </div>
    </div>
  );
}

export default App;
