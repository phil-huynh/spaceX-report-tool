import { useStore } from '../../ContextStore.tsx';
import { useNavigate } from 'react-router-dom';
import LaunchOptions from './LaunchOptions.tsx';
import LinksOptions from './LinksOptions.tsx';
import RocketOptions from './RocketOptions.tsx';
import BulkSelector from './BulkSelector.tsx';

export default function Options() {
  const { setSelectedNav , launchToggles } = useStore()
  const navigate = useNavigate()

  if (!setSelectedNav) throw new Error('function cannot be undefined')
  if (!launchToggles) throw new Error('launchToggles cannot be undefined')

  const goToSpaceXData = () => {
    navigate('/launch-data')
    setSelectedNav('spaceX')
  }

  return (
    <>
      <div className='selections-container'>
        <div className='glass filter-header'>
          <BulkSelector toggleSet="all"/>
          <button onClick={()=>goToSpaceXData()}>View Data</button>
        </div>
        <LaunchOptions/>
        {launchToggles.links && <LinksOptions/>}
        {launchToggles.rocket && <RocketOptions/>}
      </div>
    </>
  )
}