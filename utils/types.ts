export type Launch = {
  launch_date_local: string,
  mission_name: string,
  mission_id: Array<string>
  details?: string,
  id?: string,
  is_tentative?: boolean,
  launch_success?: boolean,
  launch_year?: string,
  upcoming?: boolean,
}

