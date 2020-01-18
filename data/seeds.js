const { random, name } = require("faker")

const employee = id => { 
  return {
    id: id || random.number({ max:1000 }), 
    firstName: name.firstName(), 
    lastName: name.lastName(),
    age: random.number({ min: 21, max: 70 }),
  }
}

const employees = function(pageSize = 25) {
  return Array(pageSize).fill().map(() => employee())
}

module.exports = {
  employee: employee,
  employees: employees
}