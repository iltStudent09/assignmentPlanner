import { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { useAssignmentContext } from '../../context/AssignmentContext'

type LayoutProps = {
  children: React.ReactNode
}

function Layout({ children }: LayoutProps) {
  const location = useLocation()
  const { theme, toggleTheme, selectedAssignmentId, favoriteAssignmentIds, setSelectedAssignmentId } =
    useAssignmentContext()

  useEffect(() => {
    const routeMatch = location.pathname.match(/^\/assignments\/([^/]+)$/)
    const routeId = routeMatch?.[1]

    if (routeId && routeId !== 'new') {
      setSelectedAssignmentId(routeId)
      return
    }

    setSelectedAssignmentId(null)
  }, [location.pathname, setSelectedAssignmentId])

  return (
    <div className="app-shell" data-theme={theme}>
      <header className="app-header">
        <h1>Assignment Planner</h1>
        <div className="app-meta">
          <p>Theme: {theme}</p>
          <p>Starred Assignments: {favoriteAssignmentIds.length}</p>
          <p>Selected Assignment ID: {selectedAssignmentId ?? 'None'}</p>
        </div>
        <button type="button" onClick={toggleTheme}>
          Switch to {theme === 'light' ? 'dark' : 'light'} theme
        </button>
        <nav aria-label="Primary">
          <ul className="nav-list">
            <li>
              <NavLink to="/assignments">Assignments</NavLink>
            </li>
            <li>
              <NavLink to="/assignments/new">Add Assignment</NavLink>
            </li>
          </ul>
        </nav>
      </header>

      <main className="app-main">{children}</main>

      <footer className="app-footer">
        <small>Assignment Planner Foundation</small>
      </footer>
    </div>
  )
}

export default Layout
