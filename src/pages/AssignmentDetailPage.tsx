import { Link, useParams } from 'react-router-dom'
import ErrorMessage from '../components/common/ErrorMessage'
import LoadingState from '../components/common/LoadingState'
import { useAssignmentContext } from '../context/AssignmentContext'
import { useAssignmentDetail } from '../hooks/useAssignmentDetail'

function AssignmentDetailPage() {
  const { id } = useParams()
  const { assignment, loading, error } = useAssignmentDetail(id)
  const {
    selectedAssignmentId,
    toggleFavoriteAssignment,
    isFavoriteAssignment,
    toggleAssignmentCompletion,
    isAssignmentCompleted,
  } = useAssignmentContext()

  if (loading) {
    return (
      <section className="page-section">
        <h2>Assignment Detail</h2>
        <LoadingState message="Loading assignment detail..." />
      </section>
    )
  }

  if (error) {
    return (
      <section className="page-section">
        <h2>Assignment Detail</h2>
        <ErrorMessage message={error} />
      </section>
    )
  }

  if (!assignment) {
    return (
      <section className="page-section">
        <h2>Assignment Detail</h2>
        <p>Assignment was not found.</p>
      </section>
    )
  }

  const completed = isAssignmentCompleted(
    assignment.id,
    assignment.status === 'completed',
  )
  const favorite = isFavoriteAssignment(assignment.id)

  return (
    <section className="page-section panel">
      <Link to="/assignments">← Back to Assignments</Link>
      <h2>Assignment Detail</h2>
      <p>Selected in context: {selectedAssignmentId ?? 'None'}</p>
      <h3>{assignment.title}</h3>
      <p>Course: {assignment.course}</p>
      <p>Description: {assignment.description}</p>
      <p>Due Date: {assignment.dueDate}</p>
      <p>Priority: {assignment.priority}</p>
      <p>Status: {completed ? 'completed' : 'pending'}</p>
      <button
        type="button"
        onClick={() =>
          toggleAssignmentCompletion(assignment.id, assignment.status === 'completed')
        }
      >
        Mark as {completed ? 'incomplete' : 'complete'}
      </button>
      <button type="button" onClick={() => toggleFavoriteAssignment(assignment.id)}>
        {favorite ? 'Unstar' : 'Star'}
      </button>
      {assignment.tags && assignment.tags.length > 0 && (
        <p>Tags: {assignment.tags.join(', ')}</p>
      )}
    </section>
  )
}

export default AssignmentDetailPage
