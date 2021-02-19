import React from "react";
import {IconButton, Toolbar, Typography} from "@material-ui/core";
import {AccountCircle} from "@material-ui/icons";

class CustomToolbar extends React.Component {
  render() {
    return (
      <Toolbar style={{display: "flex", justifyContent: "center"}}>
        <Typography variant="h6">
          Events System
        </Typography>
      </Toolbar>
    )
  }
}

export default CustomToolbar