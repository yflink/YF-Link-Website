import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import { Typography, Button, IconButton, Card } from "@material-ui/core";

import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import ArrowRightAltOutlinedIcon from "@material-ui/icons/ArrowRightAltOutlined";

import moment from "moment";

import HeaderLogo from "../header/logo/logo";
import HeaderLink from "../header/link/link";
import HeaderDropLink from "../header/link/dropLink";
import RedirectModal from "../header/modal/modal";
import Loader from "../loader";
import Snackbar from "../snackbar";
import UnlockModal from "../unlock/unlockModal.jsx";

import DayModal from "./modal";

import Store from "../../stores";
import { colors } from "../../theme";
import { ReactComponent as OptionsIcon } from "../../assets/YFLink-header-options.svg";

import {
  ERROR,
  GET_RAFFLE_INFO,
  GET_RAFFLE_INFO_RETURNED,
  CONNECTION_CONNECTED,
  CONNECTION_DISCONNECTED,
  CONFIGURE,
  ENTER_RAFFLE_RETURNED,
  raffleDays,
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
    background:
      "linear-gradient(0deg, #731013, #731013), linear-gradient(180deg, #2A5BDB 0%, #29115C 100%);",
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

  customActionButton: {
    padding: "12px 16px",
    backgroundColor: "rgba(255, 255, 255, 0.2);",
    borderRadius: "3px",
    color: colors.white,
    height: "43px",
    cursor: "pointer",
    "&:disabled": {
      opacity: 0.3,
      border: "1px solid #FFFFFF",
      color: colors.white,
    },
  },
  customActionButtonLabel: {
    fontWeight: "bold",
    fontSize: "14px",
    [theme.breakpoints.up("md")]: {
      fontSize: "16px",
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
      paddingTop: "20px",
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
    marginBottom: "40px",
  },
  cardSubHeaderSection: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    marginBottom: "16px",
  },

  cardHeading: {
    color: colors.white,
    fontWeight: "normal",
    fontSize: "32px",
    [theme.breakpoints.up("ms")]: {
      fontSize: "48px",
    },
  },

  cardSubHeading: {
    color: colors.white,
    fontWeight: "normal",
    fontSize: "16px",
    [theme.breakpoints.up("ms")]: {
      fontSize: "24px",
    },
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
  },

  cardSubHeadingIcon: {
    marginRight: "16px",
  },

  raffleCard: {
    width: "100%",
    minHeight: "267px",
    backgroundColor: colors.redGray1,
    borderRadius: "8px",
  },

  raffleCardHeadSection: {
    width: "100%",
    height: "56px",
    backgroundColor: colors.redGray2,
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

  raffleCardBodySection: {
    display: "flex",
    width: "100%",
    height: "100%",
    minHeight: "211px",
    flexDirection: "column",
    [theme.breakpoints.up("ms")]: {
      flexDirection: "row",
    },
  },

  raffleCardBodyVault: {
    flex: 2,
    display: "flex",
    height: "100%",
    padding: "24px",
    alignItems: "flex-start",
    justifyContent: "space-between",
    flexDirection: "row",
    [theme.breakpoints.up("ms")]: {
      width: "100%",
      minHeight: "211px",
      flexDirection: "column",
    },
  },
  raffleCardBodyDay: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
  },
  raffleCardBodyEnd: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
  },
  raffleDayHeader: {
    fontWeight: "bold",
    fontSize: "24px",
    lineHeight: "29px",
    color: colors.white,
  },
  raffleDayText: {
    fontWeight: "normal",
    fontSize: "16px",
    lineHeight: "19px",
    color: colors.white,
  },
  raffleEndHeader: {
    fontWeight: "normal",
    fontSize: "12px",
    lineHeight: "14px",
    color: colors.white,
  },
  raffleEndText: {
    fontWeight: "normal",
    fontSize: "16px",
    lineHeight: "19px",
    color: colors.white,
  },
  raffleCardBodyActionSection: {
    flex: 2,
    height: "100%",
    minHeight: "163px",
    margin: "16px",
    padding: "16px",
    background: "rgba(0, 0, 0, 0.3)",
    borderRadius: "8px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    [theme.breakpoints.up("ms")]: {
      width: "100%",
      minHeight: "163px",
      margin: "24px 8px",
      padding: "16px",
      alignItems: "center",
    },
  },
  raffleCardBodyStatusSection: {
    flex: "6",
    height: "100%",
    minHeight: "163px",
    margin: "16px",
    padding: "24px",
    background: "rgba(0, 0, 0, 0.3)",
    borderRadius: "8px",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    [theme.breakpoints.up("ms")]: {
      width: "100%",
      minHeight: "163px",
      margin: "24px 24px 24px 8px",
    },
  },
  raffleCardBodyStatusHeader: {
    fontSize: "16px",
    lineHeight: "20px",
    fontWeight: "bold",
    fontStyle: "normal",
    color: colors.white,
    marginBottom: "24px",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    "& > img": {
      marginRight: "16px",
    },
  },
  raffleCardDayInfoContainer: {
    display: "flex",
    width: "100%",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  raffleCardIcons: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    "& > *": {
      marginLeft: "8px",
      marginRight: "8px",
    },
    marginBottom: "8px",
  },
  raffleCardDayInfoPairName: {
    color: colors.white,
    fontSize: "16px",
    width: "100%",
    textAlign: "center",
  },
  raffleCardBodyStatusText: {
    width: "100%",
    display: "flex",
    alignItems: "center",
  },
  raffleCardBodyStatusSpan: {
    flex: "1",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: "14px",
    lineHeight: "17px",
    color: colors.white,
    marginLeft: "16px",
  },
  raffleDaysContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    marginBottom: "60px",
    padding: "0px 16px",
    [theme.breakpoints.up("ms")]: {
      padding: "0px",
    },
  },
  raffleDaysCard: {
    width: "100%",
    minHeight: "372px",
    backgroundColor: colors.redGray1,
    borderRadius: "8px",
    padding: "24px",
  },
  raffleDayGridDesktop: {
    display: "none",
    gridGap: "24px",
    [theme.breakpoints.up("ms")]: {
      display: "grid",
      gridTemplateColumns: "auto auto auto",
    },
  },
  raffleDayGridMobile: {
    display: "grid",
    gridGap: "24px",
    [theme.breakpoints.up("ms")]: {
      display: "none",
    },
  },
  raffleDayButton: {
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    border: "solid 1px transparent",
    borderRadius: "8px",
    height: "75px",
    "&:disabled": {
      opacity: 0.3,
      color: colors.white,
    },
    "&:hover": {
      color: "#d2a8a9",
      opacity: 1,
      border: "solid 1px rgba(255, 255, 255, 0.8)",
    },
  },
  raffleButtonContainer: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  raffleDayInfo: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  raffleDayInfoImage: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    color: colors.white,
  },
  raffleCardDayInfoImage: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    color: colors.white,
    width: "30px",
    height: "30px",
  },
  raffleButtonDayHeader: {
    color: colors.white,
    fontSize: "16px",
    lineHeight: "20px",
    fontWeight: "bold",
  },
  raffleButtonDayText: {
    color: colors.white,
    fontSize: "14px",
    lineHeight: "17px",
    fontWeight: "normal",
  },
  raffleButtonImage: {
    width: "25px",
    height: "25px",
  },

  raffleDayInfoPairName: {
    color: colors.white,
    width: "100px",
    fontSize: "14px",
  },

  raffleVaultIcon: {
    width: "55px",
    height: "55px",
    objectFit: "contain",
    marginLeft: "10px",
    [theme.breakpoints.up("ms")]: {
      marginLeft: "20px",
      width: "55px",
      height: "55px",
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
    height: "223px",
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
    borderRadius: "8px",
    padding: "16px",
    display: "flex",
    flexDirection: "column",
    [theme.breakpoints.up("ms")]: {
      flex: "2",
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
  rootBackground: {
    position: "absolute",
    left: "0px",
    top: "90px",
    display: "flex",
    justifyContent: "space-between",
    width: "100vw",
    height: "100vh",
  },
  leftBackground: {
    display: "flex",
    flexDirection: "column",
    alignItems: "space-between",
    height: "100%",
  },
  rightBackground: {
    display: "flex",
    flexDirection: "column",
    alignItems: "space-between",
    height: "100%",
  },
});

const emitter = Store.emitter;
const dispatcher = Store.dispatcher;
const store = Store.store;

let timerId = null;

class Raffle extends Component {
  constructor(props) {
    super(props);

    const account = store.getStore("account");

    this.state = {
      loading: true,
      account: account,
      remainingTime: "",
      dayModalOpen: false,
      selectedDay: null,
      today: null,
    };

    if (account && account.address) {
      dispatcher.dispatch({ type: GET_RAFFLE_INFO, content: {} });
    }
  }
  connectionConnected = () => {
    console.log("connectionConnected");
    const newAccount = store.getStore("account");
    this.setState({ account: newAccount });
    if (newAccount && newAccount.address) {
      dispatcher.dispatch({ type: GET_RAFFLE_INFO, content: {} });
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

  enterRaffleReturned = () => {
    console.log("Enter Raffle Returned");
    const newAccount = store.getStore("account");
    this.setState({ account: newAccount });
    if (newAccount && newAccount.address) {
      dispatcher.dispatch({ type: GET_RAFFLE_INFO, content: {} });
    }
  };

  componentDidMount() {
    emitter.on(ERROR, this.errorReturned);
    emitter.on(GET_RAFFLE_INFO_RETURNED, this.raffleInfoReturned);
    emitter.on(CONNECTION_CONNECTED, this.connectionConnected);
    emitter.on(CONNECTION_DISCONNECTED, this.connectionDisconnected);
    emitter.on(ENTER_RAFFLE_RETURNED, this.showHash);
    window.scrollTo(0, 0);

    setTimeout(() => {
      const account = store.getStore("account");
      if (!account || !account.address) {
        this.props.history.push("/account");
      }
    }, 5000);
  }

  componentWillUnmount() {
    emitter.removeListener(ERROR, this.errorReturned);
    emitter.removeListener(GET_RAFFLE_INFO_RETURNED, this.raffleInfoReturned);
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

  raffleInfoReturned = () => {
    const raffleInfo = store.getStore("raffleInfo");
    this.setState({
      loading: false,
      raffleInfo,
    });
    if (timerId) {
      clearInterval(timerId);
    }
    const nextDay = raffleDays[raffleInfo.currentDay].nextDate;
    timerId = setInterval(() => {
      const tomorrow = moment.utc(nextDay);
      const timeRemain = tomorrow.diff(moment.now(), "minutes");
      this.setState({
        remainingTime: `${Math.floor(timeRemain / 60)}h ${timeRemain % 60}m`,
      });
    }, 1000);
  };

  showAddressCopiedSnack = () => {
    this.showSnackbar("Address Copied to Clipboard", "Success");
  };

  showErrorMessage = (message) => {
    this.showSnackbar(message, "Warning");
  };

  showHash = (txHash) => {
    this.showSnackbar(txHash, "Hash");
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
            <HeaderLink text="LINKSMAS" to={"/linksmas-2020"} selected={true} />
            <HeaderLink
              text="LINKSWAP"
              to={"https://linkswap.app/"}
              externalLink={true}
            />
            <HeaderLink
              text="LP REWARDS"
              to={"https://linkswap.app/#/stake"}
              externalLink={true}
            />
            <HeaderLink
              text="STAKE & VOTE"
              to={account && account.address ? "/stake" : "/account"}
              redirectedTo={"/stake"}
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

  renderDayModal = () => {
    const { account } = this.state;
    return (
      <DayModal
        closeModal={this.closeDayModal}
        modalOpen={this.state.dayModalOpen}
        selectedDay={this.state.selectedDay}
        today={this.state.today}
        entered={this.state.raffleInfo && this.state.raffleInfo.entered}
        winners={this.state.raffleInfo && this.state.raffleInfo.winners}
        account={account}
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

  renderRaffleInfoSection = (screenType) => {
    const { classes } = this.props;
    const { raffleInfo, remainingTime } = this.state;
    const token1 =
      raffleDays[raffleInfo && raffleInfo.currentDay]?.token1 || "ETH";
    const token2 =
      raffleDays[raffleInfo && raffleInfo.currentDay]?.token2 || "ETH";

    if (screenType === "DESKTOP") {
      return (
        <div className={classes.desktopSectionStyle}>
          <div className={classes.cardHeaderSection}>
            <Typography variant={"h1"} className={classes.cardHeading}>
              LINKSMAS
              <img
                alt="raffle"
                src={require("../../assets/raffle.svg")}
                className={classes.raffleVaultIcon}
              />
            </Typography>
          </div>
          <div className={classes.cardSubHeaderSection}>
            <Typography variant={"h3"} className={classes.cardSubHeading}>
              <img
                alt="ticket"
                src={require("../../assets/ticket.svg")}
                className={classes.cardSubHeadingIcon}
              />
              Today's Raffle
            </Typography>
          </div>
          <Card className={classes.raffleCard}>
            <div className={classes.raffleCardHeadSection}>
              <IconButton
                onClick={() => {
                  this.openInstructions();
                }}
              >
                <Typography
                  variant={"h4"}
                  className={classes.governanceButtonSpan}
                >
                  How it works
                </Typography>
                <ArrowRightAltOutlinedIcon style={{ color: colors.white }} />
              </IconButton>
            </div>
            <div className={classes.raffleCardBodySection}>
              <div className={classes.raffleCardBodyVault}>
                <div className={classes.raffleCardBodyDay}>
                  <Typography
                    variant={"h4"}
                    className={classes.raffleDayHeader}
                  >
                    {raffleDays[raffleInfo && raffleInfo.currentDay]?.title ||
                      "Day"}
                  </Typography>
                  <Typography variant={"h4"} className={classes.raffleDayText}>
                    {raffleDays[raffleInfo && raffleInfo.currentDay]
                      ?.subTitle || "Day"}
                  </Typography>
                </div>
                <div className={classes.raffleCardBodyEnd}>
                  <Typography
                    variant={"h4"}
                    className={classes.raffleEndHeader}
                  >
                    Ends in:
                  </Typography>
                  <Typography variant={"h4"} className={classes.raffleEndText}>
                    {remainingTime || "0h 0m"}
                  </Typography>
                </div>
              </div>
              <div className={classes.raffleCardBodyActionSection}>
                <div className={classes.raffleCardDayInfoContainer}>
                  <div className={classes.raffleCardIcons}>
                    <img
                      alt="token1"
                      className={classes.raffleCardDayInfoImage}
                      src={require(`../../assets/coins/${token1.toUpperCase()}.png`)}
                    />
                    <img
                      alt="token2"
                      className={classes.raffleCardDayInfoImage}
                      src={require(`../../assets/coins/${token2.toUpperCase()}.png`)}
                    />
                  </div>
                  <Typography className={classes.raffleCardDayInfoPairName}>
                    {token1} | {token2}
                  </Typography>
                </div>
                <Button
                  className={classes.customActionButton}
                  variant="contained"
                  onClick={() => {
                    this.onGetLpTokens();
                  }}
                >
                  <Typography
                    className={classes.customActionButtonLabel}
                    variant={"h4"}
                    color={colors.white}
                  >
                    Get LP Tokens
                  </Typography>
                </Button>
              </div>
              <div className={classes.raffleCardBodyStatusSection}>
                {raffleInfo && raffleInfo.entered ? (
                  <>
                    <Typography
                      className={classes.raffleCardBodyStatusHeader}
                      variant={"h4"}
                      color={colors.white}
                    >
                      <img
                        alt="checked"
                        src={require("../../assets/checked.svg")}
                      />
                      You are entered in today's raffle!
                    </Typography>
                    <div className={classes.raffleCardBodyStatusText}>
                      <Typography
                        className={classes.raffleCardBodyStatusSpan}
                        variant={"h4"}
                        color={colors.white}
                      >
                        Make sure you hold your LP or stake them in the rewards
                        vault until the end of the raffle to qualify.
                      </Typography>
                    </div>
                  </>
                ) : (
                  <>
                    <Typography
                      className={classes.raffleCardBodyStatusHeader}
                      variant={"h4"}
                      color={colors.white}
                    >
                      You are not yet entered for this raffle.
                    </Typography>
                    <div className={classes.raffleCardBodyStatusText}>
                      <img
                        alt="warning"
                        src={require("../../assets/warning.svg")}
                      />
                      <Typography
                        className={classes.raffleCardBodyStatusSpan}
                        variant={"h4"}
                        color={colors.white}
                      >
                        You must hold the specified LP token in your wallet or
                        stake in the rewards vault in order to enter.
                      </Typography>
                    </div>
                  </>
                )}
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
              LINKSMAS
              <img
                alt="raffle"
                src={require("../../assets/raffle.svg")}
                className={classes.raffleVaultIcon}
              />
            </Typography>
          </div>
          <div className={classes.cardSubHeaderSection}>
            <Typography variant={"h3"} className={classes.cardSubHeading}>
              <img
                alt="ticket"
                src={require("../../assets/ticket.svg")}
                className={classes.cardSubHeadingIcon}
              />
              Today's Raffle
            </Typography>
          </div>
          <Card className={classes.raffleCard}>
            <div className={classes.raffleCardHeadSection}>
              <IconButton
                onClick={() => {
                  this.openInstructions();
                }}
              >
                <Typography
                  variant={"h4"}
                  className={classes.governanceButtonSpan}
                >
                  How it works
                </Typography>
                <ArrowRightAltOutlinedIcon style={{ color: colors.white }} />
              </IconButton>
            </div>
            <div className={classes.raffleCardBodySection}>
              <div className={classes.raffleCardBodyVault}>
                <div className={classes.raffleCardBodyDay}>
                  <Typography
                    variant={"h4"}
                    className={classes.raffleDayHeader}
                  >
                    {raffleDays[raffleInfo && raffleInfo.currentDay]?.title ||
                      "Day"}
                  </Typography>
                  <Typography variant={"h4"} className={classes.raffleDayText}>
                    {raffleDays[raffleInfo && raffleInfo.currentDay]
                      ?.subTitle || "Dec 25th"}
                  </Typography>
                </div>
                <div className={classes.raffleCardBodyEnd}>
                  <Typography
                    variant={"h4"}
                    className={classes.raffleEndHeader}
                  >
                    Ends in:
                  </Typography>
                  <Typography variant={"h4"} className={classes.raffleEndText}>
                    {remainingTime || "0h 0m"}
                  </Typography>
                </div>
              </div>
              <div className={classes.raffleCardBodyActionSection}>
                <div className={classes.raffleCardDayInfoContainer}>
                  <div className={classes.raffleCardIcons}>
                    <img
                      alt="token1"
                      className={classes.raffleCardDayInfoImage}
                      src={require(`../../assets/coins/${token1.toUpperCase()}.png`)}
                    />
                    <img
                      alt="token2"
                      className={classes.raffleCardDayInfoImage}
                      src={require(`../../assets/coins/${token2.toUpperCase()}.png`)}
                    />
                  </div>
                  <Typography className={classes.raffleCardDayInfoPairName}>
                    {token1} | {token2}
                  </Typography>
                </div>
                <Button
                  className={classes.customActionButton}
                  variant="contained"
                  onClick={() => {
                    this.onGetLpTokens();
                  }}
                >
                  <Typography
                    className={classes.customActionButtonLabel}
                    variant={"h4"}
                    color={colors.white}
                  >
                    Get LP Tokens
                  </Typography>
                </Button>
              </div>
              <div className={classes.raffleCardBodyStatusSection}>
                <Typography
                  className={classes.raffleCardBodyStatusHeader}
                  variant={"h4"}
                  color={colors.white}
                >
                  You are not yet entered for this raffle.
                </Typography>
                <div className={classes.raffleCardBodyStatusText}>
                  <img
                    alt="warning"
                    src={require("../../assets/warning.svg")}
                  />
                  <Typography
                    className={classes.raffleCardBodyStatusSpan}
                    variant={"h4"}
                    color={colors.white}
                  >
                    You must hold the specified LP token in your wallet or stake
                    in the rewards vault in order to enter.
                  </Typography>
                </div>
              </div>
            </div>
          </Card>
        </div>
      );
    }
  };

  renderDayButton = (title, subTitle, pairName, token1, token2, clickParam) => {
    const { classes } = this.props;

    return (
      <Button className={classes.raffleDayButton} onClick={clickParam}>
        <div className={classes.raffleButtonContainer}>
          <div className={classes.raffleDayInfo}>
            <Typography className={classes.raffleButtonDayHeader}>
              {title}
            </Typography>
            <Typography className={classes.raffleButtonDayText}>
              {subTitle}
            </Typography>
          </div>
          <div className={classes.raffleDayInfoImage}>
            <img
              alt={pairName}
              className={classes.raffleButtonImage}
              src={require(`../../assets/coins/${token1.toUpperCase()}.png`)}
            />
            <img
              alt={pairName}
              className={classes.raffleButtonImage}
              src={require(`../../assets/coins/${token2.toUpperCase()}.png`)}
            />
            <Typography className={classes.raffleDayInfoPairName}>
              {pairName}
            </Typography>
          </div>
        </div>
      </Button>
    );
  };

  showDayModal = (index) => {
    const { raffleInfo } = this.state;
    this.setState({
      selectedDay: index,
      today: raffleInfo?.currentDay,
      dayModalOpen: true,
    });
  };

  renderDaysSection = () => {
    const { classes } = this.props;

    return (
      <div className={classes.raffleDaysContainer}>
        <div className={classes.cardSubHeaderSection}>
          <Typography variant={"h3"} className={classes.cardSubHeading}>
            All Days of LINKSMAS
          </Typography>
        </div>
        <Card className={classes.raffleDaysCard}>
          <div className={classes.raffleDayGridDesktop}>
            {this.renderDayButton(
              "Day 1",
              "Dec 16th",
              "DRC | ETH",
              "drc",
              "eth",
              () => {
                this.showDayModal(0);
              }
            )}
            {this.renderDayButton(
              "Day 5",
              "Dec 20th",
              "RUGZ | LINK",
              "rugz",
              "link",
              () => {
                this.showDayModal(4);
              }
            )}
            {this.renderDayButton(
              "Day 9",
              "Dec 24th",
              "SNX | LINK",
              "snx",
              "link",
              () => {
                this.showDayModal(8);
              }
            )}
            {this.renderDayButton(
              "Day 2",
              "Dec 17th",
              "ZUT | LINK",
              "zut",
              "link",
              () => {
                this.showDayModal(1);
              }
            )}

            {this.renderDayButton(
              "Day 6",
              "Dec 21th",
              "SERGS | LINK",
              "sergs",
              "link",
              () => {
                this.showDayModal(5);
              }
            )}

            {this.renderDayButton(
              "Day 10",
              "Dec 25th",
              "LINK | ETH",
              "link",
              "eth",
              () => {
                this.showDayModal(9);
              }
            )}
            {this.renderDayButton(
              "Day 3",
              "Dec 18th",
              "LAYER | LINK",
              "layer",
              "link",
              () => {
                this.showDayModal(2);
              }
            )}

            {this.renderDayButton(
              "Day 7",
              "Dec 22th",
              "AAVE | LINK",
              "aave",
              "link",
              () => {
                this.showDayModal(6);
              }
            )}
            {this.renderDayButton(
              "Day 11",
              "Dec 26th",
              "BONK | ETH",
              "bonk",
              "eth",
              () => {
                this.showDayModal(10);
              }
            )}
            {this.renderDayButton(
              "Day 4",
              "Dec 19th",
              "MASQ | ETH",
              "masq",
              "eth",
              () => {
                this.showDayModal(3);
              }
            )}
            {this.renderDayButton(
              "Day 8",
              "Dec 23th",
              "yUSD | ETH",
              "yusd",
              "eth",
              () => {
                this.showDayModal(7);
              }
            )}
            {this.renderDayButton(
              "Day 12",
              "Dec 27th",
              "YFL | LINK",
              "yfl",
              "link",
              () => {
                this.showDayModal(11);
              }
            )}
          </div>
          <div className={classes.raffleDayGridMobile}>
            {this.renderDayButton(
              "Day 1",
              "Dec 16th",
              "DRC | ETH",
              "drc",
              "eth",
              () => {
                this.showDayModal(0);
              }
            )}
            {this.renderDayButton(
              "Day 2",
              "Dec 17th",
              "ZUT | LINK",
              "zut",
              "link",
              () => {
                this.showDayModal(1);
              }
            )}
            {this.renderDayButton(
              "Day 3",
              "Dec 18th",
              "LAYER | LINK",
              "layer",
              "link",
              () => {
                this.showDayModal(2);
              }
            )}
            {this.renderDayButton(
              "Day 4",
              "Dec 19th",
              "MASQ | ETH",
              "masq",
              "eth",
              () => {
                this.showDayModal(3);
              }
            )}
            {this.renderDayButton(
              "Day 5",
              "Dec 20th",
              "RUGZ | LINK",
              "rugz",
              "link",
              () => {
                this.showDayModal(4);
              }
            )}
            {this.renderDayButton(
              "Day 6",
              "Dec 21th",
              "SERGS | LINK",
              "sergs",
              "link",
              () => {
                this.showDayModal(5);
              }
            )}

            {this.renderDayButton(
              "Day 7",
              "Dec 22th",
              "AAVE | LINK",
              "aave",
              "link",
              () => {
                this.showDayModal(6);
              }
            )}
            {this.renderDayButton(
              "Day 8",
              "Dec 23th",
              "yUSD | ETH",
              "yusd",
              "eth",
              () => {
                this.showDayModal(7);
              }
            )}
            {this.renderDayButton(
              "Day 9",
              "Dec 24th",
              "SNX | LINK",
              "snx",
              "link",
              () => {
                this.showDayModal(8);
              }
            )}

            {this.renderDayButton(
              "Day 10",
              "Dec 25th",
              "LINK | ETH",
              "link",
              "eth",
              () => {
                this.showDayModal(9);
              }
            )}

            {this.renderDayButton(
              "Day 11",
              "Dec 26th",
              "BONK | ETH",
              "bonk",
              "eth",
              () => {
                this.showDayModal(10);
              }
            )}

            {this.renderDayButton(
              "Day 12",
              "Dec 27th",
              "YFL | LINK",
              "yfl",
              "link",
              () => {
                this.showDayModal(11);
              }
            )}
          </div>
        </Card>
      </div>
    );
  };

  openInstructions = () => {
    window.open("https://blog.yflink.io/linksmas2020/");
  };

  onGetLpTokens = () => {
    const { raffleInfo } = this.state;
    if (raffleInfo && raffleInfo.currentDay) {
      const lpTokens = [
        "https://linkswap.app/#/add/ETH/0xb78B3320493a4EFaa1028130C5Ba26f0B6085Ef8",
        "https://linkswap.app/#/add/0x514910771AF9Ca656af840dff83E8264EcF986CA/0x83F873388Cd14b83A9f47FabDe3C9850b5C74548",
        "https://linkswap.app/#/add/0x514910771AF9Ca656af840dff83E8264EcF986CA/0x0fF6ffcFDa92c53F615a4A75D982f399C989366b",
        "https://linkswap.app/#/add/ETH/0x06F3C323f0238c72BF35011071f2b5B7F43A054c",
        "https://linkswap.app/#/add/0x514910771AF9Ca656af840dff83E8264EcF986CA/0xEdFBd6c48c3dDfF5612Ade14B45bb19F916809ba",
        "https://linkswap.app/#/add/0x514910771AF9Ca656af840dff83E8264EcF986CA/0x79BA92DDA26FcE15e1e9af47D5cFdFD2A093E000",
        "https://linkswap.app/#/add/0x514910771AF9Ca656af840dff83E8264EcF986CA/0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9",
        "https://linkswap.app/#/add/ETH/0x5dbcF33D8c2E976c6b560249878e6F1491Bca25c",
        "https://linkswap.app/#/add/0x514910771AF9Ca656af840dff83E8264EcF986CA/0xC011a73ee8576Fb46F5E1c5751cA3B9Fe0af2a6F",
        "https://linkswap.app/#/add/0x514910771AF9Ca656af840dff83E8264EcF986CA/ETH",
        "https://linkswap.app/#/add/ETH/0x6D6506E6F438edE269877a0A720026559110B7d5",
        "https://linkswap.app/#/add/0x514910771AF9Ca656af840dff83E8264EcF986CA/0x28cb7e841ee97947a86B06fA4090C8451f64c0be",
      ];
      window.open(lpTokens[raffleInfo.currentDay]);
    }
  };

  render() {
    const { classes } = this.props;
    const { loading, modalOpen, snackbarMessage } = this.state;

    return (
      <div className={classes.root}>
        <div className={classes.rootBackground}>
          <div className={classes.leftBackground}>
            <img
              className={classes.topLeftCandyImg}
              src={require("../../assets/left-candle.svg")}
              alt="candy"
            />
            <img
              className={classes.bottomLeftCandyImg}
              src={require("../../assets/left-cane.svg")}
              alt="cane"
            />
          </div>
          <div className={classes.rightBackground}>
            <img
              className={classes.topRightCandyImg}
              src={require("../../assets/right-candle.svg")}
              alt="candy"
            />
            <img
              className={classes.bottomRightCandyImg}
              src={require("../../assets/right-cane.svg")}
              alt="cane"
            />
          </div>
        </div>
        {this.renderHeader("DESKTOP")}
        {this.renderHeader("MOBILE")}
        <div className={classes.mainBody}>
          {this.renderRaffleInfoSection("DESKTOP")}
          {this.renderRaffleInfoSection("MOBILE")}
          {this.renderDaysSection()}
        </div>
        {snackbarMessage && this.renderSnackbar()}
        {loading && <Loader />}
        {modalOpen && this.renderModal()}
        {this.renderNavigationModal()}
        {this.renderDayModal()}
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

  closeDayModal = () => {
    this.setState({ selectedDay: null, today: null, dayModalOpen: false });
  };
}

export default withRouter(withStyles(styles)(Raffle));
