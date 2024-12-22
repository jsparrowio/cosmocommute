import { useEffect } from 'react';
import Auth from '../utils/auth';


export default function RedirectPage(){
        useEffect(() => {
            const loggedIn = Auth.loggedIn();
            if (loggedIn === true) {
                window.location.assign('/dashboard')
            } else {
                Auth.logout();
            }
        }, []);
        return (
            <>
            </>
        )
}