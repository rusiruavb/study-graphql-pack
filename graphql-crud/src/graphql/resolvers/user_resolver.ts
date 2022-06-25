import User from "../../models/User";

export const userResolver = {
  Query: {
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
