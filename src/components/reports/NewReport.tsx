import { useStore } from "../../ContextStore";
import { Launch } from "../../../utils/types";
import useRefreshRedirect from "../../hooks/useRefreshRedirect";
import ReportForm from "./ReportForm";
import Stash from "../Stash";
import BasicDetails from "../launchDetails/BasicDetails";
import LinksSection from "../launchDetails/LinksSection";
import Images from "../launchDetails/Images";

export default function NewReport() {
  useRefreshRedirect();
  const {stash, selectedStashItem, finalReportStash, setFinalReportStash, setStash, setSelectedStashItem} = useStore();

  if (!stash) throw new Error('stash cannot be undefined');
  if (!selectedStashItem) throw new Error('selectedStashItem cannot be undefined');
  if (!finalReportStash) throw new Error('finalReportStash cannot be undefined');

  if (!setFinalReportStash || !setStash || !setSelectedStashItem) {
    throw new Error('function cannot be undefined');
  }

  const updateFinalStash: (launch: Launch) => void = (launch) => {
    finalReportStash
      .filter((stashItem: Launch) => stashItem.id === launch.id).length < 1 &&
        setFinalReportStash([...finalReportStash, launch]);
    setStash([...stash?.filter((stashItem: Launch) => stashItem.id !== launch.id) || []])

    if (stash?.filter((stashItem: Launch) => stashItem.id !== launch.id).length > 0) {
      selectedStashItem.id === stash[0].id ? setSelectedStashItem(stash[1]) : setSelectedStashItem(stash[0]);
    }
  };

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


          <ReportForm/>
        <div className="stash-viewer">
          {selectedStashItem &&
            <>
              {/* <div className="stash-viewer-buttons">
                <button
                  className="stash-add"
                  onClick={()=> updateFinalStash(selectedStashItem)}
                >
                  Add to Final
                </button>
              </div> */}
              <div>
              </div>
              <BasicDetails launch={selectedStashItem}/>
              <table>
                <thead>
                  <tr className="glass table-header">
                    {selectedStashItem.details ? 'Details' : 'No details available'}
                  </tr>
                </thead>
                <tbody>
                  <tr className="details-summary-new-report-container">
                    <td className="glass details-section details-summary-new-report">
                      {selectedStashItem.details ? selectedStashItem.details : ''}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <LinksSection launch={selectedStashItem}/>
                    </td>
                  </tr>
                </tbody>
              </table>
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
          <Stash stash={finalReportStash} stashSetter={setFinalReportStash} finalStash={true}/>
          :
          <div className="details-section glass">Stash is empty</div>
        }
      </div>
    </>
  )
}