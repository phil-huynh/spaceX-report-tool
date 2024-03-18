import { NavLink } from 'react-router-dom';
import { useStore } from '../ContextStore.tsx';

export default function NavBar() {

  const { selectedNav, setSelectedNav } = useStore()

  return (
    <nav>
      <ul>
        <li className='nav-item' onClick={()=>setSelectedNav('spaceX')}>
          <NavLink
            className={selectedNav === 'spaceX' ? 'current-page' : 'nav-link'}
            to="/"
            >
              SpaceX Data
            </NavLink>
        </li>
        <li className='nav-item' onClick={()=>setSelectedNav('newReport')}>
          <NavLink
            className={selectedNav === 'newReport' ? 'current-page' : 'nav-link'}
            to="/new-report"
          >
            New Report
          </NavLink>
        </li>
        <li className='nav-item' onClick={()=>setSelectedNav('reportsList')}>
          <NavLink
            className={selectedNav === 'reportsList' ? 'current-page' : 'nav-link'}
            to="/reports-list"
          >
            Show Reports
          </NavLink>
        </li>
      </ul>
    </nav>
  )
}