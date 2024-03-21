import { useStore } from "../../ContextStore"
import BulkSelector from "./BulkSelector"
import { LaunchToggleSet } from "../../../utils/types"

export default function LaunchOptions() {

  const{ launchToggles, handleLaunchToggles, unSnakeToTitle } = useStore()

  if (!handleLaunchToggles || !unSnakeToTitle) {
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
                  checked={!!launchToggles[key as keyof LaunchToggleSet]}
                  onChange={()=> handleLaunchToggles(key)}/>
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