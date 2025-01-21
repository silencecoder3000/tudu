export interface Task {
  id: number
  title: string
  description: string
  dueDate?: string
  isStarred: boolean
  isCompleted: boolean
  category: string
}

