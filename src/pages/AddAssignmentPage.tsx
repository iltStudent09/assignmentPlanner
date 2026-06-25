import { useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'
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

function AddAssignmentPage() {
  const navigate = useNavigate()
  const { addAssignment, setSelectedAssignmentId } = useAssignmentContext()
  const [formValues, setFormValues] = useState<AssignmentFormValues>(initialFormValues)
  const [errors, setErrors] = useState<AssignmentFormErrors>({})
  const [submitMessage, setSubmitMessage] = useState<string>('')

  function handleChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ): void {
    const { name, value } = event.target
    setFormValues((previous) => ({
      ...previous,
      [name]: value,
    }))
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault()

    const nextErrors = validateAssignmentForm(formValues)
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

    setSelectedAssignmentId(nextId)
    setFormValues(initialFormValues)
    setErrors({})
    setSubmitMessage('Assignment added successfully.')
    navigate(`/assignments/${nextId}`)
  }

  return (
    <section>
      <h2>Add Assignment</h2>
      <form onSubmit={handleSubmit} noValidate>
        <div>
          <label htmlFor="title">Title</label>
          <input
            id="title"
            name="title"
            type="text"
            value={formValues.title}
            onChange={handleChange}
          />
          {errors.title && <p role="alert">{errors.title}</p>}
        </div>

        <div>
          <label htmlFor="course">Course</label>
          <input
            id="course"
            name="course"
            type="text"
            value={formValues.course}
            onChange={handleChange}
          />
          {errors.course && <p role="alert">{errors.course}</p>}
        </div>

        <div>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formValues.description}
            onChange={handleChange}
            rows={4}
          />
        </div>

        <div>
          <label htmlFor="dueDate">Due Date</label>
          <input
            id="dueDate"
            name="dueDate"
            type="date"
            value={formValues.dueDate}
            onChange={handleChange}
          />
          {errors.dueDate && <p role="alert">{errors.dueDate}</p>}
        </div>

        <div>
          <label htmlFor="priority">Priority</label>
          <select
            id="priority"
            name="priority"
            value={formValues.priority}
            onChange={handleChange}
          >
            <option value="">Select priority</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          {errors.priority && <p role="alert">{errors.priority}</p>}
        </div>

        <div>
          <label htmlFor="tags">Tags (comma-separated)</label>
          <input
            id="tags"
            name="tags"
            type="text"
            value={formValues.tags}
            onChange={handleChange}
          />
        </div>

        <button type="submit">Add Assignment</button>
        {submitMessage && <p>{submitMessage}</p>}
      </form>
    </section>
  )
}

export default AddAssignmentPage
