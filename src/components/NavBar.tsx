import { NavLink } from 'react-router-dom';
import { useStore } from '../ContextStore.tsx';

export default function NavBar() {

  const { selectedNav, setSelectedNav, gotToNewReport } = useStore()

  if(!setSelectedNav || !gotToNewReport) throw new Error('function cannot be undefined')

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
        <li className='nav-item' onClick={()=>setSelectedNav('spaceXList')}>
          <NavLink
            className={selectedNav === 'spaceXList' ? 'current-page' : 'nav-link'}
            to="/launch-list"
            >
              SpaceX Data
            </NavLink>
        </li>
        <li className='nav-item' onClick={()=>gotToNewReport()}>
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