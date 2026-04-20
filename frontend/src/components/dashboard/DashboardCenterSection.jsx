import { Link } from 'react-router-dom'

export function DashboardCenterSection({ errorMessage, isLoading, taskCounts }) {
  const completionRate =
    taskCounts.total === 0 ? 0 : Math.round((taskCounts.completed / taskCounts.total) * 100)

  return (
    <section className="page-center panel dashboard-center-panel" aria-labelledby="dashboard-insights-heading">
      <div className="section-heading">
        <p className="eyebrow">Center Section</p>
        <h2 id="dashboard-insights-heading">Operations snapshot</h2>
        <p className="muted">
          A fast summary page keeps high-level decisions away from the heavier CRUD screen.
        </p>
      </div>

      {errorMessage ? <p className="error-banner">{errorMessage}</p> : null}

      <div className="dashboard-grid">
        <article className="dashboard-card emphasis-card">
          <span className="summary-label">Momentum</span>
          <strong>{isLoading ? '...' : `${completionRate}%`}</strong>
          <p className="muted">
            Completion rate based on the current in-memory task store.
          </p>
        </article>

        <article className="dashboard-card">
          <span className="summary-label">Backlog pressure</span>
          <strong>{isLoading ? '...' : taskCounts.pending}</strong>
          <p className="muted">
            Pending tasks waiting for action from the team.
          </p>
        </article>

        <article className="dashboard-card">
          <span className="summary-label">Completed work</span>
          <strong>{isLoading ? '...' : taskCounts.completed}</strong>
          <p className="muted">
            Finished tasks available for quick reporting.
          </p>
        </article>
      </div>

      <div className="shortcut-grid">
        <article className="shortcut-card">
          <p className="summary-label">Primary action</p>
          <h3>Open the task cockpit</h3>
          <p className="muted">
            Move into overview when you want to create, filter, update, or delete tasks.
          </p>
          <Link className="primary-action inline-action" to="/overview">
            Go to overview
          </Link>
        </article>

        <article className="shortcut-card">
          <p className="summary-label">Focus guidance</p>
          <h3>Keep the split clean</h3>
          <p className="muted">
            Login handles access, dashboard handles summary, and overview handles operations.
          </p>
          <Link className="secondary-action inline-action" to="/login">
            Review login page
          </Link>
        </article>
      </div>
    </section>
  )
}
