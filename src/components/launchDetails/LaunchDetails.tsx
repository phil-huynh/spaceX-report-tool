import { useStore } from "../../ContextStore";
import LinksSection from "./LinksSection";
import BasicDetails from "./BasicDetails";
import { useNavigate } from "react-router-dom";
import useRefreshRedirect from "../../hooks/useRefreshRedirect";
import Stash from "../Stash";
import Images from "./Images";
import { Launch } from "../../../utils/types";

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
          onClick={()=> stash.filter((launch: Launch) => launch.id === selectedLaunch.id).length < 1 &&
            setStash([...stash, selectedLaunch])}
        >
          Add to Stash
        </button>
      </div>
      <Stash stash={stash} stashSetter={setStash}/>
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
      <Images launch={selectedLaunch}/>
    </>
  )
}


