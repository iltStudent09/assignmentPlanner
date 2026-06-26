import { createBrowserRouter, Navigate } from 'react-router-dom'
import Layout from './components/layout/Layout'
import AddAssignmentPage from './pages/AddAssignmentPage'
import AssignmentDetailPage from './pages/AssignmentDetailPage'
import AssignmentsListPage from './pages/AssignmentsListPage'
import RouteErrorPage from './pages/RouteErrorPage'

export const appRouter = createBrowserRouter(
  [
    {
      path: '/',
      element: <Navigate to="/assignments" replace />,
      errorElement: <RouteErrorPage />,
    },
    {
      path: '/assignments',
      element: (
        <Layout>
          <AssignmentsListPage />
        </Layout>
      ),
      errorElement: <RouteErrorPage />,
    },
    {
      path: '/assignments/new',
      element: (
        <Layout>
          <AddAssignmentPage />
        </Layout>
      ),
      errorElement: <RouteErrorPage />,
    },
    {
      path: '/assignments/:id',
      element: (
        <Layout>
          <AssignmentDetailPage />
        </Layout>
      ),
      errorElement: <RouteErrorPage />,
    },
  ],
  {
    basename: import.meta.env.BASE_URL,
  },
)
