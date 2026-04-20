import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { DashboardPage } from '../pages/dashboard/DashboardPage'
import { LoginPage } from '../pages/login/LoginPage'
import { TaskManagerOverviewPage } from '../pages/overview/TaskManagerOverviewPage'

const demoLoginSession = {
  userId: 'staff-001',
  loginTime: '2026-04-20T08:00:00.000Z',
}

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate replace to="/login" />} />
        <Route
          path="/login"
          element={<LoginPage loginSession={demoLoginSession} />}
        />
        <Route
          path="/dashboard"
          element={<DashboardPage loginSession={demoLoginSession} />}
        />
        <Route
          path="/overview"
          element={<TaskManagerOverviewPage loginSession={demoLoginSession} />}
        />
        <Route path="*" element={<Navigate replace to="/login" />} />
      </Routes>
    </BrowserRouter>
  )
}
