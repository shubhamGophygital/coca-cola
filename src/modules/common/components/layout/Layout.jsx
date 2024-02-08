import React from "react";
import CustomNotification from "../customNotification/CustomNotification";
import Navbar from "../navbar/Navbar";
import ScrollToTopButton from "../scrollToTopButton/ScrollToTopButton";
import "./Layout.css";

const Layout = ({ hideNavLinks = false, fullWidth = false, children }) => {
  return (
    <div
      className="layout_container"
      id="layout_container"
      onScroll={(e) => {
        if (e.target.scrollTop > 100) {
          document.getElementById("scroll_to_top_btn").classList.remove("hide");
        } else {
          document.getElementById("scroll_to_top_btn").classList.add("hide");
        }
      }}
    >
      <CustomNotification />
      <ScrollToTopButton />
      <div className={`layout_content ${fullWidth && "full_width"}`}>
        <Navbar hideNavLinks={hideNavLinks} />
        {children}
      </div>
    </div>
  );
};

export default Layout;
