import React from "react";
import Arrow from "../../../../assets/images/common/downArrow.svg";
import "./ScrollToTopButton.css";

const ScrollToTopButton = () => {
  const scrollToTop = () => {
    document.getElementById("layout_container")?.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div>
      <img
        src={Arrow}
        id="scroll_to_top_btn"
        className="hide"
        alt="up_arrow"
        onClick={scrollToTop}
      />
    </div>
  );
};

export default ScrollToTopButton;
