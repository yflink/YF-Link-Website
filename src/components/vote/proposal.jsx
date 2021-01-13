import React, { Component } from "react";
import * as moment from "moment";
import { withRouter } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import { Typography, Button } from "@material-ui/core";
import { withNamespaces } from "react-i18next";

import {
  ERROR,
  VOTE_FOR_RETURNED,
  VOTE_AGAINST_RETURNED,
  GET_BALANCES_RETURNED,
} from "../../constants";

import { colors } from "../../theme";

import Store from "../../stores";
import { isLinkMeme } from "../../utils";

const emitter = Store.emitter;
const store = Store.store;

const styles = (theme) => ({
  root: {
    display: "flex",
    width: "100%",
  },

  desktopContainer: {
    display: "none",
    width: "100%",
    [theme.breakpoints.up("ms")]: {
      display: "flex",
    },
  },

  mobileContainer: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    [theme.breakpoints.up("ms")]: {
      display: "none",
    },
  },

  mobileIndexerHeadingContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: "12px",
  },

  indexerContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",

    [theme.breakpoints.up("ms")]: {
      width: "80px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "flex-start",
      marginRight: "20px",
    },
  },

  indexerValue: {
    width: "80px",
    height: "36px",
    backgroundColor: colors.lightGray5,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "4px",
    [theme.breakpoints.up("ms")]: {
      marginBottom: "8px",
    },
  },

  proposalId: {
    fontWeight: "normal",
    color: colors.white,
  },

  indexerTime: {
    width: "100%",
    height: "14px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  proposalTimeNormal: {
    fontWeight: "normal",
    fontSize: "12px",
    color: colors.white,
  },

  proposalTimeEnded: {
    fontWeight: "normal",
    fontSize: "12px",
    color: colors.greyText,
  },

  titleProperContainer: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    [theme.breakpoints.up("ms")]: {
      marginRight: "40px",
    },
  },

  proposalTitleContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
    marginBottom: "6px",
    [theme.breakpoints.up("ms")]: {
      marginBottom: "12px",
    },
  },
  proposalTitle: {
    fontWeight: "normal",
    textAlign: "left",
    wordBreak: "break-word",
    textTransform: "capitalize",

    "-webkit-line-clamp": 2,
    "-webkit-box-orient": "vertical",
    overflow: "hidden",
    "text-overflow": "ellipsis",
    display: "-webkit-box",
  },
  proposalAddressContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
  },
  proposalAddress: {
    fontWeight: "normal",
    textAlign: "left",
    color: colors.greyText,
  },
  voteRatioContainer: {
    width: "200px",
    display: "flex",
    flexDirection: "column",
    [theme.breakpoints.up("ms")]: {
      width: "264px",
      borderLeft: "1px solid rgba(255, 255, 255, 0.3)",
    },
  },

  voteValueContainer: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    [theme.breakpoints.up("ms")]: {
      marginBottom: "12px",
      paddingLeft: "10px",
      paddingRight: "10px",
    },
  },
  heading: {
    flexShrink: 0,
  },
  memeHeading: {
    maxWidth: "30%",
  },
  memeImage: {
    width: "100%",
    objectFit: "contain",
  },
  voteValueLineContainer: {
    display: "flex",
    alignItems: "center",
    position: "relative",
    borderRadius: "3px",
    overflow: "hidden",
    [theme.breakpoints.up("ms")]: {
      marginLeft: "32px",
      marginRight: "32px",
    },
  },

  voteGreenLine: {
    height: "10px",
    backgroundColor: colors.lightGreen2,
    borderTopLeftRadius: "3px",
    borderBottomLeftRadius: "3px",
  },

  voteRedLine: {
    height: "10px",
    backgroundColor: colors.lightRed,
    borderTopRightRadius: "3px",
    borderBottomRightRadius: "3px",
  },

  voteIndicator: {
    position: "absolute",
    border: "solid 0px transparent",
    borderRight: "solid 1px #BDCBDA",
    height: "20px",
    top: "10px",
    padding: "4px",
  },
  voteIndicatorText: {
    fontSize: "12px",
    fontWeight: "normal",
    color: colors.greyText,
  },

  voteAgreeContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    flex: 1,
    fontSize: "14px",
    [theme.breakpoints.up("ms")]: {
      fontSize: "16px",
    },
  },

  voteAgainstContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    flex: 1,
    fontSize: "14px",
    [theme.breakpoints.up("ms")]: {
      fontSize: "16px",
    },
  },

  voteUpIcon: {
    marginRight: "8px",
    [theme.breakpoints.up("ms")]: {
      marginRight: "0px",
    },
  },

  voteDownIcon: {
    marginLeft: "8px",
  },

  voteAgreeButton: {
    width: "100%",
    borderRadius: "4px",
    backgroundColor: "transparent",
    boxShadow: "0 0 black",
    paddingTop: "5px",
    paddingBottom: "5px",
    paddingLeft: "5px",
    paddingRight: "5px",
    "&:hover": {
      backgroundColor: colors.transGrayBackground0,
    },
    [theme.breakpoints.up("ms")]: {
      paddingLeft: "24px",
      paddingRight: "24px",
    },
  },
  voteAgreeLabel: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  voteAgainstButton: {
    width: "100%",
    borderRadius: "4px",
    backgroundColor: "transparent",
    boxShadow: "0 0 black",
    paddingTop: "5px",
    paddingBottom: "5px",
    paddingLeft: "5px",
    paddingRight: "5px",
    "&:hover": {
      backgroundColor: colors.transGrayBackground0,
    },
    [theme.breakpoints.up("ms")]: {
      paddingLeft: "24px",
      paddingRight: "24px",
    },
  },
  voteAgainstLabel: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  voteText: {
    fontWeight: "normal",
  },

  value: {
    cursor: "pointer",
  },
  right: {
    textAlign: "right",
  },
  grey: {
    color: colors.darkGray,
  },
});

