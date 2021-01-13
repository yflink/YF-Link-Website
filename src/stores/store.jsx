import config from "../config";
import async from "async";
import bigInt from "big-integer";
import {
  CLAIM,
  CLAIM_RETURNED,
  CONFIGURE,
  CONFIGURE_RETURNED,
  ERROR,
  EXIT,
  EXIT_RETURNED,
  GET_BALANCES,
  GET_BALANCES_PERPETUAL,
  GET_BALANCES_PERPETUAL_RETURNED,
  GET_BALANCES_RETURNED,
  GET_CLAIMABLE,
  GET_CLAIMABLE_ASSET,
  GET_CLAIMABLE_ASSET_RETURNED,
  GET_CLAIMABLE_RETURNED,
  GET_PROPOSALS,
  GET_PROPOSALS_RETURNED,
  GET_REWARDS,
  GET_REWARDS_RETURNED,
  GET_GOV_REQUIREMENTS,
  GET_WRAPPED,
  GET_WRAPPED_RETURNED,
  PROPOSE,
  PROPOSE_RETURNED,
  VOTE_FOR,
  VOTE_FOR_RETURNED,
  VOTE_AGAINST,
  VOTE_AGAINST_RETURNED,
  WITHDRAW,
  WITHDRAW_RETURNED,
  WRAP,
  WRAP_RETURNED,
  UNWRAP,
  CONVERT,
  CONVERT_RETURNED,
  STAKE_RETURNED,
  STAKE,
  GET_RAFFLE_INFO,
  GET_RAFFLE_INFO_RETURNED,
  ENTER_RAFFLE,
  ENTER_RAFFLE_RETURNED,
  CLAIM_PRIZE,
  CLAIM_PRIZE_RETURNED,
  EXECUTE,
  EXECUTE_RETURNED,
} from "../constants";
import Web3 from "web3";

import {
  authereum,
  fortmatic,
  frame,
  injected,
  injectedtw,
  ledger,
  portis,
  squarelink,
  torus,
  trezor,
  walletconnect,
  walletlink,
} from "./connectors";

const rp = require("request-promise");

const Dispatcher = require("flux").Dispatcher;
const Emitter = require("events").EventEmitter;

const dispatcher = new Dispatcher();
const emitter = new Emitter();

class Store {
  constructor() {
    this.store = {
      currentBlock: 0,
      universalGasPrice: "70",
      account: {},
      web3: null,
      connectorsByName: {
        MetaMask: injected,
        TrustWallet: injectedtw,
        WalletConnect: walletconnect,
        WalletLink: walletlink,
        Ledger: ledger,
        Trezor: trezor,
        Frame: frame,
        Fortmatic: fortmatic,
        Portis: portis,
        Squarelink: squarelink,
        Torus: torus,
        Authereum: authereum,
      },
      web3context: null,
      languages: [
        {
          language: "English",
          code: "en",
        },
        {
          language: "Japanese",
          code: "ja",
        },
        {
          language: "Chinese",
          code: "zh",
        },
      ],
      wrapping: {
        raw: {
          id: "yfl",
          symbol: "YFL",
          name: "YF Link",
          decimals: 18,
          address: config.yflAddress,
          abi: config.yflABI,
          balance: bigInt(),
        },
        wrapper: {
          id: "wyfl",
          symbol: "wYFL",
          name: "Wrapped YF Link",
          decimals: 18,
          address: config.yflinkWrapperAddress,
          abi: config.yflinkWrapperABI,
          balance: bigInt(),
        },
      },
      govProposals: [],
      yYFLProposals: [],
      hasActiveProposal: false,
      rewardPools: [
        {
          id: "gov",
          title: "Gov",
          name: "Governance",
          website: "YF Link Token",
          link: "https://yflink.io",
          instructionsLink:
            "https://gov.yflink.io/t/staking-in-the-governance-contract/28",
          depositsEnabled: true,
          tokens: [
            {
              id: "yfl",
              address: config.yflAddress,
              symbol: "YFL",
              abi: config.yflABI,
              rewardsAddress: config.governanceAddress,
              rewardsABI: config.governanceABI,
              rewardsSymbol: null, // No rewards
              decimals: 18,
              balance: bigInt(),
              stakedBalance: bigInt(),
              rewardsAvailable: bigInt(),
              voteLocked: bigInt(),
            },
            {
              id: "yYFL",
              address: config.yYFLAddress,
              symbol: "yYFL",
              abi: config.yYFLABI,
              rewardsAddress: config.yYFLGovAddress,
              rewardsABI: config.yYFLGovABI,
              rewardsSymbol: null, // No rewards
              decimals: 18,
              balance: bigInt(),
              stakedBalance: bigInt(),
              rewardsAvailable: bigInt(),
              voteLocked: bigInt(),
              linkAddress: config.linkAddress,
              linkABI: config.linkABI,
              wethAddress: config.wethAddress,
              wethABI: config.wethABI,
            },
          ],
        },
      ],
      raffleInfo: {},
    };

    dispatcher.register(
      function (payload) {
        switch (payload.type) {
          case CONFIGURE:
            this.configure(payload);
            break;
          case GET_BALANCES:
            this.getBalances(payload);
            break;
          case GET_BALANCES_PERPETUAL:
            this.getBalancesPerpetual(payload);
            break;
          case WITHDRAW:
            this.withdraw(payload);
            break;
          case GET_REWARDS:
            this.getReward(payload);
            break;
          case EXIT:
            this.exit(payload);
            break;
          case PROPOSE:
            this.propose(payload);
            break;
          case GET_PROPOSALS:
            this.getProposals(payload);
            break;
          case VOTE_FOR:
            this.voteFor(payload);
            break;
          case VOTE_AGAINST:
            this.voteAgainst(payload);
            break;
          case STAKE:
            this.stake(payload);
            break;
          case GET_CLAIMABLE_ASSET:
            this.getClaimableAsset(payload);
            break;
          case CLAIM:
            this.claim(payload);
            break;
          case GET_CLAIMABLE:
            this.getClaimable(payload);
            break;
          case GET_GOV_REQUIREMENTS:
            this.getGovRequirements(payload);
            break;
          case GET_WRAPPED:
            this.getWrapped(payload);
            break;
          case WRAP:
            this.doWrap(payload);
            break;
          case UNWRAP:
            this.doUnwrap(payload);
            break;
          case CONVERT:
            this.convert(payload);
            break;
          case GET_RAFFLE_INFO:
            this.getRaffleInfo(payload);
            break;
          case ENTER_RAFFLE:
            this.enterRaffle(payload);
            break;
          case CLAIM_PRIZE:
            this.claimPrize();
            break;
          case EXECUTE:
            this.execute(payload);
            break;
          default:
            break;
        }
      }.bind(this)
    );
  }

