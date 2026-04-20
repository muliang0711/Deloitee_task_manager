import { TaskComposer } from '../tasks/TaskComposer'
import { TaskFilterBar } from '../tasks/TaskFilterBar'
import { TaskList } from '../tasks/TaskList'

export function PageCenterSection({
  activeFilter,
  draftTitle,
  errorMessage,
  filteredTasks,
  isLoading,
  isSubmitting,
  onAddTask,
  onDeleteTask,
  onDraftTitleChange,
  onFilterChange,
  onToggleTaskStatus,
}) {
  return (
    <section className="page-center panel" aria-labelledby="task-board-heading">
      <div className="section-heading">
        <p className="eyebrow">Center Section</p>
        <h2 id="task-board-heading">Task Board</h2>
        <p className="muted">
          The center section owns task creation, filtering, and actions while
          staying independent from the upper summary and bottom footer.
        </p>
      </div>

      <TaskComposer
        draftTitle={draftTitle}
        isSubmitting={isSubmitting}
        onDraftTitleChange={onDraftTitleChange}
        onSubmit={onAddTask}
      />

      <TaskFilterBar
        activeFilter={activeFilter}
        onFilterChange={onFilterChange}
      />

      {errorMessage ? <p className="error-banner">{errorMessage}</p> : null}

      <TaskList
        isLoading={isLoading}
        tasks={filteredTasks}
        onDeleteTask={onDeleteTask}
        onToggleTaskStatus={onToggleTaskStatus}
      />
    </section>
  )
}
