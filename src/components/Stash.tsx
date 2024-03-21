import { useStore } from "../ContextStore";
import { Launch } from "../../utils/types";
import { Dispatch, SetStateAction } from "react";

export default function Stash ({
  stash,
  stashSetter,
  finalStash=false
}: {
  stash: Launch[],
  stashSetter: Dispatch<SetStateAction<Launch>>,
  finalStash: boolean
}) {

  const {setSelectedStashItem} = useStore();

  if (!stashSetter || !setSelectedStashItem) throw new Error('function cannot be undefined');

  const grabFromStash = (stashItem: Launch) => {
      if (!finalStash) {
        setSelectedStashItem(stashItem)
      }
  }

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th className='table-header glass'>Mission</th>
            <th className='table-header glass'>Launch Date</th>
            <th className='table-header glass'>Static Fire</th>
            <th className='table-header glass'>Details</th>
          </tr>
        </thead>
        <tbody>
          {stash?.map((launch: Launch) =>
            <tr onClick={()=>grabFromStash(launch)} style={{cursor: "pointer"}} className="stash-row">
              <td className="glass">{launch.mission_name ? launch.mission_name : 'no mission name available' }</td>
              <td className="glass">{launch.launch_date_local ? new Date(launch.launch_date_local).toLocaleDateString() : 'no date available' }</td>
              <td className="glass">{launch.static_fire_date_utc ? new Date(launch.static_fire_date_utc).toLocaleDateString() : 'no date available' }</td>
              <td className="glass">{launch.details ? launch.details : 'no details available' }</td>
              <td>
                <div>
                  <button
                    className="stash-remove-button"
                    onClick={()=> {
                      const newStash = [...stash?.filter((stashItem: Launch) => stashItem.id !== launch.id) || []]
                      stashSetter(newStash)}}
                  >
                    Remove
                  </button>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};