  getStore(index) {
    return this.store[index];
  }

  setStore(obj) {
    this.store = { ...this.store, ...obj };
    return emitter.emit("StoreUpdated");
  }

  configure = async () => {
    const web3 = new Web3(store.getStore("web3context").library.provider);
    const currentBlock = await web3.eth.getBlockNumber();

    store.setStore({ currentBlock: currentBlock });

    window.setTimeout(() => {
      emitter.emit(CONFIGURE_RETURNED);
    }, 100);
  };

  getBalancesPerpetual = async () => {
    try {
      const pools = store.getStore("rewardPools");
      const account = store.getStore("account");
      const web3 = new Web3(store.getStore("web3context").library.provider);

      const currentBlock = await web3.eth.getBlockNumber();
      store.setStore({ currentBlock: currentBlock });

      async.map(
        pools,
        (pool, callback) => {
          async.map(
            pool.tokens,
            (token, callbackInner) => {
              async.parallel(
                [
                  (callbackInnerInner) => {
                    this._getERC20Balance(
                      web3,
                      token,
                      account,
                      callbackInnerInner
                    );
                  },
                  (callbackInnerInner) => {
                    this._getStakedBalance(
                      web3,
                      token,
                      account,
                      callbackInnerInner
                    );
                  },
                  (callbackInnerInner) => {
                    this._getGovBalance(
                      web3,
                      token,
                      account,
                      callbackInnerInner
                    );
                  },
                  (callbackInnerInner) => {
                    this._getRewardBalance(
                      web3,
                      token,
                      account,
                      callbackInnerInner
                    );
                  },
                ],
                (err, data) => {
                  if (err) {
                    console.log(err);
                    return callbackInner(err);
                  }

                  token.balance = data[0];
                  token.stakedBalance = data[1];
                  token = { ...token, ...data[2], ...data[3] };
                  callbackInner(null, token);
                }
              );
            },
            (err, tokensData) => {
              if (err) {
                console.log(err);
                return callback(err);
              }

              pool.tokens = tokensData;
              callback(null, pool);
            }
          );
        },
        (err, poolData) => {
          if (err) {
            console.log(err);
            return emitter.emit(ERROR, err);
          }
          store.setStore({ rewardPools: poolData });
          emitter.emit(GET_BALANCES_PERPETUAL_RETURNED);
          emitter.emit(GET_BALANCES_RETURNED);
        }
      );
    } catch (error) {
      console.error("GET_BALANCES_PERPETUAL", error);
    }
  };

  getBalances = () => {
    const pools = store.getStore("rewardPools");
    const account = store.getStore("account");
    const web3 = new Web3(store.getStore("web3context").library.provider);

    async.map(
      pools,
      (pool, callback) => {
        async.map(
          pool.tokens,
          (token, callbackInner) => {
            async.parallel(
              [
                (callbackInnerInner) => {
                  this._getERC20Balance(
                    web3,
                    token,
                    account,
                    callbackInnerInner
                  );
                },
                (callbackInnerInner) => {
                  this._getStakedBalance(
                    web3,
                    token,
                    account,
                    callbackInnerInner
                  );
                },
                (callbackInnerInner) => {
                  this._getRewardsAvailable(
                    web3,
                    token,
                    account,
                    callbackInnerInner
                  );
                },
              ],
              (err, data) => {
                if (err) {
                  console.log(err);
                  return callbackInner(err);
                }

                token.balance = data[0];
                token.stakedBalance = data[1];
                token.rewardsAvailable = data[2];

                callbackInner(null, token);
              }
            );
          },
          (err, tokensData) => {
            if (err) {
              console.log(err);
              return callback(err);
            }

            pool.tokens = tokensData;
            callback(null, pool);
          }
        );
      },
      (err, poolData) => {
        if (err) {
          console.log(err);
          return emitter.emit(ERROR, err);
        }
        store.setStore({ rewardPools: poolData });
        emitter.emit(GET_BALANCES_RETURNED);
      }
    );
  };

  _checkApproval = async (asset, account, amount, contract, callback) => {
    try {
      const web3 = new Web3(store.getStore("web3context").library.provider);
      const erc20Contract = new web3.eth.Contract(asset.abi, asset.address);

      if (!erc20Contract.methods.allowance) {
        return callback(); // Doesn't need approval
      }
      const allowance = await erc20Contract.methods
        .allowance(account.address, contract)
        .call({ from: account.address });

      console.log("allowance", allowance, asset, contract);
      if (bigInt(allowance).lesser(amount)) {
        await erc20Contract.methods
          .approve(contract, web3.utils.toWei("999999999999999999", "ether"))
          .send({
            from: account.address,
            gasPrice: web3.utils.toWei(await this._getGasPrice(), "gwei"),
          });
        callback();
      } else {
        callback();
      }
    } catch (error) {
      console.log(error);
      if (error.message) {
        return callback(error.message);
      }
      callback(error);
    }
  };

  _getERC20Balance = async (web3, asset, account, callback) => {
    let erc20Contract = new web3.eth.Contract(asset.abi, asset.address);
    try {
      let balance = await erc20Contract.methods
        .balanceOf(account.address)
        .call({ from: account.address });
      callback(null, bigInt(balance));
    } catch (ex) {
      return callback(ex);
    }
  };

  _getStakedBalance = async (web3, asset, account, callback) => {
    if (asset.symbol === "yYFL") {
      let yYFLContract = new web3.eth.Contract(
        asset.rewardsABI,
        asset.rewardsAddress
      );
      try {
        let balance = await yYFLContract.methods
          .balanceOf(account.address)
          .call({ from: account.address });
        callback(null, bigInt(balance));
      } catch (ex) {
        return callback(ex);
      }
    } else {
      let erc20Contract = new web3.eth.Contract(
        asset.rewardsABI,
        asset.rewardsAddress
      );
      try {
        let balance = await erc20Contract.methods
          .balanceOf(account.address)
          .call({ from: account.address });
        callback(null, bigInt(balance));
      } catch (ex) {
        return callback(ex);
      }
    }
  };

