import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import bigInt from "big-integer";

import { withStyles } from "@material-ui/core/styles";
import {
  DialogContent,
  Dialog,
  IconButton,
  Typography,
  InputBase,
  Button,
  Zoom,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@material-ui/core";

import CloseIcon from "@material-ui/icons/Close";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowRightAltOutlinedIcon from "@material-ui/icons/ArrowRightAltOutlined";
import { colors } from "../../../theme";
import Store from "../../../stores";
import { VOTE_FOR, VOTE_AGAINST } from "../../../constants";
import { getSignature, getFunctionBySignature } from "../../../utils";
import { AbiCoder } from "ethers/utils";

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
    flexDirection: "column",
    padding: "24px",
    background: colors.lightGray6,
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
    alignItems: "flex-end",
    justifyContent: "flex-end",
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

  onVoteFor = () => {
    const { proposal, proposalType, startLoading, decimals } = this.props;
    const voteAmount = bigInt(
      (parseFloat(this.state.voteAmount) * 10 ** decimals).toString()
    );
    console.log("voteAmount", voteAmount, decimals, this.state.voteAmount);
    this.setState({ loading: true });
    startLoading();
    dispatcher.dispatch({
      type: VOTE_FOR,
      content: {
        proposal: proposal,
        amount: voteAmount,
        type: proposalType === 2 ? "LINKSWAP" : "GOV",
      },
    });
  };

  onVoteAgainst = () => {
    const { proposal, proposalType, startLoading, decimals } = this.props;
    const voteAmount = bigInt(
      (parseFloat(this.state.voteAmount) * 10 ** decimals).toString()
    );

    this.setState({ loading: true });
    startLoading();
    dispatcher.dispatch({
      type: VOTE_AGAINST,
      content: {
        proposal: proposal,
        amount: voteAmount,
        type: proposalType === 2 ? "LINKSWAP" : "GOV",
      },
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
      proposalType,
      symbol,
      voteLocked,
    } = this.props;
    const { expanded } = this.state;
    let title = "Invalid Proposal!";
    if (proposalType === 0 || proposalType === 1) {
      if (proposal?.url && proposal?.url.includes("gov.yflink.io")) {
        const subSections = proposal.url.split("/");
        const propDescription = subSections[4];
        title = propDescription.replace(/-/g, " ");
        if (typeof title === "string") {
          title = title.charAt(0).toUpperCase() + title.slice(1);
        }
      }
    } else if (proposalType === 2) {
      title = proposal && proposal.description;
    }

    const contracts =
      proposal &&
      proposal.targets.map((target, index) => {
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
              {(proposalType === 0 || proposalType === 1) && (
                <IconButton
                  classes={{ root: classes.openProposalButton }}
                  onClick={() => {
                    this.openProposal();
                  }}
                >
                  <Typography
                    variant={"h4"}
                    className={classes.openProposalSpan}
                  >
                    Open Proposal
                  </Typography>
                  <ArrowRightAltOutlinedIcon style={{ color: colors.white }} />
                </IconButton>
              )}
            </div>
            {proposalType === 2 && (
              <Accordion
                classes={{ root: classes.accordionRoot }}
                expanded={expanded}
                onChange={(event, isExpanded) => {
                  if (isExpanded) {
                    this.setState({ expanded: true });
                  }
                }}
              >
                <AccordionSummary
                  aria-controls="proposal-content"
                  id="vote-proposal-header"
                  classes={{
                    root: classes.accordionSummaryRoot,
                    content: classes.accordionSummaryContent,
                  }}
                >
                  <Button
                    variant="outlined"
                    className={classes.viewHideButton}
                    onClick={() => {
                      this.setState({ expanded: false });
                    }}
                  >
                    <Typography
                      variant="h4"
                      className={classes.viewHideButtonText}
                    >
                      {expanded ? "Hide Function" : "View Function"}
                    </Typography>
                    {expanded ? (
                      <ArrowDropUpIcon style={{ color: colors.white }} />
                    ) : (
                      <ArrowDropDownIcon style={{ color: colors.white }} />
                    )}
                  </Button>
                </AccordionSummary>
                <AccordionDetails
                  classes={{ root: classes.accordionDetailsRoot }}
                >
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
                  </div>
                </AccordionDetails>
              </Accordion>
            )}
            <div className={classes.voteActionCard}>
              <div className={classes.voteAvailableWrapper}>
                <Typography
                  className={classes.voteAvailableSpan}
                  variant={"h6"}
                >
                  Available: {balance} {symbol}
                </Typography>
                <Typography className={classes.voteMinSpan} variant={"h6"}>
                  Min: {voteLocked} {symbol}
                </Typography>
              </div>
              {proposalType === 2 && (
                <div className={classes.voteInputValueWrapper}>
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
                </div>
              )}

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
                <span className={classes.actionButtonTip}>
                  Please note your YFL will be locked until the end of the
                  voting period (3 days from the start of voting)
                </span>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }
}
export default withRouter(withStyles(styles)(VoteModal));
