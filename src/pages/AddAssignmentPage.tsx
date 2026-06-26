import { useState } from 'react'
import type { ChangeEvent, FocusEvent, FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAssignmentContext } from '../context/AssignmentContext'
import type { AssignmentPriority } from '../types/assignment'
import type { AssignmentFormErrors, AssignmentFormValues } from '../types/assignmentForm'
import { validateAssignmentForm } from '../utils/assignmentValidation'

const initialFormValues: AssignmentFormValues = {
  title: '',
  course: '',
  description: '',
  dueDate: '',
  priority: '',
  tags: '',
}

type FormTouchedState = Partial<Record<keyof AssignmentFormValues, boolean>>

const fieldLabels: Record<keyof AssignmentFormValues, string> = {
  title: 'Title',
  course: 'Course',
  description: 'Description',
  dueDate: 'Due Date',
  priority: 'Priority',
  tags: 'Tags',
}

function AddAssignmentPage() {
  const navigate = useNavigate()
  const { addAssignment } = useAssignmentContext()
  const [formValues, setFormValues] = useState<AssignmentFormValues>(initialFormValues)
  const [errors, setErrors] = useState<AssignmentFormErrors>({})
  const [touched, setTouched] = useState<FormTouchedState>({})
  const [hasSubmitted, setHasSubmitted] = useState<boolean>(false)
  const [submitMessage, setSubmitMessage] = useState<string>('')

  function validateCurrentValues(nextValues: AssignmentFormValues): AssignmentFormErrors {
    return validateAssignmentForm(nextValues)
  }

  function hasFieldError(field: keyof AssignmentFormValues): boolean {
    return Boolean(errors[field]) && (Boolean(touched[field]) || hasSubmitted)
  }

  function getFieldClassName(field: keyof AssignmentFormValues): string {
    return hasFieldError(field) ? 'form-input-error' : ''
  }

  function markTouched(field: keyof AssignmentFormValues): void {
    setTouched((previous) => ({ ...previous, [field]: true }))
  }

  function handleChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ): void {
    const { name, value } = event.target
    const fieldName = name as keyof AssignmentFormValues

    setFormValues((previous) => {
      const nextValues = {
        ...previous,
        [name]: value,
      }

      if (hasSubmitted || touched[fieldName]) {
        setErrors(validateCurrentValues(nextValues))
      }

      return nextValues
    })
  }

  function handleBlur(
    event: FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ): void {
    const fieldName = event.target.name as keyof AssignmentFormValues
    markTouched(fieldName)
    setErrors((previous) => ({
      ...previous,
      ...validateCurrentValues(formValues),
    }))
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault()
    setHasSubmitted(true)

    const nextErrors = validateCurrentValues(formValues)
    setErrors(nextErrors)
    setSubmitMessage('')

    if (Object.keys(nextErrors).length > 0) {
      return
    }

    const nextId = window.crypto.randomUUID()

    addAssignment({
      id: nextId,
      title: formValues.title.trim(),
      course: formValues.course.trim(),
      description: formValues.description.trim(),
      dueDate: formValues.dueDate,
      priority: formValues.priority as AssignmentPriority,
      status: 'pending',
      tags: formValues.tags
        .split(',')
        .map((tag) => tag.trim())
        .filter(Boolean),
    })

    setFormValues(initialFormValues)
    setErrors({})
    setTouched({})
    setHasSubmitted(false)
    setSubmitMessage('Assignment added successfully.')
    navigate(`/assignments/${nextId}`)
  }

  const visibleErrorEntries = (Object.entries(errors) as Array<
    [keyof AssignmentFormValues, string | undefined]
  >).filter(([field, message]) => {
    return Boolean(message) && (Boolean(touched[field]) || hasSubmitted)
  })

  return (
    <section className="page-section">
      <h2>Add Assignment</h2>
      <form className="panel form-grid" onSubmit={handleSubmit} noValidate>
        {visibleErrorEntries.length > 0 && (
          <div className="error-summary" role="alert" aria-live="assertive">
            <p>Please fix the following:</p>
            <ul>
              {visibleErrorEntries.map(([field, message]) => (
                <li key={field}>
                  {fieldLabels[field]}: {message}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="form-row">
          <label htmlFor="title">Title</label>
          <input
            id="title"
            name="title"
            type="text"
            value={formValues.title}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-invalid={hasFieldError('title')}
            className={getFieldClassName('title')}
          />
          {hasFieldError('title') && (
            <p className="error-text" role="alert">
              {errors.title}
            </p>
          )}
        </div>

        <div className="form-row">
          <label htmlFor="course">Course</label>
          <input
            id="course"
            name="course"
            type="text"
            value={formValues.course}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-invalid={hasFieldError('course')}
            className={getFieldClassName('course')}
          />
          {hasFieldError('course') && (
            <p className="error-text" role="alert">
              {errors.course}
            </p>
          )}
        </div>

        <div className="form-row">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formValues.description}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-invalid={hasFieldError('description')}
            className={getFieldClassName('description')}
            rows={4}
          />
          {hasFieldError('description') && (
            <p className="error-text" role="alert">
              {errors.description}
            </p>
          )}
        </div>

        <div className="form-row">
          <label htmlFor="dueDate">Due Date</label>
          <input
            id="dueDate"
            name="dueDate"
            type="date"
            value={formValues.dueDate}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-invalid={hasFieldError('dueDate')}
            className={getFieldClassName('dueDate')}
          />
          {hasFieldError('dueDate') && (
            <p className="error-text" role="alert">
              {errors.dueDate}
            </p>
          )}
        </div>

        <div className="form-row">
          <label htmlFor="priority">Priority</label>
          <select
            id="priority"
            name="priority"
            value={formValues.priority}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-invalid={hasFieldError('priority')}
            className={getFieldClassName('priority')}
          >
            <option value="">Select priority</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          {hasFieldError('priority') && (
            <p className="error-text" role="alert">
              {errors.priority}
            </p>
          )}
        </div>

        <div className="form-row">
          <label htmlFor="tags">Tags (comma-separated)</label>
          <input
            id="tags"
            name="tags"
            type="text"
            value={formValues.tags}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-invalid={hasFieldError('tags')}
            className={getFieldClassName('tags')}
          />
          {hasFieldError('tags') && (
            <p className="error-text" role="alert">
              {errors.tags}
            </p>
          )}
        </div>

        <button type="submit">Add Assignment</button>
        {submitMessage && <p className="success-text">{submitMessage}</p>}
      </form>
    </section>
  )
}

export default AddAssignmentPage
