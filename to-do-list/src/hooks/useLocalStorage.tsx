import { useEffect, useState } from "react";
import { TaskInterface } from "../interfaces/task.interface";


const now = new Date(Date.now());
const date = now.toLocaleDateString().replaceAll('/', '-');
const hour = now.toLocaleTimeString().split(':').slice(0,2).join(':');
const initialValue: TaskInterface[] = [{ title: "First Task", check: false, id: 0, createdAt: `${date} ~ ${hour}` }];

export function useLocalStorage() {
  const localget: string | null = localStorage.getItem("tasklist");
  const recoverTasks: TaskInterface[] = !!localget ? JSON.parse(localget) : initialValue;
  const [taskList, setTaskList] = useState<TaskInterface[]>(recoverTasks);

  useEffect(() => {
    if (!localget) {
      setTaskList(initialValue);
      localStorage.setItem("tasklist", JSON.stringify(initialValue));
    } else {
      setTaskList(JSON.parse(localget));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasklist", JSON.stringify(taskList));
  }, [taskList]);

  function updateTasks(newTasks: TaskInterface[]) {
    setTaskList(newTasks);
  }

  return [taskList, updateTasks] as const;
}