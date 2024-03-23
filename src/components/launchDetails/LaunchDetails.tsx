import { useNavigate } from "react-router-dom";
import { useStore } from "../../ContextStore";
import { Launch } from "../../../utils/types";
import useRefreshRedirect from "../../hooks/useRefreshRedirect";
import Stash from "../Stash";
import BasicDetails from "./BasicDetails";
import LinksSection from "./LinksSection";
import Images from "./Images";
import LaunchSummary from "./LaunchSummary";

export default function LaunchDetails() {
  useRefreshRedirect();

  const { selectedLaunch, stash, setStash } = useStore();
  const navigate = useNavigate();

  if (!selectedLaunch) throw new Error('No Launch Selected');
  if (!setStash) throw new Error('function cannot be undefined');
  if (!stash) throw new Error('stash cannot be undefined');

  const addToStash = () => {
    if (stash.filter((launch: Launch) => launch.id === selectedLaunch.id).length < 1) {
      setStash([...stash, selectedLaunch]);
    }
  };

  return (
    <>
      <div className="details-button-container glass">
        <button className="back-to-table" onClick={() => navigate('/launch-list')}>Back to Table</button>
        <button className="stash-add" onClick={()=> addToStash()}>Add to Stash</button>
      </div>
      <Stash stash={stash} stashSetter={setStash} finalStash={false}/>

      <div className="details-top-container">
        <div className="details-container details-section">
          <BasicDetails launch={selectedLaunch}/>
          <LaunchSummary launch={selectedLaunch}/>
        </div>
        <div>
          {selectedLaunch.links && Object.keys(selectedLaunch.links).slice(1)
            .filter(key => key !== 'flickr_images' && key !== 'video_link').length > 0 ?
            <LinksSection launch={selectedLaunch}/>
            :
            <div className="links-container glass details-section">no links abailable</div>
          }
        </div>
      </div>
      <Images launch={selectedLaunch}/>
    </>
  );
}


