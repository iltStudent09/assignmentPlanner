import { assignmentSeedData } from '../data/assignments'
import type { Assignment } from '../types/assignment'

const MOCK_DELAY_MS = 400

function wait(delayMs: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, delayMs)
  })
}

export async function fetchAssignments(): Promise<Assignment[]> {
  await wait(MOCK_DELAY_MS)
  return assignmentSeedData
}

export async function fetchAssignmentById(id: string): Promise<Assignment> {
  await wait(MOCK_DELAY_MS)
  const assignment = assignmentSeedData.find((item) => item.id === id)

  if (!assignment) {
    throw new Error('Assignment not found.')
  }

  return assignment
}
