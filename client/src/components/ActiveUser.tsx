const localStoreData = localStorage.getItem('user_info');

console.log(localStoreData);

export default function getActiveUser(){
if(localStoreData !==  null) {
    const activeUser = JSON.parse(localStoreData!);
    console.log(activeUser);
    return activeUser; 
} else {
    const activeUser = {
        exp: '',
        iat: '',
        userData: {
            id: 0,
            userName: '',
            first_name: '',
            last_name: '',
            email: ''
        }
    }
    return activeUser;
}
}