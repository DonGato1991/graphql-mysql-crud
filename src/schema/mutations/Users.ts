import { MessageType } from "./../typeDefs/MessageType";
import { UserType } from "./../typeDefs/UserType";
import {
  GraphQLString,
  GraphQLID,
  GraphQLBoolean,
  GraphQLObjectType,
  GraphQLInputObjectType,
} from "graphql";
import { User } from "../../entities/User";
import { compare, hash } from "bcryptjs";

export const CREATE_USER = {
  type: UserType,
  args: {
    name: { type: GraphQLString },
    username: { type: GraphQLString },
    password: { type: GraphQLString },
  },
  async resolve(_: any, args: any) {
    const { name, username, password } = args;
    const encryptedPass = await hash(password, 10);
    const result = await User.insert({
      name,
      username,
      password: encryptedPass,
    });
    console.log(result);
    return {
      id: result.identifiers[0].id,
      ...args,
      password: encryptedPass,
    };
  },
};

export const DELETE_USER = {
  type: GraphQLBoolean,
  args: {
    id: { type: GraphQLID },
  },
  async resolve(_: any, args: any) {
    const { id } = args;
    const result = await User.delete(id);
    console.log(result);
    if (result.affected != null && result.affected > 0) {
      return true;
    }
    return false;
  },
};

export const UPDATE_USER = {
  type: MessageType,
  args: {
    id: { type: GraphQLID },
    input: {
      type: new GraphQLInputObjectType({
        name: "UserInput",
        fields: {
          name: { type: GraphQLString },
          username: { type: GraphQLString },
          oldPassword: { type: GraphQLString },
          newPassword: { type: GraphQLString },
        },
      }),
    },
  },
  async resolve(_: any, args: any) {
    const { id, input } = args;
    const userFound = await User.findOne(id);

    if (userFound === undefined)
      return {
        success: false,
        message: "User Not Found",
      };

    const isEq = await compare(input.oldPassword, userFound.password);
    if (!isEq)
      return {
        success: false,
        message: "Password no match",
      };

    const newPassHash = await hash(input.newPassword, 10);
    const result = await User.update(
      { id },
      { name: input.name, username: input.username, password: newPassHash }
    );
    // console.log(response);
    if (result.affected != null && result.affected > 0)
      return {
        success: true,
        message: "User Updated",
      };

    return {
      success: false,
      message: "User Not Updated",
    };
  },
};
