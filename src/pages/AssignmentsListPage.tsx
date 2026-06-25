import { Link } from 'react-router-dom'
import ErrorMessage from '../components/common/ErrorMessage'
import LoadingState from '../components/common/LoadingState'
import { useAssignments } from '../hooks/useAssignments'

function AssignmentsListPage() {
  const { assignments, loading, error } = useAssignments()

  if (loading) {
    return (
      <section>
        <h2>Assignments List</h2>
        <LoadingState message="Loading assignments..." />
      </section>
    )
  }

  if (error) {
    return (
      <section>
        <h2>Assignments List</h2>
        <ErrorMessage message={error} />
      </section>
    )
  }

  return (
    <section>
      <h2>Assignments List</h2>
      {assignments.length === 0 ? (
        <p>No assignments found.</p>
      ) : (
        <ul>
          {assignments.map((assignment) => (
            <li key={assignment.id}>
              <h3>
                <Link to={`/assignments/${assignment.id}`}>{assignment.title}</Link>
              </h3>
              <p>{assignment.course}</p>
              <p>Due: {assignment.dueDate}</p>
              <p>Priority: {assignment.priority}</p>
              <p>Status: {assignment.status}</p>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

export default AssignmentsListPage
