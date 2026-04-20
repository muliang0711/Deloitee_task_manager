function getToggleLabel(task) {
  return task.status === 'COMPLETED'
    ? `Mark ${task.title} as pending`
    : `Mark ${task.title} as completed`
}

export function TaskCard({ onDeleteTask, onToggleTaskStatus, task }) {
  const nextStatus = task.status === 'COMPLETED' ? 'PENDING' : 'COMPLETED'

  return (
    <article className="task-card">
      <div>
        <div className="task-card-header">
          <h3>{task.title}</h3>
          <span className={`status-pill status-pill-${task.status.toLowerCase()}`}>
            {task.status}
          </span>
        </div>
        <p className="muted">
          Updated {new Intl.DateTimeFormat('en-MY', { timeStyle: 'short', dateStyle: 'medium' }).format(new Date(task.updatedAt))}
        </p>
      </div>

      <div className="task-actions">
        <button
          className="ghost-button"
          onClick={() => onToggleTaskStatus(task.id, nextStatus)}
          type="button"
        >
          {getToggleLabel(task)}
        </button>
        <button
          className="danger-button"
          onClick={() => onDeleteTask(task.id)}
          type="button"
        >
          {`Delete ${task.title}`}
        </button>
      </div>
    </article>
  )
}
