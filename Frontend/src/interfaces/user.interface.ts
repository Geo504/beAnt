export interface User {
  id: string;
  email: string;
  name: string;
  img?: string;
}



export interface ErrorResponse {
  errorMessage: string;
  errorDescription?: string;
}