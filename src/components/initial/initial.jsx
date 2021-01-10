import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import {
  Typography,
  InputBase,
  IconButton,
  CircularProgress,
  Button,
  Slide,
} from "@material-ui/core";
import ArrowRightAltOutlinedIcon from "@material-ui/icons/ArrowRightAltOutlined";
import CloseIcon from "@material-ui/icons/Close";

import { withNamespaces } from "react-i18next";
import { colors } from "../../theme";

import HeaderLogo from "../header/logo/logo";
import SocialShare from "../social/social";
import Store from "../../stores";
import { ReactComponent as OptionsIcon } from "../../assets/YFLink-header-options.svg";
import RedirectModal from "../header/modal/modal";
import { ReactComponent as BuyIcon } from "../../assets/buy.svg";
import { ReactComponent as LinkswapIcon } from "../../assets/linkswap.svg";
import { ReactComponent as StakeIcon } from "../../assets/stake.svg";
import { ReactComponent as VoteIcon } from "../../assets/vote.svg";
import { ReactComponent as WaffleIcon } from "../../assets/waffle.svg";
import { ReactComponent as LinkpadIcon } from "../../assets/linkpad.svg";
import { ReactComponent as LinkcheckIcon } from "../../assets/linkcheck.svg";

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
    background: "rgba(0, 0, 0, 0.2)",
    "@media (max-width: 768px)": {
      display: "none",
    },
  },
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
    zIndex: "2",
    width: "100%",
    height: "90px",
    paddingLeft: "30px",
    paddingRight: "30px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    "@media (max-width: 768px)": {
      display: "none",
    },
  },
  mobileHeaderContainer: {
    zIndex: "2",
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
    minWidth: "400px",
    "@media (max-width: 768px)": {
      minWidth: "100px",
    },
  },

  linkContainer: {
    zIndex: "2",
    flex: 2,
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    "& > *": {
      marginRight: "40px",
    },
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

  bodyLeftContainer: {
    flex: 1,
    minWidth: "400px",
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
  },
  comingSoonTagContainer: {
    background: colors.yellowBackground,
    borderRadius: "3px",
    padding: "2px 6px",
    marginLeft: "6px",
    position: "absolute",
    right: "-17px",
    top: "-8px",
  },

  comingSoonTagText: {
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: "12px",
    lineHeight: "14px",
    textAlign: "center",

    display: "flex",
    alignItems: "center",
    letterSpacing: "0.06em",
    color: colors.yellowText,
  },

  linkSwapIconContainer: {
    marginBottom: "48px",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    "@media (min-width: 768px)": {
      height: "160px",
      flexDirection: "row",
    },
  },

  linkSwapDisabledIconContainer: {
    marginBottom: "40px",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    "@media (min-width: 768px)": {
      flexDirection: "row",
    },
  },

  linkSwapToolsContainer: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    flexDirection: "column",
    marginBottom: "40px",
    marginLeft: "0px",
    "@media (min-width: 768px)": {
      marginLeft: "30px",
    },
  },

  doubleIconsWrapper: {
    display: "flex",
    alignItems: "center",
    marginBottom: "30px",
    "@media (min-width: 768px)": {
      marginBottom: "0px",
      "&:first-child": {
        marginRight: "40px",
      },
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

  emailErrorContainer: {
    marginLeft: "6px",
    marginBottom: "20px",
  },

  emailErrorText: {
    color: colors.red,
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: "12px",
    lineHeight: "13px",
    display: "flex",
    alignItems: "center",
    letterSpacing: "0.06em",
    "& a": {
      color: colors.white,
    },
  },
  emailSuccessText: {
    color: colors.green,
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: "12px",
    lineHeight: "13px",
    display: "flex",
    alignItems: "center",
    letterSpacing: "0.06em",
  },
  socialMediaContainer: {
    marginLeft: "6px",
    display: "flex",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    "@media (max-width: 768px)": {
      justifyContent: "center",
    },
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
});

const ValidateEmail = (mail) => {
  if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
    return "";
  }
  return "Invalid Address!";
};

const store = Store.store;
const mailchimpUrl =
  "https://yflink.us17.list-manage.com/subscribe/post?u=f170cca247406899e9a7fbe82&amp;id=feee202dc5";

