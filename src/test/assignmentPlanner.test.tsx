import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import AssignmentCard from '../components/assignments/AssignmentCard'
import { AssignmentProvider, useAssignmentContext } from '../context/AssignmentContext'
import AddAssignmentPage from '../pages/AddAssignmentPage'
import AssignmentsListPage from '../pages/AssignmentsListPage'
import type { Assignment } from '../types/assignment'

function renderWithProviders(ui: React.ReactNode) {
  return render(
    <AssignmentProvider>
      <MemoryRouter>{ui}</MemoryRouter>
    </AssignmentProvider>,
  )
}

function AddedAssignmentsCount() {
  const { addedAssignments } = useAssignmentContext()
  return <p>Added count: {addedAssignments.length}</p>
}

describe('Assignment Planner behavior', () => {
  it('renders fetched assignments on the list view', async () => {
    renderWithProviders(<AssignmentsListPage />)

    expect(screen.getByText('Loading assignments...')).toBeInTheDocument()

    expect(await screen.findByText('Linear Algebra Problem Set 3')).toBeInTheDocument()
    expect(screen.getByText('Literature Reflection Essay')).toBeInTheDocument()
    expect(screen.getAllByRole('link', { name: 'View Details' })).toHaveLength(3)
  })

  it('toggles assignment completion state from the card', async () => {
    const assignment: Assignment = {
      id: 'test-assignment-1',
      title: 'Test Assignment',
      course: 'TEST 101',
      description: 'Testing completion toggle',
      dueDate: '2026-08-01',
      priority: 'medium',
      status: 'pending',
      tags: [],
    }

    renderWithProviders(<AssignmentCard assignment={assignment} />)

    expect(screen.getByText('Status: pending')).toBeInTheDocument()

    await userEvent.click(screen.getByRole('button', { name: 'Mark as complete' }))

    await waitFor(() => {
      expect(screen.getByText('Status: completed')).toBeInTheDocument()
    })
    expect(
      screen.getByRole('button', { name: 'Mark as incomplete' }),
    ).toBeInTheDocument()
  })

  it('adds a new assignment through the controlled form', async () => {
    vi.spyOn(globalThis.crypto, 'randomUUID').mockReturnValue(
      '11111111-1111-1111-1111-111111111111',
    )

    renderWithProviders(
      <>
        <AddAssignmentPage />
        <AddedAssignmentsCount />
      </>,
    )

    await userEvent.type(screen.getByLabelText('Title'), 'Database Project Draft')
    await userEvent.type(screen.getByLabelText('Course'), 'CS 340')
    await userEvent.type(screen.getByLabelText('Description'), 'Initial ERD and schema plan')
    await userEvent.type(screen.getByLabelText('Due Date'), '2026-08-15')
    await userEvent.selectOptions(screen.getByLabelText('Priority'), 'high')
    await userEvent.type(screen.getByLabelText('Tags (comma-separated)'), 'project, database')

    await userEvent.click(screen.getByRole('button', { name: 'Add Assignment' }))

    await waitFor(() => {
      expect(screen.getByText('Added count: 1')).toBeInTheDocument()
    })
  })
})
