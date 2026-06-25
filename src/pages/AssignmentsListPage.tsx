import { useMemo } from 'react'
import AssignmentCard from '../components/assignments/AssignmentCard'
import AssignmentFilters from '../components/assignments/AssignmentFilters'
import ErrorMessage from '../components/common/ErrorMessage'
import LoadingState from '../components/common/LoadingState'
import { useAssignmentContext } from '../context/AssignmentContext'
import { useAssignments } from '../hooks/useAssignments'

function AssignmentsListPage() {
  const { filters, isAssignmentCompleted } = useAssignmentContext()
  const { assignments, loading, error } = useAssignments(filters.query)

  const visibleAssignments = useMemo(() => {
    return assignments.filter((assignment) => {
      const completed = isAssignmentCompleted(
        assignment.id,
        assignment.status === 'completed',
      )

      const statusMatch =
        filters.status === 'all' ||
        (filters.status === 'completed' && completed) ||
        (filters.status === 'pending' && !completed)

      const priorityMatch =
        filters.priority === 'all' || assignment.priority === filters.priority

      return statusMatch && priorityMatch
    })
  }, [assignments, filters.status, filters.priority, isAssignmentCompleted])

  if (loading) {
    return (
      <section className="page-section">
        <h2>Assignments List</h2>
        <LoadingState message="Loading assignments..." />
      </section>
    )
  }

  if (error) {
    return (
      <section className="page-section">
        <h2>Assignments List</h2>
        <ErrorMessage message={error} />
      </section>
    )
  }

  return (
    <section className="page-section">
      <h2>Assignments List</h2>
      <AssignmentFilters />
      {visibleAssignments.length === 0 ? (
        <p>No assignments found.</p>
      ) : (
        <ul className="assignment-list">
          {visibleAssignments.map((assignment) => (
            <li key={assignment.id}>
              <AssignmentCard assignment={assignment} />
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

export default AssignmentsListPage
