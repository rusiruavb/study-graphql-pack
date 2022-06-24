import express from "express";
import { graphqlHTTP } from "express-graphql";
import { schema } from "./schemas";

(async () => {
  const app = express();

  app.use(
    "/graphql",
    graphqlHTTP((req, res) => {
      return {
        schema: schema,
        graphiql: true,
        pretty: true,
        context: {
          req,
        },
      };
    })
  );

  app.listen(4000, () => {
    console.log("Server is running http://localhost:4000");
  });
})();
