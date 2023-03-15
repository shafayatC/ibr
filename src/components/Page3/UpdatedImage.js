import hoody from "./img/hoody.jpg";
import ViewDwnld from "./ViewDwnld";
import "./page3.css";

const UpdatedImage = ({ afterBeforeImage }) => {
  return (
    <>
      <div className="bg-white border  img-bag  border-gray-200 rounded-lg shadow dark:bg-white dark:border-gray-300">
        <a href="#">
          <img
            className="rounded-t-lg "
            src={
              afterBeforeImage.output_urls[0].compressed_raw_image_public_url
            }
            alt=""
          />
          <ViewDwnld imagesBeforeAfter={afterBeforeImage} />
        </a>
        <div className=""></div>
      </div>
    </>
  );
};

export default UpdatedImage;
