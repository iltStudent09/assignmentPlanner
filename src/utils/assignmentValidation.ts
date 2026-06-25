import type { AssignmentFormErrors, AssignmentFormValues } from '../types/assignmentForm'

function getTodayDateString(): string {
  return new Date().toISOString().slice(0, 10)
}

export function validateAssignmentForm(values: AssignmentFormValues): AssignmentFormErrors {
  const errors: AssignmentFormErrors = {}

  if (!values.title.trim()) {
    errors.title = 'Title is required.'
  }

  if (!values.course.trim()) {
    errors.course = 'Course is required.'
  }

  if (!values.dueDate.trim()) {
    errors.dueDate = 'Due date is required.'
  }

  if (!values.priority) {
    errors.priority = 'Priority must be selected.'
  }

  if (values.dueDate && values.dueDate < getTodayDateString()) {
    errors.dueDate = 'Due date cannot be in the past.'
  }

  return errors
}
