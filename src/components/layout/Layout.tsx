import { Link, NavLink } from 'react-router-dom'
import { useAssignmentContext } from '../../context/AssignmentContext'

type LayoutProps = {
  children: React.ReactNode
}

function Layout({ children }: LayoutProps) {
  const { theme, toggleTheme, selectedAssignmentId, favoriteAssignmentIds } =
    useAssignmentContext()

  return (
    <div data-theme={theme}>
      <header>
        <h1>Assignment Planner</h1>
        <p>Theme: {theme}</p>
        <p>Favorites: {favoriteAssignmentIds.length}</p>
        <p>Selected Assignment: {selectedAssignmentId ?? 'None'}</p>
        <button type="button" onClick={toggleTheme}>
          Switch to {theme === 'light' ? 'dark' : 'light'} theme
        </button>
        <nav aria-label="Primary">
          <ul>
            <li>
              <NavLink to="/assignments">Assignments</NavLink>
            </li>
            <li>
              <NavLink to="/assignments/new">Add Assignment</NavLink>
            </li>
            <li>
              <Link to="/assignments/1">Assignment Detail</Link>
            </li>
          </ul>
        </nav>
      </header>

      <main>{children}</main>

      <footer>
        <small>Assignment Planner Foundation</small>
      </footer>
    </div>
  )
}

export default Layout
