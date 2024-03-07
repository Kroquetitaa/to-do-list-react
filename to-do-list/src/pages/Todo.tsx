import React from "react";
import {
  SwipeableList,
  SwipeableListItem,
  LeadingActions,
  TrailingActions,
  SwipeAction,
} from "react-swipeable-list";
import "react-swipeable-list/dist/styles.css";
import "./style.css";
import { TaskInterface } from "../interfaces/task.interface";
import { useTodoContext } from "../context/TodoContext";

const Todo: React.FC = () => {
  const {
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
  } = useTodoContext();

  const filteredTask = (t: TaskInterface) => filter == null || t.check === filter;

  const leadingActions = (task: TaskInterface) => (
    <LeadingActions>
      <SwipeAction onClick={() => handleEdit(task)}><div className="swip editSwip">Edit</div></SwipeAction>
    </LeadingActions>
  );

  const trailingActions = (id: number) => (
    <TrailingActions>
      <SwipeAction
        destructive
        onClick={() => setTasks(tasks.filter((t) => t.id !== id))}
      >
        <div className="swip deleteSwip">Delete</div>
      </SwipeAction>
    </TrailingActions>
  );

  return (
    <div className="todo">
      <h1>TODO LIST</h1>
      <menu className="buttons">
        <button onClick={handleAddTask}>Add Task</button>
        <select
          className="selector"
          onChange={(e) => handleFilter(e.target.value)}
        >
          <option value="all">All</option>
          <option value="done">Done</option>
          <option value="progress">In progress</option>
        </select>
      </menu>
      <SwipeableList className="taskList" destructiveCallbackDelay={200}>
        {!!tasks.filter(filteredTask).length ? (
          tasks
            .filter(filteredTask)
            .map(({ title, check, id, createdAt }) => (
              <SwipeableListItem
                className="taskItem"
                key={id}
                leadingActions={leadingActions({ title, check, id, createdAt })}
                trailingActions={trailingActions(id)}
              >
                <input
                  type="checkbox"
                  checked={check}
                  onChange={() => handleCheck(id)}
                />
                <div className="todo_text">
                  <p>{title}</p>
                  <time>{createdAt}</time>
                </div>
              </SwipeableListItem>
            ))
        ) : (
          <h4>No Tasks...</h4>
        )}
      </SwipeableList>
      <dialog
        id="editDialog"
        ref={dialog}
        onClickCapture={(e) => {
          const dim = dialog.current?.getBoundingClientRect();
          console.clear();
          if (
            !!!dim ||
            !!!(e.clientX > dim?.left && e.clientX < dim?.right) ||
            !!!(e.clientY > dim?.top && e.clientY < dim?.bottom)
          ) {
            dialog.current?.close();
          }
        }}
      >
        <h2>{isAddingTask ? "Add Task" : "Edit Task"}</h2>
        <input
          type="text"
          autoFocus
          onKeyUp={(e) =>
            e.key === "Enter" &&
            (isAddingTask ? handleCreateTask() : handleSave())
          }
          value={isAddingTask ? newTask.title : editTask.title}
          onChange={(e) =>
            isAddingTask
              ? setNewTask({
                  ...newTask,
                  title: e.target.value,
                  createdAt: new Date().toISOString(),
                })
              : setEditTask({ ...editTask, title: e.target.value })
          }
        />
        <menu>
          {isAddingTask ? (
            <button onClick={handleCreateTask}>Add</button>
          ) : (
            <button onClick={handleSave}>Edit</button>
          )}
          <button onClick={() => dialog.current?.close()}>Close</button>
        </menu>
      </dialog>
    </div>
  );
};

export default Todo;
