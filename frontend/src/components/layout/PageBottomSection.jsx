export function PageBottomSection() {
  return (
    <footer className="page-bottom" role="contentinfo">
      <div>
        <p className="eyebrow">Bottom Section</p>
        <h2>Task Manager Link</h2>
        <p className="muted">
          Keep the footer isolated so navigation, ownership text, and support links
          can be changed without touching the task board.
        </p>
      </div>

      <nav className="footer-nav" aria-label="Footer menu">
        <a href="#task-board">Task board</a>
        <a href="#new-task">Create task</a>
        <a href="#status-filters">Filter tasks</a>
      </nav>
    </footer>
  )
}
