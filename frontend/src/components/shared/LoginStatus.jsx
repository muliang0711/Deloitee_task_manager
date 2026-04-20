function formatLoginTime(loginTime) {
  return new Intl.DateTimeFormat('en-MY', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(loginTime))
}

export function LoginStatus({ loginSession }) {
  return (
    <section className="login-card" aria-label="Login system">
      <p className="summary-label">Reusable login display system</p>
      <dl>
        <div>
          <dt>User ID</dt>
          <dd>{loginSession.userId}</dd>
        </div>
        <div>
          <dt>Login time</dt>
          <dd>{formatLoginTime(loginSession.loginTime)}</dd>
        </div>
      </dl>
    </section>
  )
}
