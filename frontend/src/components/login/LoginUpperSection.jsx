export function LoginUpperSection() {
  return (
    <header className="page-upper panel page-upper-login">
      <div className="hero-copy">
        <p className="eyebrow">Login</p>
        <h1>Welcome back</h1>
        <p className="hero-text">
          Sign in to the task manager workspace and move from status checks to
          action without losing page clarity.
        </p>
      </div>

      <div className="login-signal-grid" aria-label="Login highlights">
        <article className="signal-card">
          <span className="signal-label">Reusable flow</span>
          <strong>Single entry point</strong>
          <p className="muted">
            Keep authentication UI in one place before the app grows into more routes.
          </p>
        </article>
        <article className="signal-card">
          <span className="signal-label">Shared shell</span>
          <strong>Common bottom navigator</strong>
          <p className="muted">
            Navigation stays consistent while each page keeps its own page-specific layout.
          </p>
        </article>
      </div>
    </header>
  )
}
