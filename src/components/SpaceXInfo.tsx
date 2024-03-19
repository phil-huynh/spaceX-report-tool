import { useQuery, gql } from '@apollo/client'
import { useEffect, useState } from 'react'
import { Launch } from '../../utils/types.ts'
import { useStore } from '../ContextStore.tsx';
import Loading from './Loading.tsx';


export default function SpaceX_Info() {

  const { launchToggles, linkToggles, setTableHeaders, tableHeaders, unSnakeToTitle } = useStore()

  const GET_LAUNCHES = gql`
    query Launches (
      $launch_date_local: Boolean!,
      $mission_name: Boolean!,
      $details: Boolean!,
      $static_fire_date_utc: Boolean!,
      $links: Boolean!,
      $article_link: Boolean!,
      $flickr_images: Boolean!,
      $presskit: Boolean!,
      $reddit_campaign: Boolean!,
      $reddit_launch: Boolean!,
      $reddit_media: Boolean!,
      $reddit_recovery: Boolean!,
      $video_link: Boolean!,
      $wikipedia: Boolean!,
      $rocket: Boolean!
    ){
      launchesPast {
        id
        launch_date_local @include(if: $launch_date_local)
        mission_name @include(if: $mission_name)
        details @include(if: $details)
        static_fire_date_utc @include(if: $static_fire_date_utc)
        rocket @include(if: $rocket){
          rocket_name
          rocket_type
        }
        links @include(if: $links){
          article_link @include(if: $article_link)
          flickr_images @include(if: $flickr_images)
          presskit @include(if: $presskit)
          reddit_campaign @include(if: $reddit_campaign)
          reddit_launch @include(if: $reddit_launch)
          reddit_media @include(if: $reddit_media)
          reddit_recovery @include(if: $reddit_recovery)
          video_link @include(if: $video_link)
          wikipedia @include(if: $wikipedia)
        }
      }
    }
  `;

  const canGetLinks = (
    launchToggles.links &&
      Object.keys(linkToggles)
        .slice(1)
        .filter((key: string) => linkToggles[key])
        .length > 0
  )

  const { loading, error, data } = useQuery(GET_LAUNCHES, {
    variables: {
      launch_date_local: launchToggles.launch_date_local,
      mission_name: launchToggles.mission_name,
      details: launchToggles.details,
      static_fire_date_utc: launchToggles.static_fire_date_utc,
      links: canGetLinks,
      article_link: linkToggles.article_link,
      flickr_images: linkToggles.flickr_images,
      presskit: linkToggles.presskit,
      reddit_campaign: linkToggles.reddit_campaign,
      reddit_launch: linkToggles.reddit_launch,
      reddit_media: linkToggles.reddit_media,
      reddit_recovery: linkToggles.reddit_recovery,
      video_link: linkToggles.video_link,
      wikipedia: linkToggles.wikipedia,



      rocket: launchToggles.rocket

    }
  })
  // const [recentLaunches, setRecentLaunches] = useState([])

  if (loading) return <Loading/>;
  if (error) return `Error! ${error.message}`;

  let headers: string[];
  if (data) {
    headers= Object.keys(data?.launchesPast[0])
      .slice(1)
      .filter(header => (
        !['id', 'mission_id'].includes(header)
      ))
    if (headers.includes('rocket')) {
      headers.splice( headers.indexOf('rocket'), 1, 'rocket_name')
    }

  }

  return (
    <>
      {data &&
        <table>
          <thead>
            <tr>
              {headers.map((header) => (
                <th className='table-header'>{unSnakeToTitle(header)}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data?.launchesPast?.slice().reverse().map((launch: Launch) => (
              <tr key={launch.id}>
                {headers.includes('launch_date_local') && <td>{new Date(launch.launch_date_local).toLocaleDateString()}</td>}
                {headers.includes('mission_name') && <td>{launch.mission_name}</td>}
                {headers.includes('details') && <td style={{fontSize: ".8rem", textAlign: "left"}}>{launch.details ? launch.details : "No details available"}</td>}
                {headers.includes('static_fire_date_utc') &&
                  <td>{launch.static_fire_date_utc ? new Date(launch.static_fire_date_utc).toLocaleDateString() : ""}</td>
                }
                {headers.includes('rocket_name') && <td className='rocket-name'>{launch.rocket?.rocket_name}</td>}
                {/* {headers.includes('rocket_type') && <td>{launch.rocket?.rocket_type}</td>} */}
                {headers.includes('links') &&
                <td className='links-td'>
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
                        <a href={launch.links[link]}>{launch.links[link]}</a>
                      </p>
                    </div>
                  ))}
                </td>
                }
              </tr>
            ))}
          </tbody>
        </table>
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
