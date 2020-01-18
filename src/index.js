const { GraphQLServer } = require("graphql-yoga");
const { employee, employees } = require("../data/seeds")

const employeeCount = employees.length

const resolvers = {
  Query: {
    info: () => `Employee directory API`,
    employees: () => employees,
    employee: (_, { id }) => employee(id)
  },
  Mutation: {
    createEmployee: (_, { employeeInput }) => {
      const newEmployee = {
        id: employeeCount + 1,
        firstName: employeeInput.firstName,
        lastName: employeeInput.lastName,
        age: employeeInput.age
      }
      employees.push(newEmployee)
      return newEmployee
    }
  }
}

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers
})

server.start(() => console.log(`Server is running on http://localhost:4000`))