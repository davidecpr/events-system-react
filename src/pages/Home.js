import React from "react";
import {AppBar, Box, Container, Tab, Tabs, Toolbar, Typography} from "@material-ui/core";
import Category from "./Category";
import Manager from "./Manager";
import {NavLink} from "react-router-dom";
import CustomToolbar from "../components/CustomToolbar";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function LinkTab(props) {
  return (
    <Tab
      component="Link"
      onClick={(event) => {
        event.preventDefault();
      }}
      {...props}
    />
  );
}

class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value: 0
    }
  }


  handleChange = (event, newValue) => {
    this.setState({
      value: newValue
    })
  }

  render() {

    const {value} = this.state

    return (
      <Container maxWidth="lg">
        <AppBar position="static" color={'default'}>
          <CustomToolbar />
          <Tabs
            value={value}
            onChange={this.handleChange}
            aria-label="simple tabs example"
            centered variant={'fullWidth'}
            indicatorColor={'primary'}
          >
            <Tab label="Categories" {...a11yProps(0)} />
            <Tab label="Managers" {...a11yProps(1)} />
            <Tab label="Events" {...a11yProps(2)} />
          </Tabs>
        </AppBar>
        <TabPanel value={value} index={0} classes={{margin: '0!important'}}>
          <Category/>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Manager/>
        </TabPanel>
        <TabPanel value={value} index={2}>
          Events
        </TabPanel>
      </Container>
    )
  }
}

export default Home