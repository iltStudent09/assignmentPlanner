import { useParams } from 'react-router-dom'

function AssignmentDetailPage() {
  const { assignmentId } = useParams()

  return (
    <section>
      <h2>Assignment Detail</h2>
      <p>Placeholder page for assignment ID: {assignmentId}</p>
    </section>
  )
}

export default AssignmentDetailPage
