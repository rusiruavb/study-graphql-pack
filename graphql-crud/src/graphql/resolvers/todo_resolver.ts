import ToDo from "../../models/ToDo";
import User from "../../models/User";

export const toDoResolver = {
  Query: {
    getToDosForUser: async (_parent: any, args: any) => {
      const toDos = await ToDo.findAll({ where: { UserId: args.id } });
      return JSON.parse(JSON.stringify(toDos));
    },
  },

  Mutation: {
    addToDo: async (_parent: any, args: any) => {
      await ToDo.create({
        description: args.toDoParams.description,
        UserId: args.toDoParams.userId,
        status: "TODO",
      });

      const todo = await ToDo.findOne({
        where: { UserId: args.toDoParams.userId },
      });

      console.log(JSON.parse(JSON.stringify(todo)));
      return todo;
    },
  },
};
