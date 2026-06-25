import { createContext, useContext, useMemo, useState } from 'react'

export type AssignmentFilterState = {
  query: string
  status: 'all' | 'pending' | 'completed'
  priority: 'all' | 'low' | 'medium' | 'high'
}

type AssignmentContextValue = {
  completedAssignmentIds: string[]
  favoriteAssignmentIds: string[]
  selectedAssignmentId: string | null
  filters: AssignmentFilterState
  theme: 'light' | 'dark'
  toggleAssignmentCompletion: (id: string, initiallyCompleted?: boolean) => void
  isAssignmentCompleted: (id: string, initiallyCompleted?: boolean) => boolean
  toggleFavoriteAssignment: (id: string) => void
  isFavoriteAssignment: (id: string) => boolean
  setSelectedAssignmentId: (id: string | null) => void
  setFilterQuery: (query: string) => void
  setFilterStatus: (status: AssignmentFilterState['status']) => void
  setFilterPriority: (priority: AssignmentFilterState['priority']) => void
  clearFilters: () => void
  toggleTheme: () => void
}

const defaultFilters: AssignmentFilterState = {
  query: '',
  status: 'all',
  priority: 'all',
}

const AssignmentContext = createContext<AssignmentContextValue | undefined>(undefined)

type AssignmentProviderProps = {
  children: React.ReactNode
}

export function AssignmentProvider({ children }: AssignmentProviderProps) {
  const [completedAssignmentIds, setCompletedAssignmentIds] = useState<string[]>([])
  const [incompleteAssignmentIds, setIncompleteAssignmentIds] = useState<string[]>([])
  const [favoriteAssignmentIds, setFavoriteAssignmentIds] = useState<string[]>([])
  const [selectedAssignmentId, setSelectedAssignmentId] = useState<string | null>(null)
  const [filters, setFilters] = useState<AssignmentFilterState>(defaultFilters)
  const [theme, setTheme] = useState<'light' | 'dark'>('light')

  function isAssignmentCompleted(id: string, initiallyCompleted = false): boolean {
    if (completedAssignmentIds.includes(id)) {
      return true
    }

    if (incompleteAssignmentIds.includes(id)) {
      return false
    }

    return initiallyCompleted
  }

  function toggleAssignmentCompletion(id: string, initiallyCompleted = false): void {
    const currentlyCompleted = isAssignmentCompleted(id, initiallyCompleted)

    if (currentlyCompleted) {
      setCompletedAssignmentIds((previous) => previous.filter((item) => item !== id))
      setIncompleteAssignmentIds((previous) =>
        previous.includes(id) ? previous : [...previous, id],
      )
      return
    }

    setIncompleteAssignmentIds((previous) => previous.filter((item) => item !== id))
    setCompletedAssignmentIds((previous) =>
      previous.includes(id) ? previous : [...previous, id],
    )
  }

  function toggleFavoriteAssignment(id: string): void {
    setFavoriteAssignmentIds((previous) => {
      if (previous.includes(id)) {
        return previous.filter((item) => item !== id)
      }

      return [...previous, id]
    })
  }

  function isFavoriteAssignment(id: string): boolean {
    return favoriteAssignmentIds.includes(id)
  }

  function setFilterQuery(query: string): void {
    setFilters((previous) => ({ ...previous, query }))
  }

  function setFilterStatus(status: AssignmentFilterState['status']): void {
    setFilters((previous) => ({ ...previous, status }))
  }

  function setFilterPriority(priority: AssignmentFilterState['priority']): void {
    setFilters((previous) => ({ ...previous, priority }))
  }

  function clearFilters(): void {
    setFilters(defaultFilters)
  }

  function toggleTheme(): void {
    setTheme((previous) => (previous === 'light' ? 'dark' : 'light'))
  }

  const value = useMemo<AssignmentContextValue>(
    () => ({
      completedAssignmentIds,
      favoriteAssignmentIds,
      selectedAssignmentId,
      filters,
      theme,
      toggleAssignmentCompletion,
      isAssignmentCompleted,
      toggleFavoriteAssignment,
      isFavoriteAssignment,
      setSelectedAssignmentId,
      setFilterQuery,
      setFilterStatus,
      setFilterPriority,
      clearFilters,
      toggleTheme,
    }),
    [
      completedAssignmentIds,
      incompleteAssignmentIds,
      favoriteAssignmentIds,
      selectedAssignmentId,
      filters,
      theme,
    ],
  )

  return <AssignmentContext.Provider value={value}>{children}</AssignmentContext.Provider>
}

export function useAssignmentContext(): AssignmentContextValue {
  const context = useContext(AssignmentContext)

  if (!context) {
    throw new Error('useAssignmentContext must be used within an AssignmentProvider.')
  }

  return context
}
