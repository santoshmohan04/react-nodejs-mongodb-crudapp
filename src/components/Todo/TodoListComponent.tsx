import { Todo } from './TodoComponent';
import Button from 'react-bootstrap/Button';

interface TodoListComponentProps {
  todos: Todo[];
  dispatch: React.Dispatch<any>;
  handleCheckboxChange: (id: string) => void;
  selectedIds: Set<string>;
  handleDelete: () => void;
}

function TodoListComponent({
  todos,
  dispatch,
  handleCheckboxChange,
  selectedIds,
  handleDelete,
}: TodoListComponentProps) {
  return (
    <div className="mt-3">
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {todos.map((todo) => (
          <li
            key={todo.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '8px',
            }}
          >
            {/* Selection Checkbox */}
            <input
              type="checkbox"
              checked={selectedIds.has(todo.id)}
              onChange={() => handleCheckboxChange(todo.id)}
              style={{ marginRight: '8px' }}
            />
            <span
              style={{
                flex: 1,
                textDecoration: todo.complete ? 'line-through' : 'none',
              }}
            >
              {todo.title}
            </span>
            {/* Complete Button */}
            {selectedIds.has(todo.id) && !todo.complete && (
              <Button variant="warning" onClick={() => dispatch({ type: 'COMPLETE', id: todo.id })}
              style={{ marginLeft: '8px' }} size="sm">Complete</Button>
            )}
          </li>
        ))}
      </ul>
      {/* Delete Button */}
      {selectedIds.size > 0 && (
        <Button variant="danger" size="sm" onClick={handleDelete}
        style={{
          marginTop: '16px',
          padding: '8px 16px',
          backgroundColor: 'red',
          color: 'white',
          border: 'none',
          cursor: 'pointer',
        }}>Delete Selected</Button>
      )}
    </div>
  );
}

export default TodoListComponent;
