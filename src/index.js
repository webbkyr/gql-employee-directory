const { GraphQLServer } = require("graphql-yoga");
const { employee, employees } = require("../data/seeds")

/* Define your GraphQL Schema type definitions */
/* The GraphQL reference implementation ensures that return types of resolvers adhere to the schema*/
/* Fields (i.e. employees) on Root Types (e.g Query) are called root fields */
const typeDefs = `
scalar Date

  type Query {
    info: String!,
    employees: [Employee!]!,
    employee(id: Int!): Employee
  }

  type Mutation {
    createEmployee(employeeInput: CreateEmployeeInput!): Employee!
  }

  type Employee {
    id: ID!
    firstName: String!
    lastName: String!
    age: Int!
  }

  input CreateEmployeeInput {
    firstName: String!
    lastName: String!
    age: Int!
  }
`

const resolvers = {
  Query: {
    info: () => `Employee directory API`,
    employees: () => employees,
    employee: (_, args) => employee(args.id)
  },
  Employee: {
    id: parent => parent.id,
    firstName: parent => parent.firstName,
    lastName: parent => parent.lastName,
    age: parent => parent.age
  }
}

const server = new GraphQLServer({
  typeDefs,
  resolvers
})

server.start(() => console.log(`Server is running on http://localhost:4000`))