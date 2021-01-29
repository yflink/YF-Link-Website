import React, { Component } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import { Switch, HashRouter, Route } from "react-router-dom";

import "./i18n";
import interestTheme from "./theme";

import Account from "./components/account";
import Vote from "./components/vote";
import Raffle from "./components/raffle";
import TokenData from "./components/raffle/token";

import Demo from "./components/demo/demo";
import Initial from "./components/initial/initial";

import {
  CONNECTION_CONNECTED,
  CONNECTION_DISCONNECTED,
  CONFIGURE,
  CONFIGURE_RETURNED,
  GET_BALANCES_PERPETUAL,
  GET_BALANCES_PERPETUAL_RETURNED,
} from "./constants";

import { injected } from "./stores/connectors";

import Store from "./stores";
const emitter = Store.emitter;
const dispatcher = Store.dispatcher;
const store = Store.store;

class App extends Component {
  state = {
    account: null,
    // headerValue: null
  };

  // setHeaderValue = (newValue) => {
  //   this.setState({ headerValue: newValue })
  // };

  componentDidMount() {
    emitter.on(CONNECTION_CONNECTED, this.connectionConnected);
    emitter.on(CONNECTION_DISCONNECTED, this.connectionDisconnected);
    emitter.on(CONFIGURE_RETURNED, this.configureReturned);
    emitter.on(GET_BALANCES_PERPETUAL_RETURNED, this.getBalancesReturned);

    injected.isAuthorized().then((isAuthorized) => {
      if (isAuthorized) {
        injected
          .activate()
          .then((a) => {
            store.setStore({
              account: { address: a.account },
              web3context: { library: { provider: a.provider } },
            });
            emitter.emit(CONNECTION_CONNECTED);
          })
          .catch((_e) => {
            // console.log(e)
          });
      }
    });
  }

  componentWillUnmount() {
    emitter.removeListener(CONNECTION_CONNECTED, this.connectionConnected);
    emitter.removeListener(
      CONNECTION_DISCONNECTED,
      this.connectionDisconnected
    );
    emitter.removeListener(CONFIGURE_RETURNED, this.configureReturned);
    emitter.removeListener(
      GET_BALANCES_PERPETUAL_RETURNED,
      this.getBalancesReturned
    );
  }

  getBalancesReturned = () => {
    window.setTimeout(() => {
      dispatcher.dispatch({ type: GET_BALANCES_PERPETUAL, content: {} });
    }, 15000);
  };

  configureReturned = () => {
    dispatcher.dispatch({ type: GET_BALANCES_PERPETUAL, content: {} });
  };

  connectionConnected = () => {
    console.log("connectionConnected");
    this.setState({ account: store.getStore("account") });
    dispatcher.dispatch({ type: CONFIGURE, content: {} });
  };

  connectionDisconnected = () => {
    console.log("connectionDisconnected");
    this.setState({ account: store.getStore("account") });
  };

  render() {
    return (
      <MuiThemeProvider theme={createMuiTheme(interestTheme)}>
        <CssBaseline />
        <HashRouter>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              minHeight: "100vh",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Switch>
              <Route path="/stake">
                <Vote />
              </Route>
              <Route path="/account">
                <Account />
              </Route>
              <Route exact path="/linksmas-2020">
                <Raffle />
              </Route>
              <Route path="/linksmas-2020/:id">
                <TokenData />
              </Route>
              <Route exact path="/demo">
                <Demo />
              </Route>
              <Route path="/">
                <Initial />
              </Route>
            </Switch>
          </div>
        </HashRouter>
      </MuiThemeProvider>
    );
  }
}

export default App;
