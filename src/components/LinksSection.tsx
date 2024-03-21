const LinksSection = ({launch}) => (
  <div className="links-container glass details-section">
    {launch.links?.article_link &&
      <>
        <p>Article Link</p>
        <a href={launch.links.article_link} target="_blank">{launch.links.article_link}</a>
      </>
    }
    {launch.links?.presskit &&
      <>
        <p>Presskit</p>
        <a href={launch.links.presskit} target="_blank">{launch.links.presskit}</a>
      </>
    }
    {launch.links?.reddit_campaign &&
      <>
        <p>Reddit Campaign</p>
          <a href={launch.links.reddit_campaign} target="_blank">{launch.links.reddit_campaign}</a>
      </>
    }
    {launch.links?.reddit_launch &&
      <>
        <p>Reddit Launch</p>
        <a href={launch.links.reddit_launch} target="_blank">{launch.links.reddit_launch}</a>
      </>
    }
    {launch.links?.reddit_media &&
      <>
        <p>Reddit Media</p>
        <a href={launch.links.reddit_media} target="_blank">{launch.links.reddit_media}</a>
      </>
    }
    {launch.links?.reddit_recovery &&
      <>
        <p>Reddit Recovery</p>
        <a href={launch.links.reddit_recovery} target="_blank">{launch.links.reddit_recovery}</a>
      </>
    }
    {launch.links?.wikipedia &&
      <>
        <p>Wikipedia</p>
        <a href={launch.links.wikipedia} target="_blank">{launch.links.wikipedia}</a>
      </>
    }
    {launch.links?.video_link &&
      <>
        <p>Video Link</p>
        <a href={launch.links.video_link} target="_blank">{launch.links.video_link}</a>
      </>
    }
  </div>
);
export default LinksSection