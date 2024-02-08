import React from "react";
import "./CustomButton.css";
import PropTypes from "prop-types";

const CustomButton = ({
  onClick,
  style,
  type = "outlined", //outlined,filled
  size = "lg", // sm,lg
  disabled = false,
  className = "",
  id = "",
  value = "",
  children,
}) => {
  return (
    <button
      id={id}
      value={value}
      onClick={onClick}
      style={style}
      className={`customBtn ${type} ${
        disabled ? "disabled" : "enabled"
      } ${size} ${className}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

CustomButton.propTypes = {
  type: PropTypes.oneOf(["outlined", "filled"]),
  size: PropTypes.oneOf(["sm", "lg"]),
};

export default CustomButton;
