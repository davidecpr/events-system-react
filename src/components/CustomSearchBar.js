import React from "react";
import {IconButton, InputBase, Paper, withStyles} from "@material-ui/core";
import {SearchIcon} from "@material-ui/data-grid";
import CustomSearchBarStyle from "../styles/CustomSearchBarStyle";

class CustomSearchBar extends React.Component {

  render() {

    const {classes, onSearchHandle} = this.props

    return(
      <Paper component="form" className={classes.root} elevation={3}>
        <InputBase
          onChange={e => onSearchHandle(e.target.value)}
          className={classes.input}
          placeholder="Search..."
          inputProps={{ 'aria-label': 'Search...' }}
        />
        <IconButton type="button" className={classes.iconButton} aria-label="search" >
          <SearchIcon />
        </IconButton>
      </Paper>
    )
  }
}

export default withStyles(CustomSearchBarStyle, {withTheme: true})(CustomSearchBar)