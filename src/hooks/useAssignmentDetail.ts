import { useEffect, useState } from 'react'
import { fetchAssignmentById } from '../services/assignmentService'
import type { Assignment } from '../types/assignment'

type UseAssignmentDetailResult = {
  assignment: Assignment | null
  loading: boolean
  error: string | null
}

export function useAssignmentDetail(id: string | undefined): UseAssignmentDetailResult {
  const [assignment, setAssignment] = useState<Assignment | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let isMounted = true

    async function loadAssignment(): Promise<void> {
      if (!id) {
        setError('Missing assignment ID.')
        setLoading(false)
        return
      }

      setLoading(true)
      setError(null)

      try {
        const response = await fetchAssignmentById(id)
        if (isMounted) {
          setAssignment(response)
        }
      } catch {
        if (isMounted) {
          setError('Unable to load assignment details.')
          setAssignment(null)
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    void loadAssignment()

    return () => {
      isMounted = false
    }
  }, [id])

  return {
    assignment,
    loading,
    error,
  }
}
