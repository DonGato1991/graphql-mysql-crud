import { GREETING } from "./queries/Greeting";
import { GraphQLSchema, GraphQLObjectType } from "graphql";
import { CREATE_USER, DELETE_USER, UPDATE_USER } from './mutations/Users';
import { GET_ALL, GET_USER } from "./queries/Users";

const RootQuery = new GraphQLObjectType({
  name: "RootQuery",
  fields: {
    greeting: GREETING,
    get_users: GET_ALL,
    get_user: GET_USER
  },
});

const Mutation = new GraphQLObjectType({
    name: "Mutation",
    fields:{
        createUser: CREATE_USER,
        deleteUser: DELETE_USER,
        updateUser: UPDATE_USER,
    }
})

export const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});