class Proposal extends Component {
  constructor() {
    super();

    const now = store.getStore("currentBlock");

    this.state = {
      amount: "",
      amountError: false,
      redeemAmount: "",
      redeemAmountError: false,
      currentBlock: now,
      currentTime: new Date().getTime(),
      title: "",
      loading: true,
    };
  }

  componentDidMount() {
    emitter.on(VOTE_FOR_RETURNED, this.voteForReturned);
    emitter.on(VOTE_AGAINST_RETURNED, this.voteAgainstReturned);
    emitter.on(GET_BALANCES_RETURNED, this.balancesUpdated);
    emitter.on(ERROR, this.errorReturned);
    this.getProposalTitle();
  }

  componentWillUnmount() {
    emitter.removeListener(VOTE_FOR_RETURNED, this.voteForReturned);
    emitter.removeListener(VOTE_AGAINST_RETURNED, this.voteAgainstReturned);
    emitter.removeListener(GET_BALANCES_RETURNED, this.balancesUpdated);
    emitter.removeListener(ERROR, this.errorReturned);
  }

  getProposalTitle = async () => {
    const { proposal } = this.props;
    if (!proposal.url || !proposal.url.includes("gov.yflink.io")) {
      this.setState({ title: "Invalid Proposal!" });
      return;
    }
    const subSections = proposal.url.split("/");
    const propDescription = subSections[4];
    const propTitle = propDescription.replace(/-/g, " ");
    this.setState({ title: propTitle });
  };

  balancesUpdated = () => {
    let now = store.getStore("currentBlock");
    this.setState({ currentBlock: now });
  };

  voteForReturned = () => {
    this.setState({ loading: false });
  };

  voteAgainstReturned = (_txHash) => {
    this.setState({ loading: false });
  };

  errorReturned = (_error) => {
    this.setState({ loading: false });
  };

  votingMessage = (proposal) => {
    let message;
    if (proposal.myVotes > 0)
      message = "You have voted " + proposal.direction + ".";
    else message = "You have not voted.";

    if (proposal.canStillVote && proposal.myVotes === 0)
      message += " Please vote now.";

    return message;
  };

  formatVotes = (votes) => {
    return (parseFloat(votes) / 10 ** 18).toLocaleString(undefined, {
      maximumFractionDigits: 4,
      minimumFractionDigits: 4,
    });
  };

  formatAsPercent = (ratio) => {
    return (ratio * 100.0).toFixed(2).toLocaleString(undefined, {
      maximumFractionDigits: 4,
      minimumFractionDigits: 4,
    });
  };

