import { BottomNavigator } from '../navigation/BottomNavigator'

export function PageBottomSection({
  eyebrow = 'Shared Navigator',
  title = 'Move through the task manager',
  description = 'The bottom bar is shared across pages so navigation logic and page switching stay isolated from page content.',
}) {
  return (
    <footer className="page-bottom panel" role="contentinfo">
      <div className="page-bottom-copy">
        <p className="eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
        <p className="muted">{description}</p>
      </div>
      <BottomNavigator />
    </footer>
  )
}
