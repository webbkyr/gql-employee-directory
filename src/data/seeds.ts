import * as faker from "faker"
import { Employee } from "../types/employee"

export const employee = (id: number): Employee => { 
  return {
    id: id || faker.random.number({ max:1000 }), 
    firstName: faker.name.firstName(), 
    lastName: faker.name.lastName(),
    age: faker.random.number({ min: 21, max: 70 }),
  }
}

export let employees: Employee[] = [ employee(1), employee(2), employee(3), employee(4), employee(5) ]