const { random, name } = require("faker")

const employee = id => { 
  return {
    id: id || random.number({ max:1000 }), 
    firstName: name.firstName(), 
    lastName: name.lastName(),
    age: random.number({ min: 21, max: 70 }),
  }
}

const employees = [ employee(1), employee(2), employee(3) ]

module.exports = {
  employee: employee,
  employees: employees
}