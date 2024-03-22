import { useNavigate } from "react-router-dom";
import { useStore } from "../../ContextStore.tsx";
import { Report } from "../../../utils/types.ts";
import useRefreshRedirect from "../../hooks/useRefreshRedirect.ts";


export default function ReportsList() {
  useRefreshRedirect();

  const { reports, setSelectedReport, setReports } = useStore();
  const navigate = useNavigate();

  if (!setSelectedReport || !setReports) throw new Error('function cannot be undefined');

  const readReport: (report: Report) => void = (report) => {
    setSelectedReport(report);
    navigate('/report-details');
  };

  return (
    <>
      <div className="glass report-list-header">
        <div className="report-list-button-container">
          <button className="stash-remove-button" onClick={()=>setReports('')}>clear history</button>
        </div>
        <h2>Choose a report to view</h2>
      </div>
      <div className="reports-list-container">
        {reports && typeof reports === 'object' &&
          reports?.sort((a, b) => new Date(b.date).valueOf() - new Date(a.date).valueOf())
            .map((report: Report, i: number) => (
          <div
            key={`${report}${i}`}
            className="reports-list-card glass"
            onClick={()=>readReport(report)}
          >
            <h2 style={{lineHeight: "1rem"}}>{report.title}</h2>
            <h4 style={{lineHeight: "1rem"}}>{report.author}</h4>
            <p>
              <span>{`${new Date(report.date).toLocaleDateString()} at `}</span>
              <span>{`${new Date(report.date).toLocaleTimeString().split(':')[0]}:`}</span>
              <span>{`${new Date(report.date).toLocaleTimeString().split(':')[1]} `}</span>
              <span>{new Date(report.date).toLocaleTimeString().split(':')[2].slice(2)}</span>
            </p>
          </div>
        ))}
      </div>
    </>
  );
}