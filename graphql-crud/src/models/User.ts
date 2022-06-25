import { DataTypes } from "sequelize";
import sequelize from "../database";
import ToDo from "./ToDo";

const User = sequelize.define(
  "User",
  {
    firstName: { type: DataTypes.STRING, allowNull: false },
    lastName: { type: DataTypes.STRING, allowNull: true },
    userName: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false },
  },
  {
    paranoid: true,
    timestamps: true,
  }
);

User.hasMany(ToDo);

export default User;
