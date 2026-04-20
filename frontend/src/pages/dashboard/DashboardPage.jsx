import { useEffect, useState } from 'react'
import { taskApi as defaultTaskApi } from '../../api/taskApi'
import { DashboardCenterSection } from '../../components/dashboard/DashboardCenterSection'
import { DashboardUpperSection } from '../../components/dashboard/DashboardUpperSection'
import { PageBottomSection } from '../../components/layout/PageBottomSection'

const EMPTY_COUNTS = {
  total: 0,
  pending: 0,
  completed: 0,
}

function buildTaskCounts(tasks) {
  return {
    total: tasks.length,
    pending: tasks.filter((task) => task.status === 'PENDING').length,
    completed: tasks.filter((task) => task.status === 'COMPLETED').length,
  }
}

export function DashboardPage({ loginSession, taskApi = defaultTaskApi }) {
  const [taskCounts, setTaskCounts] = useState(EMPTY_COUNTS)
  const [errorMessage, setErrorMessage] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let isMounted = true

    async function loadTaskCounts() {
      try {
        const tasks = await taskApi.listTasks()
        if (isMounted) {
          setTaskCounts(buildTaskCounts(tasks))
          setErrorMessage('')
        }
      } catch (error) {
        if (isMounted) {
          setTaskCounts(EMPTY_COUNTS)
          setErrorMessage(error.message)
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    loadTaskCounts()

    return () => {
      isMounted = false
    }
  }, [taskApi])

  return (
    <main className="task-manager-shell">
      <DashboardUpperSection loginSession={loginSession} taskCounts={taskCounts} />
      <DashboardCenterSection
        errorMessage={errorMessage}
        isLoading={isLoading}
        taskCounts={taskCounts}
      />
      <PageBottomSection
        description="This shared dock stays the same while dashboard content can scale into more summary cards or reporting widgets."
        title="Jump between summary and action"
      />
    </main>
  )
}
