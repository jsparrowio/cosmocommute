// import the UserLogin interface type to specify a type in typescript for the function below
import type { UserLogin } from "../interfaces/UserLogin";

// login api request which calls the auth/login route to make the request
const login = async (loginData: UserLogin) => {
  try {
    const resp = await fetch('auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginData),
    });

    const loginResponse = await resp.json();

    // if there is an error in the response, throw an error. typically this is due to login info being incorrect, so we specify that the cause is likely that
    if (!resp.ok) {
      throw new Error('Error in fetch response, is the users login information correct? Check network tab for more information')
    }

    return loginResponse;

    // if any error is thrown in the fetch, catch and return the error
    // since it is a promise, we also have to reject the promise with an error code
  } catch (err: any) {
    console.error('Error when attempting to authenticate user:', err)
    return Promise.reject('Is the users login information correct?')
  }
}

export { login };
