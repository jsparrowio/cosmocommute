// import the UserLogin interface type to specify a type in typescript for the function below
import type { UserSignup } from "../interfaces/UserSignup";
let respStatus: number;

// login api request which calls the auth/login route to make the request
const signup = async (signupData: UserSignup) => {
  try {
    const resp = await fetch('api/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(signupData),
    });

    respStatus = resp.status;

    const signupResponse =[
      await resp.json(),
    ]

    // if there is an error in the response, throw an error. typically this is due to login info being incorrect, so we specify that the cause is likely that
    if (!resp.ok) {
      throw new Error('Error in fetch response, did the user enter valid signup data? Check network tab for more information')
    }
    return signupResponse

    // if any error is thrown in the fetch, catch and return the error
    // since it is a promise, we also have to reject the promise with an error code
  } catch (err: any) {
    console.error('Error when attempting to create user:', err)
    return(Promise.reject(respStatus))
  }
}

export { signup };
