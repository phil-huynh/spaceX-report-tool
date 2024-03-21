import { Launch } from "../../../utils/types";

const BasicDetails = ({launch}: {launch: Launch}) => (
  <div className="basic-details">
    <table>
      <tbody>
        <tr>
          <td className="glass">Mission</td>
          <td className="glass">{launch.mission_name}</td>
        </tr>
        <tr>
          <td className="glass">Launch Date</td>
          <td className="glass">{launch.launch_date_local &&
            new Date(launch.launch_date_local).toLocaleDateString()}
          </td>
        </tr>
        <tr>
          <td className="glass">Static Fire Date</td>
          <td className="glass">{launch.static_fire_date_utc &&
            new Date(launch.static_fire_date_utc).toLocaleDateString()}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
);
export default BasicDetails