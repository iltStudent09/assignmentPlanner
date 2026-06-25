import { useEffect, useMemo, useState } from 'react'
import { fetchAssignments } from '../services/assignmentService'
import type { Assignment } from '../types/assignment'

type UseAssignmentsResult = {
  assignments: Assignment[]
  loading: boolean
  error: string | null
}

export function useAssignments(searchQuery = ''): UseAssignmentsResult {
  const [assignments, setAssignments] = useState<Assignment[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let isMounted = true

    async function loadAssignments(): Promise<void> {
      setLoading(true)
      setError(null)

      try {
        const response = await fetchAssignments()
        if (isMounted) {
          setAssignments(response)
        }
      } catch {
        if (isMounted) {
          setError('Unable to load assignments right now.')
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    void loadAssignments()

    return () => {
      isMounted = false
    }
  }, [])

  const normalizedQuery = searchQuery.trim().toLowerCase()

  const filteredAssignments = useMemo(() => {
    if (!normalizedQuery) {
      return assignments
    }

    return assignments.filter((assignment) => {
      return (
        assignment.title.toLowerCase().includes(normalizedQuery) ||
        assignment.course.toLowerCase().includes(normalizedQuery)
      )
    })
  }, [assignments, normalizedQuery])

  return {
    assignments: filteredAssignments,
    loading,
    error,
  }
}
