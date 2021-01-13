import React, { useState } from "react";
import { useParams, withRouter } from "react-router-dom";
import Web3 from "web3";
import config from "../../config";

const NFTImages = ["https://yflink.io/tokens/0.gif"];

const TokenData = () => {
  const params = useParams();
  const [jsonData, setJsonData] = useState({});

  const fetchData = async (id) => {
    const web3 = new Web3(Web3.givenProvider);
    let raffleContract = new web3.eth.Contract(
      config.raffleABI,
      config.raffleAddress
    );

    try {
      const details = await raffleContract.methods.details(id).call();
      const ownerInfo = await raffleContract.methods.ownerOf(id).call();
      if (details.won) {
        setJsonData({
          Name: "LINKSMAS 2020 - Day 1 Prize",
          Description: "LINKSMAS 2020 - Day 1 Prize for DRC/ETH LP",
          URL: `https://yflink.io/#/linksmas-2020/${id}`,
          image: NFTImages[details.day],

          claimed: details.claimed,
          won: details.won,
          day: details.day,
          address: ownerInfo,
        });
      } else {
        setJsonData({
          claimed: details.claimed,
          won: details.won,
          day: details.day,
          address: ownerInfo,
          image: NFTImages[details.day],
          url: `https://yflink.io/#/linksmas-2020/${id}`,
        });
      }
    } catch (error) {
      console.log("GET RAFFLE ERROR", error);
    }
  };

  React.useEffect(() => {
    if (params && params.id) {
      fetchData(params.id);
    }
  }, [params]);

  if (jsonData) {
    return <>{JSON.stringify(jsonData, null, 4)}</>;
  }
};

export default withRouter(TokenData);
