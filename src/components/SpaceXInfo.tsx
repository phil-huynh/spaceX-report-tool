import { useQuery, gql } from '@apollo/client'
import { useEffect, useState } from 'react'
import { Launch } from '../../utils/types.ts'

const GET_LAUNCHES = gql`
  {
    launchesPast {
      launch_date_local
      mission_name
      mission_id
      details
      id
      is_tentative
      launch_success
      launch_year
      upcoming
    }
  }
`;

export default function SpaceX_Info() {

  const { loading, error, data } = useQuery(GET_LAUNCHES)

  const [recentLaunches, setRecentLaunches] = useState([])

  useEffect(() => {
    if (data) {
      console.log("data", data)
      let launches = data?.launchesPast
      console.log("launches", launches)
      launches = launches.slice(launches.length - 20).reverse()
      console.log("updated launches", launches)
      setRecentLaunches(launches)
    }
  }, [data])

  return (
    <>
      <h2>SpaceX Launces</h2>
      <table>
        <tbody>
          {recentLaunches?.map((launch: Launch) => (
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