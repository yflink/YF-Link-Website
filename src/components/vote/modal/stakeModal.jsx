import React from "react";
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
} from "@material-ui/core";

import CloseIcon from "@material-ui/icons/Close";
import { colors } from "../../../theme";
import Store from "../../../stores";
import {
  STAKE,
  STAKE_RETURNED,
  WITHDRAW,
  WITHDRAW_RETURNED,
} from "../../../constants";

const dispatcher = Store.dispatcher;
const emitter = Store.emitter;

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
  stakeModalContainer: {
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
  stakeModalHeader: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    marginBottom: "6px",
    marginTop: "32px",
    [theme.breakpoints.up("ms")]: {
      marginTop: "0px",
    },
  },
  stakeModalTitle: {
    color: colors.white,
    fontSize: "32px",
    fontWeight: "normal",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    [theme.breakpoints.up("ms")]: {
      fontSize: "48px",
      lineHeight: "57px",
    },
  },
  logoIcon: {
    width: "30px",
    height: "30px",
    marginRight: "8px",
    [theme.breakpoints.up("ms")]: {
      width: "50px",
      height: "50px",
      marginRight: "16px",
    },
  },
  stakeTypeWrapper: {
    width: "100%",
    marginBottom: "24px",
    paddingLeft: "46px",
    [theme.breakpoints.up("ms")]: {
      paddingLeft: "66px",
    },
  },
  stakeTypeTitle: {
    color: colors.white,
    fontSize: "24px",
    lineHeight: "130%",
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

  stakeWithdrawActionCard: {
    width: "100%",
    height: "260px",
    display: "flex",
    flexDirection: "column",
    padding: "24px",
    background: colors.lightGray6,
    borderRadius: "8px",
    [theme.breakpoints.up("ms")]: {
      height: "100%",
    },
  },
  stakeWithdrawBoxRoot: {
    width: "100%",
    height: 42,
    background: colors.lightGray3,
    borderRadius: 3,
    border: "solid 0px rgba(255, 255, 255, 0.2)",
    color: colors.white,
    padding: "0 12px",
  },

  stakeWithdrawInputBoxInput: {
    fontSize: "14px",
    [theme.breakpoints.up("ms")]: {
      fontSize: "16px",
    },
    "&::-webkit-input-placeholder": {
      fontWeight: "normal",
    },
  },
  desktopStakeWithdrawAvailableWrapper: {
    display: "none",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "12px",
    [theme.breakpoints.up("ms")]: {
      display: "flex",
    },
  },
  mobileStakeWithdrawAvailableWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "12px",
    [theme.breakpoints.up("ms")]: {
      display: "none",
    },
  },
  stakeWithdrawAvailableText: {
    color: colors.white,
    fontSize: "16px",
    fontWeight: "normal",
    display: "flex",
    alignItems: "center",
  },
  stakeWithdrawAvailableValue: {
    color: colors.gray,
    fontSize: "12px",
    fontWeight: "normal",
    marginLeft: "8px",
  },
  stakeWithdrawInputValueWrapper: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "16px",
    flexDirection: "column",
  },
  stakeWithdrawInputError: {
    fontSize: "14px",
    lineHeight: "16px",
    color: colors.red,
    marginLeft: "8px",
    marginTop: "8px",
    width: "100%",
    textAlign: "left",
  },
  stakeWithdrawPreviewWrapper: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    alignItems: "flex-end",
    justifyContent: "flex-start",
    marginBottom: "16px",
  },
  stakeWithdrawPreviewHeader: {
    fontSize: "16px",
    lineHeight: "19px",
    textAlign: "right",
    color: colors.white,
  },
  stakeWithdrawPreviewText: {
    fontWeight: "bold",
    fontSize: "16px",
    lineHeight: "20px",
    textAlign: "right",
    color: colors.white,
  },
  actionButton: {
    padding: "12px 16px",
    backgroundColor: colors.brandBlue,
    borderRadius: "3px",
    color: colors.white,
    height: "43px",
    cursor: "pointer",
    "&:disabled": {
      opacity: 0.3,
      color: colors.white,
    },
    "&:hover": {
      backgroundColor: colors.brandBlue,
      opacity: 0.7,
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
  stakeWithdrawMaxButton: {
    background:
      "linear-gradient(0deg, rgba(42, 91, 219, 0.2), rgba(42, 91, 219, 0.2)), rgba(0, 0, 0, 0.4)",
    borderRadius: "8px",
    color: "#88A9FF",
    height: "32px",
    width: "52px",
  },
  unstakeWarningText: {
    color: colors.white,
    marginRight: "8px",
    fontSize: "10px",
    [theme.breakpoints.up("ms")]: {
      fontSize: "14px",
    },
  },
});

