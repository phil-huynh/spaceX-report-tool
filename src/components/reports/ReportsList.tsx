import { useStore } from "../../ContextStore.tsx"
import { useNavigate } from "react-router-dom"
import { Report } from "../../../utils/types.ts"

export default function ReportsList() {

  const { reports, setSelectedReport } = useStore()
  const navigate = useNavigate()

  if (!setSelectedReport) throw new Error('function cannot be undefined')

  const readReport: (report: Report) => void = (report) => {
    setSelectedReport(report)
    navigate('/report-details')
  }

  return (
    <>
      <h1>Here is the reports</h1>
      <div className="reports-list-container">
        {reports?.sort((a, b) => b.date - a.date).map((report: Report, i: number) => (
          <div
            key={`${report}${i}`}
            className="reports-list-card glass"
            onClick={()=>readReport(report)}
          >
            <h2 style={{lineHeight: "1rem"}}>{report.title}</h2>
            <h4 style={{lineHeight: "1rem"}}>{report.author}</h4>
            <p>
              {`${report.date.toLocaleDateString()} at ${report.date.toLocaleTimeString()}`}
            </p>
          </div>
        ))}
      </div>
    </>
  )
}