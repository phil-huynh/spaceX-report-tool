import { Launch } from "../../../utils/types";

const LinksSection = ({launch}: {launch: Launch}) => (
  <div className="links-container">
    <div>
      <div className="table-header glass">Links</div>
    </div>

      <div className="links-list glass">
        {launch.links?.article_link &&
          <div className="link-cell">
            <p className="link-label">Article Link</p>
            <a href={launch.links.article_link} target="_blank" className="link">{launch.links.article_link}</a>
          </div>
        }
        {launch.links?.presskit &&
          <div className="link-cell">
            <p className="link-label">Presskit</p>
            <a href={launch.links.presskit} target="_blank" className="link">{launch.links.presskit}</a>
          </div>
        }
        {launch.links?.reddit_campaign &&
          <div className=" link-cell">
            <p className="link-label">Reddit Campaign</p>
              <a href={launch.links.reddit_campaign} target="_blank" className="link">{launch.links.reddit_campaign}</a>
          </div>
        }
        {launch.links?.reddit_launch &&
          <div className=" link-cell">
            <p className="link-label">Reddit Launch</p>
            <a href={launch.links.reddit_launch} target="_blank" className="link">{launch.links.reddit_launch}</a>
          </div>
        }
        {launch.links?.reddit_media &&
          <div className=" link-cell">
            <p className="link-label">Reddit Media</p>
            <a href={launch.links.reddit_media} target="_blank" className="link">{launch.links.reddit_media}</a>
          </div>
        }
        {launch.links?.reddit_recovery &&
          <div className=" link-cell">
            <p className="link-label">Reddit Recovery</p>
            <a href={launch.links.reddit_recovery} target="_blank" className="link">{launch.links.reddit_recovery}</a>
          </div>
        }
        {launch.links?.wikipedia &&
          <div className=" link-cell">
            <p className="link-label">Wikipedia</p>
            <a href={launch.links.wikipedia} target="_blank" className="link">{launch.links.wikipedia}</a>
          </div>
        }
        {launch.links?.video_link &&
          <div className=" link-cell">
            <p className="link-label">Video Link</p>
            <a href={launch.links.video_link} target="_blank" className="link">{launch.links.video_link}</a>
          </div>
        }
      </div>
  </div>
);
export default LinksSection;