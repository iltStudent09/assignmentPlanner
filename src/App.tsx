import { RouterProvider } from 'react-router-dom'
import { AssignmentProvider } from './context/AssignmentContext'
import { appRouter } from './routes'

function App() {
  return (
    <AssignmentProvider>
      <RouterProvider router={appRouter} />
    </AssignmentProvider>
  )
}

export default App
