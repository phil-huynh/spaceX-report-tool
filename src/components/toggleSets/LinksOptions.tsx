import { useStore } from "../../ContextStore"

export default function LinksOptions() {

  const { linkToggles, setLinkToggles, unSnakeToTitle } = useStore()

  return (
    <>
    <h3>Links</h3>
    <div className='toggle-container'>
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
  </>
  )
}