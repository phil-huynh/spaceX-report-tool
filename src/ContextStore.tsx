import { useState, useContext, createContext } from 'react'
import { LaunchToggleSet, Report } from '../utils/types';

const ContextStore = createContext(null);


export default function ContextProvider ({ children }) {
  const [reports, setReports] = useState<Report[]>([])
  const [selectedNav, setSelectedNav] = useState<string>('options')

  const [launchToggles, setLaunchToggles] = useState<LaunchToggleSet> ({
    launch_date_local: true,
    mission_name: true,
    details: false,
    static_fire_date_utc: false,
    rocket: false,
    links: false,
  })

  const [linkToggles, setLinkToggles] = useState({
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

  const [lauchSiteToggles, setLaunchSiteToggles] = useState({
    site_name: false,
    site_name_long:false
  })


  const updateReports = (report) => {
    setReports([...reports, report])
  }

  const unSnakeToTitle = (snakeCase: string) => (
    snakeCase.split('_')
    .map((word: string) => `${word[0].toUpperCase()}${word.slice(1)}`)
    .join(' ')
  )

  const store = {
    launchToggles: launchToggles,
    launchSiteToggles: lauchSiteToggles,
    linkToggles: linkToggles,
    reports: reports,
    selectedNav: selectedNav,
    setLaunchToggles: setLaunchToggles,
    setLaunchSiteToggles: setLaunchSiteToggles,
    setLinkToggles: setLinkToggles,
    setReports: setReports,
    setSelectedNav: setSelectedNav,
    unSnakeToTitle: unSnakeToTitle,
    updateReports: updateReports,
  }

  return (
    <ContextStore.Provider value={store}>
      {children}
    </ContextStore.Provider>
  )
}

export const useStore = () => useContext(ContextStore)


