import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
  database: "todo",
  username: "root",
  password: "RavB1998",
  dialect: "mysql",
  host: "127.0.0.1",
  port: 3306,
  logging: console.log,
});

export default sequelize;
