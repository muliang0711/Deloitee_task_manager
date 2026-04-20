import { NavLink } from 'react-router-dom'
import { appRoutes } from '../../router/appRoutes'

export function BottomNavigator() {
  return (
    <nav className="bottom-dock" aria-label="Bottom navigation">
      <ul className="bottom-dock-list">
        {appRoutes.map((route) => (
          <li key={route.path}>
            <NavLink
              aria-label={route.label}
              className={({ isActive }) =>
                isActive ? 'bottom-dock-link active' : 'bottom-dock-link'
              }
              to={route.path}
            >
              <span aria-hidden="true" className="bottom-dock-step">
                {route.eyebrow}
              </span>
              <span className="bottom-dock-label">{route.label}</span>
              <span aria-hidden="true" className="bottom-dock-description">
                {route.description}
              </span>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}
