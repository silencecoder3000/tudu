export interface Task {
  id: number;
  description: string;
  dueDate?: string;
  isStarred: boolean;
  isCompleted: boolean;
  category: string[];
}
export interface Category {
  idlabel: number;
  name: string;
  description: string;
}

export interface ApiTask {
  idtask: number;
  description: string;
  priority: string;
  startDate: string;
  endDate?: string;
  category: string[];
  estado: boolean;
}

export interface CategoriesApi {
  idlabel: number;
  name: string;
  description: string;
}
