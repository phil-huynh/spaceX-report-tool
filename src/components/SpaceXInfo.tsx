import { useQuery, gql } from '@apollo/client'
import { useEffect, useState } from 'react'
import { Launch } from '../../utils/types.ts'
import { useStore } from '../ContextStore.tsx';
import Loading from './Loading.tsx';
import useLaunchesQuery from './customHooks/useLaunchesQuery.ts';
import { useNavigate } from 'react-router-dom';
import useRefreshRedirect from './customHooks/useRefreshRedirect.ts';


export default function SpaceX_Info() {
  useRefreshRedirect()

  const { unSnakeToTitle, launchList  } = useStore()
  const {loading, error, data, headers} = useLaunchesQuery()

  if (loading) return <Loading/>;
  if (error) return `Error! ${error.message}`;

  return (
    <>
      {data &&
      <>
        <table>
          <thead>
            <tr>
              {headers.map((header) => (
                header === 'static_fire_date_utc' ? 'static_fire_date' : header
              )).map((header) => (
                <th className='table-header glass'>{unSnakeToTitle(header)}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {launchList.current.map((launch: Launch) => (
              <tr key={launch.id}>
                {headers.includes('mission_name') &&
                  <td className='glass'>{launch.mission_name}</td>
                }
                {headers.includes('launch_date_local') &&
                  <td
                    className='glass'
                  >
                    {new Date(launch.launch_date_local).toLocaleDateString()}
                  </td>
                }
                {headers.includes('static_fire_date_utc') &&
                  <td
                    className='glass'

>
                      {launch.static_fire_date_utc ?
                        new Date(launch.static_fire_date_utc).toLocaleDateString() : ""
                      }
                  </td>
                }
                {headers.includes('rocket_name') &&
                  <td className='rocket-name glass'>{launch.rocket?.rocket_name}</td>}
                {headers.includes('details') &&
                  <td
                    className={`glass ${launch.details ? 'details-cell' : 'empty-details'}`}
                  >
                    {launch.details ? launch.details : "No details available"}
                  </td>
                }

                {/* {headers.includes('links') &&
                <td className='links-td glass'>
                  {Object.keys(launch.links)
                    .filter((link) => launch.links[link] && !Array.isArray(launch.links[link]))
                    .slice(1)
                    .map((link: string) => (
                    <div>
                      <p
                      style={{
                        margin: "none",
                        border: "red 1 px solid",
                        lineHeight: "7px",
                        fontSize: ".8rem",
                        textAlign: "left"
                      }}
                      >
                        <span>{`${unSnakeToTitle(link)}:  `}</span>
                        <a href={launch.links[link]} target='_blank'>{launch.links[link]}</a>
                      </p>
                    </div>
                  ))}
                </td>
                } */}
              </tr>
            ))}
          </tbody>
        </table>
      </>
      }
      {/* <button onClick={()=>getLaunches()}>Get Launches</button> */}
    </>
  )
}



// rocket {
//   active
//   boosters
//   company
//   cost_per_launch
//   country
//   description
//   diameter {
//     feet
//     meters
//   }
//   engines {
//     engine_loss_max
//     layout
//     number
//     propellant_1
//     propellant_2
//     thrust_sea_level {
//       kN
//       lbf
//     }
//     thrust_to_weight
//     thrust_vacuum {
//       kN
//       lbf
//     }
//     type
//     version
//   }
//   first_flight
//   first_stage {
//     burn_time_sec
//     engines
//     fuel_amount_tons
//     reusable
//     thrust_sea_level {
//       kN
//       lbf
//     }
//     thrust_vacuum {
//       kN
//       lbf
//     }
//   }
//   height {
//     feet
//     meters
//   }
//   id
//   landing_legs {
//     material
//     number
//   }
//   mass {
//     kg
//     lb
//   }
//   name
//   payload_weights {
//     id
//     kg
//     lb
//     name
//   }
//   second_stage {
//     burn_time_sec
//     engines
//     fuel_amount_tons
//     payloads {
//       composite_fairing {
//         diameter {
//           meters
//           feet
//         }
//         height {
//           feet
//           meters
//         }
//       }
//       option_1
//     }
//     thrust {
//       kN
//       lbf
//     }
//   }
//   stages
//   type
//   wikipedia
//   success_rate_pct
// }
