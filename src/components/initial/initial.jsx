import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import { Typography, IconButton, Button, Slide } from "@material-ui/core";

import CloseIcon from "@material-ui/icons/Close";
import CallMadeIcon from "@material-ui/icons/CallMade";

import { withNamespaces } from "react-i18next";
import { colors } from "../../theme";

import HeaderLogo from "../header/logo/logo";
import RedirectModal from "../header/modal/modal";
import SocialShare from "../social/social";
import Store from "../../stores";
import HeaderMenuLink from "../header/link/menuLink";

import { ReactComponent as OptionsIcon } from "../../assets/YFLink-header-options.svg";

import { v1Client, LinkswapDayQuery } from "../../stores/apollo";

const styles = (theme) => ({
  root: {
    flex: "1",
    display: "flex",
    flexDirection: "column",
    width: "100%",
    background: colors.greyBackground,
    overflow: "hidden",
    position: "relative",
  },
  closeButton: {
    position: "absolute",
    right: "8px",
    top: "0px",
    zIndex: "1024",
  },
  title: {
    padding: "24px",
    paddingBottom: "0px",
    [theme.breakpoints.up("sm")]: {
      paddingBottom: "24px",
    },
  },
  icon: {
    fontSize: "60px",
    [theme.breakpoints.up("sm")]: {
      fontSize: "100px",
    },
  },
  link: {
    textDecoration: "none",
  },

  rightMainSection: {
    zIndex: "1",
    position: "absolute",
    top: "-30%",
    left: "230px",
    width: "100%",
    height: "200%",
    transform: `skew(-0.03turn, 15deg)`,
    background: "#232E3B",
    "@media (max-width: 768px)": {
      display: "none",
    },
  },
  rightArrowSection: {
    position: "absolute",
    zIndex: "2",
    top: "0px",
    "& > img": {
      width: "100%",
      maxWidth: "1240px",
      filter: "blur(60px)",
    },

    "@media (max-width: 1240px)": {
      left: "0px",
    },

    "@media (min-width: 1240px)": {
      left: "calc(50% - 620px)",
    },

    width: "100%",
    height: "100%",

    "@media (max-width: 768px)": {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
  },
  rightArrowUpSection: {},
  leftMarkSection: {
    zIndex: "1",
    position: "absolute",
    display: "flex",
    flexDirection: "column",
    top: "15%",
    left: "-100px",
    width: "370px",
    height: "560px",
    "@media (max-width: 768px)": {
      display: "none",
    },
  },
  topMainSection: {
    zIndex: "1",
    position: "absolute",
    top: "-25%",
    left: "-30%",
    width: "300%",
    height: "100%",
    transform: `rotate(12deg)`,
    background: "rgba(0, 0, 0, 0.2)",
    "@media (min-width: 768px)": {
      display: "none",
    },
  },
  bottomMarkSection: {
    zIndex: "1",
    position: "absolute",
    display: "flex",
    flexDirection: "column",
    top: "68%",
    left: "-20px",
    width: "200px",
    height: "230px",

    "@media (min-width: 768px)": {
      display: "none",
    },
  },

  desktopHeaderContainer: {
    zIndex: "3",
    width: "100%",
    height: "90px",
    paddingLeft: "60px",
    paddingRight: "60px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    "@media (max-width: 768px)": {
      display: "none",
    },
  },
  mobileHeaderContainer: {
    zIndex: "3",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "16px",
    "@media (min-width: 768px)": {
      display: "none",
    },
  },

  logoContainer: {
    zIndex: "2",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    flex: 1,
    minWidth: "200px",
    "@media (max-width: 768px)": {
      minWidth: "100px",
    },
  },

  linkContainer: {
    zIndex: "2",
    flex: 2,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    "& > *": {
      marginRight: "40px",
    },
  },

  linkProductsMenu: {
    display: "grid",
    gridTemplateColumns: "auto auto",
    gridGap: "30px",
    padding: "25px",
    width: "505px",
    zIndex: "9999",
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
  },

  linkProductsItemTitleTag: {
    backgroundColor: "#5F5D4B",
    borderRadius: "3px",
    color: "#EECB70",
    padding: "5px",
    fontSize: "8px",
    marginLeft: "10px",
  },

  linkProductsItemText: {
    fontFamily: "Formular",
    fontWeight: "400",
    fontStyle: "normal",
    fontSize: "12px",
    lineHeight: "14.68px",
    letterSpacing: "0.67px",
  },

  optionsContainer: {
    zIndex: "2",
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
  },

  desktopBodyContainer: {
    zIndex: "2",
    width: "100%",
    flex: 1,
    display: "flex",
    "@media (max-width: 768px)": {
      display: "none",
    },
    marginBottom: "90px",
  },

  mobileBodyContainer: {
    zIndex: "2",
    width: "100%",
    flex: 1,
    display: "flex",
    "@media (min-width: 768px)": {
      display: "none",
    },
  },

  bodyRightContainer: {
    flex: 3,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },

  bodyRightSpace: {
    flex: 1,
  },

  bodyRightMain: {
    flex: 5,
    display: "flex",
    flexDirection: "column",
    width: "100%",
    "@media (max-width: 768px)": {
      padding: "30px",
      flex: 7,
    },
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },

  linkswapInfoContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },

  linkswapTitle: {
    fontFamily: "Formular",
    fontWeight: "400",
    fontStyle: "normal",
    fontSize: "30px",
    lineHeight: "36.7px",
    letterSpacing: "1.6px",
    color: colors.white,
    marginBottom: "40px",
    display: "flex",
    alignItems: "flex-end",
  },

  linkswapLogo: {
    marginBottom: "60px",
    maxWidth: "683px",
    display: "flex",
    alignItems: "flex-start",
  },
  linkswapLogoImage: {
    maxWidth: "100%",
    marginRight: "20px",
  },
  linkswapLaunchButton: {
    backgroundColor: "#3B65D3",
    borderRadius: "8px",
    height: "44px",
    color: colors.white,
    fontFamily: "Formular",
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: "18px",
    lineHeight: "22px",
    letterSpacing: "1px",
    padding: "14px",
    "&:hover": {
      backgroundColor: "#3B65D3",
      opacity: 0.7,
    },
  },

  linkButtonWrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "124px",
    marginRight: "40px",
    "&:last-child": {
      marginRight: "0px",
    },
    position: "relative",
  },

  linkButtonDisabledWrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "200px",
    marginRight: "40px",
    marginBottom: "0px",
    "&:last-child": {
      marginRight: "0px",
    },
    "@media (max-width: 768px)": {
      marginRight: "0px",
      marginBottom: "40px",
    },
    position: "relative",
  },

  linkButtonSpan: {
    color: colors.white,
    fontSize: "18px",
    lineHeight: "21px",
    textAlign: "center",
    letterSpacing: "0.06em",
    marginTop: "16px",
    whiteSpace: "nowrap",
  },

  linkDisabledButtonSpan: {
    color: colors.white,
    fontSize: "14px",
    lineHeight: "17px",
    textAlign: "center",
    letterSpacing: "0.06em",
    marginLeft: "12px",
  },

  linkButton: {
    width: "124px",
    height: "124px",
    borderRadius: "8px",
    border: "solid 2px rgba(255, 255, 255, 1)",
    "&:hover": {
      backgroundColor: "rgba(255, 255, 255, 0.2);",
    },
  },

  linkDisabledButton: {
    width: "200px",
    height: "48px",
    borderRadius: "8px",
    border: "solid 2px rgba(255, 255, 255, 1)",
    opacity: "0.3",
    "&:hover": {
      opacity: "0.3",
    },
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
  },

  linkToolButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: "3px",
    paddingBottom: "3px",
  },

  linkToolButtonSpan: {
    color: colors.white,
    fontSize: "14px",
    lineHeight: "17px",
    letterSpacing: "0.06rem",
    whiteSpace: "nowrap",
  },

  emailInputContainer: {
    marginLeft: "6px",
    width: "350px",
    height: "44px",
    borderRadius: "4px",
    background: "rgba(255, 255, 255, 0.2)",
    display: "flex",
    alignItems: "center",
    border: "solid 1px rgba(255, 255, 255, 0.2)",
    marginBottom: "5px",
    "@media (max-width: 768px)": {
      width: "100%",
      marginLeft: "0px",
    },
  },

  emailInputError: {
    marginLeft: "6px",
    width: "350px",
    height: "44px",
    borderRadius: "4px",
    background: "rgba(255,255,255,0.2)",
    display: "flex",
    alignItems: "center",
    border: "solid 1px rgba(255, 0, 0)",
    marginBottom: "5px",
  },

  customInputBoxRoot: {
    width: "100%",
    height: 42,
    background: "transparent",
    borderRadius: 3,
    border: "solid 0px rgba(255, 255, 255, 0.2)",
    color: colors.white,
    padding: "0 12px",
  },

  customInputBoxError: {
    border: "solid 1px rgba(255, 0, 0)",
  },

  socialMediaContainer: {
    marginLeft: "6px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    "@media (max-width: 768px)": {
      justifyContent: "center",
      right: "30px",
      bottom: "30px",
    },
    right: "60px",
    bottom: "0px",
    position: "absolute",
  },
  loadingIcon: {
    color: colors.white,
  },
  desktopBackground: {
    position: "absolute",
    width: "100vw",
    height: "100vh",
    top: "0px",
    left: "0px",
    "@media (max-width: 768px)": {
      display: "none",
    },
  },
  mobileBackground: {
    position: "absolute",
    width: "100vw",
    height: "100vh",
    top: "0px",
    left: "0px",
    "@media (min-width: 768px)": {
      display: "none",
    },
  },
  raffleAddWrapper: {
    bottom: "0px",
    minHeight: "100px",
    position: "absolute",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#731013",
    width: "100%",
    zIndex: "100",
    padding: "17px",
  },
  raffleBackgroundLeftImage: {
    width: "90px",
    height: "115px",
    opacity: 0.2,
    transform: "rotate(15deg)",
    left: "10px",
    position: "absolute",
  },
  raffleBackgroundRightImage: {
    width: "90px",
    height: "115px",
    opacity: 0.2,
    transform: "matrix(-0.97, 0.26, 0.26, 0.97, 0, 0)",
    right: "10px",
    position: "absolute",
  },
  raffleInfo: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  raffleInfoHeader: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "24px",
  },
  raffleCandyIcon: {
    marginLeft: "16px",
    marginRight: "16px",
  },
  raffleCandyText: {
    fontSize: "24px",
    lineHeight: "29px",
    textAlign: "center",
    letterSpacing: "0.25rem",
    color: colors.white,
  },
  raffleInfoBody: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  raffleJoinButton: {
    borderRadius: "3px",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    color: colors.white,
    "&:hover": {
      backgroundColor: "rgba(255, 255, 255, 0.5)",
    },
  },
  buyButtonContainer: {
    width: "150px",
    height: "45px",
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
  footerSection: {
    backgroundColor: "#434E5D",
    height: "30px",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    zIndex: "3",
    padding: "0px 10px",

    overflow: "hidden",
    paddingLeft: "100%",
    boxSizing: "content-box",

    cursor: "pointer",
  },

  footerSectionValue: {
    fontFamily: "Formular",
    fontWeight: "400",
    fontSize: "16px",
    fontStyle: "italic",
    lineHeight: "29px",
    letterSpacing: "1.33px",
    whiteSpace: "nowrap",
    color: colors.white,
    marginRight: "20px",
    "&:last-child": {
      marginRight: "0px",
    },
    "@media (min-width: 768px)": {
      fontSize: "20px",
    },
    display: "inline-block",
  },
  footerTicker: {
    display: "inline-block",
    height: "100%",
    lineHeight: "100%",
    whiteSpace: "nowrap",
    paddingRight: "100%",
    boxSizing: "content-box",

    "-webkit-animation-iteration-count": "infinite",
    "animation-iteration-count": "infinite",
    "-webkit-animation-timing-function": "linear",
    "animation-timing-function": "linear",
    "-webkit-animation-name": "ticker",
    "animation-name": "ticker",
    "-webkit-animation-duration": "15s",
    "animation-duration": "15s",

    "-webkit-animation-play-state": "running",
    "animation-play-state": "running",

    "&:hover": {
      "-webkit-animation-play-state": "paused",
      "animation-play-state": "paused",
    },
  },
});

