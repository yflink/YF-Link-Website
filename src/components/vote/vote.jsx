import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import {
  Typography,
  InputBase,
  Button,
  IconButton,
  Card,
  Tooltip,
  Zoom,
  Paper,
} from "@material-ui/core";

import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import ArrowRightAltOutlinedIcon from "@material-ui/icons/ArrowRightAltOutlined";
import ArrowBackOutlinedIcon from "@material-ui/icons/ArrowBackOutlined";
import HighlightOffRoundedIcon from "@material-ui/icons/HighlightOffRounded";
import LockRoundedIcon from "@material-ui/icons/LockRounded";
import AttachMoneyRoundedIcon from "@material-ui/icons/AttachMoneyRounded";
import AddIcon from "@material-ui/icons/Add";

import bigInt from "big-integer";

import HeaderLogo from "../header/logo/logo";
import HeaderLink from "../header/link/link";
import HeaderDropLink from "../header/link/dropLink";
import RedirectModal from "../header/modal/modal";
import Loader from "../loader";
import Snackbar from "../snackbar";
import UnlockModal from "../unlock/unlockModal.jsx";

import VoteModal from "./modal";
import StakeWithdrawModal from "./modal/stakeModal";
import Proposal from "./proposal";
import FunctionProposal from "./function";

import Store from "../../stores";
import { colors } from "../../theme";
import { ReactComponent as OptionsIcon } from "../../assets/YFLink-header-options.svg";
import { isLinkMeme, getSignature } from "../../utils";
import { AbiCoder } from "ethers/utils";

import {
  ERROR,
  CONFIGURE_RETURNED,
  PROPOSE_RETURNED,
  GET_BALANCES_RETURNED,
  GET_PROPOSALS,
  GET_PROPOSALS_RETURNED,
  VOTE_FOR_RETURNED,
  VOTE_AGAINST_RETURNED,
  STAKE,
  STAKE_RETURNED,
  WITHDRAW,
  WITHDRAW_RETURNED,
  CONVERT,
  PROPOSE,
  CONNECTION_CONNECTED,
  CONNECTION_DISCONNECTED,
  CONFIGURE,
  EXECUTE,
  EXECUTE_RETURNED,
} from "../../constants";

