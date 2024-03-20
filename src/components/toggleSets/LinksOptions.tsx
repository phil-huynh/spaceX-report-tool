import { useStore } from "../../ContextStore"
import BulkSelector from "./BulkSelector"

export default function LinksOptions() {

  const { linkToggles, setLinkToggles, unSnakeToTitle } = useStore()

  if (!setLinkToggles || !unSnakeToTitle) {
    throw new Error('function cannot be undefined')
  }

  return (
    <>
    {linkToggles &&
      <div className='toggle-container glass'>
        <BulkSelector toggleSet="links"/>
        <p className="toggle-header">Links</p>
        <hr/>
        <div className="toggles">
          {Object.keys(linkToggles).map(key => (
            <span key={key}>
              <input
                type="checkbox"
                id={key}
                name={key}
                checked={!!linkToggles[key]}
                value={linkToggles[key]}
                onChange={()=> setLinkToggles({...linkToggles, [key]: !linkToggles[key]})}/>
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