import { TodoProvider } from "./context/TodoContext";
import Todo from "./pages/Todo";

const App = () => {
  return (
    <>
    <TodoProvider>
      <Todo />
    </TodoProvider>
    </>
  );
};

export default App;