const styles = (theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "100%",
    minHeight: "100vh",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: colors.greyBackground,
    overflow: "hidden",
    position: "relative",
  },
  between: {
    width: "40px",
  },

  desktopSectionStyle: {
    zIndex: "2",
    width: "100%",
    position: "relative",
    display: "none",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
    marginBottom: "60px",
    [theme.breakpoints.up("ms")]: {
      display: "flex",
    },
  },

  mobileSectionStyle: {
    zIndex: "2",
    width: "100%",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
    marginBottom: "30px",
    padding: "0px 16px",
    [theme.breakpoints.up("ms")]: {
      display: "none",
    },
  },

  investedContainer: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "12px",
    minWidth: "100%",
    [theme.breakpoints.up("md")]: {
      minWidth: "800px",
    },
  },
  connectContainer: {
    padding: "12px",
    display: "flex",
    justifyContent: "center",
    width: "100%",
    maxWidth: "450px",
    [theme.breakpoints.up("md")]: {
      width: "450",
    },
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

  buttonText: {
    fontWeight: "700",
    color: "white",
  },
  instructions: {
    textAlign: "center",
  },
  disaclaimer: {
    padding: "12px",
    border: "1px solid rgb(174, 174, 174)",
    borderRadius: "0.75rem",
    marginBottom: "24px",
  },
  addressContainer: {
    display: "flex",
    justifyContent: "space-between",
    overflow: "hidden",
    flex: 1,
    whiteSpace: "nowrap",
    fontSize: "0.83rem",
    textOverflow: "ellipsis",
    cursor: "pointer",
    padding: "28px 30px",
    borderRadius: "50px",
    border: "1px solid " + colors.borderBlue,
    alignItems: "center",
    [theme.breakpoints.up("md")]: {
      width: "100%",
    },
  },
  walletAddress: {
    padding: "0px 12px",
  },
  walletTitle: {
    flex: 1,
    color: colors.darkGray,
  },
  proposalContainer: {
    position: "relative",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  field: {
    minWidth: "100%",
    paddingBottom: "20px",
  },
  fieldTitle: {
    paddingLeft: "20px",
  },
  titleInput: {
    borderRadius: "25px",
  },
  headingName: {
    paddingTop: "5px",
    flex: 2,
    flexShrink: 0,
    display: "flex",
    alignItems: "center",
    minWidth: "100%",
    [theme.breakpoints.up("sm")]: {
      minWidth: "auto",
    },
  },
  heading: {
    display: "none",
    paddingTop: "12px",
    flex: 1,
    flexShrink: 0,
    [theme.breakpoints.up("sm")]: {
      paddingTop: "5px",
      display: "block",
    },
  },
  assetSummary: {
    display: "flex",
    alignItems: "center",
    flex: 1,
    flexWrap: "wrap",
    [theme.breakpoints.up("sm")]: {
      flexWrap: "nowrap",
    },
  },
  assetIcon: {
    display: "flex",
    alignItems: "center",
    verticalAlign: "middle",
    borderRadius: "20px",
    height: "30px",
    width: "30px",
    textAlign: "center",
    cursor: "pointer",
    marginRight: "20px",
    [theme.breakpoints.up("sm")]: {
      height: "40px",
      width: "40px",
      marginRight: "24px",
    },
  },
  grey: {
    color: colors.darkGray,
  },
  proposalCard: {
    width: "100%",
    borderRadius: "4px",
    background: colors.lightGray4,
    color: colors.white,
    border: "solid 0px transparent",
    minHeight: "96px",
    marginBottom: "16px",
    "&:hover": {
      background: colors.lightGray2,
    },
  },

  proposalCardDetails: {
    padding: "8px",
    [theme.breakpoints.up("ms")]: {
      padding: "16px",
    },
  },

  stakeTitle: {
    width: "100%",
    color: colors.white,
    textAlign: "center",
    fontWeight: "normal",
  },
  propEmptyContainer: {
    display: "flex",
    flexWrap: "wrap",
    padding: "28px 30px",
    borderRadius: "3px",
    background: "transparent",
    width: "100%",
    marginBottom: "12px",
  },
  stakeButton: {
    minWidth: "300px",
  },
  proposerAddressContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    "& > svg": {
      visibility: "hidden",
    },
    "&:hover > svg": {
      visibility: "visible",
    },
  },
  desktopHeaderContainer: {
    zIndex: "999",
    width: "100%",
    height: "90px",
    paddingLeft: "30px",
    paddingRight: "30px",
    display: "none",
    alignItems: "center",
    justifyContent: "space-between",
    [theme.breakpoints.up("ms")]: {
      display: "flex",
    },
  },
  mobileHeaderContainer: {
    zIndex: "999",
    width: "100%",
    height: "90px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "16px",
    [theme.breakpoints.up("ms")]: {
      display: "none",
    },
  },

  logoContainer: {
    zIndex: "2",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    [theme.breakpoints.up("ms")]: {
      minWidth: "100px",
    },
  },

  linkContainer: {
    zIndex: "2",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: "56px",
    "& > *": {
      marginRight: "30px",
    },
  },

  walletContainer: {
    zIndex: "2",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    width: "168px",
  },

  walletButton: {
    backgroundColor: colors.transGreyBackground,
    color: colors.white,
    borderColor: colors.white,
    borderRadius: "4px",
    "&:hover": {
      backgroundColor: colors.transGreyBackgroundHover,
    },
    padding: "16px",
    width: "168px",
    height: "43px",
  },
  headerWalletAddress: {
    width: "140px",
  },
  optionsContainer: {
    zIndex: "2",
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
  },

  rightMarkSection: {
    zIndex: "1",
    position: "absolute",
    display: "none",
    flexDirection: "column",
    top: "90px",
    right: "0px",
    width: "270px",
    height: "100%",
    backgroundImage: `url('YFL-BG-pattern-right.svg')`,
    backgroundRepeat: "repeat-y",
    backgroundSize: "270px 1200px",
    backgroundPositionX: "left",
    [theme.breakpoints.up("ms")]: {
      display: "flex",
    },
  },

  leftMarkSection: {
    zIndex: "1",
    position: "absolute",
    display: "none",
    flexDirection: "column",
    top: "90px",
    left: "0px",
    width: "470px",
    height: "100%",
    backgroundImage: `url('YFL-BG-pattern-left.svg')`,
    backgroundRepeat: "repeat-y",
    backgroundSize: "270px 1200px",
    backgroundPositionX: "left",
    backgroundPositionY: "-350px",
    [theme.breakpoints.up("ms")]: {
      display: "flex",
    },
  },
  mainBody: {
    width: "100%",
    maxWidth: "900px",
    display: "flex",
    flexDirection: "column",
    paddingTop: "10px",
    position: "relative",
    [theme.breakpoints.up("ms")]: {
      paddingTop: "50px",
    },
  },

  cardPreviousSection: {
    position: "absolute",
    top: "-40px",
    left: "0px",
    [theme.breakpoints.up("ms")]: {
      top: "-56px",
      left: "-10px",
    },
  },

  previousButtonStyle: {
    marginLeft: "8px",
    color: colors.white,
    [theme.breakpoints.up("ms")]: {
      marginLeft: "16px",
    },
  },

  cardHeaderSection: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "24px",
  },
  newProposalCardHeaderSection: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "24px",
    marginTop: "16px",
    [theme.breakpoints.up("ms")]: {
      marginTop: "0px",
    },
  },

  cardHeading: {
    color: colors.white,
    fontWeight: "normal",
    fontSize: "32px",
    [theme.breakpoints.up("ms")]: {
      fontSize: "48px",
    },
  },

  newProposalCard: {
    width: "100%",
    minHeight: "300px",
    backgroundColor: colors.lightGray2,
    borderRadius: "8px",
  },

  governanceCard: {
    width: "100%",
    minHeight: "300px",
    backgroundColor: colors.lightGray2,
    borderRadius: "8px",
  },

  governanceCardHeadSection: {
    width: "100%",
    height: "56px",
    backgroundColor: colors.darkGray2,
    borderRadius: "8px 8px 0px 0px",
    padding: "0px 12px",
    display: "flex",
    alignItems: "center",
  },

  newProposalCardHeadSection: {
    width: "100%",
    height: "56px",
    backgroundColor: colors.darkGray2,
    borderRadius: "8px 8px 0px 0px",
    padding: "0px 12px",
    display: "flex",
    alignItems: "center",
  },

  governanceButtonSpan: {
    color: colors.white,
    marginRight: "8px",
    fontWeight: "normal",
    fontSize: "14px",
    [theme.breakpoints.up("ms")]: {
      fontSize: "16px",
    },
  },
  governanceIconButton: {
    paddingLeft: "0px",
    paddingRight: "0px",
  },
  newProposalButtonSpan: {
    color: colors.white,
    marginRight: "8px",
    fontWeight: "normal",
    fontSize: "14px",
    [theme.breakpoints.up("ms")]: {
      fontSize: "16px",
    },
  },

  governanceCardBodySection: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
  },

  newProposalCardBodySection: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    paddingTop: "12px",
  },

  governanceCardBodyVault: {
    display: "flex",
    width: "100%",
    padding: "12px",
    alignItems: "center",
    justifyContent: "flex-start",
  },

  newProposalCardBodyVault: {
    display: "flex",
    width: "100%",
    padding: "12px",
    alignItems: "center",
    justifyContent: "flex-start",
  },

  governanceVaultButtonSpan: {
    marginLeft: "12px",
    color: colors.white,
    fontWeight: "normal",
    fontSize: "18px",
    [theme.breakpoints.up("ms")]: {
      fontSize: "24px",
    },
  },

  newProposalVaultButtonSpan: {
    marginLeft: "12px",
    color: colors.white,
    fontWeight: "normal",
    fontSize: "18px",
    [theme.breakpoints.up("ms")]: {
      fontSize: "24px",
    },
  },

  governanceVaultIcon: {
    width: "24px",
    height: "24px",
    objectFit: "contain",
    [theme.breakpoints.up("ms")]: {
      width: "30px",
      height: "30px",
    },
  },

  govStakeWithdrawContainer: {
    width: "100%",
    display: "flex",
    paddingTop: "12px",
    paddingBottom: "24px",
    flexDirection: "column",
    [theme.breakpoints.up("ms")]: {
      flexDirection: "row",
    },
  },

  newProposalActionContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    padding: "12px 24px 24px 24px",
  },

  newProposalCommentContainer: {
    display: "flex",
    marginBottom: "16px",
  },

  newProposalComment: {
    color: colors.white,
    fontWeight: "normal",
  },

  newProposalButtonContainer: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    [theme.breakpoints.up("ms")]: {
      justifyContent: "flex-end",
    },
  },

  newProposalInput: {
    width: "100%",
    height: "54px",
    background: colors.lightGray3,
    borderRadius: 8,
    border: "solid 2px rgba(255, 255, 255, 0)",
    color: colors.white,
    padding: "0 12px",
  },

  newProposalError: {
    border: "solid 1px rgba(255, 0, 0, 0.8) !important",
  },

  newProposalParamInput: {
    width: "100%",
    height: "54px",
    background: colors.lightGray3,
    borderRadius: 3,
    border: "solid 2px rgba(255, 255, 255, 0)",
    color: colors.white,
    padding: "0 12px",
    marginBottom: "12px",
  },

  govStakeContainer: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    paddingLeft: "24px",
    paddingRight: "24px",
    minWidth: "300px",
    marginBottom: "30px",
    [theme.breakpoints.up("ms")]: {
      marginBottom: "0px",
    },
  },

  govStakeWithdrawHeaderContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "12px",
  },
  govStakeWithdrawBalanceSpan: {
    color: colors.white,
    fontWeight: "normal",
    fontSize: "14px",
    [theme.breakpoints.up("ms")]: {
      fontSize: "16px",
    },
  },
  govStakeMinBalanceSpan: {
    color: colors.greyText,
    fontWeight: "normal",
  },
  govStakeWithdrawInputContainer: {
    width: "100%",
    marginBottom: "16px",
  },

  newProposalInputContainer: {
    width: "100%",
    marginBottom: "16px",
  },

  govStakeWithdrawButtonContainer: {
    width: "100%",
    height: "43px",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    [theme.breakpoints.up("ms")]: {
      justifyContent: "flex-end",
    },
  },

  govWithdrawContainer: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    paddingLeft: "24px",
    paddingRight: "24px",
    minWidth: "300px",
  },
  customInputBoxRoot: {
    width: "100%",
    height: 42,
    background: colors.lightGray3,
    borderRadius: 3,
    border: "solid 0px rgba(255, 255, 255, 0.2)",
    color: colors.white,
    padding: "0 12px",
  },

  customInputBoxInput: {
    fontSize: "14px",
    [theme.breakpoints.up("ms")]: {
      fontSize: "16px",
    },
    "&::-webkit-input-placeholder": {
      fontWeight: "normal",
    },
  },

  voteProposalList: {
    width: "100%",
    maxWidth: "900px",
    display: "flex",
    flexDirection: "column",
  },

  loadMoreButton: {
    width: "100%",
    height: "43px",
    color: colors.white,
    backgroundColor: "transparent",
    border: "solid 1px #ffffff",
    borderRadius: "3px",
  },

  loadMoreText: {
    color: colors.white,
  },

  toggleButtonRoot: {
    backgroundColor: "transparent",
    border: "solid 0px transparent",
    color: "white",
  },

  toggleButtonSelected: {
    backgroundColor: "transparent",
    border: "solid 0px transparent",
    borderBottom: "solid 3px white",
  },

  voteActionContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: "24px",
  },

  voteProposalFilters: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    marginLeft: "-24px",
  },

  voteToggleButton: {
    color: colors.white,
    backgroundColor: "transparent",
  },

  voteToggleText: {
    fontWeight: "normal",
    fontSize: "18px",
    color: colors.white,
  },

  voteToggleSelectedMark: {
    width: "calc(100% - 48px)",
    position: "absolute",
    bottom: "4px",
    height: "3px",
    backgroundColor: "white",
  },
  voteCreateProposalButton: {
    color: colors.white,
    backgroundColor: colors.brandBlue,
    borderRadius: "3px",
    padding: "12px 16px",
    boxShadow: "none",
    "&:hover": {
      backgroundColor: colors.transGreyBackgroundHover,
    },
  },

  voteCreateProposalButtonDisabled: {
    opacity: 0.3,
    color: `${colors.white} !important`,
    backgroundColor: `${colors.blue} !important`,
    borderRadius: "3px",
    padding: "12px 16px",
    boxShadow: "none",
    cursor: "not-allowed",
  },

  voteCreateProposalButtonTooltip: {
    padding: "12px 16px",
    fontSize: "14px",
  },

  voteCreateProposalLabel: {
    fontSize: "14px",
    [theme.breakpoints.up("ms")]: {
      fontSize: "16px",
    },
  },
  newProposalParamsContainer: {
    display: "flex",
    flexDirection: "column",
  },
  newProposalParamHeader: {
    fontWeight: "400",
    fontSize: "18px",
    lineHeight: "21px",
    width: "100%",
    textAlign: "left",
  },
  newProposalParamRecord: {
    flex: 1,
    width: "100%",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
  },
  newProposalAddParam: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  newProposalParamRecordHeader: {
    display: "flex",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
  },
  newProposalParamRecordHeaderText: {
    fontSize: "18px",
    lineHeight: "21px",
    letterSpacing: "0.06rem",
    color: colors.white,
  },
  anotherSetButton: {
    backgroundColor: "transparent",
    border: `solid 1px ${colors.white}`,
  },
  anotherSetLabel: {
    color: colors.white,
  },
  linkswapCardHeader: {
    display: "flex",
    width: "100%",
    alignItems: "center",
    marginBottom: "24px",
  },
  mobileLinkswapCardHeader: {
    display: "flex",
    color: colors.white,
    backgroundColor: colors.transGreyBackground,
    borderRadius: "4px",
    width: "100%",
    height: "160px",
    flexDirection: "column",
    marginBottom: "16px",
    padding: "16px",
  },
  linkswapInfoCard: {
    flex: "1",
    height: "86px",
    padding: "16px",
    display: "flex",
    color: colors.white,
    backgroundColor: colors.transGreyBackground,
    borderRadius: "4px",
    minWidth: "250px",
    marginRight: "16px",
    "&:last-child": {
      marginRight: "0px",
    },
  },
  mobileLinkswapInfoCard: {
    flex: "1",
    width: "100%",
    height: "70px",
    padding: "0px",
    display: "flex",
    color: colors.white,
  },

  linkswapInfoIconWrapper: {
    width: "40px",
    height: "40px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: `solid 3px ${colors.white}`,
    borderRadius: "50%",
    marginRight: "16px",
    [theme.breakpoints.up("ms")]: {
      width: "50px",
      height: "50px",
    },
  },
  linkswapInfoTextWrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  linkswapValueText: {
    fontWeight: "bold",
    fontSize: "24px",
    lineHeight: "29px",
    letterSpacing: "0.05rem",
  },
  linkswapValueTip: {
    fontSize: "12px",
    fontWeight: "bold",
    lineHeight: "14px",
    color: colors.greyText,
    marginTop: "4px",
  },
  linkswapActionContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    padding: "8px 16px 16px 16px",
    [theme.breakpoints.up("ms")]: {
      flexDirection: "row",
      height: "200px",
    },
  },
  linkswapStakeContainer: {
    width: "100%",
    height: "136px",
    background: colors.lightBlack2,
    borderRadius: "8px",
    padding: "16px",
    display: "flex",
    flexDirection: "column",
    marginBottom: "12px",
    [theme.breakpoints.up("ms")]: {
      flex: "1",
      height: "100%",
      marginRight: "8px",
      marginBottom: "0px",
    },
  },
  linkswapWithdrawContainer: {
    width: "100%",
    height: "136px",
    background: colors.lightBlack2,
    borderRadius: "8px",
    padding: "16px",
    display: "flex",
    flexDirection: "column",
    marginBottom: "12px",
    [theme.breakpoints.up("ms")]: {
      flex: "1",
      height: "100%",
      marginRight: "8px",
      marginBottom: "0px",
    },
  },
  linkswapConvertContainer: {
    width: "100%",
    height: "180px",
    background: colors.lightBlack2,
    color: colors.white,
    borderRadius: "8px",
    padding: "16px",
    display: "flex",
    flexDirection: "column",
    [theme.breakpoints.up("ms")]: {
      flex: "1",
      height: "100%",
    },
  },
  linkswapSWAHeaderContainer: {
    fontSize: "16px",
    lineHeight: "19px",
    width: "100%",
    color: colors.white,
    marginBottom: "8px",
  },
  linkswapStakeBodyText: {
    fontWeight: "bold",
    fontSize: "20px",
    lineHeight: "24px",
    letterSpacing: "0.05rem",
    color: colors.white,
    marginBottom: "4px",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
    width: "100%",
    [theme.breakpoints.up("ms")]: {
      fontSize: "24px",
    },
  },
  linkswapStakeCommentText: {
    fontFamily: "Helvetica",
    fontSize: "12px",
    lineHeight: "14px",
    color: colors.greyText,
    marginBottom: "4px",
  },
  linkswapStakeWithdrawButtonContainer: {
    flex: "1",
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "flex-start",
  },

  linkswapActionButton: {
    padding: "12px 16px",
    backgroundColor: colors.transGreyBackground,
    borderRadius: "3px",
    color: colors.white,
    height: "43px",
    cursor: "pointer",
    "&:disabled": {
      opacity: 0.3,
      color: colors.white,
    },
    "&:hover": {
      color: colors.grey,
    },
  },
  linkswapActionButtonLabel: {
    fontWeight: "bold",
    fontSize: "16px",
    lineHeight: "20px",
  },
  linkswapConvertBody: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  linkswapRewardItem: {
    flex: "1",
    display: "flex",
    flexDirection: "column",
  },
  linkswapRewardHeader: {
    fontWeight: "normal",
    fontSize: "12px",
    lineHeight: "14px",
    color: colors.white,
    marginBottom: "4px",
  },
  linkswapTotalReward: {
    fontWeight: "bold",
    fontSize: "24px",
    lineHeight: "29px",
    color: colors.white,
  },
  linkswapRewardValue: {
    fontWeight: "bold",
    fontSize: "12px",
    lineHeight: "15px",
    color: colors.white,
    letterSpacing: "0.05rem",
  },
});

const emitter = Store.emitter;
const dispatcher = Store.dispatcher;
const store = Store.store;

function toFixed(bi, decimals, desired) {
  const trunc = decimals - desired;
  const shift = decimals - trunc;
  return (bi.divide(10 ** trunc).toJSNumber() / 10 ** shift).toFixed(desired);
}

