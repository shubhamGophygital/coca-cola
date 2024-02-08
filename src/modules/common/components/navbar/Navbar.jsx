import React from "react";
import { useConfig } from "../../../../customHooks/useConfig";
import "./Navbar.css";

const Navbar = ({ hideNavLinks = false }) => {
  let { config } = useConfig();
  return (
    <div className="navbar_container">
      <img src={config?.assets?.navbar} className="logo_left" alt="logo" />
    </div>
  );
};

export default Navbar;
