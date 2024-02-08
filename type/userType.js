import {
  GraphQLID,
  GraphQLList,
  GraphQLSchema,
  GraphQLString,
  GraphQLObjectType,
} from "graphql";
import { userList } from "../data.js";

export const userType = new GraphQLObjectType({
  name: "UserType",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
  }),
});

export const mutations = new GraphQLObjectType({
  name: "mutations",
  fields: {
    //adding a user
    addUser: {
      type: userType,
      args: {
        name: { type: GraphQLString },
        email: { type: GraphQLString },
      },
      resolve(parent, { name, email }) {
        const newUser = {
          id: Date.now().toString(),
          name,
          email,
        };
        userList.push(newUser);
        return newUser;
      },
    },
    //update a user
    updateUser: {
      type: userType,
      args: {
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
      },
      resolve({ id, name, email }) {
        const user = userList.find((item) => item.id === id);
        user.name = name;
        user.email = email;
        return user;
      },
    },
    //delete a user 
    deleteUser : {
      type:userType,
      args:{
        id:{type:GraphQLID}
      },
      resolve({id}){
        const user = userList.find((item) => item.id === id)
        if(user){
          const updateUserList = userList.filter(user)
          userList =  updateUserList
          return userList
        }else{
          console.log("user not Found");
          return userList
        }
      }
    }
  },
});
