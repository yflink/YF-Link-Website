import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { withStyles, Divider } from "@material-ui/core";
import { withNamespaces } from "react-i18next";

const styles = (theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    [theme.breakpoints.up("sm")]: {
      flexDirection: "row",
    },
  },
  groupContainer: {
    display: "flex",
    position: "relative",
    height: "34px",
    alignItems: "center",
    "& > *": {
      marginRight: "12px",
    },
    "&:first-child": {
      marginBottom: "12px",
    },
    [theme.breakpoints.up("sm")]: {
      marginBottom: "12px",
    },
  },
  mediaContainer: {
    width: "30px",
    height: "30px",
    cursor: "pointer",
    borderRadius: "3px",
    "&:hover": {
      opacity: "0.7",
    },
  },
  dividerColor: {
    background: "white",
    "&:hover": {
      opacity: "0.7",
    },
    marginRight: "12px",
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
    height: "34px",
  },
});

class Social extends Component {
  render() {
    const {
      classes,
      twitterUrl,
      githubUrl,
      mediumUrl,
      telegramUrl,
      discordUrl,
      coingeckoUrl,
      coinmarketcapUrl,
      defipulseUrl,
      zerionUrl,
      debankUrl,
    } = this.props;

    return (
      <div container alignItems="center" className={classes.root}>
        <div className={classes.groupContainer}>
          {twitterUrl && (
            <div
              className={classes.mediaContainer}
              onClick={() => {
                this.nav(twitterUrl);
              }}
            >
              <img
                alt="twitter"
                src={require("../../assets/yfl-twitter-logo.svg")}
                width="30px"
                height="30px"
              />
            </div>
          )}
          {githubUrl && (
            <div
              className={classes.mediaContainer}
              onClick={() => {
                this.nav(githubUrl);
              }}
            >
              <img
                alt="github"
                src={require("../../assets/yfl-github-logo.svg")}
                width="30px"
                height="30px"
              />
            </div>
          )}
          {mediumUrl && (
            <div
              className={classes.mediaContainer}
              onClick={() => {
                this.nav(mediumUrl);
              }}
            >
              <img
                alt="medium"
                src={require("../../assets/yfl-medium-logo.svg")}
                width="30px"
                height="30px"
              />
            </div>
          )}
          {telegramUrl && (
            <div
              className={classes.mediaContainer}
              onClick={() => {
                this.nav(telegramUrl);
              }}
            >
              <img
                alt="medium"
                src={require("../../assets/yfl-telegram-logo.svg")}
                width="30px"
                height="30px"
              />
            </div>
          )}
          {discordUrl && (
            <div
              className={classes.mediaContainer}
              onClick={() => {
                this.nav(discordUrl);
              }}
            >
              <img
                alt="medium"
                src={require("../../assets/yfl-discord-logo.svg")}
                width="30px"
                height="34px"
              />
            </div>
          )}
        </div>

        <Divider
          classes={{ root: classes.dividerColor }}
          orientation="vertical"
          flexItem
        />

        <div className={classes.groupContainer}>
          {coingeckoUrl && (
            <div
              className={classes.mediaContainer}
              onClick={() => {
                this.nav(coingeckoUrl);
              }}
            >
              <img
                alt="medium"
                src={require("../../assets/yfl-coingecko-logo.svg")}
                width="30px"
                height="34px"
              />
            </div>
          )}
          {coinmarketcapUrl && (
            <div
              className={classes.mediaContainer}
              onClick={() => {
                this.nav(coinmarketcapUrl);
              }}
            >
              <img
                alt="medium"
                src={require("../../assets/yfl-coinmarketcap-logo.svg")}
                width="30px"
                height="34px"
              />
            </div>
          )}
          {defipulseUrl && (
            <div
              className={classes.mediaContainer}
              onClick={() => {
                this.nav(defipulseUrl);
              }}
            >
              <img
                alt="medium"
                src={require("../../assets/yfl-defipulse-logo.svg")}
                width="30px"
                height="34px"
              />
            </div>
          )}
          {zerionUrl && (
            <div
              className={classes.mediaContainer}
              onClick={() => {
                this.nav(zerionUrl);
              }}
            >
              <img
                alt="medium"
                src={require("../../assets/yfl-zerion-logo.svg")}
                width="30px"
                height="34px"
              />
            </div>
          )}
          {debankUrl && (
            <div
              className={classes.mediaContainer}
              onClick={() => {
                this.nav(debankUrl);
              }}
            >
              <img
                alt="medium"
                src={require("../../assets/yfl-debank-logo.svg")}
                width="30px"
                height="34px"
              />
            </div>
          )}
        </div>
      </div>
    );
  }

  nav = (screen) => {
    window.open(screen, "_blank");
  };
}

export default withNamespaces()(withRouter(withStyles(styles)(Social)));