  renderProposal(screenType) {
    const { classes, proposal } = this.props;
    const { currentBlock, currentTime, title } = this.state;

    const blocksTillEnd = proposal.end - currentBlock;

    const endTime = currentTime + blocksTillEnd * 1000 * 13.8;

    const proposerAddress =
      proposal && proposal.proposer
        ? proposal.proposer.substring(0, 8) +
          "..." +
          proposal.proposer.substring(
            proposal.proposer.length - 6,
            proposal.proposer.length
          )
        : null;

    let proposalTimeStamp = "Ended";
    if (proposal.end > currentBlock) {
      const periodTime = moment(endTime).subtract(currentTime);
      proposalTimeStamp = `${periodTime.format("DD")}d 
        ${periodTime.format("hh")}h 
        ${periodTime.format("mm")}m`;
    }

    const proposalVotesFor = proposal.totalForVotes
      ? parseFloat(proposal.totalForVotes) / 10 ** 18
      : 0;
    const proposalVotesAgainst = proposal.totalAgainstVotes
      ? parseFloat(proposal.totalAgainstVotes) / 10 ** 18
      : 0;

    const votesForText = proposalVotesFor.toLocaleString(undefined, {
      maximumFractionDigits: 2,
      minimumFractionDigits: 0,
    });
    const votesAgainstText = proposalVotesAgainst.toLocaleString(undefined, {
      maximumFractionDigits: 2,
      minimumFractionDigits: 0,
    });
    const votesForPercentage = (proposalVotesFor + proposalVotesAgainst > 0
      ? (proposalVotesFor / (proposalVotesFor + proposalVotesAgainst)) * 100
      : 0
    ).toFixed(2);
    const votesAgainstPercentage = (proposalVotesFor + proposalVotesAgainst > 0
      ? (proposalVotesAgainst / (proposalVotesFor + proposalVotesAgainst)) * 100
      : 0
    ).toFixed(2);

    if (screenType === "DESKTOP") {
      return (
        <div className={classes.desktopContainer}>
          <div className={classes.indexerContainer}>
            <div className={classes.indexerValue}>
              <Typography variant={"h3"} className={classes.proposalId}>
                {proposal.id}
              </Typography>
            </div>
            <div className={classes.indexerTime}>
              <Typography
                variant={"h5"}
                className={
                  proposalTimeStamp === "Ended"
                    ? classes.proposalTimeEnded
                    : classes.proposalTimeNormal
                }
              >
                {proposalTimeStamp}
              </Typography>
            </div>
          </div>
          <div className={classes.titleProperContainer}>
            <div className={classes.proposalTitleContainer}>
              {isLinkMeme(proposal.url) ? (
                <div className={classes.memeHeading}>
                  <img
                    src={proposal.url}
                    className={classes.memeImage}
                    alt="url"
                  />
                </div>
              ) : (
                <Typography variant={"h4"} className={classes.proposalTitle}>
                  {title}
                </Typography>
              )}
            </div>
            <div className={classes.proposalAddressContainer}>
              <Typography variant={"h5"} className={classes.proposalAddress}>
                Proposer {proposerAddress}
              </Typography>
            </div>
          </div>
          <div className={classes.voteRatioContainer}>
            <div className={classes.voteValueContainer}>
              <div className={classes.voteAgreeContainer}>
                <Button
                  classes={{
                    root: classes.voteAgreeButton,
                    label: classes.voteAgreeLabel,
                  }}
                  variant="contained"
                  color="primary"
                  onClick={this.voteAgreeClicked}
                  startIcon={
                    <img
                      className={classes.voteUpIcon}
                      src={require("../../assets/thumbs-up.svg")}
                      alt="thumb-up"
                    />
                  }
                >
                  <Typography
                    variant={"h4"}
                    className={classes.voteText}
                    noWrap
                  >
                    {votesForText}
                  </Typography>
                </Button>
              </div>
              <div className={classes.voteAgainstContainer}>
                <Button
                  classes={{
                    root: classes.voteAgainstButton,
                    label: classes.voteAgainstLabel,
                  }}
                  variant="contained"
                  color="primary"
                  onClick={this.voteAgainstClicked}
                  endIcon={
                    <img
                      className={classes.voteDownIcon}
                      src={require("../../assets/thumbs-down.svg")}
                      alt="thumb-down"
                    />
                  }
                >
                  <Typography
                    variant={"h4"}
                    className={classes.voteText}
                    noWrap
                  >
                    {votesAgainstText}
                  </Typography>
                </Button>
              </div>
            </div>
            <div className={classes.voteValueLineContainer}>
              <div
                className={classes.voteGreenLine}
                style={{ width: `${votesForPercentage}%` }}
              />
              <div
                className={classes.voteRedLine}
                style={{ width: `${votesAgainstPercentage}%` }}
              />
              <div
                className={classes.voteIndicator}
                style={{ right: `${votesAgainstPercentage}%` }}
              >
                <Typography className={classes.voteIndicatorText}>
                  {votesForPercentage}
                </Typography>
              </div>
            </div>
          </div>
        </div>
      );
    } else if (screenType === "MOBILE") {
      return (
        <div className={classes.mobileContainer}>
          <div className={classes.mobileIndexerHeadingContainer}>
            <div className={classes.indexerContainer}>
              <div className={classes.indexerValue}>
                <Typography variant={"h3"} className={classes.proposalId}>
                  {proposal.id}
                </Typography>
              </div>
              <div className={classes.indexerTime}>
                <Typography
                  variant={"h5"}
                  className={
                    proposalTimeStamp === "Ended"
                      ? classes.proposalTimeEnded
                      : classes.proposalTimeNormal
                  }
                >
                  {proposalTimeStamp}
                </Typography>
              </div>
            </div>
            <div className={classes.voteRatioContainer}>
              <div className={classes.voteValueContainer}>
                <div className={classes.voteAgreeContainer}>
                  <Button
                    classes={{
                      root: classes.voteAgreeButton,
                      label: classes.voteAgreeLabel,
                    }}
                    variant="contained"
                    color="primary"
                    onClick={this.voteAgreeClicked}
                    startIcon={
                      <img
                        className={classes.voteUpIcon}
                        src={require("../../assets/thumbs-up.svg")}
                        alt="thumb-up"
                      />
                    }
                  >
                    <Typography
                      variant={"h4"}
                      className={classes.voteText}
                      noWrap
                    >
                      {votesForPercentage}%
                    </Typography>
                  </Button>
                </div>
                <div className={classes.voteAgainstContainer}>
                  <Button
                    classes={{
                      root: classes.voteAgainstButton,
                      label: classes.voteAgainstLabel,
                    }}
                    variant="contained"
                    color="primary"
                    onClick={this.voteAgainstClicked}
                    startIcon={
                      <img
                        className={classes.voteUpIcon}
                        src={require("../../assets/thumbs-down.svg")}
                        alt="thumb-down"
                      />
                    }
                  >
                    <Typography
                      variant={"h4"}
                      className={classes.voteText}
                      noWrap
                    >
                      {votesAgainstPercentage}%
                    </Typography>
                  </Button>
                </div>
              </div>
              <div className={classes.voteValueLineContainer}>
                <div
                  className={classes.voteGreenLine}
                  style={{ width: `${votesForPercentage}%` }}
                />
                <div
                  className={classes.voteRedLine}
                  style={{ width: `${votesAgainstPercentage}%` }}
                />
              </div>
            </div>
          </div>

          <div className={classes.titleProperContainer}>
            <div className={classes.proposalTitleContainer}>
              {isLinkMeme(proposal.url) ? (
                <div className={classes.memeHeading}>
                  <img
                    src={proposal.url}
                    className={classes.memeImage}
                    alt="url"
                  />
                </div>
              ) : (
                <Typography variant={"h4"} className={classes.proposalTitle}>
                  {title}
                </Typography>
              )}
            </div>
            <div className={classes.proposalAddressContainer}>
              <Typography variant={"h5"} className={classes.proposalAddress}>
                Proposer {proposerAddress}
              </Typography>
            </div>
          </div>
        </div>
      );
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        {this.renderProposal("DESKTOP")}
        {this.renderProposal("MOBILE")}
      </div>
    );
  }

  copyAddressToClipboard = (event, address) => {
    event.stopPropagation();
    navigator.clipboard.writeText(address).then(() => {
      this.showAddressCopiedSnack();
    });
  };

  showAddressCopiedSnack = () => {
    this.props.showSnackbar("Address Copied to Clipboard", "Success");
  };
}

export default withNamespaces()(
  withRouter(withStyles(styles, { withTheme: true })(Proposal))
);
