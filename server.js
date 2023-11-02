import { ApolloServer, gql } from "apollo-server";

const tweets = [
  {
    id: "1",
    text: "first",
  },
  {
    id: "2",
    text: "second",
  },
];

const typeDefs = gql`
  type Tweet {
    id: ID!
    text: String!
    auther: User
  }
  type User {
    id: ID!
    username: String!
    firstName: String!
    lastName: String
  }
  type Query {
    allTweets: [Tweet!]!
    tweet(id: ID!): Tweet
    ping: String!
  }
  type Mutation {
    postTweet(text: String!, userId: ID!): Tweet!
    deleteTweet(id: ID!): Boolean!
  }
`;

const resolvers = {
  Query: {
    tweet(root, { id }) {
      return tweets.find((tweet) => tweet.id === id);
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`Running on ${url}`);
});