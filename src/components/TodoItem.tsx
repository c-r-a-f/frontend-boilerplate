import React from 'react';

interface TodoItemProps {
  title: string;
  completed: boolean;
  onToggle: () => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ title, completed, onToggle }) => {
  return (
    <li>
      <span
        style={{ textDecoration: completed ? 'line-through' : 'none' }}
        onClick={onToggle}
      >
        {title}
      </span>
    </li>
  );
};

export default TodoItem;
