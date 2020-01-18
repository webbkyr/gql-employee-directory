const { GraphQLServer } = require("graphql-yoga");
const { employee, employees } = require("../data/seeds")

const resolvers = {
  Query: {
    info: () => `Employee directory API`,
    employees: () => employees,
    employee: (_, { id }) => employee(id)
  },
  Mutation: {
    createEmployee: (_, { employeeInput }) => {
      const newEmployee = {
        id: employees.length + 1,
        firstName: employeeInput.firstName,
        lastName: employeeInput.lastName,
        age: employeeInput.age
      }
      employees.push(newEmployee)
      return { success: true, employee: newEmployee }
    },
    updateEmployee: (_, { id, employeeInput }) => {
      const { firstName, lastName, age } = employeeInput
      const employee = employees.find(emp => emp.id === id)
      
      employee.firstName = firstName || employee.firstName
      employee.lastName = lastName || employee.lastName
      employee.age = age || employee.age
      return { success: true, code: 200, employee }
    },
    deleteEmployee: (_, { id }) => {
      const previousCount = employees.length
      const employeeIdx = employees.findIndex(emp => emp.id === id)
      let removedEmployee = {};

      if (employeeIdx === -1) {
        return { success: false, code: 404, message: `Employee ${id} was not found` }
      } else {
        removedEmployee = employees.splice(employeeIdx, 1)[0]
      }

      return employees.length < previousCount 
        ? { success: true, code: 204, employee: removedEmployee }
        : { success: false, code: 500, message: `Something went wrong` }
    }   
  }
}

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers
})

server.start(() => console.log(`Server is running on http://localhost:4000`))