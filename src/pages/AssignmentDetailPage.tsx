import { useParams } from 'react-router-dom'

function AssignmentDetailPage() {
  const { id } = useParams()

  return (
    <section>
      <h2>Assignment Detail</h2>
      <p>Placeholder page for assignment ID: {id}</p>
    </section>
  )
}

export default AssignmentDetailPage
