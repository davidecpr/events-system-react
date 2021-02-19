import React from "react";
import {Avatar, IconButton, withStyles} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import ManagerLogoStyle from "../styles/ManagerLogoStyle";

class ManagerLogo extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      show: false
    }
  }

  onMouseOver() {
    this.setState({
      show: true
    })
  }

  onMouseLeave() {
    this.setState({
      show: false
    })
  }

  render() {

    const {manager, classes, handleEdit} = this.props

    return (
      <div className={classes.container}>
        <Avatar
          className={classes.avatar}
          variant={'rounded'}
          src={`http://localhost:3001/managers/logo/${manager._id}?${new Date().getTime()}`}
          onMouseEnter={() => this.onMouseOver()}
          onMouseLeave={() => this.onMouseLeave()}/>
        {this.state.show ? <div>
          <div
            className={classes.hoverContainer}
            onMouseEnter={() => this.onMouseOver()}
            onMouseLeave={() => this.onMouseLeave()}>
            <IconButton
              onClick={() => handleEdit(manager)}
              className={classes.editIcon}>
              <EditIcon/>
            </IconButton>
          </div>
        </div> : null}
      </div>
    )
  }
}

export default withStyles(ManagerLogoStyle)(ManagerLogo)