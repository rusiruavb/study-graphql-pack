const { ApolloServer, gql } = require("apollo-server");

const typeDefs = gql`
  type Query {
    hello: String
  }

  input UserParams {
    username: String!
    email: String!
    age: Int
  }

  type Mutation {
    register(userParams: UserParams): User
  }

  type User {
    id: ID!
    username: String!
  }
`;

const resolvers = {
  Query: {
    hello: () => null,
  },
  Mutation: {
    register: (parent, { userParams: { username } }, context, info) => ({
      id: 1,
      username: `Hello ${username}`,
    }),
  },
};

const server = new ApolloServer({
  resolvers: resolvers,
  typeDefs: typeDefs,
});

server
  .listen()
  .then((res) => {
    console.log(`Server is running on ${res.url}`);
  })
  .catch((err) => {
    console.log("Server error: ", err.message);
  });
