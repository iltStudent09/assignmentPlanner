import type { AssignmentPriority } from './assignment'

export type AssignmentFormValues = {
  title: string
  course: string
  description: string
  dueDate: string
  priority: AssignmentPriority | ''
  tags: string
}

export type AssignmentFormErrors = Partial<Record<keyof AssignmentFormValues, string>>
