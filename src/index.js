import React from 'react';
import ReactDOM from 'react-dom';
import {ThemeProvider} from '@material-ui/core/styles'
import theme from "./theme";
import {Provider} from "mobx-react";
import {categoryStore} from "./store/CategoryStore";
import {managersStore} from "./store/ManagersStore";
import {eventStore} from "./store/EventStore";
import {userStore} from "./store/UserStore";
import App from "./App";

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <Provider
      categoryStore={categoryStore}
      managerStore={managersStore}
      eventStore={eventStore}
      userStore={userStore}>
      <App />
    </Provider>
  </ThemeProvider>,
  document.getElementById('root')
);