  _getGovBalance = async (web3, asset, account, callback) => {
    if (asset.symbol === "yYFL") {
      let yYFLContract = new web3.eth.Contract(asset.abi, asset.address);
      try {
        let totalSupply = await yYFLContract.methods
          .totalSupply()
          .call({ from: account.address });
        let yYFLPrice = await yYFLContract.methods
          .getPricePerFullShare()
          .call({ from: account.address });

        let voteLockAmount = 0;
        if (yYFLContract.methods.voteLockAmount) {
          voteLockAmount = await yYFLContract.methods
            .voteLockAmount(account.address)
            .call({ from: account.address });
        }

        const balances = {
          totalSupply: bigInt(totalSupply),
          yYFLPrice: bigInt(yYFLPrice),
          voteLocked: bigInt(voteLockAmount),
        };
        callback(null, balances);
      } catch (ex) {
        return callback(ex);
      }
    } else if (asset.symbol === "YFL") {
      let yYFLContract = new web3.eth.Contract(asset.abi, asset.address);
      try {
        let totalSupply = await yYFLContract.methods
          .totalSupply()
          .call({ from: account.address });
        let yflinkValue = await fetch(
          "https://api.coingecko.com/api/v3/simple/price?ids=yflink&vs_currencies=usd"
        ).then((resp) => {
          return resp.json();
        });
        let voteLockAmount = 0;
        if (yYFLContract.methods.voteLockAmount) {
          voteLockAmount = await yYFLContract.methods
            .voteLockAmount(account.address)
            .call({ from: account.address });
        }

        const balances = {
          totalSupply: bigInt(totalSupply),
          yflPrice:
            (yflinkValue && yflinkValue.yflink && yflinkValue.yflink.usd) || 0,
          voteLocked: bigInt(voteLockAmount),
        };
        callback(null, balances);
      } catch (ex) {
        return callback(ex);
      }
    } else {
      const balances = {
        totalSupply: bigInt(),
        yYFLPrice: bigInt(),
      };
      callback(null, balances);
    }
  };
  _getRewardBalance = async (web3, asset, account, callback) => {
    if (asset.symbol === "yYFL") {
      try {
        const linkContract = new web3.eth.Contract(
          asset.linkABI,
          asset.linkAddress
        );
        const wethContract = new web3.eth.Contract(
          asset.wethABI,
          asset.wethAddress
        );

        const linkBalance = await linkContract.methods
          .balanceOf(asset.address)
          .call({ from: account.address });
        const wethBalance = await wethContract.methods
          .balanceOf(asset.address)
          .call({ from: account.address });

        const {
          chainlink: { usd: linkPrice },
        } = await fetch(
          "https://api.coingecko.com/api/v3/simple/price?ids=chainlink&vs_currencies=usd"
        ).then((resp) => {
          return resp.json();
        });

        const {
          weth: { usd: wethPrice },
        } = await fetch(
          "https://api.coingecko.com/api/v3/simple/price?ids=weth&vs_currencies=usd"
        ).then((resp) => {
          return resp.json();
        });

        const balances = {
          linkBalance: bigInt(linkBalance),
          wethBalance: bigInt(wethBalance),
          linkPrice,
          wethPrice,
        };
        callback(null, balances);
      } catch (ex) {
        return callback(ex);
      }
    } else {
      const balances = {};
      callback(null, balances);
    }
  };

  _getRewardsAvailable = async (web3, asset, account, callback) => {
    if (!asset.rewardsSymbol) {
      callback(null, bigInt(0));
      return;
    }
    let erc20Contract = new web3.eth.Contract(
      asset.rewardsABI,
      asset.rewardsAddress
    );
    try {
      let earned = await erc20Contract.methods
        .earned(account.address)
        .call({ from: account.address });
      callback(null, bigInt(earned));
    } catch (ex) {
      return callback(ex);
    }
  };

  _getVoteLockAmount = async (web3, asset, account, callback) => {
    let rewardsContract = new web3.eth.Contract(
      asset.rewardsABI,
      asset.rewardsAddress
    );
    try {
      if (!rewardsContract.methods.voteLockAmount) {
        return callback(null, bigInt(0));
      }
      let balance = await rewardsContract.methods
        .voteLockAmount(account.address)
        .call({ from: account.address });
      callback(null, bigInt(balance));
    } catch (ex) {
      return callback(ex);
    }
  };

  stake = (payload) => {
    const account = store.getStore("account");
    const { asset, amount, type } = payload.content;

    if (type === "LINKSWAP") {
      const { yflAsset } = payload.content;
      this._checkApproval(
        yflAsset,
        account,
        amount,
        asset.rewardsAddress,
        (err) => {
          if (err) {
            return emitter.emit(ERROR, err);
          }

          this._callStake(asset, account, amount, (err, res) => {
            if (err) {
              return emitter.emit(ERROR, err);
            }

            return emitter.emit(STAKE_RETURNED, res);
          });
        }
      );
    } else {
      this._checkApproval(
        asset,
        account,
        amount,
        asset.rewardsAddress,
        (err) => {
          if (err) {
            return emitter.emit(ERROR, err);
          }

          this._callStake(asset, account, amount, (err, res) => {
            if (err) {
              return emitter.emit(ERROR, err);
            }

            return emitter.emit(STAKE_RETURNED, res);
          });
        }
      );
    }
  };

  _callStake = async (asset, account, amount, callback) => {
    const web3 = new Web3(store.getStore("web3context").library.provider);
    const rewardsContract = new web3.eth.Contract(
      asset.rewardsABI,
      asset.rewardsAddress
    );

    console.debug(amount.toString());
    rewardsContract.methods
      .stake(amount.toString())
      .send({
        from: account.address,
        gasPrice: web3.utils.toWei(await this._getGasPrice(), "gwei"),
      })
      .on("transactionHash", function (hash) {
        console.log(hash);
        callback(null, hash);
      })
      .on("confirmation", function (confirmationNumber, receipt) {
        console.log(confirmationNumber, receipt);
        if (confirmationNumber === 2) {
          dispatcher.dispatch({ type: GET_BALANCES, content: {} });
        }
      })
      .on("receipt", function (receipt) {
        console.log(receipt);
      })
      .on("error", function (error) {
        if (!error.toString().includes("-32601")) {
          if (error.message) {
            return callback(error.message);
          }
          callback(error);
        }
      })
      .catch((error) => {
        if (!error.toString().includes("-32601")) {
          if (error.message) {
            return callback(error.message);
          }
          callback(error);
        }
      });
  };

  withdraw = (payload) => {
    const account = store.getStore("account");
    const { asset, amount } = payload.content;

    this._callWithdraw(asset, account, amount, (err, res) => {
      if (err) {
        return emitter.emit(ERROR, err);
      }

      return emitter.emit(WITHDRAW_RETURNED, res);
    });
  };

