import React from "react";
import "./TodoItem.css";
import {
  LeadingActions,
  SwipeableListItem,
  SwipeAction,
  TrailingActions,
} from "react-swipeable-list";
import "react-swipeable-list/dist/styles.css";

const TodoItem = ({
  message,
  check,
  id,
}: {
  message: string;
  check: boolean;
  id: number;
}) => {
  const leadingActions = () => (
    <LeadingActions>
      <SwipeAction onClick={() => console.info("swipe action triggered")}>
        Edit
      </SwipeAction>
    </LeadingActions>
  );

  const trailingActions = () => (
    <TrailingActions>
      <SwipeAction
        destructive={true}
        onClick={() => console.info("swipe action triggered")}
      >
        Delete
      </SwipeAction>
    </TrailingActions>
  );

  const now = new Date(Date.now());
  const date = now.toLocaleDateString().replaceAll('/', '-');
  const hour = now.toLocaleTimeString().split(':').slice(0,2).join(':');
  return (
    <SwipeableListItem
      leadingActions={leadingActions()}
      trailingActions={trailingActions()}
    >
      <input type="checkbox" name="" id="" />
      <div className="todo_text">
        <p>{message}</p>
        <time dateTime={date}>{`${date} ~ ${hour}`}</time>
      </div>
    </SwipeableListItem>
  );
};

export default TodoItem;
