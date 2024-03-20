import { useStore } from "../../ContextStore"
import BulkSelector from "./BulkSelector"

export default function LaunchOptions() {

  const{ launchToggles, updateLaunchToggles, unSnakeToTitle } = useStore()

  if (!updateLaunchToggles || !unSnakeToTitle) {
    throw new Error('function cannot be undefined')
  }
  if (!updateLaunchToggles || !unSnakeToTitle) {
    throw new Error('function cannot be undefined')
  }

  return (
    <>
      {launchToggles &&
        <div className='toggle-container glass'>
          <BulkSelector toggleSet="launch"/>
          <p className="toggle-header">Launch</p>
          <hr/>
          <div className="toggles">
            {Object.keys(launchToggles).map(key => (
              <span key={key}>
                <input
                  type="checkbox"
                  id={key}
                  name={key}
                  checked={!!launchToggles[key]}
                  value={launchToggles[key]}
                  onChange={()=> updateLaunchToggles(key)}/>
                <label htmlFor={key}>
                  {unSnakeToTitle(key)}
                </label>
              </span>
            ))}
          </div>
        </div>
      }
    </>
  )
}