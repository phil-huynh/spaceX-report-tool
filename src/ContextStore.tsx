import { useState, useContext, useRef, createContext, ReactNode, ChangeEvent } from 'react';
import { LaunchToggleSet, LinkToggleSet, RocketToggleSet, Report, ContextStoreType, Launch} from '../utils/types';
import useLocalStorage from './hooks/useLocalStorage';

const emptyReport = {
  date: '',
  title: '',
  author: '',
  report: '',
  stash: []
};

type ContextStoreProviderProps = {
  children: ReactNode
};

const ContextStore = createContext<Partial<ContextStoreType>>({});

export default function ContextProvider ({ children }: ContextStoreProviderProps) {

  const launchList = useRef<[]>([]);
  const [reports, setReports] = useLocalStorage ('reports', '');
  const [selectedNav, setSelectedNav] = useState<string> ('options');
  const [startIndex, setStartIndex] = useState<number>(0);
  const [endIndex, setEndIndex] = useState<number>(20);
  const [interval, setInterval] = useState<number>(20);
  const [selectedLaunch, setSelectedLaunch] = useState<Launch>({});
  const [stash, setStash] = useState<Launch[]>([]);
  const [selectedStashItem, setSelectedStashItem] = useState<Launch>({});
  const [finalReportStash, setFinalReportStash] = useState<Launch[]>([]);
  const [selectedReport, setSelectedReport] = useState<Report>(emptyReport);


  const [launchToggles, setLaunchToggles] = useState<LaunchToggleSet> ({
    launch_date_local: true,
    mission_name: true,
    details: false,
    static_fire_date_utc: false,
    rocket: false,
    links: false,
  });


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
  });


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
  });


  const updateReports: (report: Report) => void = (report: Report) => {
    setReports([...reports, report]);
  };


  const goToNewReport: ()=> void = () => {
    if (stash.length > 0 && Object.keys(selectedStashItem).length === 0) {
      setSelectedStashItem(stash[0]);
    }
    setSelectedNav('newReport');
  };


  const unSnakeToTitle: (snakeCase: string) => string = (snakeCase: string) => (
    snakeCase.split('_')
      .map((word: string) => (
        `${word[0].toUpperCase()}${word.slice(1)}`)
      ).join(' ')
  );


  const goToPreviousPage: () => void = () => {
    if (startIndex >= 20) {
      setStartIndex(startIndex - interval);
      setEndIndex(endIndex - interval);
    }
    if (launchList.current &&endIndex >= launchList.current.length) {
      setEndIndex(startIndex);
      setStartIndex(startIndex - interval);
    }
  };


  const goToNextPage: () => void = () => {
    const launch = launchList.current;
    if (launch && endIndex < launch.length)
      setStartIndex(startIndex + interval);
      setEndIndex(endIndex + interval);
  };


  const goToFirstPage: () => void = () => {
    setStartIndex(0);
    setEndIndex(interval);
  };


  const goToLastPage: () => void = () => {
    if(launchList.current)  {
      setStartIndex(Math.floor(launchList.current.length/interval) * interval);
      setEndIndex(launchList.current.length);
    }
  }


  const handleIntervalChange = (e: ChangeEvent<HTMLSelectElement> ): void => {
    const target: string | null = e.currentTarget.value;
    if(target) {
      const value = Number(target)
      setInterval(value);
      setEndIndex(value);
      setStartIndex(0);
    }
  };


  const handleLaunchToggles: (key: string) => void = (key) => {
    setLaunchToggles({...launchToggles, [key]: !launchToggles[key as keyof LaunchToggleSet]})
    if (!launchToggles.links) {
      bulkLinkToggles('clear');
    }
  }


  const bulkLaunchToggles:(type: string) => void = (type) => {
    const cache: LaunchToggleSet = {...launchToggles}
    for (const toggle in cache) {
      cache[toggle as keyof LaunchToggleSet] = type === 'clear' ? false : true;
    }
    setLaunchToggles(cache);
  }


  const bulkLinkToggles:(type: string) => void = (type) => {
    const cache: LinkToggleSet = {...linkToggles};
    for (const toggle in cache) {
      cache[toggle as keyof LinkToggleSet] = type === 'clear' ? false : true;
    }
    setLinkToggles(cache);
  }


  const bulkRocketToggles:(type: string) => void = (type) => {
    const cache: RocketToggleSet = {...rocketToggles};
    for (const toggle in cache) {
      cache[toggle as keyof RocketToggleSet] = type === 'clear' ? false : true;
    }
    setRocketToggles(cache);
  }


  const bulkSelect: (toggleSet: string, type: string) => void = (toggleSet, type) => {
    if (toggleSet === 'all') {
      bulkLaunchToggles(type);
      bulkLinkToggles(type);
      bulkRocketToggles(type);
    }
    if (toggleSet === 'launch') {
      bulkLaunchToggles(type);
      if (type==='clear') {
        bulkLinkToggles(type);
        bulkRocketToggles(type);
      }
    }
    if (toggleSet === 'links') {
      bulkLinkToggles(type);
    }
    if (toggleSet === 'rocket') {
      bulkRocketToggles(type);
    }
  };


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
    handleLaunchToggles: handleLaunchToggles,
    updateReports: updateReports,
  };

  return (
    <ContextStore.Provider value={store}>
      {children}
    </ContextStore.Provider>
  );
}

export const useStore = () => useContext(ContextStore);