  _callWithdraw = async (asset, account, amount, callback) => {
    const web3 = new Web3(store.getStore("web3context").library.provider);
    const rewardsContract = new web3.eth.Contract(
      asset.rewardsABI,
      asset.rewardsAddress
    );

    rewardsContract.methods
      .withdraw(amount.toString())
      .send({
        from: account.address,
        gasPrice: web3.utils.toWei(await this._getGasPrice(), "gwei"),
      })
      .on("transactionHash", function (hash) {
        console.log(hash);
        callback(null, hash);
      })
      .on("confirmation", function (confirmationNumber, receipt) {
        console.log(confirmationNumber, receipt);
        if (confirmationNumber === 2) {
          dispatcher.dispatch({ type: GET_BALANCES, content: {} });
        }
      })
      .on("receipt", function (receipt) {
        console.log(receipt);
      })
      .on("error", function (error) {
        if (!error.toString().includes("-32601")) {
          if (error.message) {
            return callback(error.message);
          }
          callback(error);
        }
      })
      .catch((error) => {
        if (!error.toString().includes("-32601")) {
          if (error.message) {
            return callback(error.message);
          }
          callback(error);
        }
      });
  };

  getReward = (payload) => {
    const account = store.getStore("account");
    const { asset } = payload.content;

    this._callGetReward(asset, account, (err, res) => {
      if (err) {
        return emitter.emit(ERROR, err);
      }

      return emitter.emit(GET_REWARDS_RETURNED, res);
    });
  };

  _callGetReward = async (asset, account, callback) => {
    const web3 = new Web3(store.getStore("web3context").library.provider);
    const rewardsContract = new web3.eth.Contract(
      asset.rewardsABI,
      asset.rewardsAddress
    );

    rewardsContract.methods
      .getReward()
      .send({
        from: account.address,
        gasPrice: web3.utils.toWei(await this._getGasPrice(), "gwei"),
      })
      .on("transactionHash", function (hash) {
        console.log(hash);
        callback(null, hash);
      })
      .on("confirmation", function (confirmationNumber, receipt) {
        console.log(confirmationNumber, receipt);
        if (confirmationNumber === 2) {
          dispatcher.dispatch({ type: GET_BALANCES, content: {} });
        }
      })
      .on("receipt", function (receipt) {
        console.log(receipt);
      })
      .on("error", function (error) {
        if (!error.toString().includes("-32601")) {
          if (error.message) {
            return callback(error.message);
          }
          callback(error);
        }
      })
      .catch((error) => {
        if (!error.toString().includes("-32601")) {
          if (error.message) {
            return callback(error.message);
          }
          callback(error);
        }
      });
  };

  exit = (payload) => {
    const account = store.getStore("account");
    const { asset } = payload.content;

    this._callExit(asset, account, (err, res) => {
      if (err) {
        return emitter.emit(ERROR, err);
      }

      return emitter.emit(EXIT_RETURNED, res);
    });
  };

  _callExit = async (asset, account, callback) => {
    const web3 = new Web3(store.getStore("web3context").library.provider);
    const rewardsContract = new web3.eth.Contract(
      asset.rewardsABI,
      asset.rewardsAddress
    );

    rewardsContract.methods
      .exit()
      .send({
        from: account.address,
        gasPrice: web3.utils.toWei(await this._getGasPrice(), "gwei"),
      })
      .on("transactionHash", function (hash) {
        console.log(hash);
        callback(null, hash);
      })
      .on("confirmation", function (confirmationNumber, receipt) {
        console.log(confirmationNumber, receipt);
        if (confirmationNumber === 2) {
          dispatcher.dispatch({ type: GET_BALANCES, content: {} });
        }
      })
      .on("receipt", function (receipt) {
        console.log(receipt);
      })
      .on("error", function (error) {
        if (!error.toString().includes("-32601")) {
          if (error.message) {
            return callback(error.message);
          }
          callback(error);
        }
      })
      .catch((error) => {
        if (!error.toString().includes("-32601")) {
          if (error.message) {
            return callback(error.message);
          }
          callback(error);
        }
      });
  };

  propose = (payload) => {
    const account = store.getStore("account");
    const { type } = payload.content;

    if (type === "URL") {
      const { url } = payload.content;
      this._callUrlPropose(account, url, (err, res) => {
        if (err) {
          return emitter.emit(ERROR, err);
        }

        return emitter.emit(PROPOSE_RETURNED, res);
      });
    } else if (type === "FUNCTION") {
      const { description, parameters } = payload.content;

      this._callFunctionPropose(
        account,
        description,
        parameters,
        (err, res) => {
          if (err) {
            return emitter.emit(ERROR, err);
          }

          return emitter.emit(PROPOSE_RETURNED, res);
        }
      );
    }
  };

  _callUrlPropose = async (account, url, callback) => {
    const web3 = new Web3(store.getStore("web3context").library.provider);
    const governanceContract = new web3.eth.Contract(
      config.governanceABI,
      config.governanceAddress
    );
    const call = governanceContract.methods.propose(url);

    call
      .send({
        from: account.address,
        gasPrice: web3.utils.toWei(await this._getGasPrice(), "gwei"),
      })
      .on("transactionHash", function (hash) {
        console.log(hash);
        callback(null, hash);
      })
      .on("confirmation", function (confirmationNumber, receipt) {
        console.log(confirmationNumber, receipt);
        if (confirmationNumber === 2) {
          dispatcher.dispatch({ type: GET_BALANCES, content: {} });
        }
      })
      .on("receipt", function (receipt) {
        console.log(receipt);
      })
      .on("error", function (error) {
        if (!error.toString().includes("-32601")) {
          if (error.message) {
            return callback(error.message);
          }
          callback(error);
        }
      })
      .catch((error) => {
        if (!error.toString().includes("-32601")) {
          if (error.message) {
            return callback(error.message);
          }
          callback(error);
        }
      });
  };

