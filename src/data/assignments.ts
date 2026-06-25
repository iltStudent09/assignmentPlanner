import type { Assignment } from '../types/assignment'

export const assignmentSeedData: Assignment[] = [
  {
    id: '1',
    title: 'Linear Algebra Problem Set 3',
    course: 'MATH 221',
    description: 'Complete questions 1-12 from chapter 4 and show all steps.',
    dueDate: '2026-07-02',
    priority: 'high',
    status: 'pending',
    tags: ['math', 'problem-set'],
  },
  {
    id: '2',
    title: 'Literature Reflection Essay',
    course: 'ENG 204',
    description:
      'Write a 1000-word reflection on themes of identity in the assigned novel.',
    dueDate: '2026-07-05',
    priority: 'medium',
    status: 'pending',
    tags: ['essay', 'reading'],
  },
  {
    id: '3',
    title: 'Chemistry Lab Report',
    course: 'CHEM 130',
    description:
      'Submit analysis and conclusion section for the acid-base titration lab.',
    dueDate: '2026-06-29',
    priority: 'high',
    status: 'completed',
    tags: ['lab'],
  },
]
