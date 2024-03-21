import { useQuery } from '@apollo/client';
import { useStore } from '../ContextStore.tsx';
import GET_LAUNCHES from '../queries/launchQuery.ts';
import { LinkToggleSet, RocketToggleSet } from '../../utils/types.ts';

export default function useLaunchesQuery() {

  const { launchToggles, linkToggles, rocketToggles, launchList } = useStore()

  if (!launchToggles || !linkToggles || !rocketToggles) {
    throw new Error('toggle set cannot be undefined')
  }
  if (!launchList) {
    throw new Error('launchList cannot be undefined')
  }

  const canGetLinks = (
    launchToggles.links &&
      Object.keys(linkToggles)
        .slice(1)
        .filter((key: string) => linkToggles[key as keyof LinkToggleSet])
        .length > 0
  )

  const canGetRocketDetails = (
    launchToggles.rocket &&
      Object.keys(rocketToggles)
        .slice(1)
        .filter((key: string) => rocketToggles[key as keyof RocketToggleSet])
        .length > 0
  )

  const { loading, error, data } = useQuery(GET_LAUNCHES, {
    variables: {
      mission_name: launchToggles.mission_name,
      launch_date_local: launchToggles.launch_date_local,
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
      rocket: launchToggles.rocket,
      rocket_details: canGetRocketDetails,
      active: rocketToggles.active,
      boosters: rocketToggles.boosters,
      company: rocketToggles.company,
      cost_per_launch: rocketToggles.cost_per_launch,
      country: rocketToggles.country,
      description: rocketToggles.description,
      diameter: rocketToggles.diameter,
      engines: rocketToggles.engines,
      first_flight: rocketToggles.first_flight,
      first_stage: rocketToggles.first_stage,
      height: rocketToggles.height,
      landing_legs: rocketToggles.landing_legs,
      mass: rocketToggles.mass,
      name: rocketToggles.name,
      payload_weights: rocketToggles.payload_weights,
      second_stage: rocketToggles.second_stage,
      stages: rocketToggles.stages,
      type: rocketToggles.type,
      rocket_wikipedia: rocketToggles.wikipedia,
      success_rate_pct: rocketToggles.success_rate_pct,
      details: launchToggles.details,
    }
  })

  let headers: string[] | null = null

  if (data) {
    console.log(data.launchesPast)
    launchList.current = data.launchesPast.slice().reverse()
    headers = Object.keys(data?.launchesPast[0])
      .slice(1)
      .filter(header => (
        !['id', 'mission_id'].includes(header)
      ))
    if (headers.includes('rocket')) {
      headers.splice( headers.indexOf('rocket'), 1, 'rocket_name')
    }
  }
  if (!headers) {
    headers = []
  }
  return {loading, error, data, headers}
}
