import hoody from "./img/hoody.jpg";
import ViewDwnld from "./ViewDwnld";

const UpdatedImage = ({ afterBeforeImage }) => {
  return (
    <>
      <div className="bg-white border border-gray-200 rounded-lg shadow dark:bg-white dark:border-gray-300">
        <a href="#">
          <img
            className="rounded-t-lg"
            src={afterBeforeImage.output_urls[0].compressed_raw_image_public_url}
            alt=""
          />
        </a>
        <div className="p-3">
          <ViewDwnld imagesBeforeAfter={afterBeforeImage} />
        </div>
      </div>
    </>
  );
};

export default UpdatedImage;
