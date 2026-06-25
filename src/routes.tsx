import { createBrowserRouter, Navigate } from 'react-router-dom'
import Layout from './components/layout/Layout'
import AddAssignmentPage from './pages/AddAssignmentPage'
import AssignmentDetailPage from './pages/AssignmentDetailPage'
import AssignmentsListPage from './pages/AssignmentsListPage'

export const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/assignments" replace />,
  },
  {
    path: '/assignments',
    element: (
      <Layout>
        <AssignmentsListPage />
      </Layout>
    ),
  },
  {
    path: '/assignments/new',
    element: (
      <Layout>
        <AddAssignmentPage />
      </Layout>
    ),
  },
  {
    path: '/assignments/:id',
    element: (
      <Layout>
        <AssignmentDetailPage />
      </Layout>
    ),
  },
])
