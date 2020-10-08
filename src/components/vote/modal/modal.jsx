import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import {
  DialogContent,
  Dialog,
  IconButton,
  Typography,
  InputBase,
  Button,
  Zoom,
} from "@material-ui/core";

import CloseIcon from "@material-ui/icons/Close";
import ArrowRightAltOutlinedIcon from "@material-ui/icons/ArrowRightAltOutlined";
import { colors } from "../../../theme";
import Store from "../../../stores";
import { VOTE_FOR, VOTE_AGAINST } from "../../../constants";

const dispatcher = Store.dispatcher;

function Transition(props) {
  return <Zoom {...props} />;
}

const styles = (theme) => ({
  container: {
    background: colors.transGrayBackground0,
    backdropFilter: "blur(10px)",
  },
  paper: {
    boxShadow: "none",
  },
  root: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    background: colors.darkBackground,
    minWidth: "100%",
    minHeight: "100%",
    overflow: "hidden",
    position: "relative",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: "0px",
    "&:first-child": {
      paddingTop: "0px",
    },
  },
  paperWidthSm: {
    maxWidth: "700px",
  },
  closeButton: {
    position: "absolute",
    right: "24px",
    paddingTop: "24px",
  },
  voteContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: "24px",
    width: "100%",
  },
  voteModalHeader: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    marginBottom: "16px",
    marginTop: "32px",
    [theme.breakpoints.up("ms")]: {
      marginTop: "0px",
    },
  },
  voteModalTitle: {
    color: colors.white,
    fontSize: "32px",
    fontWeight: "normal",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    [theme.breakpoints.up("ms")]: {
      fontSize: "48px",
    },
  },
  voteIcon: {
    width: "30px",
    height: "30px",
    marginRight: "8px",
    [theme.breakpoints.up("ms")]: {
      width: "43px",
      height: "43px",
      marginRight: "16px",
    },
  },
  voteTitleWrapper: {
    width: "100%",
    marginBottom: "4px",
  },
  voteProposalTitle: {
    color: colors.white,
    fontSize: "16px",
    fontWeight: "normal",
    textDecoration: "",
  },
  voteProposerContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
    marginBottom: "16px",
    [theme.breakpoints.up("ms")]: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
  },
  voteProposerAddress: {
    color: colors.greyText,
    fontSize: "16px",
    fontWeight: "normal",
    marginBottom: "16px",
    [theme.breakpoints.up("ms")]: {
      marginBottom: "0px",
    },
  },
  openProposalSpan: {
    color: colors.white,
    fontSize: "16px",
    fontWeight: "normal",
  },
  openProposalButton: {
    borderRadius: "4px",
    border: `solid 1px ${colors.white}`,
    [theme.breakpoints.up("ms")]: {
      border: `transparent`,
    },
  },

  voteActionCard: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    padding: "24px",
    background: colors.lightGray6,
    borderRadius: "8px",
  },
  voteInputBoxRoot: {
    width: "100%",
    height: 42,
    background: colors.lightGray3,
    borderRadius: 3,
    border: "solid 0px rgba(255, 255, 255, 0.2)",
    color: colors.white,
    padding: "0 12px",
  },

  voteInputBoxInput: {
    fontSize: "14px",
    [theme.breakpoints.up("ms")]: {
      fontSize: "16px",
    },
    "&::-webkit-input-placeholder": {
      fontWeight: "normal",
    },
  },
  voteAvailableWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "12px",
  },
  voteAvailableSpan: {
    color: colors.white,
    fontSize: "16px",
    fontWeight: "normal",
  },
  voteMinSpan: {
    color: colors.gray,
    fontSize: "16px",
    fontWeight: "normal",
  },
  voteInputValueWrapper: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "16px",
  },
  actionButton: {
    padding: "12px 16px",
    backgroundColor: "transparent",
    borderRadius: "3px",
    border: "1px solid #FFFFFF",
    color: colors.white,
    height: "43px",
    cursor: "pointer",
    "&:disabled": {
      opacity: 0.3,
      border: "1px solid #FFFFFF",
      color: colors.white,
    },
  },
  actionButtonLabel: {
    fontWeight: "normal",
    fontSize: "14px",
    [theme.breakpoints.up("md")]: {
      fontSize: "16px",
    },
  },
  voteButtonWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
  },
});

const formatProposer = (address) => {
  return address
    ? address.substring(0, 8) +
        "..." +
        address.substring(address.length - 6, address.length)
    : null;
};

