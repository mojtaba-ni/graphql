import express from "express";
import { graphqlHTTP } from "express-graphql";
import {userType } from "./type/userType.js";
import { userList } from "./data.js";
import {
    GraphQLID,
    GraphQLList,
    GraphQLSchema,
    GraphQLObjectType,
  } from "graphql";

const app = express();

const RootQuery = new GraphQLObjectType({
  name: "RootQuery",
  fields: {
    //Get All Users
    users: {
      type: new GraphQLList(userType),
      resolve(parent, args) {
        return userList;
      },
    },
    user: {
      type: userType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return userList.find((item) => item.id === args.id);
      },
    },
  },
});

export const schema = new GraphQLSchema({ query: RootQuery });

app.use("/graphql", graphqlHTTP({ schema, graphiql: true }));

app.listen(5000, () => console.log("Server is ready"));
