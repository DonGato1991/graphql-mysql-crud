import { GraphQLList, GraphQLString, GraphQLID } from "graphql";
import { User } from "../../entities/User";
import { UserType } from "../typeDefs/UserType";

export const GET_ALL = {
  type: new GraphQLList(UserType),
  async resolve() {
    return await User.find();
  },
};

export const GET_USER = {
  type: UserType,
  args: {
    id: { type: GraphQLID },
  },
  async resolve(_: any, args:any){
      const {id} = args
      const result = await User.findOne(id)
      return result
  }
};
