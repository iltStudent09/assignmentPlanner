export type AssignmentPriority = 'low' | 'medium' | 'high'

export type AssignmentStatus = 'pending' | 'completed'

export interface Assignment {
  id: string
  title: string
  course: string
  description: string
  dueDate: string
  priority: AssignmentPriority
  status: AssignmentStatus
  tags?: string[]
}
