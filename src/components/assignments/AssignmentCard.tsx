import { Link } from 'react-router-dom'
import { useAssignmentContext } from '../../context/AssignmentContext'
import type { Assignment } from '../../types/assignment'

type AssignmentCardProps = {
  assignment: Assignment
}

function AssignmentCard({ assignment }: AssignmentCardProps) {
  const {
    setSelectedAssignmentId,
    toggleFavoriteAssignment,
    isFavoriteAssignment,
    toggleAssignmentCompletion,
    isAssignmentCompleted,
  } = useAssignmentContext()

  const initiallyCompleted = assignment.status === 'completed'
  const completed = isAssignmentCompleted(assignment.id, initiallyCompleted)
  const favorite = isFavoriteAssignment(assignment.id)

  return (
    <article className="assignment-card">
      <h3>
        <Link
          to={`/assignments/${assignment.id}`}
          onClick={() => setSelectedAssignmentId(assignment.id)}
        >
          {assignment.title}
        </Link>
      </h3>
      <p>{assignment.course}</p>
      <p>Due: {assignment.dueDate}</p>
      <p>Priority: {assignment.priority}</p>
      <p>Status: {completed ? 'completed' : 'pending'}</p>
      <div className="card-actions">
        <button
          type="button"
          onClick={() => toggleAssignmentCompletion(assignment.id, initiallyCompleted)}
        >
          Mark as {completed ? 'incomplete' : 'complete'}
        </button>
        <button type="button" onClick={() => toggleFavoriteAssignment(assignment.id)}>
          {favorite ? 'Unstar' : 'Star'}
        </button>
      </div>
    </article>
  )
}

export default AssignmentCard