class Vote extends Component {
  constructor(props) {
    super(props);

    const account = store.getStore("account");
    const govProposals = store.getStore("govProposals");
    const yYFLProposals = store.getStore("yYFLProposals");
    const pool = store.getStore("currentPool");

    const location = props?.location || {};
    const newUrlParam = new URLSearchParams(location?.search || "");
    let stakingType = 2;
    if (newUrlParam.has("type")) {
      const typeParam = newUrlParam.get("type");
      if (typeParam === "LINKSWAP") {
        stakingType = 2;
      } else if (typeParam === "GOV") {
        stakingType = 0;
      } else if (typeParam === "MEME") {
        stakingType = 1;
      }
    }

    this.state = {
      loading: true,
      account: account,
      pool: pool,
      govProposals: govProposals,
      yYFLProposals: yYFLProposals,
      value: stakingType,
      voteLockValid: false,
      balanceValid: false,
      voteLock: null,
      proposalScreen: false,
      voteModalOpen: false,
      newProposalParams: [],
      isLegacyVault: false,
    };

    if (account && account.address) {
      dispatcher.dispatch({ type: GET_PROPOSALS, content: {} });
    }
  }
  connectionConnected = () => {
    console.log("connectionConnected");
    const newAccount = store.getStore("account");
    this.setState({ account: newAccount });
    if (newAccount && newAccount.address) {
      dispatcher.dispatch({ type: GET_PROPOSALS, content: {} });
    }
    dispatcher.dispatch({ type: CONFIGURE, content: {} });
  };

  connectionDisconnected = () => {
    console.log("connectionDisconnected");
    const newAccount = store.getStore("account");
    this.setState({ account: store.getStore("account") });
    if (!newAccount || !newAccount.address) {
      this.props.history.push("/");
    }
  };

  componentDidMount() {
    emitter.on(ERROR, this.errorReturned);
    emitter.on(CONFIGURE_RETURNED, this.configureReturned);
    emitter.on(PROPOSE_RETURNED, this.showHash);
    emitter.on(GET_PROPOSALS_RETURNED, this.proposalsReturned);
    emitter.on(GET_BALANCES_RETURNED, this.balancesReturned);
    emitter.on(VOTE_FOR_RETURNED, this.showHash);
    emitter.on(VOTE_AGAINST_RETURNED, this.showHash);
    emitter.on(EXECUTE_RETURNED, this.showHash);
    emitter.on(STAKE_RETURNED, this.stakeReturned);
    emitter.on(WITHDRAW_RETURNED, this.withdrawReturned);
    emitter.on(CONNECTION_CONNECTED, this.connectionConnected);
    emitter.on(CONNECTION_DISCONNECTED, this.connectionDisconnected);
    window.scrollTo(0, 0);

    const pools = store.getStore("rewardPools");
    if (pools.length > 0) {
      store.setStore({ currentPool: pools[0] });
      this.setState({ pool: pools[0] });
    }

    setTimeout(() => {
      const account = store.getStore("account");
      if (!account || !account.address) {
        this.props.history.push("/account");
      }
    }, 5000);
  }

  componentWillUnmount() {
    emitter.removeListener(ERROR, this.errorReturned);
    emitter.removeListener(CONFIGURE_RETURNED, this.configureReturned);
    emitter.removeListener(PROPOSE_RETURNED, this.showHash);
    emitter.removeListener(GET_PROPOSALS_RETURNED, this.proposalsReturned);
    emitter.removeListener(VOTE_FOR_RETURNED, this.showHash);
    emitter.removeListener(VOTE_AGAINST_RETURNED, this.showHash);
  }

  errorReturned = (_error) => {
    const snackbarObj = { snackbarMessage: null, snackbarType: null };
    this.setState(snackbarObj);
    this.setState({ loading: false });
    const that = this;
    setTimeout(() => {
      const snackbarObj = {
        snackbarMessage: _error.toString(),
        snackbarType: "Error",
      };
      that.setState(snackbarObj);
    });
  };

  proposalsReturned = () => {
    const govProposals = store.getStore("govProposals");
    const yYFLProposals = store.getStore("yYFLProposals");

    this.setState({
      govProposals: govProposals,
      yYFLProposals: yYFLProposals,
      loading: false,
    });
  };

  balancesReturned = () => {
    const pools = store.getStore("rewardPools");
    if (pools.length > 0) {
      store.setStore({ currentPool: pools[0] });
      this.setState({ pool: pools[0] });
    }
  };

  stakeReturned = (txData) => {
    this.showSnackbar(txData, "Hash");
  };

  withdrawReturned = (txData) => {
    this.showSnackbar(txData, "Hash");
  };

  showHash = (txHash) => {
    this.showSnackbar(txHash, "Hash");
  };

  showAddressCopiedSnack = () => {
    this.showSnackbar("Address Copied to Clipboard", "Success");
  };

  showErrorMessage = (message) => {
    this.showSnackbar(message, "Warning");
  };

  getCurrentToken = (pool, value) => {
    const token =
      value === 0 || value === 1
        ? pool && pool.tokens && pool.tokens[0]
        : pool && pool.tokens && pool.tokens[1];
    return token;
  };

  onPropose = () => {
    this.setState({ urlError: false });
    const { value, url, description, newProposalParams } = this.state;

    if (value === 0 || value === 1) {
      let error = false;
      if (!url || url === "") {
        this.setState({ urlError: "This field is required" });
        error = true;
      }

      if (!error) {
        this.setState({ loading: true });
        dispatcher.dispatch({ type: PROPOSE, content: { url, type: "URL" } });
      }
    } else if (value === 2) {
      let error = false;
      if (!description || description === "") {
        this.setState({ descriptionError: "This field is required" });
        error = true;
      }

      let targetErrors = [];
      let valueErrors = [];
      let signatureErrors = [];
      let calldataErrors = [];

      const proposeParameters = newProposalParams.map((param) => {
        let errorTarget = "";
        if (!param.target) {
          errorTarget = "Invalid target.";
          error = true;
          this.showErrorMessage("Invalid Target");
        }
        let errorValue = "";
        if (!param.value) {
          errorValue = "Invalid value.";
          error = true;
          this.showErrorMessage("Invalid Value");
        }
        let errorSignature = "";
        if (!param.signature) {
          errorSignature = "Invalid signature.";
          error = true;
          this.showErrorMessage("Invalid Signature");
        }

        targetErrors.push(errorTarget);
        valueErrors.push(errorValue);
        signatureErrors.push(errorSignature);

        const params = getSignature(param.signature);
        const callData =
          param.calldata && param.calldata.replace(/\s/g, "").split(",");

        let encodedCalldata = null;
        const abi = new AbiCoder();
        try {
          encodedCalldata = abi.encode(params, callData);
        } catch (error) {
          encodedCalldata = null;
        }

        let errorCalldata = "";
        if (!param.calldata || !encodedCalldata) {
          errorCalldata = "Invalid calldata.";
          error = true;
          this.showErrorMessage("Invalid Call Data");
        }
        calldataErrors.push(errorCalldata);

        return {
          target: param.target,
          value: 0,
          signature: param.signature,
          calldata: encodedCalldata,
        };
      });
      const targetsArray = proposeParameters.map((param) => param.target);
      const valuesArray = proposeParameters.map((param) => param.value);
      const signaturesArray = proposeParameters.map((param) => param.signature);
      const calldatasArray = proposeParameters.map((param) => param.calldata);

      if (!error) {
        this.setState({ loading: true });
        dispatcher.dispatch({
          type: PROPOSE,
          content: {
            description,
            parameters: {
              targets: targetsArray,
              values: valuesArray,
              signatures: signaturesArray,
              calldatas: calldatasArray,
            },
            type: "FUNCTION",
          },
        });
      } else {
        this.setState({
          targetErrors,
          valueErrors,
          signatureErrors,
          calldataErrors,
        });
      }
    }
  };

  showSnackbar = (message, type) => {
    this.setState({
      snackbarMessage: null,
      snackbarType: null,
      loading: false,
    });
    const that = this;
    setTimeout(() => {
      const snackbarObj = { snackbarMessage: message, snackbarType: type };
      that.setState(snackbarObj);
    });
  };

  configureReturned = () => {
    this.setState({ loading: false });
  };

  renderHeader = (screenType) => {
    const { classes } = this.props;
    const { account } = this.state;
    const wallet =
      account.address &&
      account.address.substring(0, 6) +
        "..." +
        account.address.substring(
          account.address.length - 4,
          account.address.length
        );

    if (screenType === "DESKTOP") {
      return (
        <div className={classes.desktopHeaderContainer}>
          <div className={classes.logoContainer}>
            <HeaderLogo />
          </div>
          <div className={classes.linkContainer}>
            <HeaderLink
              text="BUY YFL"
              to={
                "http://linkswap.app/#/swap?outputCurrency=0x28cb7e841ee97947a86b06fa4090c8451f64c0be"
              }
              externalLink={true}
            />
            <HeaderLink
              text="LINKSWAP"
              to={"https://linkswap.app/"}
              externalLink={true}
            />
            <HeaderDropLink
              text="TOOLS"
              to={[
                "https://learn.yflink.io/",
                "https://apycalc.yflink.io/",
                "https://calculator.yflink.io/",
                "https://info.linkswap.app/",
              ]}
              menu={[
                "HELP CENTER",
                "APY CALCULATOR: LP REWARDS",
                "APY CALCULATOR: STAKE & VOTE",
                "ANALYTICS",
              ]}
            />
          </div>
          <div className={classes.walletContainer}>
            {account && account.address && (
              <Button
                className={classes.walletButton}
                variant="contained"
                color="primary"
                onClick={this.overlayClicked}
                startIcon={
                  <FiberManualRecordIcon style={{ color: colors.lightGreen }} />
                }
              >
                <Typography
                  variant={"h4"}
                  className={classes.headerWalletAddress}
                  noWrap
                >
                  {wallet}
                </Typography>
              </Button>
            )}
          </div>
        </div>
      );
    } else {
      return (
        <div className={classes.mobileHeaderContainer}>
          <div className={classes.logoContainer}>
            <HeaderLogo />
          </div>
          <div className={classes.optionsContainer}>
            <IconButton
              onClick={() => {
                this.setState({ navModalOpen: true });
              }}
            >
              <OptionsIcon style={{ color: colors.white }} />
            </IconButton>
          </div>
        </div>
      );
    }
  };

  renderVoteModal = () => {
    const { voteProposal, voteType, account, pool, value } = this.state;
    const token = this.getCurrentToken(pool, value);
    const accBalance =
      (token &&
        token.stakedBalance &&
        toFixed(token.stakedBalance, token.decimals, 3)) ||
      "0";
    const voteLockedValue =
      (token &&
        token.voteLocked &&
        toFixed(token.voteLocked, token.decimals, 3)) ||
      "0";
    return (
      <VoteModal
        closeModal={this.closeVoteModal}
        modalOpen={this.state.voteModalOpen}
        account={account}
        proposal={voteProposal}
        proposalType={value}
        voteType={voteType}
        balance={accBalance}
        voteLocked={voteLockedValue}
        startLoading={this.startLoading}
        decimals={token && token.decimals}
        symbol={token && token.symbol}
      />
    );
  };

