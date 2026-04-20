import { LoginStatus } from '../shared/LoginStatus'

export function DashboardUpperSection({ loginSession, taskCounts }) {
  return (
    <header className="page-upper panel page-upper-dashboard">
      <div className="hero-copy">
        <p className="eyebrow">Dashboard</p>
        <h1>Team dashboard</h1>
        <p className="hero-text">
          See the live queue first, then jump into the detailed task workspace only
          when you need to operate.
        </p>
      </div>

      <div className="upper-grid">
        <LoginStatus loginSession={loginSession} />

        <section className="summary-card" aria-label="Queue summary">
          <p className="summary-label">Queue summary</p>
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