class VoteModal extends Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      voteAmount: "0",
    };
  }

  onVoteFor = () => {
    const { proposal, startLoading } = this.props;

    this.setState({ loading: true });
    startLoading();
    dispatcher.dispatch({
      type: VOTE_FOR,
      content: { proposal: proposal, amount: this.state.voteAmount },
    });
  };

  onVoteAgainst = () => {
    const { proposal, startLoading } = this.props;
    this.setState({ loading: true });
    startLoading();
    dispatcher.dispatch({
      type: VOTE_AGAINST,
      content: { proposal: proposal, amount: this.state.voteAmount },
    });
  };

  openProposal = () => {
    const { proposal } = this.props;
    window.open(proposal.url);
  };

  onSubmit = () => {
    const { voteType } = this.props;
    if (voteType === "FOR") {
      this.onVoteFor();
    } else {
      this.onVoteAgainst();
    }
  };

  render() {
    const {
      classes,
      closeModal,
      modalOpen,
      proposal,
      voteType,
      balance,
    } = this.props;

    let title = "Invalid Proposal!";
    if (proposal?.url && proposal?.url.includes("gov.yflink.io")) {
      const subSections = proposal.url.split("/");
      const propDescription = subSections[4];
      title = propDescription.replace(/-/g, " ");
      if (typeof title === "string") {
        title = title.charAt(0).toUpperCase() + title.slice(1);
      }
    }

    const fullScreen = window.innerWidth < 768;

    return (
      <Dialog
        classes={{
          container: classes.container,
          paper: classes.paper,
          paperWidthSm: classes.paperWidthSm,
        }}
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
          <div className={classes.voteContainer}>
            <div className={classes.voteModalHeader}>
              {voteType === "FOR" ? (
                <Typography className={classes.voteModalTitle} variant={"h1"}>
                  <img
                    className={classes.voteIcon}
                    src={require("../../../assets/thumbs-up.svg")}
                    alt="thumb-up"
                  />
                  Voting For #{proposal?.id || "0"}
                </Typography>
              ) : (
                <Typography className={classes.voteModalTitle} variant={"h1"}>
                  <img
                    className={classes.voteIcon}
                    src={require("../../../assets/thumbs-down.svg")}
                    alt="thumb-down"
                  />
                  Voting Against #{proposal?.id || "0"}
                </Typography>
              )}
            </div>
            <div className={classes.voteTitleWrapper}>
              <Typography className={classes.voteProposalTitle} variant={"h6"}>
                {title}
              </Typography>
            </div>
            <div className={classes.voteProposerContainer}>
              <Typography
                className={classes.voteProposerAddress}
                variant={"h6"}
              >
                Proposer{" "}
                {formatProposer(proposal?.proposer) || "0x000000...000000"}
              </Typography>
              <IconButton
                classes={{ root: classes.openProposalButton }}
                onClick={() => {
                  this.openProposal();
                }}
              >
                <Typography variant={"h4"} className={classes.openProposalSpan}>
                  Open Proposal
                </Typography>
                <ArrowRightAltOutlinedIcon style={{ color: colors.white }} />
              </IconButton>
            </div>
            <div className={classes.voteActionCard}>
              <div className={classes.voteAvailableWrapper}>
                <Typography
                  className={classes.voteAvailableSpan}
                  variant={"h6"}
                >
                  Available: {balance} YFL
                </Typography>
                <Typography className={classes.voteMinSpan} variant={"h6"}>
                  Min: 0.1 YFL
                </Typography>
              </div>
              {/* <div className={classes.voteInputValueWrapper}>
                <InputBase
                  classes={{
                    root: classes.voteInputBoxRoot,
                    input: classes.voteInputBoxInput,
                  }}
                  onChange={(ev) => {
                    this.setState({
                      voteAmount: ev.target.value,
                    });
                  }}
                  placeholder="Enter amount you want to vote with"
                  type="number"
                  autoFocus
                />
              </div> */}
              <div className={classes.voteButtonWrapper}>
                <Button
                  className={classes.actionButton}
                  variant="outlined"
                  onClick={() => {
                    this.onSubmit();
                  }}
                >
                  <Typography
                    className={classes.actionButtonLabel}
                    variant={"h4"}
                    color={colors.white}
                  >
                    Submit Vote
                  </Typography>
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }
}
export default withRouter(withStyles(styles)(VoteModal));
