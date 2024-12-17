// get dependencies and set types to be used
// JWTPayload is a type that will be the format of the JWT information
// JWTDecode decodes the token that is given when a user logs in, which contains session data, user info, etc
import { type JwtPayload, jwtDecode } from 'jwt-decode';
import type { UserData } from '../interfaces/UserData';

class AuthService {
  getProfile(): UserData {
    // return the decoded token
    return jwtDecode<UserData>(this.getToken());
  }

  loggedIn(): boolean {
    // return a value that indicates if the user is logged in
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }

  isTokenExpired(token: string): boolean {
    // return a boolean value that indicates if the token is expired
    try {
      const decodedToken = jwtDecode<JwtPayload>(token);

      if (decodedToken?.exp && decodedToken?.exp < Date.now() / 1000) {
        return true;
      } else {
        return false;
      }

    } catch (err: any) {
      console.error('There was an error decoding token: ', err);
      return false;
    }
  }

  getToken(): string {
    // return the token
    const currentUser = localStorage.getItem('id_token') || '';
    return currentUser;
  }

  login(idToken: string) {
    // set the token to localStorage 
    localStorage.setItem('id_token', idToken);
    // redirect to the home page
    window.location.assign('/');
  }

  logout() {
    // remove the token from localStorage
    localStorage.removeItem('id_token');
    // redirect to the login page
    window.location.assign('/');
  }
}

export default new AuthService();
