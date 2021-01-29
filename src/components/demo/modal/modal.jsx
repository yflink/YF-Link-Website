import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import { DialogContent, Dialog, Zoom, IconButton } from "@material-ui/core";

import CloseIcon from "@material-ui/icons/Close";

import { colors } from "../../../theme/theme";

import { Player, BigPlayButton } from "video-react";

import "./video-react.css"; // import css

function Transition(props) {
  return <Zoom direction="up" {...props} />;
}

const styles = (theme) => ({
  root: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    background: `linear-gradient(0deg, ${colors.greyBackground}, ${colors.greyBackground})`,
    minWidth: "100%",
    minHeight: "100%",
    overflow: "auto",
    position: "relative",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: "0px",
    "&:first-child": {
      paddingTop: "0px",
    },
  },
  backgroundImageContainer: {
    zIndex: "1",
    position: "absolute",
    left: "0px",
    top: "0px",
    right: "0px",
    bottom: "0px",
    "& > img": {
      width: "100%",
      height: "100%",
      opacity: "0.3",
    },
  },
  closeButton: {
    position: "absolute",
    right: "32px",
    paddingTop: "0px",
  },
  linkContainer: {
    marginTop: "30px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    "& > div": {
      marginTop: "30px",
    },
    flex: 1,
  },
  linkGroupContainer: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
  },
  linkGroupTitle: {
    fontFamily: "Formular",
    fontWeight: "600",
    fontStyle: "normal",
    fontSize: "12px",
    lineHeight: "14.68px",
    letterSpacing: "0.67px",
    color: colors.white,
  },

  logoContainer: {
    position: "absolute",
    left: "32px",
    paddingTop: "0px",
    zIndex: "2",
  },
  buyButtonContainer: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingBottom: "20px",
  },
  buyButton: {
    background: "#3865D3",
    borderRadius: "8px",
    color: "white",
    width: "150px",
    height: "44px",
    fontFamily: "Formular",
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: "18px",
    lineHeight: "22px",
    padding: "14px",
    "&:hover": {
      opacity: "0.8",
      background: "#3865D3",
    },
  },
  linkGroup: {
    display: "grid",
    gridTemplateColumns: "auto auto",
    gridGap: "30px",
    padding: "25px 0px",
    width: "100%",
    "@media (max-width: 350px)": {
      gridTemplateColumns: "auto",
    },
  },
  linkProductsItem: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    cursor: "pointer",
    "&:hover": {
      opacity: "0.8",
    },
  },

  linkProductsItemDisabled: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    opacity: "0.5",
  },

  linkProductsItemImage: {
    width: "25px",
    height: "25px",
    marginRight: "15px",
  },

  linkProductsItemInfo: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },

  linkProductsItemTitle: {
    fontFamily: "Formular",
    fontWeight: "700",
    fontStyle: "normal",
    fontSize: "12px",
    lineHeight: "14.68px",
    letterSpacing: "0.67px",
    color: colors.white,
  },

  linkProductsItemTitleTag: {
    backgroundColor: "#5F5D4B",
    borderRadius: "3px",
    color: "#EECB70",
    padding: "5px",
    fontSize: "8px",
    marginLeft: "10px",
  },
  mainContainer: {
    width: "100%",
    height: "100%",
    zIndex: "3",
  },
});

class AdsModal extends Component {
  nav = (url) => {
    this.props.history.push(url);
  };

  render() {
    const { classes, closeModal, modalOpen } = this.props;

    return (
      <Dialog
        open={modalOpen}
        onClose={closeModal}
        fullWidth={true}
        maxWidth={"lg"}
        TransitionComponent={Transition}
        fullScreen={false}
      >
        <DialogContent classes={{ root: classes.root }}>
          <div className={classes.mainContainer}>
            <IconButton
              aria-label="close"
              className={classes.closeButton}
              onClick={closeModal}
            >
              <CloseIcon
                style={{ color: colors.white, width: "32px", height: "32px" }}
              />
            </IconButton>
            <Player
              playsInline={true}
              poster="/videos/poster.png"
              src="/videos/demo.mp4"
              autoPlay={true}
            >
              <BigPlayButton position="center" />
            </Player>
          </div>
        </DialogContent>
      </Dialog>
    );
  }
}
export default withRouter(withStyles(styles)(AdsModal));
