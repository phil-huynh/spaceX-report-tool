import { Launch } from "../../../utils/types";

const Images = ({launch}: {launch: Launch}) => (
  <>
    {launch.links?.flickr_images &&
      launch.links?.flickr_images.length > 0 &&
      <div className="glass images-container details-section">
        {launch.links.flickr_images.map((imageLink: string) => (
          <>
            <img
              className="spaceX-image"
              src={imageLink}
              alt="No image available"
            />
          </>
        ))}
      </div>
    }
  </>
);
export default Images;