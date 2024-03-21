import ReportForm from "./ReportForm";
import Stash from "./Stash";
import { useStore } from "../ContextStore";
import BasicDetails from "./BasicDetails";
import LinksSection from "./LinksSection";
import Images from "./Images";
import { Launch } from "../../utils/types";
import useRefreshRedirect from "../hooks/useRefreshRedirect";

export default function NewReport() {
  useRefreshRedirect()
  const {stash, selectedStashItem, finalReportStash, setFinalReportStash, setStash} = useStore();

  if (!stash) throw new Error('stash cannot be undefined')
  if (!selectedStashItem) throw new Error('selectedStashItem cannot be undefined')
  if (!finalReportStash) throw new Error('finalReportStash cannot be undefined')
  if (!setFinalReportStash || !setStash) throw new Error('function cannot be undefined')


  const updateFinalStash: (launch: Launch) => void = (launch) => {
    finalReportStash
      .filter((stashItem: Launch) => stashItem.id === launch.id).length < 1 &&
        setFinalReportStash([...finalReportStash, launch])
    setStash([...stash?.filter((stashItem: Launch) => stashItem.id !== launch.id) || []])
  }


  return (
    <>
      <div style={{marginBottom: "1.5rem"}}>
        {stash.length > 0 ?
          <Stash stash={stash} stashSetter={setStash}/>
          :
          <div className="details-section glass">Stash is empty</div>
        }
      </div>

      <div className="report-workspace">
        <ReportForm/>
        <div className="stash-viewer">
          {selectedStashItem &&
            <>
              <div className="stash-viewer-buttons">
                <button
                  className="stash-add"
                  onClick={()=> updateFinalStash(selectedStashItem)}
                >
                  Add to Final
                </button>
              </div>
              <BasicDetails launch={selectedStashItem}/>
              <div className="details-summary-new-report-container">
                <div className="glass details-section details-summary-new-report">
                  {selectedStashItem.details ? selectedStashItem.details : 'no details available'}
                </div>
              </div>
              <LinksSection launch={selectedStashItem}/>
              <Images launch={selectedStashItem}/>
            </>
          }
        </div>
      </div>
      <div style={{marginBottom: "1.5rem"}}>
        <div className="glass" style={{paddingBottom: '.rem'}}>
          <h2>Final Report Stash</h2>
        </div>
        {stash.length > 0 ?
          <Stash stash={finalReportStash} stashSetter={setFinalReportStash} isNewReport={true} finalStash={true}/>
          :
          <div className="details-section glass">Stash is empty</div>
        }
      </div>
    </>
  )
}