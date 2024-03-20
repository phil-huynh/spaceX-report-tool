import { useState, useContext, useRef, createContext, Dispatch, SetStateAction } from 'react'
import { LaunchToggleSet, LinkToggleSet, RocketToggleSet, Report, Launch } from '../utils/types';
import { set } from 'react-hook-form';

const ContextStore = createContext(null);


export default function ContextProvider ({ children }) {
  const [reports, setReports] = useState<Report[]> ([])
  const [selectedNav, setSelectedNav] = useState<string> ('options')

  const launchList = useRef()


  const [launchToggles, setLaunchToggles] = useState<LaunchToggleSet> ({
    launch_date_local: true,
    mission_name: true,
    details: false,
    static_fire_date_utc: false,
    rocket: false,
    links: false,
  })

  const [linkToggles, setLinkToggles] = useState<LinkToggleSet> ({
    article_link: false,
    flickr_images: false,
    presskit: false,
    reddit_campaign: false,
    reddit_launch: false,
    reddit_media: false,
    reddit_recovery: false,
    video_link: false,
    wikipedia: false,
  })

  const [rocketToggles, setRocketToggles] = useState<RocketToggleSet>({
    active: false,
    boosters: false,
    company: false,
    cost_per_launch: false,
    country: false,
    description: false,
    diameter: false,
    engines: false,
    first_flight: false,
    first_stage: false,
    height: false,
    landing_legs: false,
    mass: false,
    name: false,
    payload_weights: false,
    second_stage: false,
    stages: false,
    type: false,
    wikipedia: false,
    success_rate_pct: false,
  })

  const updateReports = (report: Report) => {
    setReports([...reports, report])
  }

  const unSnakeToTitle = (snakeCase: string) => (
    snakeCase.split('_')
      .map((word: string) => (
        `${word[0].toUpperCase()}${word.slice(1)}`)
      ).join(' ')
  )

  const updateToggles = (
    toggles: LaunchToggleSet | LinkToggleSet | RocketToggleSet,
    type: string,
    callback:
      Dispatch<SetStateAction<LaunchToggleSet>> |
      Dispatch<SetStateAction<LinkToggleSet>> |
      Dispatch<SetStateAction<RocketToggleSet>>
  ) => {
    const cache: LaunchToggleSet | LinkToggleSet | RocketToggleSet= {...toggles}
    for (const toggle in cache) {
      cache[toggle] = type === 'clear' ? false : true
    }
    callback(cache)
  }

  const bulkSelect = (toggleSet: string, type="") => {
    if (toggleSet === 'all') {
      updateToggles(launchToggles, type, setLaunchToggles)
      updateToggles(linkToggles, type, setLinkToggles)
      updateToggles(rocketToggles, type, setRocketToggles)
    }
    if (toggleSet === 'launch') {
      updateToggles(launchToggles, type, setLaunchToggles)
      if (type==='clear') {
        updateToggles(linkToggles, type, setLinkToggles)
        updateToggles(rocketToggles, type, setRocketToggles)
      }
    }
    if (toggleSet === 'links') {
      updateToggles(linkToggles, type, setLinkToggles)
    }
    if (toggleSet === 'rocket') {
      updateToggles(rocketToggles, type, setRocketToggles)
    }
  }

  const updateLaunchToggles = (key) => {
    setLaunchToggles({...launchToggles, [key]: !launchToggles[key]})
    if (!launchToggles.links) {
      updateToggles(linkToggles, 'clear', setLinkToggles)
    }
  }

  const store = {
    launchList: launchList,
    launchToggles: launchToggles,
    linkToggles: linkToggles,
    reports: reports,
    rocketToggles: rocketToggles,
    selectedNav: selectedNav,
    bulkSelect: bulkSelect,
    setLaunchToggles: setLaunchToggles,
    setLinkToggles: setLinkToggles,
    setReports: setReports,
    setRocketToggles: setRocketToggles,
    setSelectedNav: setSelectedNav,
    unSnakeToTitle: unSnakeToTitle,
    updateLaunchToggles: updateLaunchToggles,
    updateReports: updateReports,
  }

  return (
    <ContextStore.Provider value={store}>
      {children}
    </ContextStore.Provider>
  )
}

export const useStore = () => useContext(ContextStore)