  _callFunctionPropose = async (account, description, parameters, callback) => {
    const web3 = new Web3(store.getStore("web3context").library.provider);
    const yYFLContract = new web3.eth.Contract(
      config.yYFLGovABI,
      config.yYFLGovAddress
    );
    const call = yYFLContract.methods.propose(
      parameters.targets,
      parameters.values,
      parameters.signatures,
      parameters.calldatas,
      description
    );

    call
      .send({
        from: account.address,
        gasPrice: web3.utils.toWei(await this._getGasPrice(), "gwei"),
      })
      .on("transactionHash", function (hash) {
        console.log(hash);
        callback(null, hash);
      })
      .on("confirmation", function (confirmationNumber, receipt) {
        console.log(confirmationNumber, receipt);
        if (confirmationNumber === 2) {
          dispatcher.dispatch({ type: GET_BALANCES, content: {} });
        }
      })
      .on("receipt", function (receipt) {
        console.log(receipt);
      })
      .on("error", function (error) {
        console.log("propose error", error);
        if (!error.toString().includes("-32601")) {
          if (error.message) {
            return callback(error.message);
          }
          callback(error);
        }
      })
      .catch((error) => {
        if (!error.toString().includes("-32601")) {
          if (error.message) {
            return callback(error.message);
          }
          callback(error);
        }
      });
  };

  getProposals = (_payload) => {
    // emitter.emit(GET_PROPOSALS_RETURNED)
    const account = store.getStore("account");
    const web3 = new Web3(store.getStore("web3context").library.provider);

    this._getYYFLProposalCreatedEvents(
      web3,
      account,
      (err, proposalData, hasActive) => {
        if (err) {
          return emitter.emit(ERROR, err);
        }
        this._getYYFLProposalCount(web3, account, (err, proposalCount) => {
          if (err) {
            return emitter.emit(ERROR, err);
          }

          let arr = Array.from(Array(parseInt(proposalCount)).keys());

          if (proposalCount === 0) {
            arr = [];
          }
          store.setStore({ hasActiveProposal: hasActive });

          async.map(
            arr,
            (proposal, callback) => {
              this._getYYFLProposals(web3, account, proposal, callback);
            },
            (err, proposals) => {
              if (err) {
                return emitter.emit(ERROR, err);
              }
              const updatedProposals = proposals.map((item, index) => {
                return { ...item, ...proposalData[index] };
              });
              store.setStore({ yYFLProposals: updatedProposals });
              emitter.emit(GET_PROPOSALS_RETURNED);
            }
          );
        });
      }
    );
  };

  _getGovProposalCount = async (web3, account, callback) => {
    try {
      const governanceContract = new web3.eth.Contract(
        config.governanceABI,
        config.governanceAddress
      );
      let proposals = await governanceContract.methods
        .proposalCount()
        .call({ from: account.address });
      callback(null, proposals);
    } catch (ex) {
      return callback(ex);
    }
  };

  _getYYFLProposalCount = async (web3, account, callback) => {
    try {
      const yYFLContract = new web3.eth.Contract(
        config.yYFLGovABI,
        config.yYFLGovAddress
      );
      let proposals = await yYFLContract.methods
        .proposalCount()
        .call({ from: account.address });
      callback(null, proposals);
    } catch (err) {
      return callback(err);
    }
  };

  _getGovProposals = async (web3, account, number, callback) => {
    try {
      const governanceContract = new web3.eth.Contract(
        config.governanceABI,
        config.governanceAddress
      );
      let proposal = await governanceContract.methods
        .proposals(number)
        .call({ from: account.address });
      callback(null, proposal);
    } catch (ex) {
      return callback(ex);
    }
  };
  _getYYFLProposals = async (web3, account, number, callback) => {
    try {
      const yYFLContract = new web3.eth.Contract(
        config.yYFLGovABI,
        config.yYFLGovAddress
      );
      let proposal = await yYFLContract.methods
        .proposals(number)
        .call({ from: account.address });
      callback(null, proposal);
    } catch (ex) {
      return callback(ex);
    }
  };

  _getYYFLProposalCreatedEvents = async (web3, account, callback) => {
    try {
      const yYFLContract = new web3.eth.Contract(
        config.yYFLGovABI,
        config.yYFLGovAddress
      );
      const proposalEvents = await yYFLContract.getPastEvents(
        "ProposalCreated",
        {
          fromBlock: 0,
          toBlock: "latest",
        }
      );
      const proposals = proposalEvents.reduce((data, event) => {
        let newData = { ...data };
        newData[event.returnValues.id] = {
          ...event.returnValues,
          address: event.address,
        };
        return newData;
      }, {});
      const hasActiveProposal = await yYFLContract.methods
        .hasActiveProposal(account.address)
        .call({ from: account.address });
      callback(null, proposals, hasActiveProposal);
    } catch (ex) {
      return callback(ex);
    }
  };

  voteFor = (payload) => {
    const account = store.getStore("account");
    const { proposal, amount, type } = payload.content;

    if (type === "GOV") {
      this._callGovVoteFor(proposal, account, (err, res) => {
        if (err) {
          return emitter.emit(ERROR, err);
        }

        return emitter.emit(VOTE_FOR_RETURNED, res);
      });
    } else if (type === "LINKSWAP") {
      this._callLinkswapVoteFor(proposal, amount, account, (err, res) => {
        if (err) {
          return emitter.emit(ERROR, err);
        }

        return emitter.emit(VOTE_FOR_RETURNED, res);
      });
    }
  };

  _callGovVoteFor = async (proposal, account, callback) => {
    const web3 = new Web3(store.getStore("web3context").library.provider);
    const governanceContract = new web3.eth.Contract(
      config.governanceABI,
      config.governanceAddress
    );

    governanceContract.methods
      .voteFor(proposal.id)
      .send({
        from: account.address,
        gasPrice: web3.utils.toWei(await this._getGasPrice(), "gwei"),
      })
      .on("transactionHash", function (hash) {
        console.log(hash);
        callback(null, hash);
      })
      .on("confirmation", function (confirmationNumber, receipt) {
        console.log(confirmationNumber, receipt);
        if (confirmationNumber === 2) {
          dispatcher.dispatch({ type: GET_PROPOSALS, content: {} });
        }
      })
      .on("receipt", function (receipt) {
        console.log(receipt);
      })
      .on("error", function (error) {
        if (!error.toString().includes("-32601")) {
          if (error.message) {
            return callback(error.message);
          }
          callback(error);
        }
      })
      .catch((error) => {
        if (!error.toString().includes("-32601")) {
          if (error.message) {
            return callback(error.message);
          }
          callback(error);
        }
      });
  };

