import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, test } from 'vitest'
import { TaskManagerOverviewPage } from '../../pages/overview/TaskManagerOverviewPage'

function createFakeTaskApi(seedTasks = []) {
  let tasks = [...seedTasks]

  return {
    async listTasks() {
      return [...tasks]
    },
    async createTask(payload) {
      const task = {
        id: `task-${tasks.length + 1}`,
        title: payload.title,
        status: 'PENDING',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }

      tasks = [...tasks, task]
      return task
    },
    async updateTask(id, payload) {
      tasks = tasks.map((task) =>
        task.id === id
          ? { ...task, ...payload, updatedAt: new Date().toISOString() }
          : task,
      )

      return tasks.find((task) => task.id === id)
    },
    async deleteTask(id) {
      tasks = tasks.filter((task) => task.id !== id)
    },
  }
}

describe('TaskManagerOverviewPage', () => {
  test('renders upper, center, and bottom sections with login details', async () => {
    render(
      <MemoryRouter>
        <TaskManagerOverviewPage
          taskApi={createFakeTaskApi()}
          loginSession={{
            userId: 'staff-001',
            loginTime: '2026-04-20T08:00:00.000Z',
          }}
        />
      </MemoryRouter>,
    )

    expect(
      await screen.findByRole('heading', { name: /task manager cockpit/i }),
    ).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /task board/i })).toBeInTheDocument()
    expect(screen.getByRole('contentinfo')).toBeInTheDocument()
    expect(screen.getByText(/staff-001/i)).toBeInTheDocument()
  })

  test('creates, updates, filters, and deletes tasks through the center section', async () => {
    const user = userEvent.setup()

    render(
      <MemoryRouter>
        <TaskManagerOverviewPage
          taskApi={createFakeTaskApi([
            {
              id: 'seed-1',
              title: 'Review backlog',
              status: 'PENDING',
              createdAt: '2026-04-20T08:00:00.000Z',
              updatedAt: '2026-04-20T08:00:00.000Z',
            },
          ])}
          loginSession={{
            userId: 'staff-002',
            loginTime: '2026-04-20T09:30:00.000Z',
          }}
        />
      </MemoryRouter>,
    )

    expect(
      await screen.findByRole('heading', { name: /review backlog/i }),
    ).toBeInTheDocument()

    await user.type(screen.getByLabelText(/new task title/i), 'Prepare sprint summary')
    await user.click(screen.getByRole('button', { name: /add task/i }))

    expect(
      await screen.findByRole('heading', { name: /prepare sprint summary/i }),
    ).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: /mark prepare sprint summary as completed/i }))

    await user.click(screen.getByRole('button', { name: /^Completed$/i }))
    expect(screen.getByRole('heading', { name: /prepare sprint summary/i })).toBeInTheDocument()
    expect(screen.queryByRole('heading', { name: /review backlog/i })).not.toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: /^All$/i }))
    await user.click(screen.getByRole('button', { name: /delete prepare sprint summary/i }))

    await waitFor(() => {
      expect(screen.queryByRole('heading', { name: /prepare sprint summary/i })).not.toBeInTheDocument()
    })
  })
})
