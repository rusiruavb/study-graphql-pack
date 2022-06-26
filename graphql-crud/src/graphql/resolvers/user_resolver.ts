import ToDo from "../../models/ToDo";
import User from "../../models/User";

export const userResolver = {
  UserToDo: {
    toDos: async (parent: any, _: any, ctx: any) => {
      // console.log("Parent: ", parent);
      // const toDos = await ToDo.findAll({ where: { UserId: parent.id } });
      // console.log(JSON.parse(JSON.stringify(toDos)));
      // return JSON.parse(JSON.stringify(toDos));
      return ctx.toDoLoader.load(parent.id);
    },
  },

  Query: {
    getUserToDos: async (_: any, args: any) => {
      const user = await User.findOne({ where: { id: args.id } });
      if (user) {
        return JSON.parse(JSON.stringify(user));
      } else {
        return null;
      }
    },

    getUsers: async () => {
      const users = await User.findAll();
      return JSON.parse(JSON.stringify(users));
    },

    getUser: async (_parent: any, args: any) => {
      const user = await User.findOne({ where: { id: args.id } });

      if (user) {
        return JSON.parse(JSON.stringify(user));
      } else {
        return null;
      }
    },
  },

  Mutation: {
    registerUser: async (_parent: any, args: any) => {
      const user = await User.create({
        firstName: args.userParams.firstName,
        lastName: args.userParams.lastName,
        email: args.userParams.email,
        userName: args.userParams.userName,
      });

      return JSON.parse(JSON.stringify(user));
    },

    updateUser: async (_parent: any, args: any) => {
      const user = await User.findOne({ where: { id: args.id } });

      if (user) {
        await User.update({ lastName: args.userParams.lastName }, { where: { id: args.id } });
        const updatedUser = await User.findOne({ where: { id: args.id } });
        return JSON.parse(JSON.stringify(updatedUser));
      } else {
        return null;
      }
    },

    deleteUser: async (_parent: any, args: any) => {
      const user = await User.findOne({ where: { id: args.id } });

      if (user) {
        await User.destroy({ where: { id: args.id } });
        return JSON.parse(JSON.stringify(user));
      } else {
        return null;
      }
    },
  },
};
