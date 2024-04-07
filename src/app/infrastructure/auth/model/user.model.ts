export interface User {
  id: number;
  firstName : string;
  lastName : string;
  email: string;
  role: Role;
}
export interface Role {
  id: number;
  name: string;
}
 
export function createEmptyUser(): User {
  return {
    id: 0,
    firstName: '',
    lastName: '',
    email: '',
    role: createEmptyRole()
  };
}

function createEmptyRole(): Role {
  return {
    id: 0,
    name: ''
  };
}


