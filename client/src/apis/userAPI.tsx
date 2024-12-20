import Auth from '../utils/auth';
import { UserProfile } from "../interfaces/UserProfile";
import { UserPassword } from '../interfaces/UserPassword';

let respStatus: number;

const retrieveUsers = async () => {
  try {
    const response = await fetch('/api/users', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Auth.getToken()}`
      }
    });
    const data = await response.json();

    if(!response.ok) {
      throw new Error('invalid user API response, check network tab!');
    }

    return data;

  } catch (err) { 
    console.log('Error from data retrieval:', err);
    return [];
  }
}

const updateUserProfile = async (profileData: UserProfile) => {
  try {
    const resp = await fetch(`/api/users/profile/${profileData.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Auth.getToken()}`
      },
      body: JSON.stringify(profileData),
    });

    respStatus = resp.status;

    const updateResponse =[
      await resp.json(),
    ]

    // if there is an error in the response, throw an error. typically this is due to login info being incorrect, so we specify that the cause is likely that
    if (!resp.ok) {
      throw new Error('Error in fetch response, did the user enter valid signup data? Check network tab for more information')
    }
    return updateResponse

    // if any error is thrown in the fetch, catch and return the error
    // since it is a promise, we also have to reject the promise with an error code
  } catch (err: any) {
    console.error('Error when attempting to update user profile:', err)
    return(Promise.reject(respStatus))
  }
}

const updateUserPassword = async (passwordData: UserPassword) => {
  try {
    const resp = await fetch(`/api/users/password/${passwordData.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Auth.getToken()}`
      },
      body: JSON.stringify(passwordData),
    });

    respStatus = resp.status;

    const updateResponse =[
      await resp.json(),
    ]

    // if there is an error in the response, throw an error. typically this is due to login info being incorrect, so we specify that the cause is likely that
    if (!resp.ok) {
      throw new Error('Error in fetch response, did the user enter valid signup data? Check network tab for more information')
    }
    return updateResponse

    // if any error is thrown in the fetch, catch and return the error
    // since it is a promise, we also have to reject the promise with an error code
  } catch (err: any) {
    console.error('Error when attempting to update user profile:', err)
    return(Promise.reject(respStatus))
  }
}

export { retrieveUsers, updateUserProfile, updateUserPassword };
