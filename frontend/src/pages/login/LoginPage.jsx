import { PageBottomSection } from '../../components/layout/PageBottomSection'
import { LoginCenterSection } from '../../components/login/LoginCenterSection'
import { LoginUpperSection } from '../../components/login/LoginUpperSection'

export function LoginPage({ loginSession }) {
  return (
    <main className="task-manager-shell">
      <LoginUpperSection />
      <LoginCenterSection loginSession={loginSession} />
      <PageBottomSection
        description="A shared bottom bar means future routes can be added inside the router without rewriting each page footer."
        title="Shared route navigation"
      />
    </main>
  )
}
