export interface User {
  id: string;
  email: string;
  name: string;
  img?: string;
}

export interface UserProfile extends User {
  last_name?: string;
  profession?: string;
  phone?: string;
  birth?: Date;
}



export interface ErrorResponse {
  errorMessage: string;
  errorDescription?: string;
}