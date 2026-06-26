import { isRouteErrorResponse, Link, useRouteError } from 'react-router-dom'

function RouteErrorPage() {
  const error = useRouteError()

  let title = 'Something went wrong'
  let message = 'An unexpected error occurred while loading this page.'

  if (isRouteErrorResponse(error)) {
    title = `${error.status} ${error.statusText}`
    message = typeof error.data === 'string' ? error.data : message
  } else if (error instanceof Error) {
    message = error.message
  }

  return (
    <section className="page-section panel">
      <h2>{title}</h2>
      <p>{message}</p>
      <Link to="/assignments">Back to Assignments</Link>
    </section>
  )
}

export default RouteErrorPage
