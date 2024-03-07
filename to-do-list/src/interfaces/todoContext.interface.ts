import { TaskInterface } from "./task.interface";

export interface TodoContextType {
    dialog: React.MutableRefObject<HTMLDialogElement | null>;
    isAddingTask: boolean;
    setTasks: (newTasks: TaskInterface[]) => void;
    tasks: TaskInterface[];
    filter: boolean | null | undefined;
    handleEdit: (task: TaskInterface) => void;
    handleAddTask: () => void;
    handleCheck: (id: number) => void;
    handleCreateTask: () => void;
    handleFilter: (option: string) => void;
    handleSave: () => void;
    setNewTask: React.Dispatch<React.SetStateAction<{ title: string; check: boolean; createdAt: string; }>>;
    setEditTask: React.Dispatch<React.SetStateAction<TaskInterface>>;
    newTask: {
      title: string;
      check: boolean;
    };
    editTask: TaskInterface;
  }