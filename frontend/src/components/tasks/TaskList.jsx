import { TaskCard } from './TaskCard'

export function TaskList({
  isLoading,
  onDeleteTask,
  onToggleTaskStatus,
  tasks,
}) {
  if (isLoading) {
    return <p className="muted">Loading tasks...</p>
  }

  if (tasks.length === 0) {
    return (
      <div className="empty-state">
        <h3>No tasks in this view</h3>
        <p className="muted">
          Create a task above or switch the filter to inspect another status bucket.
        </p>
      </div>
    )
  }

  return (
    <div className="task-list" aria-live="polite">
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          onDeleteTask={onDeleteTask}
          onToggleTaskStatus={onToggleTaskStatus}
          task={task}
        />
      ))}
    </div>
  )
}
