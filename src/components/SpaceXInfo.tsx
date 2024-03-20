import { Launch } from '../../utils/types.ts'
import { useStore } from '../ContextStore.tsx';
import Loading from './utilityComponents/Loading.tsx';
import useLaunchesQuery from '../hooks/useLaunchesQuery.ts';
import useRefreshRedirect from '../hooks/useRefreshRedirect.ts';


export default function SpaceX_Info() {
  useRefreshRedirect()

  const { unSnakeToTitle, launchList, startIndex, endIndex, goToPreviousPage, goToNextPage, handleIntervalChange, interval, goToFirstPage, goToLastPage  } = useStore()
  const {loading, error, data, headers} = useLaunchesQuery()

  if (loading) return <Loading/>;
  if (error) return `Error! ${error.message}`;

  return (
    <>
      {data &&
      <>
        <div className='glass table-page-header'>
          <h2>SpaceX Launches</h2>
          <hr/>
          <div className='pagination-controls'>

            <span className='pagination-button' onClick={()=>goToFirstPage()}>First</span>
            <span className='pagination-button' onClick={()=>goToPreviousPage()}>Prev</span>
            <span className='pagination-button' onClick={()=>goToNextPage()}>Next</span>
            <span className='pagination-button' onClick={()=>goToLastPage()}>Last</span>
          </div>
          <select
            className="interval-selector"
            name="pagination_interval"
            defaultValue={20}
            value={interval}
            onChange={handleIntervalChange}
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={40}>40</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
        </div>
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
            {launchList.current.slice(startIndex, endIndex).map((launch: Launch) => (
              <tr key={launch.id} className='launch-row'>
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
                  <td className='glass'>
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
              </tr>
            ))}
          </tbody>
        </table>
      </>
      }
    </>
  )
}