  _callLinkswapVoteFor = async (proposal, amount, account, callback) => {
    const web3 = new Web3(store.getStore("web3context").library.provider);
    const yYFLContract = new web3.eth.Contract(
      config.yYFLGovABI,
      config.yYFLGovAddress
    );

    yYFLContract.methods
      .vote(proposal.id, true, amount.toString())
      .send({
        from: account.address,
        gasPrice: web3.utils.toWei(await this._getGasPrice(), "gwei"),
      })
      .on("transactionHash", function (hash) {
        console.log(hash);
        callback(null, hash);
      })
      .on("confirmation", function (confirmationNumber, receipt) {
        console.log(confirmationNumber, receipt);
        if (confirmationNumber === 2) {
          dispatcher.dispatch({ type: GET_PROPOSALS, content: {} });
        }
      })
      .on("receipt", function (receipt) {
        console.log(receipt);
      })
      .on("error", function (error) {
        if (!error.toString().includes("-32601")) {
          if (error.message) {
            return callback(error.message);
          }
          callback(error);
        }
      })
      .catch((error) => {
        if (!error.toString().includes("-32601")) {
          if (error.message) {
            return callback(error.message);
          }
          callback(error);
        }
      });
  };

  voteAgainst = (payload) => {
    const account = store.getStore("account");
    const { proposal, amount, type } = payload.content;

    if (type === "GOV") {
      this._callGovVoteAgainst(proposal, account, (err, res) => {
        if (err) {
          return emitter.emit(ERROR, err);
        }

        return emitter.emit(VOTE_AGAINST_RETURNED, res);
      });
    } else if (type === "LINKSWAP") {
      this._callLinkswapVoteAgainst(proposal, amount, account, (err, res) => {
        if (err) {
          return emitter.emit(ERROR, err);
        }

        return emitter.emit(VOTE_FOR_RETURNED, res);
      });
    }
  };

  _callGovVoteAgainst = async (proposal, account, callback) => {
    const web3 = new Web3(store.getStore("web3context").library.provider);
    const governanceContract = new web3.eth.Contract(
      config.governanceABI,
      config.governanceAddress
    );

    governanceContract.methods
      .voteAgainst(proposal.id)
      .send({
        from: account.address,
        gasPrice: web3.utils.toWei(await this._getGasPrice(), "gwei"),
      })
      .on("transactionHash", function (hash) {
        console.log(hash);
        callback(null, hash);
      })
      .on("confirmation", function (confirmationNumber, receipt) {
        console.log(confirmationNumber, receipt);
        if (confirmationNumber === 2) {
          dispatcher.dispatch({ type: GET_PROPOSALS, content: {} });
        }
      })
      .on("receipt", function (receipt) {
        console.log(receipt);
      })
      .on("error", function (error) {
        if (!error.toString().includes("-32601")) {
          if (error.message) {
            return callback(error.message);
          }
          callback(error);
        }
      })
      .catch((error) => {
        if (!error.toString().includes("-32601")) {
          if (error.message) {
            return callback(error.message);
          }
          callback(error);
        }
      });
  };

  _callLinkswapVoteAgainst = async (proposal, amount, account, callback) => {
    const web3 = new Web3(store.getStore("web3context").library.provider);
    const yYFLContract = new web3.eth.Contract(
      config.yYFLGovABI,
      config.yYFLGovAddress
    );

    yYFLContract.methods
      .vote(proposal.id, false, amount.toString())
      .send({
        from: account.address,
        gasPrice: web3.utils.toWei(await this._getGasPrice(), "gwei"),
      })
      .on("transactionHash", function (hash) {
        console.log(hash);
        callback(null, hash);
      })
      .on("confirmation", function (confirmationNumber, receipt) {
        console.log(confirmationNumber, receipt);
        if (confirmationNumber === 2) {
          dispatcher.dispatch({ type: GET_PROPOSALS, content: {} });
        }
      })
      .on("receipt", function (receipt) {
        console.log(receipt);
      })
      .on("error", function (error) {
        if (!error.toString().includes("-32601")) {
          if (error.message) {
            return callback(error.message);
          }
          callback(error);
        }
      })
      .catch((error) => {
        if (!error.toString().includes("-32601")) {
          if (error.message) {
            return callback(error.message);
          }
          callback(error);
        }
      });
  };

  getClaimableAsset = (_payload) => {
    const account = store.getStore("account");
    const asset = store.getStore("claimableAsset");

    const web3 = new Web3(store.getStore("web3context").library.provider);

    async.parallel(
      [
        (callbackInnerInner) => {
          this._getClaimableBalance(web3, asset, account, callbackInnerInner);
        },
        (callbackInnerInner) => {
          this._getClaimable(web3, asset, account, callbackInnerInner);
        },
      ],
      (err, data) => {
        if (err) {
          return emitter.emit(ERROR, err);
        }

        asset.balance = data[0];
        asset.claimableBalance = data[1];

        store.setStore({ claimableAsset: asset });
        emitter.emit(GET_CLAIMABLE_ASSET_RETURNED);
      }
    );
  };

  _getClaimableBalance = async (web3, asset, account, callback) => {
    let erc20Contract = new web3.eth.Contract(asset.abi, asset.address);

    try {
      let balance = await erc20Contract.methods
        .balanceOf(account.address)
        .call({ from: account.address });
      callback(null, bigInt(balance));
    } catch (ex) {
      return callback(ex);
    }
  };

  _getClaimable = async (web3, asset, account, callback) => {
    let claimContract = new web3.eth.Contract(
      config.claimABI,
      config.claimAddress
    );

    try {
      let balance = await claimContract.methods
        .claimable(account.address)
        .call({ from: account.address });
      callback(null, bigInt(balance));
    } catch (ex) {
      return callback(ex);
    }
  };
  convert = (payload) => {
    const account = store.getStore("account");
    const { asset, tokens, amounts } = payload.content;
    console.log("asset, tokens, amounts", asset, tokens, amounts, account);
    this._callConvert(asset, account, tokens, amounts, (err, res) => {
      if (err) {
        return emitter.emit(ERROR, err);
      }
      return emitter.emit(CONVERT_RETURNED, res);
    });
  };

  _callConvert = async (asset, account, tokens, amounts, callback) => {
    const web3 = new Web3(store.getStore("web3context").library.provider);
    const yYFLContract = new web3.eth.Contract(asset.abi, asset.address);
    try {
      const result = await yYFLContract.methods
        .convertTokensToYfl(tokens, amounts)
        .call({ from: account.address });
      callback(null, result);
    } catch (error) {
      console.log("CONVERT ERROR", error);
      callback(error);
    }
  };

  getRaffleInfo = (payload) => {
    const account = store.getStore("account");
    this._callRaffleInfo(account, (err, res) => {
      if (err) {
        return emitter.emit(ERROR, err);
      }
      store.setStore({ raffleInfo: res });
      return emitter.emit(GET_RAFFLE_INFO_RETURNED, res);
    });
  };

