import React from "react";

interface TodoItemProps {
  text: string;
  completed: boolean;
  onToggle: () => void;
}

// Reack Functional Components
const TodoItem: React.FC<TodoItemProps> = ({ text, completed, onToggle }) => {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={`todo-item ${completed ? "todo-item--done" : ""}`}
    >
      <span className="todo-item__check">{completed ? "?" : ""}</span>
      <span className="todo-item__text">{text}</span>
    </button>
  );
};

export default TodoItem;