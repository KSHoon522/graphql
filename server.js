import { ApolloServer, gql } from "apollo-server";

let tweets = [
  {
    id: "1",
    text: "first",
    userId: "2",
  },
  {
    id: "2",
    text: "second",
    userId: "1",
  },
];

let users = [
  {
    id: "1",
    firstName: "nico",
    lastName: "las",
  },
  {
    id: "2",
    firstName: "Sang",
    lastName: "hoon",
  },
];

const typeDefs = gql`
  """
  Tweet object represents a resource for a Tweet
  """
  type Tweet {
    id: ID!
    text: String!
    author: User
  }
  type User {
    id: ID!
    firstName: String!
    lastName: String!
    """
    fullName is the sum of firstName and lastName
    """
    fullName: String!
  }
  type Query {
    allUsers: [User!]!
    allTweets: [Tweet!]!
    tweet(id: ID!): Tweet
    ping: String!
  }
  type Mutation {
    postTweet(text: String!, userId: ID!): Tweet!
    """
    Deletes a Tweet if i found, else return false
    """
    deleteTweet(id: ID!): Boolean!
  }
`;

const resolvers = {
  Query: {
    allUsers() {
      console.log("allUsers");
      return users;
    },
    allTweets() {
      return tweets;
    },
    tweet(root, { id }) {
      return tweets.find((tweet) => tweet.id === id);
    },
  },
  Mutation: {
    postTweet(_, { text, userId }) {
      const newTweet = {
        id: tweets.length + 1,
        text,
        userId,
      };
      const idCheck = users.find((user) => user.id === userId);
      if (idCheck) {
        tweets.push(newTweet);
        return newTweet;
      } else {
        console.log("no user");
      }
    },

    deleteTweet(_, { id }) {
      const tweet = tweets.find((tweet) => tweet.id === id);
      if (!tweet) {
        return false;
      }
      tweets = tweets.filter((tweet) => tweet.id !== id);
      return true;
    },
  },
  User: {
    fullName(root) {
      console.log("fullName");
      console.log(root);
      return root.firstName + root.lastName;
    },
  },
  Tweet: {
    author(root) {
      return users.find((user) => user.id === root.userId);
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`Running on ${url}`);
});
