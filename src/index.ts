const { GraphQLServer } = require("graphql-yoga");
import { employee, employees } from './data/seeds'
import { Employee, MutationResponse } from './types/employee';

const resolvers = {
  Query: {
    info: () => `Employee directory API`,
    employees: () => employees,
    employee: (_, { id }) => employee(id)
  },
  Mutation: {
    createEmployee: (_, { employeeInput }): MutationResponse => {
      const newEmployee: Employee = {
        id: employees.length + 1,
        firstName: employeeInput.firstName,
        lastName: employeeInput.lastName,
        age: employeeInput.age
      }
      employees.push(newEmployee)
      return { success: true, code: 201, employee: newEmployee }
    },

    updateEmployee: (_, { id, employeeInput }): MutationResponse => {
      const { firstName, lastName, age } = employeeInput
      const employee = employees.find(emp => emp.id === id)
      
      employee.firstName = firstName || employee.firstName
      employee.lastName = lastName || employee.lastName
      employee.age = age || employee.age
      return { success: true, code: 200, employee }
    },

    deleteEmployee: (_: any, { id }): MutationResponse => {
      const previousCount = employees.length
      const employeeIdx = employees.findIndex(emp => emp.id === id)
      let removedEmployee: Employee;

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