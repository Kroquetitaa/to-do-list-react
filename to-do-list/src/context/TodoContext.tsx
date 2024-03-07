import React, { createContext, useContext, useState, ReactNode, useRef } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { TaskInterface } from "../interfaces/task.interface";
import { TodoContextType } from "../interfaces/todoContext.interface";

const TodoContext = createContext<TodoContextType | undefined>(undefined);

const now = new Date(Date.now());
const date = now.toLocaleDateString().replaceAll('/', '-');
const hour = now.toLocaleTimeString().split(':').slice(0,2).join(':');

export const useTodoContext = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error("useTodoContext debe usarse dentro de un TodoProvider");
  }
  return context;
};

interface TodoProviderProps {
  children: ReactNode;
}

export const TodoProvider: React.FC<TodoProviderProps> = ({ children }) => {
  const [tasks, setTasks] = useLocalStorage() as [
    TaskInterface[],
    (newTasks: TaskInterface[]) => void
  ];

  const [editTask, setEditTask] = useState<TaskInterface>({
    id: 0,
    title: "",
    check: false,
    createdAt: `${date} ~ ${hour}`,
  });

  const [newTask, setNewTask] = useState({
    title: "",
    check: false,
    createdAt: `${date} ~ ${hour}`,
  });

  const [isAddingTask, setIsAddingTask] = useState(false);
  const [filter, setFilter] = useState<boolean | null>();

  const dialog = useRef<null | HTMLDialogElement>(null);

  const handleCheck = (id: number) => {
    let updatedTasks;
    if (Array.isArray(tasks)) {
      updatedTasks = tasks.map((task: TaskInterface) => {
        if (task.id === id) {
          return { ...task, check: !task.check };
        }
        return task;
      });
      setTasks(updatedTasks);
    }
  };

  const handleEdit = (task: TaskInterface) => {
    setEditTask(task);
    setIsAddingTask(false);
    dialog.current?.showModal();
  };

  const handleSave = () => {
    if (!!editTask.title) {
      const taskUpdated = tasks.map((task: TaskInterface) =>
        task.id === editTask.id ? { ...editTask } : task
      );
      setTasks(taskUpdated);
    }

    dialog.current?.close();
  };

  const handleAddTask = () => {
    setIsAddingTask(true);
    dialog.current?.showModal();
  };

  const handleCreateTask = () => {
    const majorId: number | undefined = tasks?.at(-1)?.id;
    if (!!newTask.title) {
      const taskUpdated: Array<TaskInterface> = [
        ...tasks,
        { ...newTask, id: (majorId ? majorId : 0) + 1 },
      ];
      setTasks(taskUpdated);
      setNewTask({ title: "", check: false, createdAt: `${date} ~ ${hour}`});
    }
    dialog.current?.close();
  };

  const handleFilter = (option: string) => {
    setFilter({ all: null, done: true, progress: false }[option]);
  };

  return (
    <TodoContext.Provider
      value={{
        dialog,
        isAddingTask,
        tasks,
        setTasks,
        filter,
        handleEdit,
        handleAddTask,
        handleCheck,
        handleCreateTask,
        handleFilter,
        handleSave,
        setNewTask,
        setEditTask,
        newTask,
        editTask,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};
