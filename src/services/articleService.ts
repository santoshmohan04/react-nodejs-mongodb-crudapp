import axios from 'axios';
import { Article } from '../types/article';

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

export const fetchArticles = async (): Promise<Article[]> => {
  const response = await axios.get(`${apiUrl}/api/tutorials`);
  return Array.isArray(response.data) ? response.data : [];
};

export const fetchArticleById = async (id: string): Promise<Article> => {
  const response = await axios.get(`${apiUrl}/api/tutorials/${id}`);
  return response.data;
};

export const createArticle = async (article: Omit<Article, 'id' | 'createdAt'>): Promise<Article> => {
  const response = await axios.post(`${apiUrl}/api/tutorials`, article);
  return response.data;
};

export const updateArticle = async (id: string, article: Partial<Article>): Promise<Article> => {
  const response = await axios.put(`${apiUrl}/api/tutorials/${id}`, article);
  return response.data;
};

export const deleteArticle = async (id: string): Promise<void> => {
  await axios.delete(`${apiUrl}/api/tutorials/${id}`);
};