import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import { DialogContent, Dialog, Slide, IconButton } from "@material-ui/core";

import CloseIcon from "@material-ui/icons/Close";
import { colors } from "../../../theme";
import HeaderLink from "../link/link";

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

const styles = (theme) => ({
  root: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    background: `linear-gradient(0deg, ${colors.greyBackground}, ${colors.greyBackground})`,
    minWidth: "100%",
    minHeight: "100%",
    overflow: "hidden",
    position: "relative",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: "0px",
  },
  closeButton: {
    position: "absolute",
    right: "16px",
    paddingTop: "0px",
  },
  linkContainer: {
    marginTop: "20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    "& > div": {
      marginTop: "30px",
    },
  },
});

class RedirectModal extends Component {
  render() {
    const { classes, closeModal, modalOpen, account } = this.props;

    const fullScreen = window.innerWidth < 768;

    return (
      <Dialog
        open={modalOpen}
        onClose={closeModal}
        fullWidth={true}
        maxWidth={"sm"}
        TransitionComponent={Transition}
        fullScreen={fullScreen}
      >
        <DialogContent classes={{ root: classes.root }}>
          <IconButton
            aria-label="close"
            className={classes.closeButton}
            onClick={closeModal}
          >
            <CloseIcon
              style={{ color: colors.white, width: "32px", height: "32px" }}
            />
          </IconButton>
          <div className={classes.linkContainer}>
            <HeaderLink
              screenType="MOBILE"
              text="BUY YFL"
              to={
                "http://linkswap.app/#/swap?outputCurrency=0x28cb7e841ee97947a86b06fa4090c8451f64c0be"
              }
              externalLink={true}
            />
            <HeaderLink
              screenType="MOBILE"
              text="LINKSMAS"
              to={"/linksmas-2020"}
              selected={true}
            />
            <HeaderLink
              screenType="MOBILE"
              text="LINKSWAP"
              to={"https://linkswap.app/"}
              externalLink={true}
            />
            <HeaderLink
              screenType="MOBILE"
              text="LP REWARDS"
              externalLink={true}
              to={"https://rewards.linkswap.app"}
            />
            <HeaderLink
              screenType="MOBILE"
              text="STAKE & VOTE"
              to={account && account.address ? "/stake" : "/account"}
              redirectedTo={"/stake"}
            />
            <HeaderLink
              screenType="MOBILE"
              text="WAFFLEHOUSE"
              to="/"
              disabled
              tag="SOON"
            />
            <HeaderLink
              screenType="MOBILE"
              text="LINKPAD"
              to="/"
              disabled
              tag="SOON"
            />
            <HeaderLink
              screenType="MOBILE"
              text="LINKCHECK"
              to="/"
              disabled
              tag="SOON"
            />
            <HeaderLink
              screenType="MOBILE"
              text="HELP CENTER"
              to="https://learn.yflink.io/"
              externalLink={true}
              arrow={true}
            />
            <HeaderLink
              screenType="MOBILE"
              text="LP REWARDS APY"
              to="https://apycalc.yflink.io/"
              externalLink={true}
              arrow={true}
            />
            <HeaderLink
              screenType="MOBILE"
              text="STAKE & VOTE APY"
              to="https://calculator.yflink.io/"
              externalLink={true}
              arrow={true}
            />
            <HeaderLink
              screenType="MOBILE"
              text="ANALYTICS"
              to="https://info.linkswap.app/"
              externalLink={true}
              arrow={true}
            />
          </div>
        </DialogContent>
      </Dialog>
    );
  }
}
export default withRouter(withStyles(styles)(RedirectModal));
