import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import gql from "graphql-tag";

export const v1Client = new ApolloClient({
  link: new HttpLink({
    uri: "https://api.thegraph.com/subgraphs/name/yflink/linkswap-v1",
  }),
  cache: new InMemoryCache(),
  shouldBatch: true,
});

export const LinkswapDayQuery = gql`
  query linkswapQuery {
    linkswapFactories {
      pairCount
    }
    bundles {
      yflPrice
    }
    linkswapDayDatas(first: 1, orderBy: date, orderDirection: desc) {
      dailyVolumeUSD
      totalLiquidityUSD
    }
  }
`;
