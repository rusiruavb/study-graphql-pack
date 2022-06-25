import express, { Express, Request, Response, NextFunction } from "express";
import sequelize from "./database";

(async () => {
  const app: Express = express();

  app.get("/", (_req: Request, res: Response, next: NextFunction) => {
    res.send("<h1>ToDo Server</h1>");
    next();
  });

  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");

    await sequelize.sync({ force: false });
    console.log("The table for the User model was just (re)created!");
  } catch (error: any) {
    console.log(error.message);
  }

  app.listen(process.env.PORT || 3000, () => {
    console.log("Server is running on http://localhost:3000");
  });
})();
