import { ApolloServer } from "apollo-server";
import { loadSchemaSync } from "@graphql-tools/load";
import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";
import sequelize from "./database";
import resolvers from "./graphql/resolvers";
import DataLoader from "dataloader";
import ToDo from "./models/ToDo";

(async () => {
  const typeDefs = loadSchemaSync("./**/*.graphql", {
    loaders: [new GraphQLFileLoader()],
  });

  const app = new ApolloServer({
    typeDefs,
    resolvers,
    context: () => {
      return {
        toDoLoader: new DataLoader(async (keys) => {
          const toDos = await ToDo.findAll({ where: { UserId: keys } });
          const toDoMap: any = {};
          toDos.forEach((toDo: any) => {
            toDo = JSON.parse(JSON.stringify(toDo));
            // console.log(toDo.id);
            toDoMap[toDo.id] = toDo;
          });
          return keys.map((key: any) => toDoMap[key]);
        }),
      };
    },
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
    .then(({ url }) => {
      console.log(`Server is running on ${url}`);
    })
    .catch((error) => {
      console.log(error.message);
    });
})();
