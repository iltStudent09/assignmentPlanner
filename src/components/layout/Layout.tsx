import { Link, Outlet } from 'react-router-dom'

function Layout() {
  return (
    <div>
      <header>
        <h1>Assignment Planner</h1>
        <nav aria-label="Primary">
          <ul>
            <li>
              <Link to="/">Assignments</Link>
            </li>
            <li>
              <Link to="/assignments/new">Add Assignment</Link>
            </li>
            <li>
              <Link to="/assignments/1">Assignment Detail</Link>
            </li>
          </ul>
        </nav>
      </header>

      <main>
        <Outlet />
      </main>

      <footer>
        <small>Assignment Planner Foundation</small>
      </footer>
    </div>
  )
}

export default Layout