  renderNavigationModal = () => {
    const { account } = this.state;
    return (
      <RedirectModal
        closeModal={this.closeNavModal}
        modalOpen={this.state.navModalOpen}
        account={account}
      />
    );
  };
  renderStakeWithdrawModal = () => {
    const {
      pool,
      value,
      stakeOrWithdraw,
      isStakeWithdrawModalShown,
      isLegacyVault,
    } = this.state;
    const yYFLToken = this.getCurrentToken(pool, 2);
    const yflToken = this.getCurrentToken(pool, 0);
    const walletBalance =
      yflToken && yflToken.balance
        ? toFixed(yflToken.balance, yflToken.decimals, 3)
        : "0";
    const stakedBalance =
      yYFLToken && yYFLToken.balance
        ? toFixed(yYFLToken.balance, yYFLToken.decimals, 3)
        : "0";
    const yflUsdPrice =
      yflToken && yflToken.yflPrice ? yflToken.yflPrice.toFixed(3) : "0";
    const yYFLPrice =
      yYFLToken && yYFLToken.yYFLPrice
        ? toFixed(yYFLToken.yYFLPrice, yYFLToken.decimals, 3)
        : "0";

    if (isLegacyVault) {
      const legacyStakedBalance =
        yflToken && yflToken.stakedBalance
          ? toFixed(yflToken.stakedBalance, yflToken.decimals, 3)
          : "0";

      return (
        <StakeWithdrawModal
          closeModal={this.closeStakeWithdrawModal}
          modalOpen={isStakeWithdrawModalShown}
          stakeOrWithdraw={stakeOrWithdraw}
          balance={walletBalance}
          staked={legacyStakedBalance}
          asset={yflToken}
          sourceAsset={yflToken}
          price={yflUsdPrice}
          secondPrice={1}
          decimals={yflToken && yflToken.decimals}
          startLoading={this.startLoading}
          onStakeLegacy={this.onStakeLegacy}
          onWithdrawLegacy={this.onWithdrawLegacy}
          isLegacy={true}
        />
      );
    } else {
      return (
        <StakeWithdrawModal
          closeModal={this.closeStakeWithdrawModal}
          modalOpen={isStakeWithdrawModalShown}
          stakeOrWithdraw={stakeOrWithdraw}
          balance={walletBalance}
          staked={stakedBalance}
          asset={value === 2 ? yYFLToken : yflToken}
          sourceAsset={yflToken}
          price={stakeOrWithdraw === "Stake" ? yflUsdPrice : yYFLPrice}
          secondPrice={stakeOrWithdraw === "Stake" ? yYFLPrice : yflUsdPrice}
          decimals={
            stakeOrWithdraw === "Stake"
              ? yflToken && yflToken.decimals
              : yYFLToken && yYFLToken.decimals
          }
          startLoading={this.startLoading}
        />
      );
    }
  };

  closeStakeWithdrawModal = () => {
    this.setState({ isStakeWithdrawModalShown: false, isLegacy: false });
  };

  renderBackground = (screenType) => {
    const { classes } = this.props;

    if (screenType === "DESKTOP") {
      return (
        <>
          <div className={classes.rightMarkSection} />
          <div className={classes.leftMarkSection} />
        </>
      );
    } else if (screenType === "MOBILE") {
      return <></>;
    }
  };

