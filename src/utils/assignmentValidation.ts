import type { AssignmentFormErrors, AssignmentFormValues } from '../types/assignmentForm'

function getTodayDateString(): string {
  return new Date().toISOString().slice(0, 10)
}

const TITLE_PATTERN = /^[\w\s.,:;!?()'"-]+$/
const COURSE_PATTERN = /^[A-Za-z0-9\s-]+$/
const TAGS_PATTERN = /^[A-Za-z0-9\s,-]*$/

export function validateAssignmentForm(values: AssignmentFormValues): AssignmentFormErrors {
  const errors: AssignmentFormErrors = {}
  const trimmedTitle = values.title.trim()
  const trimmedCourse = values.course.trim()
  const trimmedDescription = values.description.trim()
  const trimmedTags = values.tags.trim()

  if (!trimmedTitle) {
    errors.title = 'Title is required.'
  } else if (trimmedTitle.length < 3) {
    errors.title = 'Title must be at least 3 characters.'
  } else if (!TITLE_PATTERN.test(trimmedTitle)) {
    errors.title = 'Title contains unsupported characters.'
  }

  if (!trimmedCourse) {
    errors.course = 'Course is required.'
  } else if (!COURSE_PATTERN.test(trimmedCourse)) {
    errors.course = 'Course can only include letters, numbers, spaces, and hyphens.'
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

  if (trimmedDescription.length > 500) {
    errors.description = 'Description must be 500 characters or fewer.'
  }

  if (trimmedTags && !TAGS_PATTERN.test(trimmedTags)) {
    errors.tags = 'Tags can only include letters, numbers, spaces, commas, and hyphens.'
  }

  return errors
}
