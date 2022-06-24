import { GraphQLInt, GraphQLList, GraphQLObjectType, GraphQLSchema, GraphQLString } from "graphql";
import { SampleUser } from "./typeDefs";
import userData from "../user_data.json";

const Query = new GraphQLObjectType({
  name: "RootQuery",
  fields: () => ({
    getPosts: {
      type: new GraphQLList(SampleUser),
      args: {
        limit: { type: GraphQLInt },
      },
      resolve(parent, args, context) {
        return userData.slice(0, args.limit);
      },
    },

    getUser: {
      type: SampleUser,
      args: {
        id: { type: GraphQLString },
      },
      resolve(parent, args) {
        console.log(parent, args);
        return userData.find((user) => user.id === parseInt(args.id));
      },
    },
  }),
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: () => ({
    createUser: {
      type: SampleUser,
      args: {
        id: { type: GraphQLString },
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
      },
      resolve(parent, args, context, info) {
        userData.push(args);
        return args;
      },
    },
  }),
});

export const schema = new GraphQLSchema({ query: Query, mutation: Mutation });