  renderGovernanceSection = (screenType) => {
    const { classes } = this.props;
    const { pool, value } = this.state;
    const token =
      value === 0 || value === 1
        ? pool && pool.tokens && pool.tokens[0]
        : pool && pool.tokens && pool.tokens[1];

    const yflToken = pool && pool.tokens && pool.tokens[0];
    const yYFLToken = pool && pool.tokens && pool.tokens[1];

    const walletBalance =
      yflToken && yflToken.balance
        ? toFixed(yflToken.balance, yflToken.decimals, 3)
        : "0";
    const stakedYYFLBalance =
      yYFLToken && yYFLToken.balance
        ? toFixed(yYFLToken.balance, yYFLToken.decimals, 3)
        : "0";
    const yflUsdPrice =
      yflToken && yflToken.yflPrice ? yflToken.yflPrice.toFixed(3) : "0";
    const yYFLPrice =
      yYFLToken && yYFLToken.yYFLPrice
        ? toFixed(yYFLToken.yYFLPrice, yYFLToken.decimals, 3)
        : "0";
    const totalSupply =
      yYFLToken && yYFLToken.totalSupply
        ? toFixed(yYFLToken.totalSupply, yYFLToken.decimals, 3) *
          yYFLPrice *
          yflUsdPrice
        : "0";

    // const linkReward =
    //   yYFLToken && yYFLToken.linkBalance
    //     ? toFixed(yYFLToken.linkBalance, 18, 3)
    //     : "0";
    // const wethReward =
    //   yYFLToken && yYFLToken.wethBalance
    //     ? toFixed(yYFLToken.wethBalance, 18, 3)
    //     : "0";
    // const linkPrice = (yYFLToken && yYFLToken.linkPrice) || 0;
    // const wethPrice = (yYFLToken && yYFLToken.wethPrice) || 0;

    // const totalReward =
    //   parseFloat(linkReward) * linkPrice + parseFloat(wethReward) * wethPrice;

    if (value === 0 || value === 1) {
      if (screenType === "DESKTOP") {
        return (
          <div className={classes.desktopSectionStyle}>
            <div className={classes.cardHeaderSection}>
              <Typography variant={"h1"} className={classes.cardHeading}>
                Governance
              </Typography>
            </div>
            <Card className={classes.governanceCard}>
              <div className={classes.governanceCardHeadSection}>
                <IconButton
                  onClick={() => {
                    this.openInstructions();
                  }}
                >
                  <Typography
                    variant={"h4"}
                    className={classes.governanceButtonSpan}
                  >
                    Instructions
                  </Typography>
                  <ArrowRightAltOutlinedIcon style={{ color: colors.white }} />
                </IconButton>
                <IconButton
                  onClick={() => {
                    this.openContract("GOV");
                  }}
                >
                  <Typography
                    variant={"h4"}
                    className={classes.governanceButtonSpan}
                  >
                    Contract
                  </Typography>
                  <ArrowRightAltOutlinedIcon style={{ color: colors.white }} />
                </IconButton>
              </div>
              <div className={classes.governanceCardBodySection}>
                <div className={classes.governanceCardBodyVault}>
                  <IconButton
                    onClick={() => {
                      this.goToDashboard();
                    }}
                  >
                    <img
                      alt="logo"
                      src={require("../../assets/YFLink-header-logo.svg")}
                      className={classes.governanceVaultIcon}
                    />
                    <Typography
                      variant={"h3"}
                      className={classes.governanceVaultButtonSpan}
                    >
                      Governance Vault
                    </Typography>
                  </IconButton>
                </div>
                <div className={classes.govStakeWithdrawContainer}>
                  <div className={classes.govStakeContainer}>
                    <div className={classes.govStakeWithdrawHeaderContainer}>
                      <Typography
                        variant={"h4"}
                        className={classes.govStakeWithdrawBalanceSpan}
                      >
                        Your Balance:&nbsp;
                        {token && token.balance
                          ? toFixed(token.balance, token.decimals, 3)
                          : "Loading..."}{" "}
                        {token && token.symbol}
                      </Typography>
                      <Typography
                        variant={"h4"}
                        className={classes.govStakeMinBalanceSpan}
                      >
                        Min: 0.01 {token && token.symbol}
                      </Typography>
                    </div>
                    <div className={classes.govStakeWithdrawInputContainer}>
                      <InputBase
                        classes={{
                          root: classes.customInputBoxRoot,
                          input: classes.customInputBoxInput,
                        }}
                        onChange={(ev) => {
                          this.setState({
                            stakeAmount: ev.target.value,
                          });
                        }}
                        placeholder="Enter amount you want to deposit."
                        type="number"
                        autoFocus
                      />
                    </div>
                    <div className={classes.govStakeWithdrawButtonContainer}>
                      <Button
                        className={classes.actionButton}
                        variant="outlined"
                        onClick={() => {
                          this.onStake();
                        }}
                        disabled={!token}
                      >
                        <Typography
                          className={classes.actionButtonLabel}
                          variant={"h4"}
                          color={colors.white}
                        >
                          Deposit
                        </Typography>
                      </Button>
                    </div>
                  </div>
                  <div className={classes.govWithdrawContainer}>
                    <div className={classes.govStakeWithdrawHeaderContainer}>
                      <Typography
                        variant={"h4"}
                        className={classes.govStakeWithdrawBalanceSpan}
                      >
                        Staked:&nbsp;
                        {token && token.stakedBalance
                          ? toFixed(token.stakedBalance, token.decimals, 3)
                          : "Loading..."}{" "}
                        {token && token.symbol}
                      </Typography>
                    </div>
                    <div className={classes.govStakeWithdrawInputContainer}>
                      <InputBase
                        classes={{
                          root: classes.customInputBoxRoot,
                          input: classes.customInputBoxInput,
                        }}
                        onChange={(ev) => {
                          this.setState({
                            withdrawAmount: ev.target.value,
                          });
                        }}
                        placeholder="Enter amount you want to withdraw."
                        type="number"
                        autoFocus
                      />
                    </div>
                    <div className={classes.govStakeWithdrawButtonContainer}>
                      <Button
                        className={classes.actionButton}
                        variant="outlined"
                        onClick={() => {
                          this.onWithdraw();
                        }}
                        disabled={!token}
                      >
                        <Typography
                          className={classes.actionButtonLabel}
                          variant={"h4"}
                          color={colors.white}
                        >
                          Withdraw
                        </Typography>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        );
      } else if (screenType === "MOBILE") {
        return (
          <div className={classes.mobileSectionStyle}>
            <div className={classes.cardHeaderSection}>
              <Typography variant={"h1"} className={classes.cardHeading}>
                Governance
              </Typography>
            </div>
            <Card className={classes.governanceCard}>
              <div className={classes.governanceCardHeadSection}>
                <IconButton
                  onClick={() => {
                    this.openInstructions();
                  }}
                >
                  <Typography
                    variant={"h4"}
                    className={classes.governanceButtonSpan}
                  >
                    Instructions
                  </Typography>
                  <ArrowRightAltOutlinedIcon style={{ color: colors.white }} />
                </IconButton>
                <IconButton
                  onClick={() => {
                    this.openContract("GOV");
                  }}
                >
                  <Typography
                    variant={"h4"}
                    className={classes.governanceButtonSpan}
                  >
                    Contract
                  </Typography>
                  <ArrowRightAltOutlinedIcon style={{ color: colors.white }} />
                </IconButton>
              </div>
              <div className={classes.governanceCardBodySection}>
                <div className={classes.governanceCardBodyVault}>
                  <IconButton
                    onClick={() => {
                      this.goToDashboard();
                    }}
                  >
                    <img
                      alt="logo"
                      src={require("../../assets/YFLink-header-logo.svg")}
                      className={classes.governanceVaultIcon}
                    />
                    <Typography
                      variant={"h3"}
                      className={classes.governanceVaultButtonSpan}
                    >
                      Governance Vault
                    </Typography>
                  </IconButton>
                </div>
                <div className={classes.govStakeWithdrawContainer}>
                  <div className={classes.govStakeContainer}>
                    <div className={classes.govStakeWithdrawHeaderContainer}>
                      <Typography
                        variant={"h4"}
                        className={classes.govStakeWithdrawBalanceSpan}
                      >
                        Balance:&nbsp;
                        {token && token.balance
                          ? toFixed(token.balance, token.decimals, 3)
                          : "Loading..."}{" "}
                        {token && token.symbol}
                      </Typography>
                      <Typography
                        variant={"h4"}
                        className={classes.govStakeMinBalanceSpan}
                      >
                        Min: 0.01 {token && token.symbol}
                      </Typography>
                    </div>
                    <div className={classes.govStakeWithdrawInputContainer}>
                      <InputBase
                        classes={{
                          root: classes.customInputBoxRoot,
                          input: classes.customInputBoxInput,
                        }}
                        onChange={(ev) => {
                          this.setState({
                            stakeAmount: ev.target.value,
                          });
                        }}
                        placeholder="Enter amount you want to deposit."
                        type="number"
                        autoFocus
                      />
                    </div>
                    <div className={classes.govStakeWithdrawButtonContainer}>
                      <Button
                        className={classes.actionButton}
                        variant="outlined"
                        onClick={() => {
                          this.onStake();
                        }}
                        disabled={!token}
                      >
                        <Typography
                          className={classes.actionButtonLabel}
                          variant={"h4"}
                          color={colors.white}
                        >
                          Deposit
                        </Typography>
                      </Button>
                    </div>
                  </div>
                  <div className={classes.govWithdrawContainer}>
                    <div className={classes.govStakeWithdrawHeaderContainer}>
                      <Typography
                        variant={"h4"}
                        className={classes.govStakeWithdrawBalanceSpan}
                      >
                        Staked:&nbsp;
                        {token && token.stakedBalance
                          ? toFixed(token.stakedBalance, token.decimals, 3)
                          : "Loading..."}{" "}
                        {token && token.symbol}
                      </Typography>
                    </div>
                    <div className={classes.govStakeWithdrawInputContainer}>
                      <InputBase
                        classes={{
                          root: classes.customInputBoxRoot,
                          input: classes.customInputBoxInput,
                        }}
                        onChange={(ev) => {
                          this.setState({
                            withdrawAmount: ev.target.value,
                          });
                        }}
                        placeholder="Enter amount you want to withdraw."
                        type="number"
                        autoFocus
                      />
                    </div>
                    <div className={classes.govStakeWithdrawButtonContainer}>
                      <Button
                        className={classes.actionButton}
                        variant="outlined"
                        onClick={() => {
                          this.onWithdraw();
                        }}
                        disabled={!token}
                      >
                        <Typography
                          className={classes.actionButtonLabel}
                          variant={"h4"}
                          color={colors.white}
                        >
                          Withdraw
                        </Typography>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        );
      }
    } else if (value === 2) {
      if (screenType === "DESKTOP") {
        return (
          <div className={classes.desktopSectionStyle}>
            <div className={classes.cardHeaderSection}>
              <Typography variant={"h1"} className={classes.cardHeading}>
                Governance
              </Typography>
            </div>
            <div className={classes.linkswapCardHeader}>
              <div className={classes.linkswapInfoCard}>
                <div className={classes.linkswapInfoIconWrapper}>
                  <LockRoundedIcon style={{ color: colors.white }} />
                </div>
                <div className={classes.linkswapInfoTextWrapper}>
                  <span>Total Value Locked</span>
                  <span className={classes.linkswapValueText}>
                    ${totalSupply.toLocaleString()}
                  </span>
                </div>
              </div>
              <div className={classes.linkswapInfoCard}>
                <div className={classes.linkswapInfoIconWrapper}>
                  <AttachMoneyRoundedIcon style={{ color: colors.white }} />
                </div>
                <div className={classes.linkswapInfoTextWrapper}>
                  <span>YFL Price (USDT)</span>
                  <span className={classes.linkswapValueText}>
                    ${yflUsdPrice}
                  </span>
                </div>
              </div>
            </div>
            <Card className={classes.governanceCard}>
              <div className={classes.governanceCardHeadSection}>
                <IconButton
                  onClick={() => {
                    this.openInstructions();
                  }}
                >
                  <Typography
                    variant={"h4"}
                    className={classes.governanceButtonSpan}
                  >
                    Instructions
                  </Typography>
                  <ArrowRightAltOutlinedIcon style={{ color: colors.white }} />
                </IconButton>
                <IconButton
                  onClick={() => {
                    this.openContract("LINKSWAP");
                  }}
                >
                  <Typography
                    variant={"h4"}
                    className={classes.governanceButtonSpan}
                  >
                    Contract
                  </Typography>
                  <ArrowRightAltOutlinedIcon style={{ color: colors.white }} />
                </IconButton>
                <IconButton
                  onClick={() => {
                    this.setState({
                      isLegacyVault: true,
                      stakeOrWithdraw: "Unstake",
                      isStakeWithdrawModalShown: true,
                    });
                  }}
                >
                  <Typography
                    variant={"h4"}
                    className={classes.governanceButtonSpan}
                  >
                    Unstake from legacy vault
                  </Typography>
                  <ArrowRightAltOutlinedIcon style={{ color: colors.white }} />
                </IconButton>
              </div>
              <div className={classes.governanceCardBodySection}>
                <div className={classes.governanceCardBodyVault}>
                  <IconButton onClick={() => {}}>
                    <img
                      alt="logo"
                      src={require("../../assets/YFLink-header-logo.svg")}
                      className={classes.governanceVaultIcon}
                    />
                    <Typography
                      variant={"h3"}
                      className={classes.governanceVaultButtonSpan}
                    >
                      My Vault
                    </Typography>
                  </IconButton>
                </div>
                <div className={classes.linkswapActionContainer}>
                  <div className={classes.linkswapStakeContainer}>
                    <Typography
                      variant={"h4"}
                      className={classes.linkswapSWAHeaderContainer}
                    >
                      Wallet Balance (YFL)
                    </Typography>
                    <Typography
                      variant={"h4"}
                      className={classes.linkswapStakeBodyText}
                    >
                      {walletBalance} YFL
                    </Typography>
                    <Typography
                      variant={"h4"}
                      className={classes.linkswapStakeCommentText}
                    >
                      ≈ ${(walletBalance * yflUsdPrice).toFixed(3)}
                    </Typography>
                    <div
                      className={classes.linkswapStakeWithdrawButtonContainer}
                    >
                      <Tooltip
                        TransitionComponent={Zoom}
                        title="Stake your YFL. Your YFL will be converted to yYFL. Note that there is a 1% unstaking fee if you unstake before 172800 blocks (approximately 26 days) from your time of staking, which will go to the treasury."
                        placement="top"
                        classes={{
                          tooltip: classes.voteCreateProposalButtonTooltip,
                        }}
                      >
                        <Button
                          className={classes.linkswapActionButton}
                          variant="contained"
                          onClick={() => {
                            this.setState({
                              stakeOrWithdraw: "Stake",
                              isLegacyVault: false,
                              isStakeWithdrawModalShown: true,
                            });
                          }}
                          disabled={!token}
                        >
                          <Typography
                            className={classes.linkswapActionButtonLabel}
                            variant={"h4"}
                            color={colors.white}
                          >
                            Stake
                          </Typography>
                        </Button>
                      </Tooltip>
                    </div>
                  </div>
                  <div className={classes.linkswapWithdrawContainer}>
                    <Typography
                      variant={"h4"}
                      className={classes.linkswapSWAHeaderContainer}
                    >
                      Staked YFL
                    </Typography>
                    <Typography
                      variant={"h4"}
                      className={classes.linkswapStakeBodyText}
                    >
                      {(stakedYYFLBalance * yYFLPrice).toFixed(3)} YFL
                    </Typography>
                    <Typography
                      variant={"h4"}
                      className={classes.linkswapStakeCommentText}
                    >
                      ≈ {stakedYYFLBalance} yYFL
                    </Typography>
                    <Typography
                      variant={"h4"}
                      className={classes.linkswapStakeCommentText}
                    >
                      ≈ $
                      {(stakedYYFLBalance * yYFLPrice * yflUsdPrice)
                        .toFixed(3)
                        .toLocaleString()}
                    </Typography>
                    <div
                      className={classes.linkswapStakeWithdrawButtonContainer}
                    >
                      <Tooltip
                        TransitionComponent={Zoom}
                        title="Unstake your YFL. Your yYFL will be converted back to YFL. Note that there is a 1% unstaking fee if you unstake before 172800 blocks (approximately 26 days) from your time of staking, which will go to the treasury."
                        placement="top"
                        classes={{
                          tooltip: classes.voteCreateProposalButtonTooltip,
                        }}
                      >
                        <Button
                          className={classes.linkswapActionButton}
                          variant="contained"
                          onClick={() => {
                            this.setState({
                              isLegacyVault: false,
                              isStakeWithdrawModalShown: true,
                              stakeOrWithdraw: "Unstake",
                            });
                          }}
                          disabled={!token}
                        >
                          <Typography
                            className={classes.linkswapActionButtonLabel}
                            variant={"h4"}
                            color={colors.white}
                          >
                            Unstake
                          </Typography>
                        </Button>
                      </Tooltip>
                    </div>
                  </div>
                  <div className={classes.linkswapConvertContainer}>
                    <Typography
                      variant={"h4"}
                      className={classes.linkswapSWAHeaderContainer}
                    >
                      yYFL Price
                    </Typography>
                    <div className={classes.linkswapConvertBody}>
                      <div className={classes.linkswapInfoTextWrapper}>
                        <span className={classes.linkswapValueText}>
                          {yYFLPrice} YFL
                        </span>
                      </div>
                    </div>
                    <div
                      className={classes.linkswapStakeWithdrawButtonContainer}
                    >
                      <span className={classes.linkswapValueTip}>
                        yYFL price increases after each reward distribution. YFL
                        rewards are staked in the governance vault. Unstaking
                        YFL converts yYFL back to your original amount of YFL
                        staked plus distributed rewards
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        );
      } else if (screenType === "MOBILE") {
        return (
          <div className={classes.mobileSectionStyle}>
            <div className={classes.cardHeaderSection}>
              <Typography variant={"h1"} className={classes.cardHeading}>
                Governance
              </Typography>
            </div>
            <div className={classes.mobileLinkswapCardHeader}>
              <div className={classes.mobileLinkswapInfoCard}>
                <div className={classes.linkswapInfoIconWrapper}>
                  <LockRoundedIcon style={{ color: colors.white }} />
                </div>
                <div className={classes.linkswapInfoTextWrapper}>
                  <span>Total Value Locked</span>
                  <span className={classes.linkswapValueText}>
                    ${totalSupply.toLocaleString()}
                  </span>
                </div>
              </div>
              <div className={classes.mobileLinkswapInfoCard}>
                <div className={classes.linkswapInfoIconWrapper}>
                  <AttachMoneyRoundedIcon style={{ color: colors.white }} />
                </div>
                <div className={classes.linkswapInfoTextWrapper}>
                  <span>YFL Price (USDT)</span>
                  <span className={classes.linkswapValueText}>
                    ${yflUsdPrice}
                  </span>
                </div>
              </div>
            </div>
            <Card className={classes.governanceCard}>
              <div className={classes.governanceCardHeadSection}>
                <IconButton
                  className={classes.governanceIconButton}
                  onClick={() => {
                    this.openInstructions();
                  }}
                >
                  <Typography
                    variant={"h4"}
                    className={classes.governanceButtonSpan}
                  >
                    Instructions
                  </Typography>
                  <ArrowRightAltOutlinedIcon style={{ color: colors.white }} />
                </IconButton>
                <IconButton
                  className={classes.governanceIconButton}
                  onClick={() => {
                    this.openContract("LINKSWAP");
                  }}
                >
                  <Typography
                    variant={"h4"}
                    className={classes.governanceButtonSpan}
                  >
                    Contract
                  </Typography>
                  <ArrowRightAltOutlinedIcon style={{ color: colors.white }} />
                </IconButton>
                <IconButton
                  className={classes.governanceIconButton}
                  onClick={() => {
                    this.setState({
                      isLegacyVault: true,
                      isStakeWithdrawModalShown: true,
                      stakeOrWithdraw: "Unstake",
                    });
                  }}
                >
                  <Typography
                    variant={"h4"}
                    className={classes.governanceButtonSpan}
                  >
                    legacy vault
                  </Typography>
                  <ArrowRightAltOutlinedIcon style={{ color: colors.white }} />
                </IconButton>
              </div>
              <div className={classes.governanceCardBodySection}>
                <div className={classes.governanceCardBodyVault}>
                  <IconButton
                    onClick={() => {
                      this.goToDashboard();
                    }}
                  >
                    <img
                      alt="logo"
                      src={require("../../assets/YFLink-header-logo.svg")}
                      className={classes.governanceVaultIcon}
                    />
                    <Typography
                      variant={"h3"}
                      className={classes.governanceVaultButtonSpan}
                    >
                      My Vault
                    </Typography>
                  </IconButton>
                </div>
                <div className={classes.linkswapActionContainer}>
                  <div className={classes.linkswapStakeContainer}>
                    <Typography
                      variant={"h4"}
                      className={classes.linkswapSWAHeaderContainer}
                    >
                      Wallet Balance (YFL)
                    </Typography>
                    <Typography
                      variant={"h4"}
                      className={classes.linkswapStakeBodyText}
                    >
                      {walletBalance} YFL
                      <Typography
                        variant={"h4"}
                        className={classes.linkswapStakeCommentText}
                      >
                        ≈ ${(walletBalance * yflUsdPrice).toFixed(3)}
                      </Typography>
                    </Typography>
                    <div
                      className={classes.linkswapStakeWithdrawButtonContainer}
                    >
                      <Button
                        className={classes.linkswapActionButton}
                        variant="contained"
                        onClick={() => {
                          this.setState({
                            stakeOrWithdraw: "Stake",
                            isLegacyVault: false,
                            isStakeWithdrawModalShown: true,
                          });
                        }}
                        disabled={!token}
                      >
                        <Typography
                          className={classes.linkswapActionButtonLabel}
                          variant={"h4"}
                          color={colors.white}
                        >
                          Stake
                        </Typography>
                      </Button>
                    </div>
                  </div>
                  <div className={classes.linkswapWithdrawContainer}>
                    <Typography
                      variant={"h4"}
                      className={classes.linkswapSWAHeaderContainer}
                    >
                      Staked YFL
                    </Typography>
                    <Typography
                      variant={"h4"}
                      className={classes.linkswapStakeBodyText}
                    >
                      {(stakedYYFLBalance * yYFLPrice).toFixed(3)} YFL
                      <div>
                        <Typography
                          variant={"h4"}
                          className={classes.linkswapStakeCommentText}
                        >
                          ≈ {stakedYYFLBalance} yYFL
                        </Typography>
                        <Typography
                          variant={"h4"}
                          className={classes.linkswapStakeCommentText}
                        >
                          ≈ $
                          {(stakedYYFLBalance * yYFLPrice * yflUsdPrice)
                            .toFixed(3)
                            .toLocaleString()}
                        </Typography>
                      </div>
                    </Typography>
                    <div
                      className={classes.linkswapStakeWithdrawButtonContainer}
                    >
                      <Button
                        className={classes.linkswapActionButton}
                        variant="contained"
                        onClick={() => {
                          this.setState({
                            stakeOrWithdraw: "Unstake",
                            isLegacyVault: false,
                            isStakeWithdrawModalShown: true,
                          });
                        }}
                        disabled={!token}
                      >
                        <Typography
                          className={classes.linkswapActionButtonLabel}
                          variant={"h4"}
                          color={colors.white}
                        >
                          Unstake
                        </Typography>
                      </Button>
                    </div>
                  </div>
                  <div className={classes.linkswapConvertContainer}>
                    <Typography
                      variant={"h4"}
                      className={classes.linkswapSWAHeaderContainer}
                    >
                      yYFL Price
                    </Typography>
                    <div className={classes.linkswapConvertBody}>
                      <div className={classes.linkswapInfoTextWrapper}>
                        <span className={classes.linkswapValueText}>
                          {yYFLPrice} YFL
                        </span>
                      </div>
                    </div>
                    <div
                      className={classes.linkswapStakeWithdrawButtonContainer}
                    >
                      <span className={classes.linkswapValueTip}>
                        yYFL price increases after each reward distribution. YFL
                        rewards are staked in the governance vault. Unstaking
                        YFL converts yYFL back to your original amount of YFL
                        staked plus distributed rewards
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        );
      }
    }
  };

