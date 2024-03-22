import { useStore } from "../../ContextStore";
import { Launch } from "../../../utils/types";
import BasicDetails from "../launchDetails/BasicDetails";
import LinksSection from "../launchDetails/LinksSection";
import Images from "../launchDetails/Images";
import useRefreshRedirect from "../../hooks/useRefreshRedirect";

export default function ReportDetails() {
  useRefreshRedirect();

  const {selectedReport} = useStore();
  if (!selectedReport) throw new Error('report cannot be undefined');

  return (
    <>
      <div className="glass report-header">
        {selectedReport.date &&
          <p>
            <span>{`${new Date(selectedReport.date).toLocaleDateString()} at `}</span>
            <span>{`${new Date(selectedReport.date).toLocaleTimeString().split(':')[0]}:`}</span>
            <span>{`${new Date(selectedReport.date).toLocaleTimeString().split(':')[1]} `}</span>
            <span>{new Date(selectedReport.date).toLocaleTimeString().split(':')[2].slice(2)}</span>
          </p>
        }
        <h1 style={{lineHeight: "1rem"}}>{selectedReport.title}</h1>
        <p style={{lineHeight: ".3rem"}}>by</p>
        <h3 style={{lineHeight: ".3rem"}}>{selectedReport.author}</h3>
      </div>
      <div className="glass report-body">
        <div>{selectedReport.report ? selectedReport.report : 'No details provided'}</div>
      </div>
      {selectedReport.stash?.map((launch: Launch) => (
        <div key={launch.id}>
          <BasicDetails launch={launch}/>
          <div className="details-summary-new-report-container">
            <div className="glass details-section details-summary-new-report">
              {launch.details ? launch.details : 'no details available'}
            </div>
          </div>
          <LinksSection launch={launch}/>
          <Images launch={launch} />
        </div>
      ))}
    </>
  );
}

