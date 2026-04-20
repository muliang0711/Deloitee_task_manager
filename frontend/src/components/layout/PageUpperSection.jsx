import { LoginStatus } from '../shared/LoginStatus'

export function PageUpperSection({ loginSession, taskCounts }) {
  return (
    <header className="page-upper panel">
      <div className="hero-copy">
        <p className="eyebrow">Upper Section</p>
        <h1>Task Manager Cockpit</h1>
        <p className="hero-text">
          A modular React view with isolated page sections, backed by a Spring
          Boot controller-service-repository stack.
        </p>
      </div>

      <div className="upper-grid">
        <LoginStatus loginSession={loginSession} />

        <section className="summary-card" aria-label="Task summary">
          <p className="summary-label">Live queue</p>
          <div className="summary-metrics">
            <article>
              <strong>{taskCounts.total}</strong>
              <span>Total</span>
            </article>
            <article>
              <strong>{taskCounts.pending}</strong>
              <span>Pending</span>
            </article>
            <article>
              <strong>{taskCounts.completed}</strong>
              <span>Completed</span>
            </article>
          </div>
        </section>
      </div>
    </header>
  )
}
