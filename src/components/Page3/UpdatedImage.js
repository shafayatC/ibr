import hoody from "./img/hoody.jpg";
import ViewDwnld from "./ViewDwnld";
import "./page3.css";

const UpdatedImage = ({ afterBeforeImage }) => {
  return (
    <>
      <div className="bg-white border   border-gray-200 rounded-lg shadow dark:bg-white dark:border-gray-300">
        <div className="">
          <img
            className="rounded-t-lg img-bag-2 "
            src={
              afterBeforeImage.output_urls[0].compressed_raw_image_public_url
            }
            alt=""
          />
          <ViewDwnld imagesBeforeAfter={afterBeforeImage} />
        </div>
        <div className=""></div>
      </div>
    </>
  );
};

export default UpdatedImage;
