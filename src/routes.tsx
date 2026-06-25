import { createBrowserRouter } from 'react-router-dom'
import Layout from './components/layout/Layout'
import AddAssignmentPage from './pages/AddAssignmentPage'
import AssignmentDetailPage from './pages/AssignmentDetailPage'
import AssignmentsListPage from './pages/AssignmentsListPage'

export const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <AssignmentsListPage />,
      },
      {
        path: 'assignments/new',
        element: <AddAssignmentPage />,
      },
      {
        path: 'assignments/:assignmentId',
        element: <AssignmentDetailPage />,
      },
    ],
  },
])
