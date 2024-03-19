export type LaunchLinks = {
  article_link?: string;
  flickr_images?: string[];
  mission_patch?: string;
  mission_patch_small?: string;
  presskit?: string;
  reddit_campaign?: string;
  reddit_launch?: string;
  reddit_media?: string;
  reddit_recovery?: string;
  video_link?: string;
  wikipedia?: string;
}

export type LaunchSite = {
  site_id?: string;
  site_name?: string;
  site_name_long?: string;
}


export type ShipLocation ={
  latitude?: number;
  longitude?: number;
}

export type ShipMission = {
  flight?: string;
  name?: string;
}

export type Ship = {
  abs?: number;
  active?: boolean;
  attempted_landings?: number;
  class?: number;
  course_deg?: number;
  home_port?: string;
  id?: string;
  image?: string;
  imo?: number;
  missions?: ShipMission[];
  mmsi?: number;
  model?: string;
  name?: string;
  position?: ShipLocation;
  roles?: string[];
  speed_kn?: number;
  status?: string;
  successful_landings?: number;
  type?: string;
  url?: string;
  weight_kg?: number;
  weight_lbs?: number;
  year_built?: number;
}

export type LaunchRocketFairings = {
  recovered?: boolean;
  recovery_attempt?: boolean;
  reused?: boolean;
  ship?: string;
}

export type CapsuleMission = {
  flight?: number;
  name?: string;
}

export type Core = {
  asds_attempts?: number;
  asds_landings?: number;
  block?: number;
  id?: string;
  missions?: CapsuleMission[];
  original_launch?: object;
  reuse_count?: number;
  rtls_attempts?: number;
  rtls_landings?: number;
  status?: string;
  water_landing?: boolean;
}

export type LaunchRocketFirstStageCore = {
  block?: number;
  core?: Core;
  flight?: number;
  gridfins?: boolean;
  land_success?: boolean;
  landing_intent?: boolean;
  landing_type?: string;
  landing_vehicle?:string;
  legs?: boolean;
  reused?: boolean;
}

export type LaunchRocketFirstStage = {
  cores?: LaunchRocketFirstStageCore[];
}

export type PayloadOrbitParams = {
  apoapsis_km?: number;
  arg_of_pericenter?: number;
  eccentricity?: number;
  epoch?: object;
  inclination_deg?: number;
  lifespan_years?: number;
  longitude?: number;
  mean_anomaly?: number;
  mean_motion?: number;
  periapsis_km?: number;
  period_min?: number;
  raan?: number;
  reference_system?: string;
  regime?: string;
  semi_major_axis_km?: number;
}

export type PayLoad = {
  customers?: string[];
  id?: string;
  manufacturer?: string;
  nationality?: string;
  norad_id?: number[];
  orbit?: string;
  orbit_params?: PayloadOrbitParams;
  payload_mass_kg?: number;
  payload_mass_lbs?: number;
  payload_type?: string;
  reused?: boolean;
}

export type LaunchRocketSecondStage ={
  block?: number;
  payloads?: PayLoad[];
}

export type Distance = {
  feet?: number;
  meters?: number;
}

export type Force = {
  kN?: number;
  lbf?: number;
}

export type RocketEngines = {
  engine_loss_max?: string;
  layout?: string;
  number?: number;
  propellant_1?: string;
  propellant_2?: string;
  thrust_sea_level?: Force;
  thrust_to_weight?: number;
  thrust_vacuum?: Force;
  type?: string;
  version?: string;
}

export type RocketFirstStage = {
  burn_time_sec?: number;
  engines?: number;
  fuel_amount_tons?: number;
  reusable?: boolean;
  thrust_sea_level?: Force;
  thrust_vacuum?: Force;
}

export type RocketLandingLegs = {
  material?: string;
  number?: number;
}

export type Mass = {
  kg?: number;
  lb?: number;
}

export type RocketPayloadWeight = {
  id?: string;
  kg?: number;
  lb?: number;
  name?: string;
}

export type RocketSecondStagePayloadCompositeFairing = {
  diameter?: number;
  height?: number;
}

export type RocketSecondStagePayloads = {
  composite_fairing?: RocketSecondStagePayloadCompositeFairing;
  option_1?: string;
}

export type RocketSecondStage = {
  burn_time_sec?: number;
  engines?: number;
  fuel_amount_tons?: number;
  payloads?: RocketSecondStagePayloads;
  thrust?: Force;
}

export type Rocket = {
  active?: boolean;
  boosters?: number;
  company?: string;
  cost_per_launch?: number;
  country?: string;
  description?: string;
  diameter?: Distance;
  engines?: RocketEngines;
  first_flight?: object;
  first_stage?: RocketFirstStage;
  height?: Distance;
  id?: string;
  landing_legs?: RocketLandingLegs;
  mass?: Mass;
  name?: string;
  payload_weights?: RocketPayloadWeight[];
  second_stage?: RocketSecondStage;
  stages?: number;
  success_rate_pct?: number;
  type?:string;
  wikipedia?: string;
}

export type LaunchRocket = {
  fairings?: LaunchRocketFairings;
  first_stage?: LaunchRocketFirstStage;
  rocket?: Rocket;
  rocket_name?: string;
  rocket_type?: string;
  second_stage?: LaunchRocketSecondStage;
}

export type Launch = {
  details?: string;
  id?: string;
  is_tentative?: boolean;
  launch_date_local?: object | string;
  launch_site?: LaunchSite;
  launch_success?: boolean;
  links?: LaunchLinks;
  mission_id?: string[];
  mission_name?: string;
  rocket?: LaunchRocket;
  ships?: Ship[];
  static_fire_date_utc?: object | string;
  tentative_max_precision?: string;
  upcoming?: boolean;
}


export type Report = {
  title: string;
  author: string;
  report: string;
}



export type LaunchToggleSet = {
  launch_date_local: boolean;
  mission_name: boolean;
  details: boolean;
  static_fire_date_utc: boolean;
  rocket: boolean;
  links: boolean;
}



export type LinkToggleSet = {
  article_link: boolean;
  flickr_images: boolean;
  presskit: boolean;
  reddit_campaign: boolean;
  reddit_launch: boolean;
  reddit_media: boolean;
  reddit_recovery: boolean;
  video_link: boolean;
  wikipedia: boolean;
}

export type LaunchSiteToggles = {
  site_name?: boolean;
  site_name_long?: boolean;
}

export type ShipTOggles = {
  abs: boolean;
  active: boolean;
  class: boolean;
  home_port: boolean;
  id: boolean;
  image: boolean;
  imo: boolean;
  mmsi: boolean;
  model: boolean;
  name: boolean;
  roles: boolean;
  type: boolean;
  year_built: boolean;
}


export type RocketToggles = {
  rocket?: Rocket;
  rocket_name?: string;
  rocket_type?: string;
}

// recovered?: boolean;
// recovery_attempt?: boolean;
// reused?: boolean;
