export function TaskComposer({
  draftTitle,
  isSubmitting,
  onDraftTitleChange,
  onSubmit,
}) {
  function handleSubmit(event) {
    event.preventDefault()
    onSubmit()
  }

  return (
    <form className="task-composer" id="new-task" onSubmit={handleSubmit}>
      <label htmlFor="task-title-input">New task title</label>
      <div className="task-composer-row">
        <input
          id="task-title-input"
          onChange={(event) => onDraftTitleChange(event.target.value)}
          placeholder="Add a task for the team"
          value={draftTitle}
        />
        <button disabled={isSubmitting} type="submit">
          {isSubmitting ? 'Saving...' : 'Add task'}
        </button>
      </div>
    </form>
  )
}
