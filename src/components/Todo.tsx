import { useRecoilState } from 'recoil';
import AddTodo from '../atoms/Todoatom';
import axios from 'axios';

function Todo() {
  const [todos, setTodos] = useRecoilState(AddTodo);

  // Toggle a todo's completion
  const toggleComplete = async (id: number, current: boolean) => {
    try {
      // Update backend
      const res = await axios.put(`http://localhost:8080/updateTodo/${id}`, {
        isComplete: !current,
      });

      // Update local state
      setTodos(
        todos.map((todo) =>
          todo.id === id ? { ...todo, isComplete: res.data.isComplete } : todo
        )
      );
    } catch (err) {
      console.error(err);
    }
  };

  // Delete a todo
  const deleteTodo = async (id: number) => {
    try {
      await axios.delete(`http://localhost:8080/deleteTodo/${id}`);
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-4">
      {todos.map((todo) => (
        <div
          key={todo.id}
          className="flex items-center justify-between bg-[#0f1624] px-4 py-3 rounded-xl shadow-md"
        >
          {/* Left side: checkbox + title */}
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={todo.isComplete}
              onChange={() => toggleComplete(todo.id, todo.isComplete)}
              className="w-5 h-5 accent-blue-500 cursor-pointer"
            />
            <span
              className={`text-white font-medium ${
                todo.isComplete ? 'line-through text-gray-500' : ''
              }`}
            >
              {todo.title}
            </span>
          </div>

          {/* Right side: delete button */}
          <div className="flex items-center gap-2">
            <button
              className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded-md text-white transition-colors"
              onClick={() => deleteTodo(todo.id)}
            >
              🗑️
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Todo;
