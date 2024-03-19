import { useStore } from "../../ContextStore"

export default function LaunchOptions() {

  const{ launchToggles, setLaunchToggles, unSnakeToTitle } = useStore()

  return (
    <>
      <h3>Launch</h3>
      <div className='toggle-container'>
        {Object.keys(launchToggles).map(key => (
          <span key={key}>
            <input
              type="checkbox"
              id={key}
              name={key}
              checked={!!launchToggles[key]}
              value={launchToggles[key]}
              onChange={()=> setLaunchToggles({...launchToggles, [key]: !launchToggles[key]})}/>
            <label htmlFor={key}>
              {unSnakeToTitle(key)}
            </label>
          </span>
        ))}
      </div>
    </>
  )
}