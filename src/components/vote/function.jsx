import React, { Component } from "react";
import * as moment from "moment";
import { withRouter } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import {
  Typography,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@material-ui/core";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";

import { withNamespaces } from "react-i18next";

import {
  ERROR,
  VOTE_FOR_RETURNED,
  VOTE_AGAINST_RETURNED,
  GET_BALANCES_RETURNED,
} from "../../constants/constants";

import { colors } from "../../theme/theme";

import Store from "../../stores/store";
import { getSignature, getFunctionBySignature } from "../../utils";
import { AbiCoder } from "ethers/utils";

const emitter = Store.emitter;
const store = Store.store;

const styles = (theme) => ({
  root: {
    display: "flex",
    width: "100%",
    height: "100%",
  },
  accordionDesktopContainer: {
    display: "none",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    [theme.breakpoints.up("ms")]: {
      display: "flex",
    },
  },
  accordionMobileContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    [theme.breakpoints.up("ms")]: {
      display: "none",
    },
  },
  desktopContainer: {
    display: "none",
    flexDirection: "column",
    width: "100%",
    margin: "0 !important",
    background: colors.lightGray4,
    minHeight: "98px",
    [theme.breakpoints.up("ms")]: {
      display: "flex",
    },
    "&:hover": {
      background: colors.lightGray2,
    },
  },
  accordionSummary: {
    minHeight: "98px",
    "&.Mui-expanded": {
      minHeight: "98px",
    },
  },
  accordionExpanded: {
    minHeight: "98px",
  },

  mobileContainer: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    margin: "0 !important",
    background: colors.lightGray4,
    minHeight: "98px",
    "&:hover": {
      background: colors.lightGray2,
    },
    [theme.breakpoints.up("ms")]: {
      display: "none",
    },
  },
  mobileAccordionSummaryWrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
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
    "& > a": {
      color: colors.white,
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
    color: colors.white,
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
  hideButton: {
    width: "100%",
    height: "43px",
    color: colors.white,
    backgroundColor: "transparent",
    border: "solid 1px #ffffff",
    borderRadius: "3px",
  },
  hideButtonText: {
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
  executeContainer: {
    backgroundColor: "#8C7E58",
    height: "70px",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    [theme.breakpoints.up("ms")]: {
      flexDirection: "row",
    },
  },
  executeText: {
    fontSize: "12px",
    lineHeight: "14px",
    fontWeight: "bold",
    [theme.breakpoints.up("ms")]: {
      fontSize: "16px",
      lineHeight: "19px",
    },
  },
  executeButton: {
    height: "32px",
    borderRadius: "3px",
    backgroundColor: "rgba(255, 255, 255, 0.2);",
    fontWeight: "bold",
    fontSize: "16px",
    lineHeight: "20px",
    color: colors.white,
    boxShadow: "none",
    "&:hover": {
      backgroundColor: "rgba(255, 255, 255, 0.5);",
    },
    marginTop: "8px",
    [theme.breakpoints.up("ms")]: {
      marginLeft: "24px",
      marginTop: "0px",
      height: "42px",
    },
  },
});

class FunctionProposal extends Component {
  constructor() {
    super();

    const now = store.getStore("currentBlock");

    this.state = {
      currentBlock: now,
      currentTime: new Date().getTime(),
      expanded: false,
      loading: true,
    };
  }

  componentDidMount() {
    emitter.on(VOTE_FOR_RETURNED, this.voteForReturned);
    emitter.on(VOTE_AGAINST_RETURNED, this.voteAgainstReturned);
    emitter.on(GET_BALANCES_RETURNED, this.balancesUpdated);
    emitter.on(ERROR, this.errorReturned);
  }

  componentWillUnmount() {
    emitter.removeListener(VOTE_FOR_RETURNED, this.voteForReturned);
    emitter.removeListener(VOTE_AGAINST_RETURNED, this.voteAgainstReturned);
    emitter.removeListener(GET_BALANCES_RETURNED, this.balancesUpdated);
    emitter.removeListener(ERROR, this.errorReturned);
  }

  getProposalTitle = (title) => {
    if (!title.includes("gov.yflink.io")) {
      return title;
    }
    const subSections = title.split("/");
    const propDescription = subSections[4];
    return propDescription.replace(/-/g, " ");
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

  voteAgreeClicked = (event) => {
    event.stopPropagation();
    const { onVote, proposal } = this.props;
    if (onVote) {
      onVote({ proposal, voteType: "FOR" });
    }
  };

  onExecute = (event) => {
    event.stopPropagation();
    const { onExecute: onExecuteHandler, proposal } = this.props;
    if (onExecuteHandler) {
      onExecuteHandler({ proposal });
    }
  };

  voteAgainstClicked = (event) => {
    event.stopPropagation();
    const { onVote, proposal } = this.props;
    if (onVote) {
      onVote({ proposal, voteType: "AGAINST" });
    }
  };

  renderProposal = (screenType) => {
    const { classes, proposal, isExecutable } = this.props;
    const { currentBlock, expanded } = this.state;

    const blocksTillEnd = proposal.endBlock - currentBlock;
    const nowDate = moment();
    const endDate = moment().add(parseInt(blocksTillEnd * 13.8), "seconds");

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
    if (proposal.endBlock > currentBlock) {
      const days = endDate.diff(nowDate, "days");
      const hours = endDate.subtract(days, "days").diff(nowDate, "hours");
      const minutes = endDate.subtract(hours, "hours").diff(nowDate, "minutes");

      proposalTimeStamp = `${days}d 
        ${hours}h 
        ${minutes}m`;
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

    const contracts = proposal.targets.map((target, index) => {
      const signature = proposal.signatures[index];
      const calldata = proposal.calldatas[index];

      const params = getSignature(signature);
      const abi = new AbiCoder();
      const decodedCalldata = abi.decode(params, calldata);
      const funcString = getFunctionBySignature(signature, decodedCalldata);
      return {
        contract: target,
        func: funcString,
      };
    });

    if (screenType === "DESKTOP") {
      return (
        <div className={classes.accordionDesktopContainer}>
          <Accordion
            classes={{ root: classes.desktopContainer }}
            expanded={expanded}
            onChange={(event, isExpanded) => {
              if (isExpanded) {
                this.setState({ expanded: true });
              } else {
                if (
                  proposal.description &&
                  proposal.description.includes("https://")
                ) {
                  console.log("proposal description", proposal.description);
                  if (proposal.description[0] === '"') {
                    if (
                      proposal.description[proposal.description.length - 1] ===
                      '"'
                    ) {
                      window.open(
                        proposal.description.slice(
                          1,
                          proposal.description.length - 1
                        )
                      );
                    } else {
                      window.open(proposal.description.slice(1));
                    }
                  } else {
                    window.open(proposal.description);
                  }
                }
              }
            }}
          >
            <AccordionSummary
              aria-controls="proposal-content"
              id="proposal-header"
              classes={{ root: classes.accordionSummary }}
            >
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
                  {proposal.description &&
                  proposal.description.includes("https://") ? (
                    <Typography
                      variant={"h4"}
                      className={classes.proposalTitle}
                    >
                      {this.getProposalTitle(proposal.description)}
                    </Typography>
                  ) : (
                    <Typography
                      variant={"h4"}
                      className={classes.proposalTitle}
                    >
                      {proposal.description}
                    </Typography>
                  )}
                </div>
                <div className={classes.proposalAddressContainer}>
                  <Typography
                    variant={"h5"}
                    className={classes.proposalAddress}
                  >
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
            </AccordionSummary>
            <AccordionDetails>
              <div className={classes.detailWrapper}>
                {contracts &&
                  contracts.map((item, index) => (
                    <div className={classes.contractWrapper} key={index}>
                      <span className={classes.contractIndexWrapper}>
                        {index + 1}
                      </span>
                      <div className={classes.contractInfoWrapper}>
                        <span className={classes.contractInfoHeader}>
                          Contract:{" "}
                          <span className={classes.contractInfoValue}>
                            {item.contract || ""}
                          </span>
                        </span>
                        <span className={classes.contractInfoHeader}>
                          Function:{" "}
                          <span className={classes.contractInfoValue}>
                            {item.func || ""}
                          </span>
                        </span>
                      </div>
                    </div>
                  ))}
                <Button
                  variant="outlined"
                  className={classes.hideButton}
                  onClick={() => {
                    this.setState({ expanded: false });
                  }}
                >
                  <Typography variant="h4" className={classes.hideButtonText}>
                    Hide Function
                  </Typography>
                  <ArrowDropUpIcon style={{ color: colors.white }} />
                </Button>
              </div>
            </AccordionDetails>
          </Accordion>
          {isExecutable && proposalTimeStamp === "Ended" && (
            <div className={classes.executeContainer}>
              <Typography variant="h4" className={classes.executeText}>
                Your proposal has passed. Execute now.
              </Typography>
              <Button
                variant="contained"
                className={classes.executeButton}
                onClick={(event) => {
                  this.onExecute(event);
                }}
              >
                Execute
              </Button>
            </div>
          )}
        </div>
      );
    } else if (screenType === "MOBILE") {
      return (
        <div className={classes.accordionMobileContainer}>
          <Accordion
            classes={{ root: classes.mobileContainer }}
            expanded={expanded}
            onChange={(event, isExpanded) => {
              if (isExpanded) {
                this.setState({ expanded: true });
              } else {
                if (
                  proposal.description &&
                  proposal.description.includes("https://")
                ) {
                  window.open(proposal.description);
                }
              }
            }}
          >
            <AccordionSummary
              aria-controls="proposal-content"
              id="proposal-header"
              classes={{ root: classes.accordionSummary }}
            >
              <div className={classes.mobileAccordionSummaryWrapper}>
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
                    {proposal.description &&
                    proposal.description.includes("https://") ? (
                      <Typography
                        variant={"h4"}
                        className={classes.proposalTitle}
                      >
                        {this.getProposalTitle(proposal.description)}
                      </Typography>
                    ) : (
                      <Typography
                        variant={"h4"}
                        className={classes.proposalTitle}
                      >
                        {proposal.description}
                      </Typography>
                    )}
                  </div>
                  <div className={classes.proposalAddressContainer}>
                    <Typography
                      variant={"h5"}
                      className={classes.proposalAddress}
                    >
                      Proposer {proposerAddress}
                    </Typography>
                  </div>
                </div>
              </div>
            </AccordionSummary>
            <AccordionDetails>
              <div className={classes.detailWrapper}>
                {contracts &&
                  contracts.map((item, index) => (
                    <div className={classes.contractWrapper} key={index}>
                      <span className={classes.contractIndexWrapper}>
                        {index + 1}
                      </span>
                      <div className={classes.contractInfoWrapper}>
                        <span className={classes.contractInfoHeader}>
                          Contract:{" "}
                          <span className={classes.contractInfoValue}>
                            {item.contract || ""}
                          </span>
                        </span>
                        <span className={classes.contractInfoHeader}>
                          Function:{" "}
                          <span className={classes.contractInfoValue}>
                            {item.func || ""}
                          </span>
                        </span>
                      </div>
                    </div>
                  ))}
                <Button
                  variant="outlined"
                  className={classes.hideButton}
                  onClick={() => {
                    this.setState({ expanded: false });
                  }}
                >
                  <Typography variant="h4" className={classes.hideButtonText}>
                    Hide Function
                  </Typography>
                  <ArrowDropUpIcon style={{ color: colors.white }} />
                </Button>
              </div>
            </AccordionDetails>
          </Accordion>
          {isExecutable && proposalTimeStamp === "Ended" && (
            <div className={classes.executeContainer}>
              <Typography variant="h4" className={classes.executeText}>
                Your proposal has passed. Execute now.
              </Typography>
              <Button
                variant="contained"
                className={classes.executeButton}
                onClick={(event) => {
                  this.onExecute(event);
                }}
              >
                Execute
              </Button>
            </div>
          )}
        </div>
      );
    }
  };

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
  withRouter(withStyles(styles, { withTheme: true })(FunctionProposal))
);
