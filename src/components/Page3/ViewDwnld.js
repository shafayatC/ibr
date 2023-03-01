import React, { useEffect, useState } from "react";
import hoody from "./img/hoody.jpg";
import { BiShow, BiDownload } from "react-icons/bi";
import ReactCompareImage from "react-compare-image";
import "./page3.css";

const ViewDwnld = ({ imagesBeforeAfter }) => {
  const [isImageVisible, setImageVisibility] = useState(false);
  const before = imagesBeforeAfter.result[0].compressed_public_url;
  const after = imagesBeforeAfter.result[0].output_public_url;
  const isProcess = imagesBeforeAfter.result[0].is_ai_processed;

  const handleViewClick = () => {
    setImageVisibility(true);
    document.body.style.overflow = "hidden";
  };

  const handleCloseClick = () => {
    setImageVisibility(false);
    document.body.style.overflow = "unset";
  };

  useEffect(() => {}, [imagesBeforeAfter]);

  return (
    <div>
      {isImageVisible && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 9,
            backgroundColor: "rgba(0,0,0,0.9)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ReactCompareImage
            hover={true}
            vertical={false}
            leftImage={before}
            rightImage={after}
          />

          <button
            style={{
              position: "absolute",
              top: 20,
              right: 20,
              backgroundColor: "white",
              border: "none",
              padding: "10px 15px",
            }}
            onClick={handleCloseClick}
          >
            Close
          </button>
        </div>
      )}
      {isProcess && (
        <div className="grid sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-5">
          <div className="col-span-3 ...">
            <BiShow
              className="h-8 w-8 opacity-40"
              onClick={handleViewClick}
              style={{ cursor: "pointer" }}
            ></BiShow>
          </div>
          <div className="...">
            <a href={after} download>
              <BiDownload className="h-7 w-7 opacity-40"></BiDownload>
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewDwnld;