  _callRaffleInfo = async (account, callback) => {
    const web3 = new Web3(store.getStore("web3context").library.provider);
    const raffleContract = new web3.eth.Contract(
      config.raffleABI,
      config.raffleAddress
    );
    try {
      const currentDay = await raffleContract.methods
        .currentDay()
        .call({ from: account.address });

      const currentPair = await raffleContract.methods
        .currentPairAndVault()
        .call({ from: account.address });

      let entered = false;
      if (account && account.address) {
        const transferEvents = await raffleContract.getPastEvents("Transfer", {
          fromBlock: 0,
          toBlock: "latest",
          filter: { from: 0x0, to: account.address },
        });
        const tokenIds = transferEvents.map((event) => {
          return event.returnValues.tokenId;
        });

        for (let i = 0; i < tokenIds.length; i++) {
          const tokenDetail = await raffleContract.methods
            .details(tokenIds[i])
            .call({ from: account.address });
          if (
            tokenDetail &&
            tokenDetail.day &&
            parseInt(tokenDetail.day) === parseInt(currentDay)
          ) {
            entered = true;
          }
        }
      }

      const winnedEvents = await raffleContract.getPastEvents("Winner", {
        fromBlock: 0,
        toBlock: "latest",
      });

      let winnersAddress = [];

      let i = 0;

      for (i = 0; i < winnedEvents.length; i = i + 1) {
        const data = await raffleContract.methods
          .details(winnedEvents[i].returnValues._tokenId)
          .call({ from: account.address });
        winnersAddress.push({
          address: winnedEvents[i].returnValues._selected,
          tokenId: winnedEvents[i].returnValues._tokenId,
          ...data,
        });
      }
      const result = {
        currentDay,
        currentPair,
        entered,
        winners: winnersAddress,
      };
      callback(null, result);
    } catch (error) {
      console.log("GET RAFFLE ERROR", error);
      callback(error);
    }
  };

  enterRaffle = (payload) => {
    const account = store.getStore("account");

    this._callEnterRaffle(account, (err, res) => {
      if (err) {
        return emitter.emit(ERROR, err);
      }
      return emitter.emit(ENTER_RAFFLE_RETURNED, res);
    });
  };

  _callEnterRaffle = async (account, callback) => {
    console.log("_callEnterRaffle");
    const web3 = new Web3(store.getStore("web3context").library.provider);
    const raffleContract = new web3.eth.Contract(
      config.raffleABI,
      config.raffleAddress
    );
    try {
      raffleContract.methods
        .enter()
        .send({
          from: account.address,
          gasPrice: web3.utils.toWei(await this._getGasPrice(), "gwei"),
        })
        .on("transactionHash", function (hash) {
          console.log(hash);
          callback(null, hash);
        })
        .on("confirmation", function (confirmationNumber, receipt) {
          console.log(confirmationNumber, receipt);
          if (confirmationNumber === 2) {
            dispatcher.dispatch({ type: GET_RAFFLE_INFO, content: {} });
          }
        })
        .on("receipt", function (receipt) {
          console.log(receipt);
        })
        .on("error", function (error) {
          if (!error.toString().includes("-32601")) {
            if (error.message) {
              return callback(error.message);
            }
            callback(error);
          }
        })
        .catch((error) => {
          if (!error.toString().includes("-32601")) {
            if (error.message) {
              return callback(error.message);
            }
            callback(error);
          }
        });
    } catch (error) {
      console.log("ENTER RAFFLE ERROR", error);
      callback(error);
    }
  };

  claimPrize = (payload) => {
    const account = store.getStore("account");

    this._callClaimPrize(account, (err, res) => {
      if (err) {
        return emitter.emit(ERROR, err);
      }
      return emitter.emit(CLAIM_PRIZE_RETURNED, res);
    });
  };

  _callClaimPrize = async (account, callback) => {
    console.log("_callClaimPrize");
    const web3 = new Web3(store.getStore("web3context").library.provider);
    const raffleContract = new web3.eth.Contract(
      config.raffleABI,
      config.raffleAddress
    );
    try {
      raffleContract.methods
        .claim()
        .send({
          from: account.address,
          gasPrice: web3.utils.toWei(await this._getGasPrice(), "gwei"),
        })
        .on("transactionHash", function (hash) {
          console.log(hash);
          callback(null, hash);
        })
        .on("confirmation", function (confirmationNumber, receipt) {
          console.log(confirmationNumber, receipt);
          if (confirmationNumber === 2) {
            dispatcher.dispatch({ type: GET_RAFFLE_INFO, content: {} });
          }
        })
        .on("receipt", function (receipt) {
          console.log(receipt);
        })
        .on("error", function (error) {
          if (!error.toString().includes("-32601")) {
            if (error.message) {
              return callback(error.message);
            }
            callback(error);
          }
        })
        .catch((error) => {
          if (!error.toString().includes("-32601")) {
            if (error.message) {
              return callback(error.message);
            }
            callback(error);
          }
        });
    } catch (error) {
      console.log("ENTER RAFFLE ERROR", error);
      callback(error);
    }
  };

  execute = (payload) => {
    const account = store.getStore("account");
    const { proposal } = payload.content;
    if (proposal && proposal.id) {
      this._callExecute(account, proposal.id, (err, res) => {
        if (err) {
          return emitter.emit(ERROR, err);
        }

        return emitter.emit(EXECUTE_RETURNED, res);
      });
    }
  };

  _callExecute = async (account, id, callback) => {
    const web3 = new Web3(store.getStore("web3context").library.provider);
    const yYFLContract = new web3.eth.Contract(
      config.yYFLABI,
      config.yYFLAddress
    );
    yYFLContract.methods
      .executeProposal(id)
      .send({
        from: account.address,
        gasPrice: web3.utils.toWei(await this._getGasPrice(), "gwei"),
      })
      .on("transactionHash", function (hash) {
        console.log(hash);
        callback(null, hash);
      })
      .on("confirmation", function (confirmationNumber, receipt) {
        console.log(confirmationNumber, receipt);
        if (confirmationNumber === 2) {
          dispatcher.dispatch({ type: GET_PROPOSALS, content: {} });
        }
      })
      .on("receipt", function (receipt) {
        console.log(receipt);
      })
      .on("error", function (error) {
        if (!error.toString().includes("-32601")) {
          if (error.message) {
            return callback(error.message);
          }
          callback(error);
        }
      })
      .catch((error) => {
        if (!error.toString().includes("-32601")) {
          if (error.message) {
            return callback(error.message);
          }
          callback(error);
        }
      });
  };

