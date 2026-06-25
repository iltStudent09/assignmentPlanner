import { Link, NavLink } from 'react-router-dom'

type LayoutProps = {
  children: React.ReactNode
}

function Layout({ children }: LayoutProps) {
  return (
    <div>
      <header>
        <h1>Assignment Planner</h1>
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
