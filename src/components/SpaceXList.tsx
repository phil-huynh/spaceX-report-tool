import { useNavigate } from 'react-router-dom';
import { LinkToggleSet } from '../../utils/types.ts';
import { Launch } from '../../utils/types.ts';
import { useStore } from '../ContextStore.tsx';
import useLaunchesQuery from '../hooks/useLaunchesQuery.ts';
import useRefreshRedirect from '../hooks/useRefreshRedirect.ts';
import Loading from './utilityComponents/Loading.tsx';

export default function SpaceXList() {
  useRefreshRedirect();
  const navigate = useNavigate();

  const {
    launchList,
    startIndex,
    endIndex,
    linkToggles,
    goToPreviousPage,
    goToNextPage,
    goToFirstPage,
    goToLastPage,
    handleIntervalChange,
    setSelectedLaunch,
    unSnakeToTitle,
  } = useStore();


  if (!unSnakeToTitle || !setSelectedLaunch) {
    throw new Error('function cannot be undefined');
  }
  if (!launchList) throw new Error('launchList cannot be undefined');
  if (!linkToggles) throw new Error('linkToggles cannot be undefined');

  const {loading, error, data, headers} = useLaunchesQuery();

  if (loading) return <Loading/>;
  if (error) return `Error! ${error.message}`;

  const viewDetails: (launch: Launch) => void = (launch) => {
    setSelectedLaunch(launch);
    navigate('/launch-details');
  }

  return (
    <>
      {data &&
      <>
        <div className='glass table-page-header'>
          <div className='pagination-controls'>
            <span className='pagination-button' onClick={goToFirstPage}>First</span>
            <span className='pagination-button' onClick={goToPreviousPage}>Prev</span>
            <select
              className="interval-selector"
              name="pagination_interval"
              defaultValue={20}
              onChange={handleIntervalChange}
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={40}>40</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
            <span className='pagination-button' onClick={goToNextPage}>Next</span>
            <span className='pagination-button' onClick={goToLastPage}>Last</span>
          </div>

          <hr/>
          <h2 className='table-title'>SpaceX Launches</h2>
        </div>
        <table className='main-table'>
          <thead>
            <tr>
              {headers.filter(header => header !== 'links').map((header) => (
                header === 'static_fire_date_utc' ? 'static_fire_date' : header
              )).map((header) => (
                <th key={header} className='table-header main-table-header'>{unSnakeToTitle(header)}</th>
              ))}
              {headers.includes('links') && linkToggles?.flickr_images &&
                <th className='table-header main-table-header'>Has Images</th>}
              {headers.includes('links') && linkToggles?.video_link &&
                <th className='table-header main-table-header'>Video Link</th>}
              {headers.includes('links') &&
                Object.keys(linkToggles)
                  .filter((link) => (
                    link !== 'flickr_images' &&
                    link !== 'video_link' &&
                    linkToggles[link as keyof LinkToggleSet]
                  )).length > 1 &&
                <th className='table-header main-table-header'>Has Links</th>}
            </tr>
          </thead>
          <tbody>
            {launchList.current.slice(startIndex, endIndex).map((launch: Launch) => (
              <tr
                key={launch.id}
                className='launch-row'
                onClick={()=>viewDetails(launch)}
              >
                {headers.includes('mission_name') &&
                  <td className='glass'>{launch.mission_name}</td>
                }
                {headers.includes('launch_date_local') &&
                  <td
                    className='glass'
                  >
                    {launch.launch_date_local &&
                      new Date(launch.launch_date_local).toLocaleDateString()}
                  </td>
                }
                {headers.includes('static_fire_date_utc') &&
                  <td className='glass'>
                    {launch.static_fire_date_utc &&
                      new Date(launch.static_fire_date_utc).toLocaleDateString()}
                  </td>
                }
                {headers.includes('rocket_name') &&
                  <td className='rocket-name glass'>{launch.rocket?.rocket_name}</td>}
                {headers.includes('details') &&
                  <td className={`glass ${launch.details ? 'details-cell' : 'empty-details'}`} >
                    {launch.details ? launch.details : "No details available"}
                  </td>
                }
                {launch.links &&
                  <td className='glass' >
                    {launch.links.flickr_images && launch.links.flickr_images.length > 0 ? '🚀' : ''}
                  </td>
                }
                {launch.links &&<td className='glass'>{launch.links.video_link ? '🚀' : ''}</td>}
                {launch.links &&
                  <td className='glass' >
                    {Object.keys(launch.links)
                      .filter((link) => (
                        link !== 'flickr_images' && link !== 'video_link'
                      )).length > 1 ? '🚀' : ''}
                  </td>
                }
              </tr>
            ))}
          </tbody>
        </table>
      </>
      }
    </>
  );
}



