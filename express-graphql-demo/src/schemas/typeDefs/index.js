import { GraphQLObjectType, GraphQLString } from "graphql";

export const SampleUser = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLString },
    firstName: {
      type: GraphQLString,
      resolve: (parent) => {
        return parent.firstName;
      },
    },
    lastName: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    firstLetter: {
      type: GraphQLString,
      resolve: (parent) => {
        return parent.firstName[0];
      },
    },
  }),
});
