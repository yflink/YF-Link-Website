import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import { withNamespaces } from "react-i18next";
import { colors } from "../../../theme/theme";
import Store from "../../../stores";
import ArrowRightAltOutlinedIcon from "@material-ui/icons/ArrowRightAltOutlined";

const styles = (theme) => ({
  root: {
    display: "flex",
    position: "relative",
    height: "20px",
    alignItems: "center",
  },

  activeTag: {
    position: "absolute",
    top: "-22px",
    backgroundColor: colors.yellowBackground,
    padding: "2px 6px",
    borderRadius: "3px",
  },

  activeTagMobile: {
    backgroundColor: colors.yellowBackground,
    padding: "2px 6px",
    borderRadius: "3px",
    marginLeft: "5px",
  },

  disabledTag: {
    position: "absolute",
    top: "-22px",
    backgroundColor: colors.yellowBackground,
    padding: "2px 6px",
    borderRadius: "3px",
    opacity: 0.5,
  },

  disabledTagMobile: {
    backgroundColor: colors.yellowBackground,
    padding: "2px 6px",
    borderRadius: "3px",
    marginLeft: "5px",
    opacity: 0.5,
  },

  tagText: {
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: "12px",
    lineHeight: "14px",
    display: "flex",
    alignItems: "center",
    letterSpacing: "0.06em",
    color: "#EECB70",
  },

  activeSpan: {
    position: "relative",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
  },

  disabledSpan: {
    opacity: 0.5,
    cursor: "not-allowed",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
  },

  linkText: {
    fontFamily: "'Formular'",
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: "16px",
    lineHeight: "18px",
    letterSpacing: "1px",
    color: colors.white,
    whiteSpace: "nowrap",
  },

  linkTextSelectedMark: {
    position: "absolute",
    bottom: "-8px",
    width: "100%",
    height: "calc(100% + 8px)",
    borderBottom: "solid 3px #ffffff",
  },

  linkTextMarkHover: {
    position: "absolute",
    bottom: "-8px",
    width: "100%",
    height: "calc(100% + 8px)",
    "&:hover": {
      borderBottom: "solid 3px #ffffff",
    },
  },
});

const store = Store.store;

class Link extends Component {
  render() {
    const {
      classes,
      text,
      to,
      disabled,
      tag,
      redirectedTo,
      screenType,
      selected,
      arrow,
    } = this.props;

    if (screenType === "MOBILE") {
      return (
        <div
          className={classes.root}
          onClick={() => {
            if (redirectedTo) {
              store.setStore({ redirect: redirectedTo });
            }
            this.nav(to);
          }}
        >
          <div className={disabled ? classes.disabledSpan : classes.activeSpan}>
            <Typography variant="h4" className={classes.linkText}>
              {text}
            </Typography>
            {arrow && (
              <ArrowRightAltOutlinedIcon style={{ color: colors.white }} />
            )}
          </div>
          {tag && (
            <div
              className={
                disabled ? classes.disabledTagMobile : classes.activeTagMobile
              }
            >
              <Typography variant="h6" className={classes.tagText}>
                {tag}
              </Typography>
            </div>
          )}
        </div>
      );
    } else {
      return (
        <div
          className={classes.root}
          onClick={() => {
            if (redirectedTo) {
              store.setStore({ redirect: redirectedTo });
            }
            if (!disabled) {
              this.nav(to);
            }
          }}
        >
          {tag && (
            <div className={disabled ? classes.disabledTag : classes.activeTag}>
              <Typography variant="h6" className={classes.tagText}>
                {tag}
              </Typography>
            </div>
          )}
          <div className={disabled ? classes.disabledSpan : classes.activeSpan}>
            <Typography variant="h4" className={classes.linkText}>
              {text}
              {selected && <div className={classes.linkTextSelectedMark} />}
              {!disabled && <div className={classes.linkTextMarkHover} />}
              {arrow && (
                <ArrowRightAltOutlinedIcon style={{ color: colors.white }} />
              )}
            </Typography>
          </div>
        </div>
      );
    }
  }

  nav = (screen) => {
    const { externalLink } = this.props;
    if (externalLink) {
      window.open(screen);
    } else {
      this.props.history.push(screen);
    }
  };
}

export default withNamespaces()(withRouter(withStyles(styles)(Link)));
