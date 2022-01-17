import { GraphQLString, GraphQLObjectType, GraphQLBoolean } from 'graphql';

export const MessageType = new GraphQLObjectType({
  name: "Message",
  description: "Message Type Definition",
  fields: {
    success: { type: GraphQLBoolean },
    message: { type: GraphQLString },
  },
});
