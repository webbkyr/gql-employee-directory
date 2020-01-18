# GraphQL Employee Directory
https://github.com/prisma-labs/graphql-yoga

To run, clone then:

`yarn install`

`yarn run dev`

## Example Query

```
query employees {
  employees {
    id
    firstName
    age
  }
}
```

## Example Mutation

```
mutation AddEmployee($employeeInput: EmployeeInput!) {
  createEmployee(employeeInput: $employeeInput) {
    success
    employee {
      id
    }
  }
}
```