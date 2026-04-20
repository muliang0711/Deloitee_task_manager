import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, test } from 'vitest'
import App from '../../App'

function renderAt(pathname) {
  window.history.pushState({}, '', pathname)
  return render(<App />)
}

afterEach(() => {
  window.history.pushState({}, '', '/')
})

describe('App routing', () => {
  test('renders login page with shared bottom navigation at /login', async () => {
    renderAt('/login')

    expect(
      await screen.findByRole('heading', { name: /welcome back/i }),
    ).toBeInTheDocument()
    expect(screen.getByRole('navigation', { name: /bottom navigation/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /^login$/i })).toHaveAttribute('aria-current', 'page')
  })

  test('renders dashboard page with shared bottom navigation at /dashboard', async () => {
    renderAt('/dashboard')

    expect(
      await screen.findByRole('heading', { name: /team dashboard/i }),
    ).toBeInTheDocument()
    expect(screen.getByRole('navigation', { name: /bottom navigation/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /^dashboard$/i })).toHaveAttribute('aria-current', 'page')
  })

  test('navigates between pages using the shared bottom navigation', async () => {
    const user = userEvent.setup()

    renderAt('/overview')

    expect(
      await screen.findByRole('heading', { name: /task manager cockpit/i }),
    ).toBeInTheDocument()

    await user.click(screen.getByRole('link', { name: /^dashboard$/i }))
    expect(await screen.findByRole('heading', { name: /team dashboard/i })).toBeInTheDocument()

    await user.click(screen.getByRole('link', { name: /^login$/i }))
    expect(await screen.findByRole('heading', { name: /welcome back/i })).toBeInTheDocument()
  })
})
