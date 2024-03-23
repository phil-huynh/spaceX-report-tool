import { Launch } from "../../../utils/types";

const LinksSection = ({launch}: {launch: Launch}) => (
  <table className="links-container">
    <thead>
      <th className="table-header glass">Links</th>
    </thead>
    <tbody>
      {/* <div className=" glass details-section"> */}
        {launch.links?.article_link &&
          <tr className="glass link-cell">
            <p className="link-label">Article Link</p>
            <a href={launch.links.article_link} target="_blank" className="link">{launch.links.article_link}</a>
          </tr>
        }
        {launch.links?.presskit &&
          <tr className="glass">
            <p className="link-label">Presskit</p>
            <a href={launch.links.presskit} target="_blank" className="link">{launch.links.presskit}</a>
          </tr>
        }
        {launch.links?.reddit_campaign &&
          <tr className="glass link-cell">
            <p className="link-label">Reddit Campaign</p>
              <a href={launch.links.reddit_campaign} target="_blank" className="link">{launch.links.reddit_campaign}</a>
          </tr>
        }
        {launch.links?.reddit_launch &&
          <tr className="glass link-cell">
            <p className="link-label">Reddit Launch</p>
            <a href={launch.links.reddit_launch} target="_blank" className="link">{launch.links.reddit_launch}</a>
          </tr>
        }
        {launch.links?.reddit_media &&
          <tr className="glass link-cell">
            <p className="link-label">Reddit Media</p>
            <a href={launch.links.reddit_media} target="_blank" className="link">{launch.links.reddit_media}</a>
          </tr>
        }
        {launch.links?.reddit_recovery &&
          <tr className="glass link-cell">
            <p className="link-label">Reddit Recovery</p>
            <a href={launch.links.reddit_recovery} target="_blank" className="link">{launch.links.reddit_recovery}</a>
          </tr>
        }
        {launch.links?.wikipedia &&
          <tr className="glass link-cell">
            <p className="link-label">Wikipedia</p>
            <a href={launch.links.wikipedia} target="_blank" className="link">{launch.links.wikipedia}</a>
          </tr>
        }
        {launch.links?.video_link &&
          <tr className="glass link-cell">
            <p className="link-label">Video Link</p>
            <a href={launch.links.video_link} target="_blank" className="link">{launch.links.video_link}</a>
          </tr>
        }
      {/* </div> */}

    </tbody>
  </table>
);
export default LinksSection;