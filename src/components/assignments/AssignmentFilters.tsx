import { useAssignmentContext } from '../../context/AssignmentContext'

function AssignmentFilters() {
  const {
    filters,
    setFilterQuery,
    setFilterStatus,
    setFilterPriority,
    clearFilters,
  } = useAssignmentContext()

  return (
    <section aria-label="Assignment filters">
      <h3>Filters</h3>

      <label htmlFor="assignment-search">Search</label>
      <input
        id="assignment-search"
        type="text"
        value={filters.query}
        onChange={(event) => setFilterQuery(event.target.value)}
        placeholder="Search by title or course"
      />

      <label htmlFor="assignment-status-filter">Status</label>
      <select
        id="assignment-status-filter"
        value={filters.status}
        onChange={(event) =>
          setFilterStatus(event.target.value as 'all' | 'pending' | 'completed')
        }
      >
        <option value="all">All</option>
        <option value="pending">Pending</option>
        <option value="completed">Completed</option>
      </select>

      <label htmlFor="assignment-priority-filter">Priority</label>
      <select
        id="assignment-priority-filter"
        value={filters.priority}
        onChange={(event) =>
          setFilterPriority(event.target.value as 'all' | 'low' | 'medium' | 'high')
        }
      >
        <option value="all">All</option>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>

      <button type="button" onClick={clearFilters}>
        Clear Filters
      </button>
    </section>
  )
}

export default AssignmentFilters
