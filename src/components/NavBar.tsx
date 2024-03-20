import { NavLink } from 'react-router-dom';
import { useStore } from '../ContextStore.tsx';

export default function NavBar() {

  const { selectedNav, setSelectedNav } = useStore()

  return (
    <nav>
      <ul className='nav-bar'>
        <li className='nav-item' onClick={()=>setSelectedNav('options')}>
          <NavLink
            className={selectedNav === 'options' ? 'current-page' : 'nav-link'}
            to="/"
            >
              Options
            </NavLink>
        </li>
        <li className='nav-item' onClick={()=>setSelectedNav('spaceX')}>
          <NavLink
            className={selectedNav === 'spaceX' ? 'current-page' : 'nav-link'}
            to="/launch-data"
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