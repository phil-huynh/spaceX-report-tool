import { useStore } from "../ContextStore";
import LinksSection from "./LinksSection";
import BasicDetails from "./BasicDetails";
import { useNavigate } from "react-router-dom";
import useRefreshRedirect from "../hooks/useRefreshRedirect";

export default function LaunchDetails() {
  useRefreshRedirect()

  const { selectedLaunch, stash, setStash } = useStore()
  const navigate = useNavigate()

  if (!selectedLaunch) throw new Error('No Launch Selected')
  if (!setStash) throw new Error('function cannot be undefined')
  if (!stash) throw new Error('stash cannot be undefined')

  return (
    <>
      <div className="details-button-container glass">

          <button className="back-to-table" onClick={() => navigate('/launch-list')}>Back to Table</button>
          <button
            className="stash-add"
            onClick={()=> stash.filter(launch => launch.id === selectedLaunch.id).length < 1 &&
              setStash([...stash, selectedLaunch])}
          >
            Add to Stash
          </button>

      </div>
      <div>
        <table>
          <thead>
            <tr>
              <th className='table-header glass'>Mission</th>
              <th className='table-header glass'>Launch Date</th>
              <th className='table-header glass'>Static Fire</th>
              <th className='table-header glass'>Details</th>
            </tr>
          </thead>
          <tbody>
            {stash.map((launch) =>
              <tr>
                <td className="glass">{launch.mission_name ? launch.mission_name : 'no mission name available' }</td>
                <td className="glass">{launch.launch_date_local ? new Date(launch.launch_date_local).toLocaleDateString() : 'no date available' }</td>
                <td className="glass">{launch.static_fire_date_utc ? new Date(launch.static_fire_date_utc).toLocaleDateString() : 'no date available' }</td>
                <td className="glass">{launch.details ? launch.details : 'no details available' }</td>
                <td>
                  <div>
                    <button
                      className="stash-remove-button"
                      onClick={()=> setStash([...stash?.filter(stashItem => stashItem.id !== launch.id) || []])}
                    >
                      Remove
                    </button>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="details-top-container">
        <div className="details-container details-section">
          <BasicDetails launch={selectedLaunch}/>
          {selectedLaunch.links && Object.keys(selectedLaunch.links).slice(1)
            .filter(key => key !== 'flickr_images' && key !== 'video_link').length > 0 ?
            <LinksSection launch={selectedLaunch}/>
            :
            <div className="links-container glass details-section">no links abailable</div>
          }
        </div>
        <div className="details-summary-container">
          <div className="glass details-section details-summary">
            {selectedLaunch.details ? selectedLaunch.details : 'no details available'}
          </div>
        </div>
      </div>


        {selectedLaunch.links?.flickr_images && selectedLaunch.links?.flickr_images.length > 0 &&
        <div className="glass images-container details-section">
          {selectedLaunch.links.flickr_images.map((imageLink: any) => (
            <>
              <img
              className="spaceX-image"
              src={imageLink}
              alt="No image available"
              />
            </>
          ))}
        </div>
        }

    </>
  )
}


