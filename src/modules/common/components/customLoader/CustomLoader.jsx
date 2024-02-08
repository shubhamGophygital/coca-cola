import React, { useEffect, useState } from "react";
import getRandomLoadingSentence from "../../helperFunctions/getRandomLoadingSentence";
import CustomButton from "../customButton/CustomButton";
import CustomProgressBar from "../customProgressBar/CustomProgressBar";
import "./CustomLoader.css";
import { useConfig } from "../../../../customHooks/useConfig";

const CustomLoader = ({
  processPercent = -1,
  hideCancelBtn = false,
  appendLoaderText = "Loading now!",
  onCancelClick = () => {},
}) => {
  let { config } = useConfig();
  const [loadingText, setLoadingText] = useState("");

  const getLoadingSentence = async () => {
    try {
      let loadingSenetence = await getRandomLoadingSentence();
      // console.log("loadingSenetence=>", loadingSenetence);
      setLoadingText(`${loadingSenetence} ${appendLoaderText}`);
    } catch (error) {
      setLoadingText(appendLoaderText);
    }
  };

  useEffect(() => {
    getLoadingSentence();
  }, []);

  return (
    <div className="overlayBg loader_container">
      <div className="overlay">
        <div className="left">
          <img src={config?.assets?.Loader} className="logo_left" alt="logo" />
        </div>
        <div className="right">
          {loadingText ? (
            <p>{loadingText}</p>
          ) : (
            <div className="loader_text_skeleton">
              <p></p>
              <p></p>
            </div>
          )}
          {processPercent >= 0 && (
            <>
              {/* <p style={{ margin: "10px 0px" }}>{`${processPercent?.toFixed(
              0
            )} %`}</p> */}
              <CustomProgressBar processPercent={processPercent} />
            </>
          )}
          {!hideCancelBtn && (
            <span
              className="cancel_btn"
              onClick={() => {
                onCancelClick();
                window.location.reload();
              }}
            >
              Cancel
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomLoader;
