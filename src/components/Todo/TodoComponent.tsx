import { useReducer, useState, FormEvent } from 'react';
import TodoListComponent from './TodoListComponent';
import { Button, Form, Row, Col } from 'react-bootstrap';

export interface Todo {
  id: string;
  title: string;
  complete: boolean;
}

interface AddAction {
  type: 'ADD';
  task: string;
}

interface CompleteAction {
  type: 'COMPLETE';
  id: string;
}

interface DeleteAction {
  type: 'DELETE';
  ids: string[];
}

type Action = AddAction | CompleteAction | DeleteAction;

function generateRandomId() {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  const length = 8;
  let id = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    id += chars[randomIndex];
  }
  return id;
}

function reducer(state: Todo[], action: Action) {
  switch (action.type) {
    case 'ADD':
      return [
        ...state,
        {
          id: generateRandomId(),
          title: action.task,
          complete: false,
        },
      ];
    case 'COMPLETE':
      return state.map((todo) =>
        todo.id === action.id ? { ...todo, complete: true } : todo
      );
    case 'DELETE':
      return state.filter((todo) => !action.ids.includes(todo.id));
    default:
      return state;
  }
}

function TodoComponent() {
  const [todos, dispatch] = useReducer(reducer, []);
  const [task, setTask] = useState('');
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (task.trim()) {
      dispatch({ type: 'ADD', task });
      setTask('');
    }
  };

  const handleCheckboxChange = (id: string) => {
    setSelectedIds((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const handleDelete = () => {
    dispatch({ type: 'DELETE', ids: Array.from(selectedIds) });
    setSelectedIds(new Set()); // Clear selected tasks after deletion
  };

  return (
    <div className="todocontainer">
      <Form onSubmit={handleSubmit} className="mb-3">
        <Row className="align-items-center">
          <Col xs={10}> {/* Increased width */}
            <Form.Control
              type="text"
              placeholder="Enter the task"
              value={task}
              onChange={(e) => setTask(e.target.value)}
            />
          </Col>
          <Col xs={2}>
            <Button variant="success" type="submit" size="sm" className="w-100">
              Submit
            </Button>
          </Col>
        </Row>
      </Form>
      {todos.length > 0 && (
        <TodoListComponent
          todos={todos}
          dispatch={dispatch}
          handleCheckboxChange={handleCheckboxChange}
          selectedIds={selectedIds}
          handleDelete={handleDelete}
        />
      )}
    </div>
  );
}

export default TodoComponent;