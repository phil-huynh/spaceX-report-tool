import { useStore } from "../ContextStore.tsx"
import { useNavigate } from "react-router-dom"

export default function ReportsList() {

  const { reports } = useStore()
  const navigate = useNavigate()

  return (
    <>
      <h1>Here is the reports list</h1>
      {reports?.sort((a,b) => b.date - a.date).map((report: any, i: number) => (
        <p
          key={`report${i}`}
          onClick={()=>navigate('/report-details')}
        >
          {`${report.date.toLocaleDateString()} at ${report.date.toLocaleTimeString()} ${typeof report.date} ${report.title} by ${report.author}`}
        </p>
      ))}
    </>
  )
}