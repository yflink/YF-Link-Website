import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import moment from "moment";

import { withStyles } from "@material-ui/core/styles";
import {
  DialogContent,
  Dialog,
  IconButton,
  Typography,
  Button,
  Zoom,
} from "@material-ui/core";

import CloseIcon from "@material-ui/icons/Close";
import { colors } from "../../../theme";
import Store from "../../../stores";
import { raffleDays, ENTER_RAFFLE, CLAIM_PRIZE } from "../../../constants";

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
    background: "#8F4042",
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
    height: "100%",
    [theme.breakpoints.up("ms")]: {
      height: "auto",
    },
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
    height: "240px",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
    padding: "24px",
    background: "#642D2E",
    borderRadius: "8px",
    [theme.breakpoints.up("ms")]: {
      height: "100%",
    },
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
    marginLeft: "30px",
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
  actionButtonTip: {
    fontWeight: "normal",
    fontSize: "10px",
    [theme.breakpoints.up("md")]: {
      fontSize: "12px",
    },
    color: colors.white,
    marginTop: "8px",
  },
  voteButtonWrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  voteGiftWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  dayGiftIcon: {
    width: "128px",
    height: "128px",
  },
  accordionRoot: {
    width: "100%",
    backgroundColor: "transparent",
    "&.Mui-expanded": {
      minHeight: "43px",
      margin: "0px",
      overflow: "auto",
    },
  },
  accordionSummaryRoot: {
    padding: "0px",
    marginBottom: "16px",
    "&.Mui-expanded": {
      minHeight: "43px",
      margin: "0px",
    },
  },
  accordionDetailsRoot: {
    padding: "0px",
    [theme.breakpoints.up("md")]: {
      padding: "8px",
    },
  },
  accordionSummaryContent: {
    margin: "0px",
    "&.Mui-expanded": {
      margin: "0px",
    },
  },
  viewHideButton: {
    width: "100%",
    height: "43px",
    color: colors.white,
    backgroundColor: "transparent",
    border: "solid 1px #ffffff",
    borderRadius: "3px",
    marginBottom: "10px",
  },
  viewHideButtonText: {
    color: colors.white,
  },
  detailWrapper: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
  },
  contractWrapper: {
    display: "flex",
    width: "100%",
    minHeight: "80px",
    marginBottom: "12px",
    borderRadius: "8px",
    backgroundColor: colors.lightBlack2,
    alignItems: "flex-start",
    justifyContent: "center",
    padding: "16px",
  },
  contractIndexWrapper: {
    width: "30px",
    height: "30px",
    backgroundColor: colors.lightBlack3,
    borderRadius: "4px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    color: colors.white,
    marginRight: "16px",
  },
  contractInfoWrapper: {
    flex: "1",
    display: "flex",
    flexDirection: "column",
    color: colors.greyText,
  },
  contractInfoHeader: {
    display: "flex",
    flexDirection: "column",
    fontWeight: "700",
    fontStyle: "normal",
    fontSize: "16px",
    lineHeight: "20px",
    marginBottom: "6px",
    width: "100%",
    [theme.breakpoints.up("ms")]: {
      flexDirection: "row",
    },
  },
  contractInfoValue: {
    fontWeight: "400",
    fontStyle: "normal",
    fontSize: "16px",
    lineHeight: "20px",
    maxHeight: "50px",
    overflowWrap: "anywhere",
    marginLeft: "5px",
  },
  dayInfoText: {
    fontSize: "24px",
    lineHeight: "29px",
    fontWeight: "normal",
    color: colors.white,
    marginBottom: "12px",
  },
  dayInfoNormalText: {
    fontSize: "16px",
    lineHeight: "19px",
    fontWeight: "normal",
    color: colors.white,
  },
  dayInfoAddress: {
    fontSize: "14px",
    lineHeight: "16px",
    fontWeight: "normal",
    color: colors.white,
    marginBottom: "20px",
  },
  dayInfoEnds: {
    fontSize: "14px",
    lineHeight: "16px",
    fontWeight: "normal",
    color: colors.white,
    marginTop: "40px",
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
      expanded: false,
      voteAmount: "0",
    };
  }

  openProposal = () => {
    const { proposal } = this.props;
    window.open(proposal.url);
  };

  onSubmit = (buttonText) => {
    if (buttonText === "Enter") {
      dispatcher.dispatch({ type: ENTER_RAFFLE, content: {} });
    } else if (buttonText === "Claim your prize") {
      dispatcher.dispatch({ type: CLAIM_PRIZE, content: {} });
    }
  };

  render() {
    const {
      classes,
      account,
      selectedDay,
      today,
      closeModal,
      modalOpen,
      entered,
      winners,
    } = this.props;
    let dayTitle = null;
    let subTitle = null;
    let endsIn = null;
    let address = null;
    let buttonText = null;
    const fullScreen = window.innerWidth < 768;
    if (selectedDay !== null && today !== null) {
      if (winners && winners[selectedDay]) {
        address = winners[selectedDay].address;

        if (
          address === account.address &&
          !winners[selectedDay].claimed &&
          winners[selectedDay].won
        ) {
          buttonText = "Claim your prize";
        }
      }
      if (selectedDay < today) {
        if (address === account.address) {
          dayTitle = "You Won! Congrats!🥳";
        } else if (address) {
          dayTitle = "We have a winner! Congrats to";
        } else {
          dayTitle = "Winner will be selected soon!";
        }
      } else if (selectedDay > today) {
        dayTitle = `${raffleDays[selectedDay].title} has not started yet.`;
        subTitle = `Come back again on ${raffleDays[selectedDay].subTitle}.`;
      } else {
        dayTitle = `Hasn't ended yet.`;
        if (entered) {
          subTitle = "Please wait until end of this day!";
        } else {
          subTitle = "You still have time to enter!";
        }
        const nextDay = raffleDays[today] && raffleDays[today].nextDate;
        const tomorrow = moment.utc(nextDay);
        const timeRemain = tomorrow.diff(moment.now(), "minutes");
        endsIn = `Ends in: ${Math.floor(timeRemain / 60)}h ${timeRemain % 60}m`;
        if (!entered) {
          buttonText = "Enter";
        }
      }
    }

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
              <Typography className={classes.voteModalTitle} variant={"h1"}>
                <img
                  className={classes.voteIcon}
                  src={require("../../../assets/ticket.svg")}
                  alt="ticket"
                />
                {raffleDays[selectedDay]?.title || "Day"}{" "}
                {selectedDay < today && "Winner"}
              </Typography>
            </div>
            <div className={classes.voteTitleWrapper}>
              <Typography className={classes.voteProposalTitle} variant={"h6"}>
                {raffleDays[selectedDay]?.subTitle || "Dec 15th"}
              </Typography>
            </div>
            <div className={classes.voteActionCard}>
              <div className={classes.voteButtonWrapper}>
                {dayTitle && (
                  <Typography
                    variant={"h4"}
                    className={
                      selectedDay < today
                        ? classes.dayInfoText
                        : classes.dayInfoNormalText
                    }
                  >
                    {dayTitle}
                  </Typography>
                )}
                {subTitle && (
                  <Typography
                    variant={"h4"}
                    className={
                      selectedDay < today
                        ? classes.dayInfoText
                        : classes.dayInfoNormalText
                    }
                  >
                    {" "}
                    {subTitle}
                  </Typography>
                )}
                {address && (
                  <Typography variant={"h4"} className={classes.dayInfoAddress}>
                    {formatProposer(address)}
                  </Typography>
                )}
                {(endsIn || buttonText) && (
                  <Typography variant={"h4"} className={classes.dayInfoEnds}>
                    {endsIn}
                    {buttonText && (
                      <Button
                        className={classes.actionButton}
                        variant="outlined"
                        onClick={() => {
                          this.onSubmit(buttonText);
                        }}
                      >
                        <Typography
                          className={classes.actionButtonLabel}
                          variant={"h4"}
                          color={colors.white}
                        >
                          {buttonText}
                        </Typography>
                      </Button>
                    )}
                  </Typography>
                )}
              </div>
              <div className={classes.voteGiftWrapper}>
                <img
                  className={classes.dayGiftIcon}
                  src={require("../../../assets/gift.svg")}
                  alt="gift"
                />
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }
}
export default withRouter(withStyles(styles)(VoteModal));