const store = Store.store;
let timerId = null;

const setLinkswapValues = async (setCallback) => {
  try {
    let linkswapData = {};
    const { data } = await v1Client.query({
      query: LinkswapDayQuery,
      variables: {},
      fetchPolicy: "network-only",
      errorPolicy: "ignore",
    });
    if (data && data.linkswapFactories && data.bundles) {
      linkswapData = {
        yflPrice: data.bundles[0].yflPrice || "0",
        dailyVolumeUSD: data.linkswapDayDatas[0].dailyVolumeUSD || "0",
        totalLiquidityUSD: data.linkswapDayDatas[0].totalLiquidityUSD || "0",
        pairCount: data.linkswapFactories[0].pairCount || "0",
      };
    }

    setCallback(linkswapData);
  } catch (error) {
    console.log("Fetching error", error);
  }
};

class Initial extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputEmail: "",
      error: "",
      modalOpen: false,
      raffleOpen: true,
      linkswapInfo: null,
    };
  }

  componentDidMount() {
    if (timerId) {
      clearInterval(timerId);
    }
    setLinkswapValues((data) => {
      this.setLinkswapInfo(data);
    });

    timerId = setInterval(() => {
      setLinkswapValues((data) => {
        this.setLinkswapInfo(data);
      });
    }, 15000);
  }

  componentWillUnmount() {
    if (timerId) {
      clearInterval(timerId);
      timerId = null;
    }
  }

  setLinkswapInfo = (data) => {
    this.setState({ linkswapInfo: data });
  };

  renderMenuItem = (
    logoUrl,
    title,
    text,
    link,
    isComingSoon,
    isExternalLink = true
  ) => {
    const { classes } = this.props;
    return (
      <div
        className={
          !isComingSoon
            ? classes.linkProductsItem
            : classes.linkProductsItemDisabled
        }
        onClick={() => {
          if (!isComingSoon) {
            if (isExternalLink) {
              window.open(link);
            } else {
              this.nav(link);
            }
          }
        }}
      >
        <img
          className={classes.linkProductsItemImage}
          src={logoUrl}
          alt="logo"
        />
        <div className={classes.linkProductsItemInfo}>
          <Typography className={classes.linkProductsItemTitle}>
            {title}
            {isComingSoon && (
              <span className={classes.linkProductsItemTitleTag}>SOON</span>
            )}
          </Typography>
          <Typography className={classes.linkProductsItemText}>
            {text}
          </Typography>
        </div>
      </div>
    );
  };

  renderHeader = (screenType) => {
    const { classes } = this.props;
    if (screenType === "DESKTOP") {
      return (
        <div className={classes.desktopHeaderContainer}>
          <div className={classes.logoContainer}>
            <HeaderLogo />
          </div>
          <div className={classes.linkContainer}>
            <HeaderMenuLink
              text="PRODUCTS"
              menuItems={
                <div className={classes.linkProductsMenu}>
                  {this.renderMenuItem(
                    require("../../assets/linkswap.svg"),
                    "LINKSWAP",
                    "Automated Market Maker",
                    "https://linkswap.app",
                    false
                  )}
                  {this.renderMenuItem(
                    require("../../assets/linkcheck.svg"),
                    "LINKCHECK",
                    "Team audits",
                    "https://blog.yflink.io/linkcheck/",
                    false
                  )}
                  {this.renderMenuItem(
                    require("../../assets/linkpad.svg"),
                    "LINKPAD",
                    "DeFi Venture Fund",
                    "https://blog.yflink.io/project-announcement-linkpad/",
                    false
                  )}
                  {this.renderMenuItem(
                    require("../../assets/waffle.svg"),
                    "Wafflehouse",
                    "Blockchain game",
                    "",
                    true
                  )}
                  {this.renderMenuItem(
                    require("../../assets/linklend.svg"),
                    "LINKLEND",
                    "Synthetic collateral lending",
                    "https://blog.yflink.io/project-announcement-linklend/",
                    true
                  )}
                  {this.renderMenuItem(
                    require("../../assets/nft.svg"),
                    "NFTs",
                    "View YFL NFTs",
                    "",
                    true
                  )}
                </div>
              }
            />
            <HeaderMenuLink
              text="RESOURCES"
              menuItems={
                <div className={classes.linkProductsMenu}>
                  {this.renderMenuItem(
                    require("../../assets/analytics.svg"),
                    "Analytics",
                    "LINKSWAP Protocol Analytics",
                    "https://info.linkswap.app",
                    false
                  )}
                  {this.renderMenuItem(
                    require("../../assets/calculator_1.svg"),
                    "APY Calculator",
                    "LP Rewards",
                    "https://apycalc.yflink.io/",
                    false
                  )}
                  {this.renderMenuItem(
                    require("../../assets/help.svg"),
                    "Help Center",
                    "YF Link ecosystem",
                    "https://learn.yflink.io/",
                    false
                  )}
                  {this.renderMenuItem(
                    require("../../assets/calculator_2.svg"),
                    "APY Calculator",
                    "Stake & Vote",
                    "https://calculator.yflink.io/",
                    false
                  )}
                </div>
              }
            />
            <HeaderMenuLink
              text="STAKE & VOTE"
              menuItems={
                <div className={classes.linkProductsMenu}>
                  {this.renderMenuItem(
                    require("../../assets/vote.svg"),
                    "Governance",
                    "Stake YFL",
                    "./stake",
                    false,
                    false
                  )}
                  {this.renderMenuItem(
                    require("../../assets/stake.svg"),
                    "LP Rewards",
                    "Stake LPs",
                    "https://linkswap.app/#/stake",
                    false
                  )}
                  {this.renderMenuItem(
                    require("../../assets/yflusd-logo.svg"),
                    "YFLUSD",
                    "Stake to earn YFLUSD & sYFL",
                    "https://yflusd.linkswap.app/",
                    false
                  )}
                </div>
              }
            />
          </div>
          <div className={classes.buyButtonContainer}>
            <Button
              variant="contained"
              className={classes.buyButton}
              onClick={() => {
                window.open(
                  "https://linkswap.app/#/swap?outputCurrency=0x28cb7e841ee97947a86b06fa4090c8451f64c0be"
                );
              }}
            >
              Buy YFL
              <CallMadeIcon
                style={{
                  color: "white",
                  width: "18px",
                  height: "18px",
                  marginLeft: "14px",
                }}
              />
            </Button>
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
                this.setState({ modalOpen: true });
              }}
            >
              <OptionsIcon style={{ color: colors.white }} />
            </IconButton>
          </div>
        </div>
      );
    }
  };

  renderBody = (screenType) => {
    const { classes } = this.props;
    return (
      <div
        className={
          screenType === "DESKTOP"
            ? classes.desktopBodyContainer
            : classes.mobileBodyContainer
        }
      >
        <div className={classes.bodyLeftContainer} />
        <div className={classes.bodyRightContainer}>
          <div className={classes.bodyRightMain}>
            <div className={classes.linkswapInfoContainer}>
              <Typography className={classes.linkswapTitle}>
                Your link to DeFi
              </Typography>
              <div className={classes.linkswapLogo}>
                <img
                  className={classes.linkswapLogoImage}
                  src={require("../../assets/swap.svg")}
                  alt="swap"
                />
              </div>
              <Button
                className={classes.linkswapLaunchButton}
                variant="contained"
                onClick={() => {
                  window.open("https://linkswap.app/");
                }}
              >
                Launch Linkswap
                <CallMadeIcon
                  style={{
                    color: "white",
                    width: "18px",
                    height: "18px",
                    marginLeft: "14px",
                  }}
                />
              </Button>
            </div>
            <div className={classes.socialMediaContainer}>
              <SocialShare
                twitterUrl="https://twitter.com/YFLinkio"
                githubUrl="https://github.com/yflink"
                mediumUrl="https://blog.yflink.io/"
                telegramUrl="https://t.me/YFLinkGroup"
                discordUrl="https://discord.gg/VGp7qw46fc"
                coingeckoUrl="https://www.coingecko.com/en/exchanges/linkswap"
                coinmarketcapUrl="https://coinmarketcap.com/exchanges/linkswap/"
                defipulseUrl="https://defipulse.com/linkswap"
                zerionUrl="https://app.zerion.io/market/asset/YFL-0x28cb7e841ee97947a86b06fa4090c8451f64c0be"
                debankUrl="https://debank.com/projects/yflink"
              />
            </div>
          </div>
        </div>
      </div>
    );
  };

  renderBackground = (screenType) => {
    const { classes } = this.props;

    if (screenType === "DESKTOP") {
      return (
        <>
          <div className={classes.rightMainSection} />
          <div className={classes.rightArrowSection}>
            <img alt="up" src={require("../../assets/yfl-blur-up.svg")} />
          </div>
          <div className={classes.leftMarkSection}>
            <img
              alt="up"
              src={require("../../assets/yfl-up.svg")}
              height="200px"
            />
            <img
              alt="down"
              src={require("../../assets/yfl-down.svg")}
              height="200px"
            />
          </div>
        </>
      );
    } else if (screenType === "MOBILE") {
      return (
        <>
          <div className={classes.topMainSection} />
          <div className={classes.rightArrowSection}>
            <img alt="up" src={require("../../assets/yfl-blur-up.svg")} />
          </div>
          <div className={classes.bottomMarkSection}>
            <img
              alt="up"
              src={require("../../assets/yfl-up.svg")}
              height="112px"
            />
            <img
              alt="down"
              src={require("../../assets/yfl-down.svg")}
              height="112px"
            />
          </div>
        </>
      );
    }
  };
  renderRaffleAd = () => {
    const { classes } = this.props;
    const { raffleOpen } = this.state;
    return (
      <Slide direction="up" in={raffleOpen} mountOnEnter unmountOnExit>
        <div className={classes.raffleAddWrapper}>
          <IconButton
            aria-label="close"
            className={classes.closeButton}
            onClick={() => {
              this.setState({ raffleOpen: false });
            }}
          >
            <CloseIcon
              style={{ color: colors.white, width: "32px", height: "32px" }}
            />
          </IconButton>
          <img
            className={classes.raffleBackgroundLeftImage}
            src={require("../../assets/left-cane-small.png")}
            alt="cane"
          />
          <div className={classes.raffleInfo}>
            <div className={classes.raffleInfoHeader}>
              <img
                className={classes.raffleCandyIcon}
                width="33px"
                height="22px"
                src={require("../../assets/ticket.svg")}
                alt="candy"
              />
              <span className={classes.raffleCandyText}>
                12 DAYS OF LINKSMAS IS HAPPENING NOW
              </span>
              <img
                className={classes.raffleCandyIcon}
                width="33px"
                height="22px"
                src={require("../../assets/raffle.svg")}
                alt="candy"
              />
            </div>
            <div className={classes.raffleInfoBody}>
              <Button
                className={classes.raffleJoinButton}
                variant="contained"
                onClick={() => {
                  this.nav("/linksmas-2020");
                }}
              >
                Join the raffle
              </Button>
            </div>
          </div>
          <img
            className={classes.raffleBackgroundRightImage}
            src={require("../../assets/left-cane-small.png")}
            alt="cane"
          />
        </div>
      </Slide>
    );
  };

  renderModal = () => {
    const account = store.getStore("account");
    return (
      <RedirectModal
        closeModal={this.closeModal}
        modalOpen={this.state.modalOpen}
        account={account}
      />
    );
  };

  renderFooter = () => {
    const { classes } = this.props;
    const { linkswapInfo } = this.state;

    if (linkswapInfo) {
      return (
        <div
          className={classes.footerSection}
          onClick={() => {
            window.open("https://info.linkswap.app");
          }}
        >
          <div className={classes.footerTicker}>
            <Typography className={classes.footerSectionValue}>
              24H VOLUME: $
              {linkswapInfo &&
                (parseFloat(linkswapInfo.dailyVolumeUSD) / 1000000).toFixed(2)}
              M
            </Typography>
            <Typography className={classes.footerSectionValue}>
              LIQUIDITY: $
              {linkswapInfo &&
                (parseFloat(linkswapInfo.totalLiquidityUSD) / 1000000).toFixed(
                  2
                )}
              M
            </Typography>

            <Typography className={classes.footerSectionValue}>
              ACTIVE PAIRS: {linkswapInfo && linkswapInfo.pairCount}
            </Typography>

            <Typography className={classes.footerSectionValue}>
              YFL PRICE: $
              {linkswapInfo && parseFloat(linkswapInfo.yflPrice).toFixed(2)}
            </Typography>
          </div>
        </div>
      );
    } else {
      return (
        <div className={classes.footerSection}>
          <Typography className={classes.footerSectionValue}>...</Typography>
        </div>
      );
    }
  };

  closeModal = () => {
    this.setState({ modalOpen: false });
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        {this.renderBackground("DESKTOP")}
        {this.renderBackground("MOBILE")}

        {this.renderHeader("DESKTOP")}
        {this.renderHeader("MOBILE")}

        {this.renderBody("DESKTOP")}
        {this.renderBody("MOBILE")}

        {this.renderFooter()}

        {this.renderModal()}

        {/* {this.renderRaffleAd()} */}
      </div>
    );
  }

  nav = (screen) => {
    const account = store.getStore("account");
    if (account && account.address) {
      this.props.history.push(screen);
    } else {
      store.setStore({ redirect: screen });
      this.props.history.push("/account");
    }
  };
}

export default withNamespaces()(withRouter(withStyles(styles)(Initial)));
