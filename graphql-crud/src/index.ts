import { ApolloServer } from "apollo-server";
import { loadSchemaSync } from "@graphql-tools/load";
import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";
import sequelize from "./database";
import resolvers from "./graphql/resolvers";

(async () => {
  const typeDefs = loadSchemaSync("./**/*.graphql", {
    loaders: [new GraphQLFileLoader()],
  });

  const app = new ApolloServer({
    typeDefs,
    resolvers,
  });

  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");

    await sequelize.sync({ force: false });
    console.log("The table for the User model was just (re)created!");
  } catch (error: any) {
    console.log(error.message);
  }

  app
    .listen()
    .then(() => {
      console.log("Server is running on http://localhost:4000");
    })
    .catch((error) => {
      console.log(error.message);
    });
})();
