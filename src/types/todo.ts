export interface Todo {
    id: string;
    title: string;
    description?: string;
    status: 'completed' | 'pending';
    createdAt: string;
    updatedAt: string;
  }  