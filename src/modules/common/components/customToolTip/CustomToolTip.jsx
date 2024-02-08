import React from "react";
import "./CustomToolTip.css";
import { Fade, Tooltip } from "@mui/material";

const CustomToolTip = ({
  children,
  title,
  followCursor = false,
  placement = "right-start",
  arrow = false,
}) => {
  return (
    <Tooltip
      title={<span className="custom_tooltip">{title}</span>}
      TransitionComponent={Fade}
      TransitionProps={{ timeout: 200 }}
      followCursor={followCursor}
      placement={placement}
      arrow={arrow}
    >
      {children}
    </Tooltip>
  );
};

export default CustomToolTip;
