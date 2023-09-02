import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import axios from "axios";
import { Products } from "./data.js";

const typeDefs = `#graphql
 type Todo{
    id: Int!
    title: String!
    completed: Boolean
 }
 type Product{
    id: String!
    name: String!
    description: String!
    price: String!
    image_title: String!
    image: String!
 }

 type Query{
    products: [Product]
    todos: [Todo]
 }

 type Mutation{
    addProduct(id: String!, name: String!, description: String!, price: String!, image: String!, image_titels: String!):Product
 }

`;

const resolvers = {
  Query: {
    products: async () =>
      (await axios.get("https://hplussport.com/api/products/order/price")).data,
    todos: async () =>
      (await axios.get("https://jsonplaceholder.typicode.com/todos")).data,
  },
};

const server = new ApolloServer({ typeDefs, resolvers });
const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});
console.log(`🚀  Server ready at: ${url}`);
