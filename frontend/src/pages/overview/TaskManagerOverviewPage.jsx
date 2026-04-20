import { useEffect, useState } from 'react'
import { PageBottomSection } from '../../components/layout/PageBottomSection'
import { PageCenterSection } from '../../components/layout/PageCenterSection'
import { PageUpperSection } from '../../components/layout/PageUpperSection'
import { taskApi as defaultTaskApi } from '../../api/taskApi'

function filterTasks(tasks, activeFilter) {
  if (activeFilter === 'pending') {
    return tasks.filter((task) => task.status === 'PENDING')
  }

  if (activeFilter === 'completed') {
    return tasks.filter((task) => task.status === 'COMPLETED')
  }

  return tasks
}

function sortTasks(tasks) {
  return [...tasks].sort(
    (left, right) => new Date(right.updatedAt).getTime() - new Date(left.updatedAt).getTime(),
  )
}

export function TaskManagerOverviewPage({
  loginSession,
  taskApi = defaultTaskApi,
}) {
  const [tasks, setTasks] = useState([])
  const [activeFilter, setActiveFilter] = useState('all')
  const [draftTitle, setDraftTitle] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    let isMounted = true

    async function loadTasks() {
      try {
        const nextTasks = await taskApi.listTasks()
        if (isMounted) {
          setTasks(sortTasks(nextTasks))
        }
      } catch (error) {
        if (isMounted) {
          setErrorMessage(error.message)
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    loadTasks()

    return () => {
      isMounted = false
    }
  }, [taskApi])

  async function handleAddTask() {
    if (!draftTitle.trim()) {
      setErrorMessage('Task title is required.')
      return
    }

    setIsSubmitting(true)
    setErrorMessage('')

    try {
      const createdTask = await taskApi.createTask({ title: draftTitle.trim() })
      setTasks((currentTasks) => sortTasks([createdTask, ...currentTasks]))
      setDraftTitle('')
      setActiveFilter('all')
    } catch (error) {
      setErrorMessage(error.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  async function handleToggleTaskStatus(id, status) {
    try {
      const currentTask = tasks.find((task) => task.id === id)
      const updatedTask = await taskApi.updateTask(id, {
        title: currentTask.title,
        status,
      })

      setTasks((currentTasks) =>
        sortTasks(
          currentTasks.map((task) => (task.id === id ? updatedTask : task)),
        ),
      )
      setErrorMessage('')
    } catch (error) {
      setErrorMessage(error.message)
    }
  }

  async function handleDeleteTask(id) {
    try {
      await taskApi.deleteTask(id)
      setTasks((currentTasks) => currentTasks.filter((task) => task.id !== id))
      setErrorMessage('')
    } catch (error) {
      setErrorMessage(error.message)
    }
  }

  const filteredTasks = filterTasks(tasks, activeFilter)
  const taskCounts = {
    total: tasks.length,
    pending: tasks.filter((task) => task.status === 'PENDING').length,
    completed: tasks.filter((task) => task.status === 'COMPLETED').length,
  }

  return (
    <main className="task-manager-shell">
      <PageUpperSection loginSession={loginSession} taskCounts={taskCounts} />
      <PageCenterSection
        activeFilter={activeFilter}
        draftTitle={draftTitle}
        errorMessage={errorMessage}
        filteredTasks={filteredTasks}
        isLoading={isLoading}
        isSubmitting={isSubmitting}
        onAddTask={handleAddTask}
        onDeleteTask={handleDeleteTask}
        onDraftTitleChange={setDraftTitle}
        onFilterChange={setActiveFilter}
        onToggleTaskStatus={handleToggleTaskStatus}
      />
      <PageBottomSection
        description="The operational page keeps CRUD controls in the center while the shared bottom dock handles route switching."
        title="Shared app navigation"
      />
    </main>
  )
}
