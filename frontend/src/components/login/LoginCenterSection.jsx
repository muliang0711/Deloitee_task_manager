import { Link } from 'react-router-dom'

function handleSubmit(event) {
  event.preventDefault()
}

export function LoginCenterSection({ loginSession }) {
  return (
    <section className="page-center panel login-center-panel" aria-labelledby="login-form-heading">
      <div className="login-layout">
        <div className="section-heading">
          <p className="eyebrow">Center Section</p>
          <h2 id="login-form-heading">Enter the workspace</h2>
          <p className="muted">
            This demo keeps the login view light while the backend task API stays
            separate from presentation logic.
          </p>
        </div>

        <form className="login-form-card" onSubmit={handleSubmit}>
          <label className="login-field" htmlFor="login-user">
            <span>User ID</span>
            <input
              defaultValue={loginSession.userId}
              id="login-user"
              name="userId"
              placeholder="staff-001"
              type="text"
            />
          </label>
          <label className="login-field" htmlFor="login-password">
            <span>Password</span>
            <input
              id="login-password"
              name="password"
              placeholder="Enter your password"
              type="password"
            />
          </label>

          <div className="login-actions">
            <button className="primary-action" type="submit">
              Demo login
            </button>
            <Link className="secondary-action" to="/dashboard">
              Continue to dashboard
            </Link>
          </div>
        </form>

        <aside className="login-side-card" aria-label="Session details">
          <p className="summary-label">Current demo session</p>
          <dl className="session-list">
            <div>
              <dt>User</dt>
              <dd>{loginSession.userId}</dd>
            </div>
            <div>
              <dt>Landing route</dt>
              <dd>/dashboard</dd>
            </div>
            <div>
              <dt>Access scope</dt>
              <dd>Overview, dashboard, shared navigation</dd>
            </div>
          </dl>
        </aside>
      </div>
    </section>
  )
}
