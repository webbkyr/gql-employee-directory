export interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  age: number
}

export interface MutationResponse {
  success: boolean;
  message?: string;
  code: number;
  employee?: Employee | null
}