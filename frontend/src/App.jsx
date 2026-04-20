import './App.css'
import { TaskManagerOverviewPage } from './pages/overview/TaskManagerOverviewPage'

function App() {
  return (
    <TaskManagerOverviewPage
      loginSession={{
        userId: 'staff-001',
        loginTime: '2026-04-20T08:00:00.000Z',
      }}
    />
  )
}

export default App
