import React, { useRef } from "react";
import Left from "../../../../assets/images/common/leftArrow.svg";
import Right from "../../../../assets/images/common/rightArrow.svg";
import "./CustomCarousel.css";
import { Reorder } from "framer-motion";
import ProjectCard from "../../../home/components/projectCard/ProjectCard";

export default function CustomCarousel({ items, setItems = () => {} }) {
  const leftArrowRef = useRef(null);
  const rightArrowRef = useRef(null);
  const recentProjectListContainerRef = useRef(null);

  const SCROLL_PX_BY = 750;

  function scrollProjectList(direction) {
    let left;
    var container = recentProjectListContainerRef.current;
    if (direction === "LEFT") {
      left = container.scrollLeft - SCROLL_PX_BY;
    } else {
      left = container.scrollLeft + SCROLL_PX_BY;
    }
    container.scroll({
      left,
      behavior: "smooth",
    });
  }

  function setArrowVisibility(ref, action) {
    if (action === "HIDE") {
      ref.current.style.opacity = 0;
      ref.current.style.cursor = "default";
    } else {
      ref.current.style.opacity = 1;
      ref.current.style.cursor = "pointer";
    }
  }

  function onScrollProjectList(event) {
    if (event.target.scrollLeft === 0) {
      setArrowVisibility(leftArrowRef, "HIDE");
    } else {
      setArrowVisibility(leftArrowRef, "SHOW");
    }
    if (
      event.target.scrollLeft + event.target.offsetWidth ===
      event.target.scrollWidth
    ) {
      setArrowVisibility(rightArrowRef, "HIDE");
    } else {
      setArrowVisibility(rightArrowRef, "SHOW");
    }
  }

  if (items?.length === 0) {
    return;
  }

  return (
    <div className="custom_carousel_container">
      <img
        src={Left}
        ref={leftArrowRef}
        alt="Left"
        className="arrow"
        style={{ opacity: 0, cursor: "default" }}
        onClick={() => {
          scrollProjectList("LEFT");
        }}
      />
      <Reorder.Group
        axis="x"
        values={items}
        onReorder={setItems}
        className="carousel_list"
        onScroll={onScrollProjectList}
        ref={recentProjectListContainerRef}
      >
        {items.map((item, index) => (
          <Reorder.Item
            key={item?.id || `carousel-${index}`}
            value={item}
            transition={{ duration: 0.8 }}
          >
            <ProjectCard project={item} />
          </Reorder.Item>
        ))}
      </Reorder.Group>
      <img
        ref={rightArrowRef}
        src={Right}
        alt="Right"
        className="arrow"
        onClick={() => {
          scrollProjectList("RIGHT");
        }}
      />
    </div>
  );
}
