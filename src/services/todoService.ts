import axios from 'axios';
import { Todo } from '../types/todo';  // Update the type to Todo

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

// Fetch all Todos
export const fetchTodos = async (): Promise<Todo[]> => {
  const response = await axios.get(`${apiUrl}/api/todos`);
  return Array.isArray(response.data) ? response.data : [];
};

// Fetch a Todo by id
export const fetchTodoById = async (id: string): Promise<Todo> => {
  const response = await axios.get(`${apiUrl}/api/todos/${id}`);
  return response.data;
};

// Create a new Todo
export const createTodo = async (todo: Omit<Todo, 'id' | 'createdAt'>): Promise<Todo> => {
  const response = await axios.post(`${apiUrl}/api/todos`, todo);
  return response.data;
};

// Update a Todo by id
export const updateTodo = async (id: string, todo: Partial<Todo>): Promise<Todo> => {
  const response = await axios.put(`${apiUrl}/api/todos/${id}`, todo);
  return response.data;
};

// Delete a Todo by id
export const deleteTodo = async (id: string): Promise<void> => {
  await axios.delete(`${apiUrl}/api/todos/${id}`);
};