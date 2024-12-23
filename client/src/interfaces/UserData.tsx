export interface UserData {
  exp: number | null,
  iat: number | null,
  userData: {
    id: number | null;
    username: string | null;
    first_name: string | null;
    last_name: string | null;
    email: string | null
  }
}
