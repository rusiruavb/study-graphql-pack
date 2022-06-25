import { mergeResolvers } from "@graphql-tools/merge";
import { userResolver } from "./user_resolver";
import { toDoResolver } from "./todo_resolver";

const resolvers = [userResolver, toDoResolver];

export default mergeResolvers(resolvers);
