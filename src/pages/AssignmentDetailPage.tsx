import { useParams } from 'react-router-dom'
import ErrorMessage from '../components/common/ErrorMessage'
import LoadingState from '../components/common/LoadingState'
import { useAssignmentDetail } from '../hooks/useAssignmentDetail'

function AssignmentDetailPage() {
  const { id } = useParams()
  const { assignment, loading, error } = useAssignmentDetail(id)

  if (loading) {
    return (
      <section>
        <h2>Assignment Detail</h2>
        <LoadingState message="Loading assignment detail..." />
      </section>
    )
  }

  if (error) {
    return (
      <section>
        <h2>Assignment Detail</h2>
        <ErrorMessage message={error} />
      </section>
    )
  }

  if (!assignment) {
    return (
      <section>
        <h2>Assignment Detail</h2>
        <p>Assignment was not found.</p>
      </section>
    )
  }

  return (
    <section>
      <h2>Assignment Detail</h2>
      <h3>{assignment.title}</h3>
      <p>Course: {assignment.course}</p>
      <p>Description: {assignment.description}</p>
      <p>Due Date: {assignment.dueDate}</p>
      <p>Priority: {assignment.priority}</p>
      <p>Status: {assignment.status}</p>
      {assignment.tags && assignment.tags.length > 0 && (
        <p>Tags: {assignment.tags.join(', ')}</p>
      )}
    </section>
  )
}

export default AssignmentDetailPage
