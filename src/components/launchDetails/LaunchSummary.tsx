import { Launch } from "../../../utils/types";

const LaunchSummary = ({launch}: {launch: Launch}) => (
  <div>
    <table>
      <thead>
        <th className="glass table-header">
          {launch.details ? 'Details' : 'No details available'}
        </th>
      </thead>
      <tbody>
        {launch.details ?
          <tr className="details-summary-new-report-container">
            <td className="glass details-section details-summary">
              {launch.details}
            </td>
          </tr>
          :
          <tr className="glass" style={{height: "100%"}}></tr>
        }
      </tbody>
    </table>
  </div>
)
export default LaunchSummary;