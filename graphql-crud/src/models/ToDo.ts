import { DataTypes } from "sequelize";
import sequelize from "../database";
import User from "./User";

const ToDo = sequelize.define(
  "ToDo",
  {
    description: { type: DataTypes.STRING(500) },
    status: { type: DataTypes.STRING },
  },
  {
    paranoid: true,
    timestamps: true,
  }
);

export default ToDo;
