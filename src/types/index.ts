// Core types for the application

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'admin' | 'member';
}

export interface Project {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  dueDate?: string;
  status: 'active' | 'archived' | 'completed';
  members: string[]; // User IDs
}

export enum TaskStatus {
  TODO = 'todo',
  IN_PROGRESS = 'in-progress',
  DONE = 'done'
}

export interface Task {
  id: string;
  projectId: string;
  title: string;
  description: string;
  status: TaskStatus;
  assigneeId?: string; // User ID
  dueDate?: string;
  createdAt: string;
  labels: string[];
}

export interface Comment {
  id: string;
  taskId: string;
  userId: string;
  content: string;
  createdAt: string;
}

export interface Label {
  id: string;
  name: string;
  color: string;
}