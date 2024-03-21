import { useStore } from "../../ContextStore"
import BulkSelector from "./BulkSelector"
import { RocketToggleSet } from "../../../utils/types"

export default function RocketOptions() {

  const { rocketToggles, setRocketToggles, unSnakeToTitle } = useStore()

  if (!setRocketToggles || !unSnakeToTitle) {
    throw new Error('function cannot be undefined')
  }
  if (!rocketToggles) throw new Error('rocketToggles cannot be undefined')

  return (
    <>
    <div className='toggle-container glass'>
      <BulkSelector toggleSet="rocket"/>
      <p className="toggle-header">Rocket Information Options</p>
      <hr/>
      <div className="toggles">
        {Object.keys(rocketToggles).map(key => (
          <span key={key}>
            <input
              type="checkbox"
              id={key}
              name={key}
              checked={!!rocketToggles[key as keyof RocketToggleSet]}
              onChange={()=> setRocketToggles({...rocketToggles, [key]: !rocketToggles[key as keyof RocketToggleSet]})}/>
            <label htmlFor={key}>
              {unSnakeToTitle(key)}
            </label>
          </span>
        ))}
      </div>
    </div>
  </>
  )
}