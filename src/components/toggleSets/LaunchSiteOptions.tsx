import { useStore } from "../../ContextStore"

export default function LaunchSiteOptions() {

  const { launchSiteToggles, setLaunchSiteToggles, unSnakeToTitle } = useStore()

  return (
    <>
    <h3>Launch Site</h3>
    <div className='toggle-container'>
      {Object.keys(launchSiteToggles).map(key => (
        <span key={key}>
          <input
            type="checkbox"
            id={key}
            name={key}
            checked={!!launchSiteToggles[key]}
            value={launchSiteToggles[key]}
            onChange={()=> setLaunchSiteToggles({...launchSiteToggles, [key]: !launchSiteToggles[key]})}/>
          <label htmlFor={key}>
            {unSnakeToTitle(key)}
          </label>
        </span>
      ))}
    </div>
  </>
  )
}