const StakeWithdrawModal = ({
  stakeOrWithdraw,
  staked,
  balance,
  price,
  secondPrice,
  decimals,
  startLoading,
  modalOpen,
  closeModal,
  classes,
  asset,
  sourceAsset,
  isLegacy,
  onStakeLegacy,
  onWithdrawLegacy,
}) => {
  const [loading, setLoading] = React.useState(false);
  const [inputAmount, setInputAmount] = React.useState(0);
  const [error, setError] = React.useState("");

  React.useEffect(() => {
    emitter.on(STAKE_RETURNED, actionReturned);
    emitter.on(WITHDRAW_RETURNED, actionReturned);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    setInputAmount(0);
    setError("");
  }, [modalOpen]);

  const actionReturned = () => {
    closeModal();
  };

  const onStake = () => {
    if (
      parseFloat(inputAmount) <= 0 ||
      parseFloat(inputAmount) > parseFloat(balance)
    ) {
      setError("Invalid Amount!");
      return;
    }
    const stakeAmount = bigInt(
      (parseFloat(inputAmount) * 10 ** decimals).toString()
    );
    setLoading(true);
    startLoading();
    dispatcher.dispatch({
      type: STAKE,
      content: {
        amount: stakeAmount,
        asset: asset,
        type: "LINKSWAP",
        yflAsset: sourceAsset,
      },
    });
  };

  const onUnstake = () => {
    if (
      parseFloat(inputAmount) < 0 ||
      parseFloat(inputAmount) > parseFloat(staked)
    ) {
      setError("Invalid Amount!");
      return;
    }
    if (isLegacy) {
      onWithdrawLegacy(inputAmount);
      return;
    }
    const unstakeAmount = bigInt(
      (parseFloat(inputAmount) * 10 ** decimals).toString()
    );
    setLoading(true);
    startLoading();
    dispatcher.dispatch({
      type: WITHDRAW,
      content: {
        amount: unstakeAmount,
        asset,
      },
    });
  };

  const onMax = () => {
    if (stakeOrWithdraw === "Stake") {
      setInputAmount(balance);
    } else {
      setInputAmount(staked);
    }
  };

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
        {loading && <></>}
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={closeModal}
        >
          <CloseIcon
            style={{ color: colors.white, width: "32px", height: "32px" }}
          />
        </IconButton>
        <div className={classes.stakeModalContainer}>
          <div className={classes.stakeModalHeader}>
            <Typography className={classes.stakeModalTitle} variant={"h1"}>
              <img
                className={classes.logoIcon}
                src={require("../../../assets/YFLink-header-logo.svg")}
                alt="logo"
              />
              My Vault
            </Typography>
          </div>
          <div className={classes.stakeTypeWrapper}>
            <Typography className={classes.stakeTypeTitle} variant={"h6"}>
              {stakeOrWithdraw}
            </Typography>
          </div>
          <div className={classes.stakeWithdrawActionCard}>
            {stakeOrWithdraw === "Stake" ? (
              <>
                <div className={classes.desktopStakeWithdrawAvailableWrapper}>
                  <Typography
                    className={classes.stakeWithdrawAvailableText}
                    variant={"h6"}
                  >
                    Wallet Balance: {balance} YFL
                    <Typography
                      className={classes.stakeWithdrawAvailableValue}
                      variant={"h6"}
                    >
                      ≈ ${(balance * price).toFixed(3).toLocaleString()}
                    </Typography>
                  </Typography>
                  <Button
                    className={classes.stakeWithdrawMaxButton}
                    variant="contained"
                    onClick={() => {
                      onMax();
                    }}
                  >
                    MAX
                  </Button>
                </div>
                <div className={classes.mobileStakeWithdrawAvailableWrapper}>
                  <Typography
                    className={classes.stakeWithdrawAvailableText}
                    variant={"h6"}
                  >
                    Balance: {balance} YFL
                    <Typography
                      className={classes.stakeWithdrawAvailableValue}
                      variant={"h6"}
                    >
                      ≈ ${(balance * price).toFixed(3).toLocaleString()}
                    </Typography>
                  </Typography>
                  <Button
                    className={classes.stakeWithdrawMaxButton}
                    variant="contained"
                    onClick={() => {
                      onMax();
                    }}
                  >
                    MAX
                  </Button>
                </div>
                <div className={classes.stakeWithdrawInputValueWrapper}>
                  <InputBase
                    classes={{
                      root: classes.stakeWithdrawBoxRoot,
                      input: classes.stakeWithdrawInputBoxInput,
                    }}
                    onChange={(ev) => {
                      setInputAmount(ev.target.value);
                    }}
                    value={inputAmount}
                    placeholder="Enter amount you want to stake"
                    type="number"
                    autoFocus
                  />
                  {error && (
                    <span className={classes.stakeWithdrawInputError}>
                      {error}
                    </span>
                  )}
                </div>
                <div className={classes.stakeWithdrawPreviewWrapper}>
                  <Typography
                    className={classes.stakeWithdrawPreviewHeader}
                    variant={"h6"}
                  >
                    You'll have a share of
                  </Typography>
                  <Typography className={classes.stakeWithdrawPreviewText}>
                    {(inputAmount / secondPrice).toFixed(3)} yYFL
                  </Typography>
                </div>
              </>
            ) : (
              <>
                <div className={classes.desktopStakeWithdrawAvailableWrapper}>
                  <Typography
                    className={classes.stakeWithdrawAvailableText}
                    variant={"h6"}
                  >
                    Currently Staked: {staked} {isLegacy ? "YFL" : "yYFL"}
                    {!isLegacy && (
                      <Typography
                        className={classes.stakeWithdrawAvailableValue}
                        variant={"h6"}
                      >
                        ≈ {(staked * price).toFixed(3).toLocaleString()} YFL
                      </Typography>
                    )}
                  </Typography>
                  <Button
                    className={classes.stakeWithdrawMaxButton}
                    variant="contained"
                    onClick={() => {
                      onMax();
                    }}
                  >
                    MAX
                  </Button>
                </div>
                <div className={classes.mobileStakeWithdrawAvailableWrapper}>
                  <Typography
                    className={classes.stakeWithdrawAvailableText}
                    variant={"h6"}
                  >
                    Staked: {staked} {isLegacy ? "YFL" : "yYFL"}
                    {!isLegacy && (
                      <Typography
                        className={classes.stakeWithdrawAvailableValue}
                        variant={"h6"}
                      >
                        ≈ {(staked * price).toFixed(3).toLocaleString()} YFL
                      </Typography>
                    )}
                  </Typography>
                  <Button
                    className={classes.stakeWithdrawMaxButton}
                    variant="contained"
                    onClick={() => {
                      onMax();
                    }}
                  >
                    MAX
                  </Button>
                </div>
                <div className={classes.stakeWithdrawInputValueWrapper}>
                  <InputBase
                    classes={{
                      root: classes.stakeWithdrawBoxRoot,
                      input: classes.stakeWithdrawInputBoxInput,
                    }}
                    onChange={(ev) => {
                      setInputAmount(ev.target.value);
                    }}
                    value={inputAmount}
                    placeholder="Enter amount you want to unstake"
                    type="number"
                    autoFocus
                  />
                  {error && (
                    <span className={classes.stakeWithdrawInputError}>
                      {error}
                    </span>
                  )}
                </div>
                <div className={classes.stakeWithdrawPreviewWrapper}>
                  <Typography
                    className={classes.stakeWithdrawPreviewHeader}
                    variant={"h6"}
                  >
                    You'll receive
                  </Typography>
                  <Typography className={classes.stakeWithdrawPreviewText}>
                    ${(inputAmount * price * secondPrice).toLocaleString()}
                  </Typography>
                </div>
              </>
            )}
            <div className={classes.voteButtonWrapper}>
              {stakeOrWithdraw !== "Stake" && (
                <span className={classes.unstakeWarningText}>
                  *Any unclaimed rewards will not be included.
                </span>
              )}
              <Button
                className={classes.actionButton}
                variant="contained"
                onClick={() => {
                  if (stakeOrWithdraw === "Stake") {
                    onStake();
                  } else {
                    onUnstake();
                  }
                }}
              >
                <Typography
                  className={classes.actionButtonLabel}
                  variant={"h4"}
                  color={colors.white}
                >
                  {stakeOrWithdraw}
                </Typography>
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
export default withRouter(withStyles(styles)(StakeWithdrawModal));
