import { mergeResolvers } from "@graphql-tools/merge";
import { userResolver } from "./user_resolver";

const resolvers = [userResolver];

export default mergeResolvers(resolvers);
