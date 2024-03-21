import { useStore } from "../../ContextStore.tsx"
import { useNavigate } from "react-router-dom"
import { Report } from "../../../utils/types.ts"

export default function ReportsList() {

  const { reports } = useStore()
  const navigate = useNavigate()

  return (
    <>
      <h1>Here is the reports</h1>
      <div className="reports-list-container">
        {reports?.sort((a, b) => b.date - a.date).map((report: Report, i: number) => (
          <div
            key={`${report}${i}`}
            className="reports-list-card glass"
            onClick={()=>navigate('/report-details')}
          >
            <h2 style={{lineHeight: "1rem"}}>{report.title}</h2>
            <h4 style={{lineHeight: "1rem"}}>{report.author}</h4>
            <p>
              {`${report.date.toLocaleDateString()} at ${report.date.toLocaleTimeString()} ${typeof report.date} ${report.title}`}
            </p>
          </div>
        ))}
      </div>
    </>
  )
}