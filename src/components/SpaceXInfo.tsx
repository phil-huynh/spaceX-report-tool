import { useQuery, gql } from '@apollo/client'
import { useEffect, useState } from 'react'
import { Launch } from '../../utils/types.ts'


const missionName = true
const missionID = true
const missionDate = true
const details = true

const GET_LAUNCHES = gql`
query Launches {
  launchesPast {
    ${missionName ? 'mission_name' : ''}
    ${missionID ? 'mission_id' : ''}
    ${missionDate ? 'launch_date_local' : ''}
    ${details ? 'details' : ''}
  }
}
`;

export default function SpaceX_Info() {

  // const limit = 20
  // const sort = "mission_name"
  // const order = "asc"

  const { loading, error, data } = useQuery(GET_LAUNCHES)
  const [recentLaunches, setRecentLaunches] = useState([])

  // if (loading) return 'Loading...';
  // if (error) return `Error! ${error.message}`;

  useEffect(() => {
    if (data) {
      console.log("data", data)
      // let launches = data?.launchesPast
      // console.log("launches", launches)
      // launches = launches.slice(launches.length - 20).reverse()
      // console.log("updated launches", launches)
      // setRecentLaunches(launches)
    }
  }, [data])

  return (
    <>
      <h2>SpaceX Launces</h2>
      <table>
        <tbody>
          {data?.launchesPast?.map((launch: Launch) => (
            <tr key={launch.mission_id[0]}>
              <td >{new Date(launch.launch_date_local).toLocaleDateString()}</td>
              <td style={{textAlign: "left"}}>{launch.mission_name}</td>
              {launch.details ?
              <td style={{fontSize: ".8rem"}}>{launch.details}</td>
              :
              <td >No details available</td>
            }
            </tr>
          ))}
        </tbody>
      </table>
      <button>Get Launches</button>
    </>
  )
}