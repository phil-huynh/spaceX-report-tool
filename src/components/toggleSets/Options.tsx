import { useStore } from '../../ContextStore.tsx';
import { useNavigate } from 'react-router-dom';
import LaunchOptions from './LaunchOptions.tsx';
import LinksOptions from './LinksOptions.tsx';
import LaunchSiteOptions from './LaunchSiteOptions.tsx';

export default function Options() {

  const navigate = useNavigate()

  const { setSelectedNav , launchToggles } = useStore()

  const goToSpaceXData = () => {
    navigate('/launch-data')
    setSelectedNav('spaceX')
  }

  return (
    <>
      <h2>SpaceX Launces</h2>
      <button onClick={()=>goToSpaceXData()}>View Data</button>
      <div className='selections-container'>
        <LaunchOptions/>
        {launchToggles.launch_site &&<LaunchSiteOptions/>}
        {launchToggles.links &&<LinksOptions/>}

      </div>
    </>
  )
}