import { gql } from '@apollo/client'

const GET_LAUNCHES = gql`
  query Launches (
    $mission_name: Boolean!,
    $launch_date_local: Boolean!,
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
    $rocket: Boolean!,
    $rocket_details: Boolean!,
    $active: Boolean!,
    $boosters: Boolean!,
    $company: Boolean!,
    $cost_per_launch: Boolean!,
    $country: Boolean!,
    $description: Boolean!,
    $diameter: Boolean!,
    $engines: Boolean!,
    $first_flight: Boolean!,
    $first_stage: Boolean!,
    $height: Boolean!,
    $landing_legs: Boolean!,
    $mass: Boolean!,
    $name: Boolean!,
    $payload_weights: Boolean!,
    $second_stage: Boolean!,
    $stages: Boolean!,
    $type: Boolean!,
    $rocket_wikipedia: Boolean!,
    $success_rate_pct: Boolean!,

    $details: Boolean!
  ){
    launchesPast {
      id
      mission_name @include(if: $mission_name)
      launch_date_local @include(if: $launch_date_local)
      static_fire_date_utc @include(if: $static_fire_date_utc)
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
      rocket @include(if: $rocket){
        rocket_name
        rocket_type
        rocket @include(if: $rocket_details){
          active @include(if: $active)
          boosters @include(if: $boosters)
          company @include(if: $company)
          cost_per_launch @include(if: $cost_per_launch)
          country @include(if: $country)
          description @include(if: $description)
          diameter @include(if: $diameter){
            feet
            meters
          }
          engines @include(if: $engines){
            engine_loss_max
            layout
            number
            propellant_1
            propellant_2
            thrust_sea_level {
              kN
              lbf
            }
            thrust_to_weight
            thrust_vacuum {
              kN
              lbf
            }
            type
            version
          }
          first_flight @include(if: $first_flight)
          first_stage @include(if: $first_stage) {
            burn_time_sec
            engines
            fuel_amount_tons
            reusable
            thrust_sea_level {
              kN
              lbf
            }
            thrust_vacuum {
              kN
              lbf
            }
          }
          height @include(if: $height) {
            feet
            meters
          }
          id
          landing_legs @include(if: $landing_legs) {
            material
            number
          }
          mass @include(if: $mass) {
            kg
            lb
          }
          name @include(if: $name)
          payload_weights @include(if: $payload_weights) {
            id
            kg
            lb
            name
          }
          second_stage @include(if: $second_stage) {
            burn_time_sec
            engines
            fuel_amount_tons
            payloads {
              composite_fairing {
                diameter {
                  meters
                  feet
                }
                height {
                  feet
                  meters
                }
              }
              option_1
            }
            thrust {
              kN
              lbf
            }
          }
          stages @include(if: $stages)
          type @include(if: $type)
          wikipedia @include(if: $rocket_wikipedia)
          success_rate_pct @include(if: $success_rate_pct)
        }
      }
      details @include(if: $details)
    }
  }
`;
export default GET_LAUNCHES