  renderNewProposalSection = (screenType) => {
    const { classes } = this.props;
    const {
      urlError,
      descriptionError,
      newProposalParams,
      targetErrors,
      valueErrors,
      signatureErrors,
      calldataErrors,
      value,
    } = this.state;

    if (screenType === "DESKTOP") {
      return (
        <div className={classes.desktopSectionStyle}>
          <div className={classes.cardPreviousSection}>
            <IconButton
              onClick={() => {
                this.setState({ proposalScreen: false });
              }}
            >
              <ArrowBackOutlinedIcon style={{ color: colors.white }} />
              <Typography
                variant={"h4"}
                className={classes.previousButtonStyle}
              >
                Back to Vote
              </Typography>
            </IconButton>{" "}
          </div>
          <div className={classes.newProposalCardHeaderSection}>
            <Typography variant={"h1"} className={classes.cardHeading}>
              Create a new proposal
            </Typography>
          </div>
          <Card className={classes.newProposalCard}>
            <div className={classes.newProposalCardHeadSection}>
              <IconButton
                onClick={() => {
                  this.openInstructions();
                }}
              >
                <Typography
                  variant={"h4"}
                  className={classes.newProposalButtonSpan}
                >
                  Instructions
                </Typography>
                <ArrowRightAltOutlinedIcon style={{ color: colors.white }} />
              </IconButton>
              <IconButton
                onClick={() => {
                  this.openForumSite();
                }}
              >
                <Typography
                  variant={"h4"}
                  className={classes.newProposalButtonSpan}
                >
                  Governance Forum Site
                </Typography>
                <ArrowRightAltOutlinedIcon style={{ color: colors.white }} />
              </IconButton>
            </div>
            {(value === 0 || value === 1) && (
              <div className={classes.newProposalCardBodySection}>
                <div className={classes.newProposalCardBodyVault}>
                  <Typography
                    variant={"h3"}
                    className={classes.newProposalVaultButtonSpan}
                  >
                    Proposal URL
                  </Typography>
                </div>
                <div className={classes.newProposalActionContainer}>
                  <div className={classes.newProposalInputContainer}>
                    <InputBase
                      classes={{
                        root: classes.newProposalInput,
                        input: classes.customInputBoxInput,
                        error: classes.newProposalError,
                      }}
                      onChange={(ev) => {
                        this.setState({
                          url: ev.target.value,
                        });
                      }}
                      placeholder="Enter proposal URL from YFL Governance Forum"
                      type="text"
                      autoFocus
                      error={urlError}
                    />
                  </div>
                  <div className={classes.newProposalCommentContainer}>
                    <Typography
                      variant={"h4"}
                      className={classes.newProposalComment}
                    >
                      Append ?meme to the proposal URL to submit in the memes
                      category.
                    </Typography>
                  </div>
                  <div className={classes.newProposalButtonContainer}>
                    <Button
                      variant="contained"
                      classes={{
                        root: classes.voteCreateProposalButton,
                        disabled: classes.voteCreateProposalButtonDisabled,
                      }}
                      onClick={() => {
                        this.onPropose();
                      }}
                    >
                      <Typography
                        variant="h4"
                        className={classes.voteCreateProposalLabel}
                      >
                        Create Proposal
                      </Typography>
                    </Button>
                  </div>
                </div>
              </div>
            )}
            {value === 2 && (
              <div className={classes.newProposalCardBodySection}>
                <div className={classes.newProposalCardBodyVault}>
                  <Typography
                    variant={"h3"}
                    className={classes.newProposalVaultButtonSpan}
                  >
                    New Proposal
                  </Typography>
                </div>

                <div className={classes.newProposalActionContainer}>
                  <div className={classes.newProposalInputContainer}>
                    <InputBase
                      classes={{
                        root: classes.newProposalInput,
                        input: classes.customInputBoxInput,
                        error: classes.newProposalError,
                      }}
                      onChange={(ev) => {
                        this.setState({
                          description: ev.target.value,
                        });
                      }}
                      placeholder="Enter proposal description"
                      type="text"
                      autoFocus
                      error={descriptionError}
                    />
                  </div>
                  <div className={classes.newProposalParamsContainer}>
                    {newProposalParams?.map((param, index) => (
                      <div
                        key={param.id}
                        className={classes.newProposalParamRecord}
                      >
                        <div className={classes.newProposalParamRecordHeader}>
                          <span
                            className={classes.newProposalParamRecordHeaderText}
                          >
                            Functions - {index + 1}st Set
                          </span>
                          <IconButton
                            onClick={(ev) => {
                              let updatedProposalParams = newProposalParams.filter(
                                (item, itrIndex) => itrIndex !== index
                              );
                              this.setState({
                                newProposalParams: updatedProposalParams,
                              });
                            }}
                          >
                            <HighlightOffRoundedIcon
                              style={{
                                width: "24px",
                                height: "24px",
                                color: colors.white,
                              }}
                            />
                          </IconButton>
                        </div>
                        <InputBase
                          classes={{
                            root: classes.newProposalParamInput,
                            input: classes.customInputBoxInput,
                            error: classes.newProposalError,
                          }}
                          onChange={(ev) => {
                            let updatedProposalParams = [...newProposalParams];
                            updatedProposalParams[index] = {
                              ...updatedProposalParams[index],
                              target: ev.target.value,
                            };
                            this.setState({
                              newProposalParams: updatedProposalParams,
                            });
                          }}
                          placeholder="Target"
                          type="text"
                          error={targetErrors && targetErrors[index]}
                        />
                        <InputBase
                          classes={{
                            root: classes.newProposalParamInput,
                            input: classes.customInputBoxInput,
                            error: classes.newProposalError,
                          }}
                          onChange={(ev) => {
                            let updatedProposalParams = [...newProposalParams];
                            updatedProposalParams[index] = {
                              ...updatedProposalParams[index],
                              value: ev.target.value,
                            };
                            this.setState({
                              newProposalParams: updatedProposalParams,
                            });
                          }}
                          placeholder="Value"
                          type="number"
                          error={valueErrors && valueErrors[index]}
                        />
                        <InputBase
                          classes={{
                            root: classes.newProposalParamInput,
                            input: classes.customInputBoxInput,
                            error: classes.newProposalError,
                          }}
                          onChange={(ev) => {
                            let updatedProposalParams = [...newProposalParams];
                            updatedProposalParams[index] = {
                              ...updatedProposalParams[index],
                              signature: ev.target.value,
                            };
                            this.setState({
                              newProposalParams: updatedProposalParams,
                            });
                          }}
                          placeholder="signature"
                          type="text"
                          error={signatureErrors && signatureErrors[index]}
                        />
                        <InputBase
                          classes={{
                            root: classes.newProposalParamInput,
                            input: classes.customInputBoxInput,
                            error: classes.newProposalError,
                          }}
                          onChange={(ev) => {
                            let updatedProposalParams = [...newProposalParams];
                            updatedProposalParams[index] = {
                              ...updatedProposalParams[index],
                              calldata: ev.target.value,
                            };
                            this.setState({
                              newProposalParams: updatedProposalParams,
                            });
                          }}
                          placeholder="Call Data"
                          type="text"
                          error={calldataErrors && calldataErrors[index]}
                        />
                      </div>
                    ))}
                  </div>
                  <div className={classes.newProposalAddParam}>
                    <Button
                      className={classes.anotherSetButton}
                      variant="outlined"
                      onClick={(ev) => {
                        const updatedParams = [
                          ...newProposalParams,
                          {
                            id: new Date().getTime(),
                            target: "",
                            value: 0,
                            signature: "",
                            calldata: "",
                          },
                        ];
                        this.setState({ newProposalParams: updatedParams });
                      }}
                    >
                      <AddIcon
                        style={{
                          width: "24px",
                          height: "24px",
                          color: colors.white,
                        }}
                      />
                      <Typography
                        variant="h4"
                        className={classes.anotherSetLabel}
                      >
                        Another Set
                      </Typography>
                    </Button>
                  </div>
                  <div className={classes.newProposalButtonContainer}>
                    <Button
                      variant="contained"
                      classes={{
                        root: classes.voteCreateProposalButton,
                        disabled: classes.voteCreateProposalButtonDisabled,
                      }}
                      onClick={() => {
                        this.onPropose();
                      }}
                    >
                      <Typography
                        variant="h4"
                        className={classes.voteCreateProposalLabel}
                      >
                        Create Proposal
                      </Typography>
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </Card>
        </div>
      );
    } else if (screenType === "MOBILE") {
      return (
        <div className={classes.mobileSectionStyle}>
          <div className={classes.cardPreviousSection}>
            <IconButton
              onClick={() => {
                this.setState({ proposalScreen: false });
              }}
            >
              <ArrowBackOutlinedIcon style={{ color: colors.white }} />
              <Typography
                variant={"h4"}
                className={classes.previousButtonStyle}
              >
                Back to Vote
              </Typography>
            </IconButton>{" "}
          </div>
          <div className={classes.newProposalCardHeaderSection}>
            <Typography variant={"h1"} className={classes.cardHeading}>
              Create a new proposal
            </Typography>
          </div>
          <Card className={classes.newProposalCard}>
            <div className={classes.newProposalCardHeadSection}>
              <IconButton
                onClick={() => {
                  this.openInstructions();
                }}
              >
                <Typography
                  variant={"h4"}
                  className={classes.newProposalButtonSpan}
                >
                  Instructions
                </Typography>
                <ArrowRightAltOutlinedIcon style={{ color: colors.white }} />
              </IconButton>
              <IconButton
                onClick={() => {
                  this.openForumSite();
                }}
              >
                <Typography
                  variant={"h4"}
                  className={classes.newProposalButtonSpan}
                >
                  Governance Forum Site
                </Typography>
                <ArrowRightAltOutlinedIcon style={{ color: colors.white }} />
              </IconButton>
            </div>
            {(value === 0 || value === 1) && (
              <div className={classes.newProposalCardBodySection}>
                <div className={classes.newProposalCardBodyVault}>
                  <Typography
                    variant={"h3"}
                    className={classes.newProposalVaultButtonSpan}
                  >
                    Proposal URL
                  </Typography>
                </div>
                <div className={classes.newProposalActionContainer}>
                  <div className={classes.newProposalInputContainer}>
                    <InputBase
                      classes={{
                        root: classes.newProposalInput,
                        input: classes.customInputBoxInput,
                        error: classes.newProposalError,
                      }}
                      onChange={(ev) => {
                        this.setState({
                          url: ev.target.value,
                        });
                      }}
                      placeholder="Enter proposal URL from YFL Governance Forum"
                      type="text"
                      autoFocus
                      error={urlError}
                    />
                  </div>
                  <div className={classes.newProposalCommentContainer}>
                    <Typography
                      variant={"h4"}
                      className={classes.newProposalComment}
                    >
                      Append ?meme to the proposal URL to submit in the memes
                      category.
                    </Typography>
                  </div>
                  <div className={classes.newProposalButtonContainer}>
                    <Button
                      variant="contained"
                      classes={{
                        root: classes.voteCreateProposalButton,
                        disabled: classes.voteCreateProposalButtonDisabled,
                      }}
                      onClick={() => {
                        this.onPropose();
                      }}
                    >
                      <Typography
                        variant="h4"
                        className={classes.voteCreateProposalLabel}
                      >
                        Generate New Proposal
                      </Typography>
                    </Button>
                  </div>
                </div>
              </div>
            )}
            {value === 2 && (
              <div className={classes.newProposalCardBodySection}>
                <div className={classes.newProposalCardBodyVault}>
                  <Typography
                    variant={"h3"}
                    className={classes.newProposalVaultButtonSpan}
                  >
                    New Proposal
                  </Typography>
                </div>

                <div className={classes.newProposalActionContainer}>
                  <div className={classes.newProposalInputContainer}>
                    <InputBase
                      classes={{
                        root: classes.newProposalInput,
                        input: classes.customInputBoxInput,
                        error: classes.newProposalError,
                      }}
                      onChange={(ev) => {
                        this.setState({
                          description: ev.target.value,
                        });
                      }}
                      placeholder="Enter proposal description"
                      type="text"
                      autoFocus
                      error={descriptionError}
                    />
                  </div>
                  <div className={classes.newProposalParamsContainer}>
                    {newProposalParams?.map((param, index) => (
                      <div
                        key={param.id}
                        className={classes.newProposalParamRecord}
                      >
                        <InputBase
                          classes={{
                            root: classes.newProposalParamInput,
                            input: classes.customInputBoxInput,
                            error: classes.newProposalError,
                          }}
                          onChange={(ev) => {
                            let updatedProposalParams = [...newProposalParams];
                            updatedProposalParams[index] = {
                              ...updatedProposalParams[index],
                              target: ev.target.value,
                            };
                            this.setState({
                              newProposalParams: updatedProposalParams,
                            });
                          }}
                          placeholder="Target"
                          type="text"
                          error={targetErrors && targetErrors[index]}
                        />
                        <InputBase
                          classes={{
                            root: classes.newProposalParamInput,
                            input: classes.customInputBoxInput,
                            error: classes.newProposalError,
                          }}
                          onChange={(ev) => {
                            let updatedProposalParams = [...newProposalParams];
                            updatedProposalParams[index] = {
                              ...updatedProposalParams[index],
                              value: ev.target.value,
                            };
                            this.setState({
                              newProposalParams: updatedProposalParams,
                            });
                          }}
                          placeholder="Value"
                          type="number"
                          error={valueErrors && valueErrors[index]}
                        />
                        <InputBase
                          classes={{
                            root: classes.newProposalParamInput,
                            input: classes.customInputBoxInput,
                            error: classes.newProposalError,
                          }}
                          onChange={(ev) => {
                            let updatedProposalParams = [...newProposalParams];
                            updatedProposalParams[index] = {
                              ...updatedProposalParams[index],
                              signature: ev.target.value,
                            };
                            this.setState({
                              newProposalParams: updatedProposalParams,
                            });
                          }}
                          placeholder="signature"
                          type="text"
                          error={signatureErrors && signatureErrors[index]}
                        />
                        <InputBase
                          classes={{
                            root: classes.newProposalParamInput,
                            input: classes.customInputBoxInput,
                            error: classes.newProposalError,
                          }}
                          onChange={(ev) => {
                            let updatedProposalParams = [...newProposalParams];
                            updatedProposalParams[index] = {
                              ...updatedProposalParams[index],
                              calldata: ev.target.value,
                            };
                            this.setState({
                              newProposalParams: updatedProposalParams,
                            });
                          }}
                          placeholder="callldata"
                          type="text"
                          error={calldataErrors && calldataErrors[index]}
                        />
                        <IconButton
                          onClick={(ev) => {
                            let updatedProposalParams = newProposalParams.filter(
                              (item, itrIndex) => itrIndex !== index
                            );
                            this.setState({
                              newProposalParams: updatedProposalParams,
                            });
                          }}
                        >
                          <HighlightOffRoundedIcon
                            style={{
                              width: "24px",
                              height: "24px",
                              color: colors.white,
                            }}
                          />
                        </IconButton>
                      </div>
                    ))}
                  </div>
                  <div className={classes.newProposalAddParam}>
                    <IconButton
                      onClick={(ev) => {
                        const updatedParams = [
                          ...newProposalParams,
                          {
                            id: new Date().getTime(),
                            target: "",
                            value: 0,
                            signature: "",
                            calldata: "",
                          },
                        ];
                        this.setState({ newProposalParams: updatedParams });
                      }}
                    >
                      <AddIcon
                        style={{
                          width: "24px",
                          height: "24px",
                          color: colors.white,
                        }}
                      />
                    </IconButton>
                  </div>
                  <div className={classes.newProposalButtonContainer}>
                    <Button
                      variant="contained"
                      classes={{
                        root: classes.voteCreateProposalButton,
                        disabled: classes.voteCreateProposalButtonDisabled,
                      }}
                      onClick={() => {
                        this.onPropose();
                      }}
                    >
                      <Typography
                        variant="h4"
                        className={classes.voteCreateProposalLabel}
                      >
                        Create Proposal
                      </Typography>
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </Card>
        </div>
      );
    }
  };

  renderVoteSection = (screenType) => {
    const { classes } = this.props;
    const { value, pool } = this.state;
    const token = this.getCurrentToken(pool, value);
    const stakedBalance =
      (token &&
        token.stakedBalance &&
        toFixed(token.stakedBalance, token.decimals, 3)) ||
      "0";
    const accBalance =
      (token && token.balance && toFixed(token.balance, token.decimals, 3)) ||
      "0";

    const yYFLToken = this.getCurrentToken(pool, 2);

    const yYFLBalance =
      (yYFLToken &&
        yYFLToken.balance &&
        toFixed(yYFLToken.balance, yYFLToken.decimals, 3)) ||
      "0";
    const yflToken = this.getCurrentToken(pool, 0);
    const yflBalance =
      (yflToken &&
        yflToken.balance &&
        toFixed(yflToken.balance, yflToken.decimals, 3)) ||
      "0";
    const isGenPossible =
      value === 2
        ? yYFLBalance >= 0.01 || yflBalance >= 0.01
        : stakedBalance >= 0.01 || accBalance >= 0.01;

    if (screenType === "DESKTOP") {
      return (
        <div className={classes.desktopSectionStyle}>
          <div className={classes.cardHeaderSection}>
            <Typography variant={"h1"} className={classes.cardHeading}>
              Vote
            </Typography>
          </div>
          <div className={classes.voteActionContainer}>
            <div className={classes.voteProposalFilters}>
              {/* <Button
                className={classes.voteToggleButton}
                variant="text"
                onClick={() => {
                  this.handleTabChange(null, 0);
                }}
              >
                <Typography variant="h4" className={classes.voteToggleText}>
                  VAULT v1
                </Typography>
                {value === 0 && (
                  <div className={classes.voteToggleSelectedMark} />
                )}
              </Button> */}
              <Button
                className={classes.voteToggleButton}
                variant="text"
                onClick={() => {
                  this.handleTabChange(null, 2);
                }}
              >
                <Typography variant="h4" className={classes.voteToggleText}>
                  LINKSWAP
                </Typography>
                {value === 2 && (
                  <div className={classes.voteToggleSelectedMark} />
                )}
              </Button>
            </div>
            <Tooltip
              TransitionComponent={Zoom}
              title="Minimum of 0.01 YFL (Staked) is required in order to generate a new proposal"
              placement="top"
              classes={{
                tooltip: classes.voteCreateProposalButtonTooltip,
              }}
            >
              {isGenPossible ? (
                <Button
                  variant="contained"
                  classes={{
                    root: classes.voteCreateProposalButton,
                    disabled: classes.voteCreateProposalButtonDisabled,
                  }}
                  onClick={() => {
                    this.setState({
                      proposalScreen: true,
                      newProposalParams: [],
                      targetErrors: [],
                      valueErrors: [],
                      signatureErrors: [],
                      calldataErrors: [],
                    });
                  }}
                >
                  <Typography
                    variant="h4"
                    className={classes.voteCreateProposalLabel}
                  >
                    Generate New Proposal
                  </Typography>
                </Button>
              ) : (
                <Button
                  variant="contained"
                  classes={{
                    root: classes.voteCreateProposalButtonDisabled,
                  }}
                >
                  <Typography
                    variant="h4"
                    className={classes.voteCreateProposalLabel}
                  >
                    Generate New Proposal
                  </Typography>
                </Button>
              )}
            </Tooltip>
          </div>
          <div className={classes.voteProposalList}>
            {this.renderProposals()}
            <Button
              variant="outlined"
              className={classes.loadMoreButton}
              onClick={() => {
                this.loadMore();
              }}
            >
              <Typography variant="h4" className={classes.loadMoreText}>
                Reload
              </Typography>
            </Button>
          </div>
        </div>
      );
    } else if (screenType === "MOBILE") {
      return (
        <div className={classes.mobileSectionStyle}>
          <div className={classes.cardHeaderSection}>
            <Typography variant={"h1"} className={classes.cardHeading}>
              Vote
            </Typography>
            <Button
              variant="contained"
              classes={{
                root: classes.voteCreateProposalButton,
                disabled: classes.voteCreateProposalButtonDisabled,
              }}
              disabled={!isGenPossible}
            >
              <Typography
                variant="h4"
                className={classes.voteCreateProposalLabel}
                onClick={() => {
                  this.setState({
                    proposalScreen: true,
                    newProposalParams: [],
                    targetErrors: [],
                    valueErrors: [],
                    signatureErrors: [],
                    calldataErrors: [],
                  });
                }}
              >
                Generate New Proposal
              </Typography>
            </Button>
          </div>
          <div className={classes.voteActionContainer}>
            <div className={classes.voteProposalFilters}>
              {/* <Button
                className={classes.voteToggleButton}
                variant="text"
                onClick={() => {
                  this.handleTabChange(null, 0);
                }}
              >
                <Typography variant="h4" className={classes.voteToggleText}>
                  VAULT v1
                </Typography>
                {value === 0 && (
                  <div className={classes.voteToggleSelectedMark} />
                )}
              </Button> */}
              <Button
                className={classes.voteToggleButton}
                variant="text"
                onClick={() => {
                  this.handleTabChange(null, 2);
                }}
              >
                <Typography variant="h4" className={classes.voteToggleText}>
                  LINKSWAP
                </Typography>
                {value === 2 && (
                  <div className={classes.voteToggleSelectedMark} />
                )}
              </Button>
            </div>
          </div>
          <div className={classes.voteProposalList}>
            {this.renderProposals()}
            <Button
              variant="outlined"
              className={classes.loadMoreButton}
              onClick={() => {
                this.loadMore();
              }}
            >
              <Typography variant="h4" className={classes.loadMoreText}>
                Reload
              </Typography>
            </Button>
          </div>
        </div>
      );
    }
  };

  openInstructions = () => {
    window.open(
      "https://gov.yflink.io/t/staking-in-the-governance-contract/28"
    );
  };

  openContract = (type) => {
    if (type === "GOV") {
      window.open(
        "https://etherscan.io/address/0xc150eade946079033c3b840bd7e81cdd5354e467"
      );
    } else {
      window.open(
        "https://etherscan.io/address/0x75D1aA733920b14fC74c9F6e6faB7ac1EcE8482E"
      );
    }
  };

  openForumSite = () => {
    window.open("https://gov.yflink.io/");
  };

  openProposal = (url) => {
    window.open(url);
  };

  loadMore = () => {
    const { account } = this.state;
    if (account && account.address) {
      this.setState({ loading: true });
      dispatcher.dispatch({ type: GET_PROPOSALS, content: {} });
    }
  };

  onStake = () => {
    const { pool, stakeAmount, value } = this.state;
    if (!pool) {
      console.log("OnStake POOL error!");
      return;
    }
    const asset = this.getCurrentToken(pool, value);
    if (!stakeAmount || stakeAmount < 0.01) {
      console.log("OnStake Invalid Amount!");
      return;
    }

    const amountString = stakeAmount;
    const amount = bigInt(
      (parseFloat(amountString) * 10 ** asset.decimals).toString()
    );

    this.setState({ loading: true });
    dispatcher.dispatch({
      type: STAKE,
      content: {
        asset: asset,
        amount: amount,
        type: value === 2 ? "LINKSWAP" : "GOV",
      },
    });
  };

  onWithdraw = () => {
    const { pool, withdrawAmount, value } = this.state;
    if (!pool) {
      console.log("OnWithdraw POOL error!");
      return;
    }
    const asset = this.getCurrentToken(pool, value);
    if (!withdrawAmount) {
      console.log("OnWithdraw Invalid Amount!");
      return;
    }
    const amountString = withdrawAmount;
    const amount = bigInt(
      (parseFloat(amountString) * 10 ** asset.decimals).toString()
    );

    this.setState({ loading: true });
    dispatcher.dispatch({
      type: WITHDRAW,
      content: {
        asset: asset,
        amount: amount,
        type: value === 2 ? "LINKSWAP" : "GOV",
      },
    });
  };

  onStakeLegacy = (stakeAmount) => {
    const { pool } = this.state;
    if (!pool) {
      console.log("OnStake POOL error!");
      return;
    }
    const asset = this.getCurrentToken(pool, 0);
    if (!stakeAmount || stakeAmount < 0.01) {
      console.log("OnStake Invalid Amount!");
      return;
    }

    const amountString = stakeAmount;
    const amount = bigInt(
      (parseFloat(amountString) * 10 ** asset.decimals).toString()
    );

    this.setState({ loading: true });
    dispatcher.dispatch({
      type: STAKE,
      content: {
        asset: asset,
        amount: amount,
        type: "GOV",
      },
    });
  };

  onWithdrawLegacy = (withdrawAmount) => {
    const { pool } = this.state;
    if (!pool) {
      console.log("OnWithdraw POOL error!");
      return;
    }
    const asset = this.getCurrentToken(pool, 0);
    if (!withdrawAmount) {
      console.log("OnWithdraw Invalid Amount!");
      return;
    }
    const amountString = withdrawAmount;
    const amount = bigInt(
      (parseFloat(amountString) * 10 ** asset.decimals).toString()
    );

    this.setState({ loading: true });
    dispatcher.dispatch({
      type: WITHDRAW,
      content: {
        asset: asset,
        amount: amount,
        type: "GOV",
      },
    });
  };

  onConvert = () => {
    const { pool } = this.state;
    if (!pool) {
      console.log("OnConvert POOL error!");
      return;
    }

    const yYFLToken = this.getCurrentToken(pool, 2);

    const tokens = [yYFLToken.linkAddress, yYFLToken.wethAddress];
    const amounts = [
      bigInt(yYFLToken.linkBalance).toString(),
      bigInt(yYFLToken.wethBalance).toString(),
    ];

    this.setState({ loading: true });
    dispatcher.dispatch({
      type: CONVERT,
      content: {
        asset: yYFLToken,
        tokens,
        amounts,
      },
    });
  };

  render() {
    const { classes } = this.props;
    const { loading, modalOpen, snackbarMessage, proposalScreen } = this.state;

    return (
      <div className={classes.root}>
        {this.renderBackground("DESKTOP")}
        {this.renderBackground("MOBILE")}
        {this.renderHeader("DESKTOP")}
        {this.renderHeader("MOBILE")}
        {!proposalScreen && (
          <div className={classes.mainBody}>
            {this.renderGovernanceSection("DESKTOP")}
            {this.renderGovernanceSection("MOBILE")}
            {this.renderVoteSection("DESKTOP")}
            {this.renderVoteSection("MOBILE")}
          </div>
        )}
        {proposalScreen && (
          <div className={classes.mainBody}>
            {this.renderNewProposalSection("DESKTOP")}
            {this.renderNewProposalSection("MOBILE")}
          </div>
        )}
        {snackbarMessage && this.renderSnackbar()}
        {loading && <Loader />}
        {modalOpen && this.renderModal()}
        {this.renderNavigationModal()}
        {this.renderVoteModal()}
        {this.renderStakeWithdrawModal()}
      </div>
    );
  }

  onVote = (voteInfo) => {
    this.setState({
      voteProposal: voteInfo.proposal,
      voteType: voteInfo.voteType,
      voteModalOpen: true,
    });
  };

  onExecute = (proposal) => {
    dispatcher.dispatch({ type: EXECUTE, content: proposal });
  };

  renderProposals = () => {
    const { govProposals, yYFLProposals, value, account } = this.state;
    const { classes } = this.props;

    const currentProposals =
      value === 2
        ? yYFLProposals
        : govProposals.filter((proposal) => {
            const isGov = proposal.url.includes("gov");
            const isMeme = isLinkMeme(proposal.url);
            return value === 0 ? isGov : isMeme;
          });
    const filteredProposals = currentProposals.sort((prop1, prop2) =>
      value === 2 ? prop2.endBlock - prop1.endBlock : prop2.end - prop1.end
    );

    let executableProposalIndex = -1;
    const hasActiveProposal = store.getStore("hasActiveProposal");
    if (hasActiveProposal) {
      const lastProposal = filteredProposals.filter((proposal) => {
        if (proposal.proposer.toLowerCase() === account.address.toLowerCase()) {
          return true;
        }
        return false;
      });
      if (lastProposal.length > 0) {
        executableProposalIndex = lastProposal[0].id;
      }
    }

    if (filteredProposals.length === 0) {
      return (
        <div className={classes.propEmptyContainer}>
          <Typography className={classes.stakeTitle} variant={"h3"}>
            Loading...
          </Typography>
        </div>
      );
    }

    return filteredProposals.map((proposal) => {
      if (value === 0 || value === 1) {
        return (
          <Button
            classes={{
              root: classes.proposalCard,
              text: classes.proposalCardDetails,
            }}
            key={proposal.id + "_expand"}
            onClick={() => {
              this.openProposal(proposal.url);
            }}
          >
            <Proposal
              proposal={proposal}
              startLoading={this.startLoading}
              showSnackbar={this.showSnackbar}
              onVote={this.onVote}
            />
          </Button>
        );
      }
      if (value === 2) {
        return (
          <Paper
            classes={{
              root: classes.proposalCard,
            }}
            key={proposal.id + "_expand"}
          >
            <FunctionProposal
              proposal={proposal}
              startLoading={this.startLoading}
              showSnackbar={this.showSnackbar}
              account={account}
              onVote={this.onVote}
              onExecute={this.onExecute}
              isExecutable={executableProposalIndex === proposal.id}
            />
          </Paper>
        );
      }
      return <></>;
    });
  };

  goToDashboard = () => {
    window.open("https://gov.yflink.io/", "_blank");
  };

  handleTabChange = (event, newValue) => {
    this.setState({ value: newValue });
  };

  startLoading = () => {
    this.setState({ loading: true });
  };

  handleChange = (id) => {
    this.setState({ expanded: this.state.expanded === id ? null : id });
  };

  copyAddressToClipboard = (event, address) => {
    event.stopPropagation();
    navigator.clipboard.writeText(address).then(() => {
      this.showAddressCopiedSnack();
    });
  };

  onChange = (event) => {
    let val = [];
    val[event.target.id] = event.target.value;
    this.setState(val);
  };

  renderModal = () => {
    return (
      <UnlockModal
        closeModal={this.closeModal}
        modalOpen={this.state.modalOpen}
      />
    );
  };

  renderSnackbar = () => {
    var { snackbarType, snackbarMessage } = this.state;
    return (
      <Snackbar type={snackbarType} message={snackbarMessage} open={true} />
    );
  };

  overlayClicked = () => {
    this.setState({ modalOpen: true });
  };

  closeModal = () => {
    this.setState({ modalOpen: false });
  };

  closeNavModal = () => {
    this.setState({ navModalOpen: false });
  };

  closeVoteModal = () => {
    this.setState({ voteModalOpen: false });
  };
}

export default withRouter(withStyles(styles)(Vote));
