import {
  useState,
  useContext,
  useRef,
  createContext,
  Dispatch,
  SetStateAction,
  ReactNode
} from 'react'

import {
  LaunchToggleSet,
  LinkToggleSet,
  RocketToggleSet,
  Report,
  ContextStoreType,
  LaunchList,
  Launch
} from '../utils/types';

import useLocalStorage from './hooks/useLocalStorage';

type ContextStoreProviderProps = {
  children: ReactNode
}

const ContextStore = createContext<Partial<ContextStoreType>>({});

export default function ContextProvider ({ children }: ContextStoreProviderProps) {


  const launchList = useRef<LaunchList>()
  const [reports, setReports] = useLocalStorage ('reports', '')
  const [selectedNav, setSelectedNav] = useState<string> ('options')
  const [startIndex, setStartIndex] = useState<number>(0)
  const [endIndex, setEndIndex] = useState<number>(20)
  const [interval, setInterval] = useState<number>(20)
  const [selectedLaunch, setSelectedLaunch] = useState<Launch>({})
  const [stash, setStash] = useState<Launch[]>([])
  const [selectedStashItem, setSelectedStashItem] = useState<Launch>({})
  const [finalReportStash, setFinalReportStash] = useState<Launch[]>([])
  const [selectedReport, setSelectedReport] = useState<Report>({})


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


  const updateReports: (report: Report) => void = (report: Report) => {
    setReports([...reports, report])
  }

  const unSnakeToTitle: (snakeCase: string) => string = (snakeCase: string) => (
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

  const bulkSelect: (toggleSet: string, type: string) => void = (toggleSet, type) => {
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

  const updateLaunchToggles: (key: string) => void = (key) => {
    setLaunchToggles({...launchToggles, [key]: !launchToggles[key]})
    if (!launchToggles.links) {
      updateToggles(linkToggles, 'clear', setLinkToggles)
    }
  }

  // const [pageNumbers, setPageNumbers] = useState<number[]>([])

  const handleIntervalChange = (e: Event): void => {
    const target: string | null = e.target.value
    if(target) {
      const value = Number(target)
      setInterval(value)
      setEndIndex(value)
      setStartIndex(0)
    }
  }


  const goToPreviousPage: () => void = () => {
    if (startIndex >= 20) {
      setStartIndex(startIndex - interval)
      setEndIndex(endIndex - interval)
    }
    if (launchList.current &&endIndex >= launchList.current.length) {
      setEndIndex(startIndex)
      setStartIndex(startIndex - interval)
    }
  }

  const goToNextPage: () => void = () => {
    if (launchList.current && endIndex < launchList.current.length)
      setStartIndex(startIndex + interval)
      setEndIndex(endIndex + interval)
  }

  const goToFirstPage: () => void = () => {
    setStartIndex(0)
    setEndIndex(interval)
  }

  const goToLastPage: () => void = () => {
    if(launchList.current)  {
      setStartIndex(Math.floor(launchList.current.length/interval) * interval)
      setEndIndex(launchList.current.length)
    }
  }

  const goToNewReport: ()=> void = () => {
    if (stash.length > 0 && Object.keys(selectedStashItem).length === 0) {
      setSelectedStashItem(stash[0])
    }
    setSelectedNav('newReport')
  }



  const store: ContextStoreType = {
    launchList: launchList,
    launchToggles: launchToggles,
    linkToggles: linkToggles,
    reports: reports,
    finalReportStash: finalReportStash,
    rocketToggles: rocketToggles,
    selectedNav: selectedNav,
    startIndex: startIndex,
    endIndex: endIndex,
    interval: interval,
    selectedLaunch: selectedLaunch,
    selectedReport: selectedReport,
    selectedStashItem: selectedStashItem,
    stash: stash,
    bulkSelect: bulkSelect,
    goToNextPage: goToNextPage,
    goToPreviousPage: goToPreviousPage,
    goToFirstPage: goToFirstPage,
    goToLastPage: goToLastPage,
    gotToNewReport: goToNewReport,
    handleIntervalChange: handleIntervalChange,
    setFinalReportStash: setFinalReportStash,
    setLaunchToggles: setLaunchToggles,
    setLinkToggles: setLinkToggles,
    setReports: setReports,
    setRocketToggles: setRocketToggles,
    setSelectedLaunch: setSelectedLaunch,
    setSelectedNav: setSelectedNav,
    setSelectedReport: setSelectedReport,
    setSelectedStashItem: setSelectedStashItem,
    setStash: setStash,
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