  claim = (payload) => {
    const account = store.getStore("account");
    const asset = store.getStore("claimableAsset");
    const { amount } = payload.content;

    this._checkApproval(asset, account, amount, config.claimAddress, (err) => {
      if (err) {
        return emitter.emit(ERROR, err);
      }

      this._callClaim(asset, account, amount, (err, res) => {
        if (err) {
          return emitter.emit(ERROR, err);
        }

        return emitter.emit(CLAIM_RETURNED, res);
      });
    });
  };

  _callClaim = async (asset, account, amount, callback) => {
    const web3 = new Web3(store.getStore("web3context").library.provider);
    const claimContract = new web3.eth.Contract(
      config.claimABI,
      config.claimAddress
    );
    claimContract.methods
      .claim(amount.toString())
      .send({
        from: account.address,
        gasPrice: web3.utils.toWei(await this._getGasPrice(), "gwei"),
      })
      .on("transactionHash", function (hash) {
        console.log(hash);
        callback(null, hash);
      })
      .on("confirmation", function (confirmationNumber, receipt) {
        console.log(confirmationNumber, receipt);
        if (confirmationNumber === 2) {
          dispatcher.dispatch({ type: GET_CLAIMABLE_ASSET, content: {} });
        }
      })
      .on("receipt", function (receipt) {
        console.log(receipt);
      })
      .on("error", function (error) {
        if (!error.toString().includes("-32601")) {
          if (error.message) {
            return callback(error.message);
          }
          callback(error);
        }
      })
      .catch((error) => {
        if (!error.toString().includes("-32601")) {
          if (error.message) {
            return callback(error.message);
          }
          callback(error);
        }
      });
  };

  getClaimable = (_payload) => {
    const account = store.getStore("account");
    const asset = store.getStore("claimableAsset");

    const web3 = new Web3(store.getStore("web3context").library.provider);

    async.parallel(
      [
        (callbackInnerInner) => {
          this._getClaimableBalance(web3, asset, account, callbackInnerInner);
        },
        (callbackInnerInner) => {
          this._getClaimable(web3, asset, account, callbackInnerInner);
        },
      ],
      (err, data) => {
        if (err) {
          return emitter.emit(ERROR, err);
        }

        asset.balance = data[0];
        asset.claimableBalance = data[1];

        store.setStore({ claimableAsset: asset });
        emitter.emit(GET_CLAIMABLE_RETURNED);
      }
    );
  };

  getWrapped = () => {
    const account = store.getStore("account");
    const wrapping = store.getStore("wrapping");
    const web3 = new Web3(store.getStore("web3context").library.provider);

    async.parallel(
      [
        (cb) => {
          this._getERC20Balance(web3, wrapping.raw, account, cb);
        },
        (cb) => {
          this._getERC20Balance(web3, wrapping.wrapper, account, cb);
        },
      ],
      (err, data) => {
        if (err) {
          console.log(err);
          return emitter.emit(ERROR, err);
        }
        wrapping.raw.balance = data[0];
        wrapping.wrapper.balance = data[1];
        store.setStore({ wrapping: wrapping });
        emitter.emit(GET_WRAPPED_RETURNED, wrapping);
      }
    );
  };

  doWrap = (payload) => {
    const account = store.getStore("account");
    const wrapping = store.getStore("wrapping");
    const { amount } = payload.content;

    this._checkApproval(
      wrapping.raw,
      account,
      amount,
      wrapping.wrapper.address,
      (err) => {
        if (err) {
          return emitter.emit(ERROR, err);
        }

        this._callWrap(wrapping.wrapper, account, amount, (err, res) => {
          if (err) {
            return emitter.emit(ERROR, err);
          }

          return emitter.emit(WRAP_RETURNED, res);
        });
      }
    );
  };

  _callWrap = async (wrapper, account, amount, callback) => {
    const web3 = new Web3(store.getStore("web3context").library.provider);
    const wrapperContract = new web3.eth.Contract(wrapper.abi, wrapper.address);

    wrapperContract.methods
      .wrap(amount.toString())
      .send({
        from: account.address,
        gasPrice: web3.utils.toWei(await this._getGasPrice(), "gwei"),
      })
      .on("transactionHash", function (hash) {
        console.log(hash);
        callback(null, hash);
      })
      .on("confirmation", function (confirmationNumber, receipt) {
        console.log(confirmationNumber, receipt);
        if (confirmationNumber === 2) {
          dispatcher.dispatch({ type: GET_WRAPPED, content: {} });
        }
      })
      .on("receipt", function (receipt) {
        console.log(receipt);
      })
      .on("error", function (error) {
        if (!error.toString().includes("-32601")) {
          if (error.message) {
            return callback(error.message);
          }
          callback(error);
        }
      })
      .catch((error) => {
        if (!error.toString().includes("-32601")) {
          if (error.message) {
            return callback(error.message);
          }
          callback(error);
        }
      });
  };

  _callUnwrap = async (wrapper, account, amount, callback) => {
    const web3 = new Web3(store.getStore("web3context").library.provider);
    const wrapperContract = new web3.eth.Contract(wrapper.abi, wrapper.address);

    wrapperContract.methods
      .unwrap(amount.toString())
      .send({
        from: account.address,
        gasPrice: web3.utils.toWei(await this._getGasPrice(), "gwei"),
      })
      .on("transactionHash", function (hash) {
        console.log(hash);
        callback(null, hash);
      })
      .on("confirmation", function (confirmationNumber, receipt) {
        console.log(confirmationNumber, receipt);
        if (confirmationNumber === 2) {
          dispatcher.dispatch({ type: GET_WRAPPED, content: {} });
        }
      })
      .on("receipt", function (receipt) {
        console.log(receipt);
      })
      .on("error", function (error) {
        if (!error.toString().includes("-32601")) {
          if (error.message) {
            return callback(error.message);
          }
          callback(error);
        }
      })
      .catch((error) => {
        if (!error.toString().includes("-32601")) {
          if (error.message) {
            return callback(error.message);
          }
          callback(error);
        }
      });
  };

  _getGasPrice = async () => {
    try {
      const url = "https://gasprice.poa.network/";
      const priceString = await rp(url);
      const priceJSON = JSON.parse(priceString);
      if (priceJSON) {
        return priceJSON.fast.toFixed(0);
      }
      return store.getStore("universalGasPrice");
    } catch (e) {
      console.log(e);
      return store.getStore("universalGasPrice");
    }
  };
}

const store = new Store();

export default {
  store: store,
  dispatcher: dispatcher,
  emitter: emitter,
};
