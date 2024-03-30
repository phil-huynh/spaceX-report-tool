import { useStore } from "../../ContextStore";
import useRefreshRedirect from "../../hooks/useRefreshRedirect";
import ReportForm from "./ReportForm";
import Stash from "../Stash";
import BasicDetails from "../launchDetails/BasicDetails";
import LinksSection from "../launchDetails/LinksSection";
import Images from "../launchDetails/Images";
import LaunchSummary from "../launchDetails/LaunchSummary";

export default function NewReport() {
  useRefreshRedirect();
  const {stash, selectedStashItem, finalReportStash, setFinalReportStash, setStash, setSelectedStashItem} = useStore();

  if (!stash) throw new Error('stash cannot be undefined');
  if (!selectedStashItem) throw new Error('selectedStashItem cannot be undefined');
  if (!finalReportStash) throw new Error('finalReportStash cannot be undefined');

  if (!setFinalReportStash || !setStash || !setSelectedStashItem) {
    throw new Error('function cannot be undefined');
  }


  return (
    <>
      <div>
        {stash.length > 0 ?
          <Stash stash={stash} stashSetter={setStash} finalStash={false}/>
          :
          <div className="details-section glass">Stash is empty</div>
        }
      </div>
      <div className="report-workspace">
        <div>
          <div>

          </div>
          <ReportForm/>
        </div>
        <div className="stash-viewer">
          {selectedStashItem &&
            <div className="stash-viewer-item-container">
              <BasicDetails launch={selectedStashItem}/>
              <LaunchSummary launch={selectedStashItem}/>
              <LinksSection launch={selectedStashItem}/>
            </div>
          }
          {/* <div className="glass" style={{height: "100%", width: "100%"}}></div> */}
        </div>
      </div>
          <Images launch={selectedStashItem}/>
      <div style={{marginBottom: "1.5rem"}}>
        <div className="glass" style={{paddingBottom: '.rem'}}>
          <h2>Final Report Stash</h2>
        </div>
        {stash.length > 0 ?
          <Stash stash={finalReportStash} stashSetter={setFinalReportStash} finalStash={true}/>
          :
          <div className="details-section glass">Stash is empty</div>
        }
      </div>
    </>
  )
}



           {/* <div className="stash-viewer-buttons">
                <button
                  className="stash-add"
                  onClick={()=> updateFinalStash(selectedStashItem)}
                >
                  Add to Final
                </button>
              </div> */}