class Initial extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputEmail: "",
      error: "",
      modalOpen: false,
      raffleOpen: true,
    };
  }

  renderHeader = (screenType) => {
    const { classes } = this.props;
    const account = store.getStore("account");
    if (screenType === "DESKTOP") {
      return (
        <div className={classes.desktopHeaderContainer}>
          <div className={classes.logoContainer}>
            <HeaderLogo />
          </div>
          <div className={classes.linkContainer} />
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
        <div className={classes.bodyRightContainer}>
          <div className={classes.bodyRightMain}>
            <div className={classes.linkSwapIconContainer}>
              <div className={classes.doubleIconsWrapper}>
                <div className={classes.linkButtonWrapper}>
                  <IconButton
                    className={classes.linkButton}
                    onClick={() => {
                      window.open(
                        "https://linkswap.app/#/buy"
                      );
                    }}
                  >
                    <BuyIcon style={{ color: colors.white }} />
                  </IconButton>
                  <span className={classes.linkButtonSpan}>BUY</span>
                </div>
                <div className={classes.linkButtonWrapper}>
                  <IconButton
                    className={classes.linkButton}
                    onClick={() => {
                      window.open("https://linkswap.app/#/swap?outputCurrency=0x28cb7e841ee97947a86b06fa4090c8451f64c0be");
                    }}
                  >
                    <LinkswapIcon style={{ color: colors.white }} />
                  </IconButton>
                  <span className={classes.linkButtonSpan}>LINKSWAP</span>
                </div>
              </div>
              <div className={classes.doubleIconsWrapper}>
                <div className={classes.linkButtonWrapper}>
                  <IconButton
                    className={classes.linkButton}
                    onClick={() => {
                      window.open("https://rewards.linkswap.app");
                    }}
                  >
                    <StakeIcon style={{ color: colors.white }} />
                  </IconButton>
                  <span className={classes.linkButtonSpan}>LP REWARDS</span>
                </div>
                <div className={classes.linkButtonWrapper}>
                  <IconButton
                    className={classes.linkButton}
                    onClick={() => {
                      this.nav("/stake");
                    }}
                  >
                    <VoteIcon style={{ color: colors.white }} />
                  </IconButton>
                  <span className={classes.linkButtonSpan}>STAKE & VOTE</span>
                </div>
              </div>
            </div>
            <div className={classes.linkSwapDisabledIconContainer}>
              <div className={classes.linkButtonDisabledWrapper}>
                <IconButton
                  className={classes.linkDisabledButton}
                  onClick={() => {}}
                >
                  <WaffleIcon
                    style={{
                      color: colors.white,
                      width: "30px",
                      height: "30px",
                    }}
                  />
                  <span className={classes.linkDisabledButtonSpan}>
                    WAFFLEHOUSE
                  </span>
                </IconButton>
                <div className={classes.comingSoonTagContainer}>
                  <Typography
                    variant="h6"
                    className={classes.comingSoonTagText}
                  >
                    SOON
                  </Typography>
                </div>
              </div>
              <div className={classes.linkButtonDisabledWrapper}>
                <IconButton
                  className={classes.linkDisabledButton}
                  onClick={() => {}}
                >
                  <LinkpadIcon
                    style={{
                      color: colors.white,
                      width: "30px",
                      height: "30px",
                    }}
                  />
                  <span className={classes.linkDisabledButtonSpan}>
                    LINKPAD
                  </span>
                </IconButton>
                <div className={classes.comingSoonTagContainer}>
                  <Typography
                    variant="h6"
                    className={classes.comingSoonTagText}
                  >
                    SOON
                  </Typography>
                </div>
              </div>
              <div className={classes.linkButtonDisabledWrapper}>
                <IconButton
                  className={classes.linkDisabledButton}
                  onClick={() => {}}
                >
                  <LinkcheckIcon
                    style={{
                      color: colors.white,
                      width: "30px",
                      height: "30px",
                    }}
                  />
                  <span className={classes.linkDisabledButtonSpan}>
                    LINKCHECK
                  </span>
                </IconButton>
                <div className={classes.comingSoonTagContainer}>
                  <Typography
                    variant="h6"
                    className={classes.comingSoonTagText}
                  >
                    SOON
                  </Typography>
                </div>
              </div>
            </div>
            <div className={classes.linkSwapToolsContainer}>
              <IconButton
                className={classes.linkToolButton}
                onClick={() => {
                  window.open("https://learn.yflink.io/");
                }}
              >
                <span className={classes.linkToolButtonSpan}>HELP CENTER</span>
                <ArrowRightAltOutlinedIcon
                  style={{ color: colors.white, marginLeft: "8px" }}
                />
              </IconButton>
              <IconButton
                className={classes.linkToolButton}
                onClick={() => {
                  window.open("https://apycalc.yflink.io/");
                }}
              >
                <span className={classes.linkToolButtonSpan}>
                  APY CALCULATOR: LP REWARDS
                </span>
                <ArrowRightAltOutlinedIcon
                  style={{ color: colors.white, marginLeft: "8px" }}
                />
              </IconButton>
              <IconButton
                className={classes.linkToolButton}
                onClick={() => {
                  window.open("https://calculator.yflink.io/");
                }}
              >
                <span className={classes.linkToolButtonSpan}>
                  APY CALCULATOR: STAKE & VOTE
                </span>
                <ArrowRightAltOutlinedIcon
                  style={{ color: colors.white, marginLeft: "8px" }}
                />
              </IconButton>
              <IconButton
                className={classes.linkToolButton}
                onClick={() => {
                  window.open("https://info.linkswap.app/");
                }}
              >
                <span className={classes.linkToolButtonSpan}>ANALYTICS</span>
                <ArrowRightAltOutlinedIcon
                  style={{ color: colors.white, marginLeft: "8px" }}
                />
              </IconButton>
            </div>
            <div className={classes.socialMediaContainer}>
              <SocialShare
                twitterUrl="https://twitter.com/YFLinkio"
                githubUrl="https://github.com/yflink"
                mediumUrl="https://blog.yflink.io/"
                telegramUrl="https://t.me/YFLinkGroup"
                discordUrl="https://discord.gg/VGp7qw46fc"
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
