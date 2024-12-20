import { useState, useEffect, useLayoutEffect, FormEvent, ChangeEvent } from "react";
import validator from "validator";
import { Input, Card, Button, Menu } from 'antd';
import { ToastContainer, toast, Slide } from 'react-toastify';
import Auth from '../utils/auth';
import { updateUserProfile } from "../apis/userAPI";
import { updateUserPassword } from "../apis/userAPI";
import getActiveUser from "../components/ActiveUser";
import { UserOutlined, EyeInvisibleOutlined, EyeTwoTone, MailOutlined, LockOutlined, RobotOutlined, TeamOutlined, ProfileOutlined } from '@ant-design/icons';
import type { UserProfile } from "../interfaces/UserProfile";
import type { UserPassword } from "../interfaces/UserPassword";
import type { MenuProps } from 'antd';

const activeUser = getActiveUser();

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
    {
        label: 'Profile',
        key: 'profile',
        icon: <ProfileOutlined />,
    },
    {
        label: 'Password',
        key: 'password',
        icon: <LockOutlined />,
    },];

function validateEmail(email: string) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

const validatePassword = (value: string) => {

    if (validator.isStrongPassword(value, {
        minLength: 8, minLowercase: 1,
        minUppercase: 1, minNumbers: 1, minSymbols: 1
    })) {
        return true;
    } else {
        return false;
    }
}

const showError = (err: string) => {
    toast.dismiss();
    toast.error(`${err}`,
        {
            transition: Slide,
        });
}

const showWarn = (err: string) => {
    toast.dismiss();
    toast.warn(`${err}`,
        {
            transition: Slide,
        });
}

const showSuccess = (msg: string) => {
    toast.dismiss();
    toast.success(`${msg}`,
        {
            transition: Slide,
        });
}

const redirect = () => {
    window.location.assign('/login');
}

export default function UserSettingsPage() {

    const [loginCheck, setLoginCheck] = useState(false);

    useLayoutEffect(() => {
        const loggedIn = Auth.loggedIn();
        if (loggedIn === true) {
            setLoginCheck(true);
        } else {
            redirect();
        }
    }, []);

    useEffect(() => {
        const loggedIn = Auth.loggedIn();
        if (loggedIn === true) {
            setLoginCheck(true);
        } else {
            redirect();
        }
    }, [loginCheck]);

    const [usernameBlur, setUsernameBlur] = useState(false);
    const [firstNameBlur, setFirstNameBlur] = useState(false);
    const [lastNameBlur, setLastNameBlur] = useState(false);
    const [emailBlur, setEmailBlur] = useState(false);
    const [emailConfirmBlur, setEmailConfirmBlur] = useState(false);
    const [currentPasswordBlur, setCurrentPasswordBlur] = useState(false);
    const [passwordBlur, setPasswordBlur] = useState(false);
    const [passwordConfirmBlur, setPasswordConfirmBlur] = useState(false);

    const handleUsernameBlur = () => {
        profileData.username === '' ? setUsernameBlur(true) : setUsernameBlur(false);
    };
    const handleFirstNameBlur = () => {
        profileData.first_name === '' ? setFirstNameBlur(true) : setFirstNameBlur(false);
    };
    const handleLastNameBlur = () => {
        profileData.last_name === '' ? setLastNameBlur(true) : setLastNameBlur(false);
    };
    const handleEmailBlur = () => {
        profileData.email === '' ? setEmailBlur(true) : setEmailBlur(false);
    };
    const handleEmailConfirmBlur = () => {
        emailConfirm === '' ? setEmailConfirmBlur(true) : setEmailConfirmBlur(false);
    };
    const handleCurrentPasswordBlur = () => {
        passwordData.currentPassword === '' ? setCurrentPasswordBlur(true) : setCurrentPasswordBlur(false);
    };
    const handlePasswordBlur = () => {
        passwordData.password === '' ? setPasswordBlur(true) : setPasswordBlur(false);
    };
    const handlePasswordConfirmBlur = () => {
        passwordConfirm === '' ? setPasswordConfirmBlur(true) : setPasswordConfirmBlur(false);
    };

    const [current, setCurrent] = useState('profile');

    const onClick: MenuProps['onClick'] = (e) => {
        toast.dismiss();
        console.log('click ', e);
        setCurrent(e.key);
    };

    const [passwordData, setPasswordData] = useState<UserPassword>({
        id: activeUser.userData.id,
        currentPassword: '',
        password: ''
    });

    const [profileData, setProfileData] = useState<UserProfile>({
        id: activeUser.userData.id,
        username: activeUser.userData.username,
        first_name: activeUser.userData.first_name,
        last_name: activeUser.userData.last_name,
        email: activeUser.userData.email,
    });

    const [passwordConfirm, setPasswordConfirm] = useState<string>('');
    const [emailConfirm, setEmailConfirm] = useState<string>(activeUser.userData.email);

    // const checkCurrentEmail = () => {
    //     if (emailConfirm === '' || emailConfirm !== activeUser.userData.email) {
    //         return true;
    //     } else {
    //         return false;
    //     } 
    // }

    const handlePasswordChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setPasswordData({
            ...passwordData,
            [name]: value
        });
    };

    const handlePasswordSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!passwordData.currentPassword || !passwordData.password || !passwordConfirm) {
            showWarn('All fields must be completed');
            return;
        }
        if (passwordData.password !== passwordConfirm) {
            showError('New passwords must match');
            setPasswordBlur(true);
            setPasswordConfirmBlur(true);
            return;
        }
        if (!validatePassword(passwordData.password)) {
            showError('Password does not meet requirements of: At least 8 characters, 1 uppercase, 1 lowercase, 1 number, and 1 symbol');
            setPasswordBlur(true);
            return;
        }
        try {
            await updateUserPassword(passwordData);
        } catch (err) {
            console.error('Failed to change password;', err);
            if (err === 401) {
                showError('Current password was incorrect!');
                setCurrentPasswordBlur(true);
            } else if (err === 403) {
                showError('Your session token was invalid, please login again. Redirecting in 5 seconds...');
                (async () => {
                    await new Promise(f => setTimeout(f, 5000));
                    Auth.logout();
                })();
            }
            else {
                showError(`Oops! Something went wrong! If this continues, please contact the site administrator. Error code: ${err}`);
            }
            setPasswordData({
                id: activeUser.userData.id,
                currentPassword: '',
                password: ''
            });
            setPasswordConfirm('');
        }
    };

    const handleProfileChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        name === 'email' && profileData.email !== activeUser.userData.email ? setEmailConfirm('') : setEmailConfirm(activeUser.userData.email);
        setProfileData({
            ...profileData,
            [name]: value
        });
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { target } = e;
        const inputType = target.name;
        const inputValue = target.value;

        if (inputType === 'confirmPassword') {
            setPasswordConfirm(inputValue);
        } else if (inputType === 'confirmEmail') {
            setEmailConfirm(inputValue);
        }
    };

    const handleProfileSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!profileData.username || !profileData.first_name || !profileData.last_name || !profileData.email || !emailConfirm) {
            showWarn('All fields must be completed');
            return;
        }
        if (profileData.email !== emailConfirm) {
            showWarn('Email must match');
            return;
        }
        if (!validateEmail(profileData.email)) {
            showError('Email is invalid');
            return;
        }
        if (
            profileData.username === activeUser.userData.username
            &&
            profileData.first_name === activeUser.userData.first_name
            &&
            profileData.last_name === activeUser.userData.last_name
            &&
            profileData.email === activeUser.userData.email
        ) {
            showWarn('No information was changed, so no updates were made');
            setEmailBlur(false);
            setUsernameBlur(false);
            return;
        }
        try {
            await updateUserProfile(profileData);
            console.log('Profile update success!');
            showSuccess('Profile update success!');
            const newUserInfo = {
                exp: activeUser.exp,
                iat: activeUser.iat,
                userData: profileData
            }
            localStorage.setItem('user_info', JSON.stringify(newUserInfo));
            setEmailBlur(false);
            setUsernameBlur(false);
        } catch (err) {
            console.log('There was an error updating user profile: ', err)
            if (err === 409) {
                showError('New username or new email already exist. Please use another.');
                setEmailBlur(true);
                setUsernameBlur(true);
            } else if (err === 403) {
                showError('Your session token was invalid, please login again. Redirecting in 5 seconds...');
                (async () => {
                    await new Promise(f => setTimeout(f, 5000));
                    Auth.logout();
                })();
            } else {
                showError(`Oops! Something went wrong! If this continues, please contact the site administrator. Error code: ${err}`)
            }
        }
    };
    return (
        <div style={{ 'display': 'flex', 'justifyContent': 'center', 'alignItems': 'center', 'margin': '3rem' }}>

            <Card bordered={true} style={{ width: 300 }}>
                <ToastContainer
                    position="top-center" />
                {loginCheck === true &&
                    <>
                        <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} style={{ position: 'relative', display: 'flex', justifyContent: 'center' }} />
                        <br />
                        {current === 'profile' &&
                            <form className='form' onSubmit={handleProfileSubmit} style={{ 'display': 'flex', 'flexDirection': 'column', 'justifyContent': 'center', 'alignItems': 'center' }}>


                                <h2>Change your profile information</h2>
                                <label>Username</label>
                                <Input
                                    size="large"
                                    status={usernameBlur ? 'error' : ''}
                                    placeholder=''
                                    prefix={<RobotOutlined />}
                                    type='text'
                                    name='username'
                                    value={profileData.username || ''}
                                    onChange={handleProfileChange}
                                    onBlur={handleUsernameBlur}
                                />
                                <label>First Name</label>
                                <Input
                                    size="large"
                                    status={firstNameBlur ? 'error' : ''}
                                    placeholder=''
                                    prefix={<UserOutlined />}
                                    type='text'
                                    name='first_name'
                                    value={profileData.first_name || ''}
                                    onChange={handleProfileChange}
                                    onBlur={handleFirstNameBlur}
                                />
                                <label>Last Name</label>
                                <Input
                                    size="large"
                                    status={lastNameBlur ? 'error' : ''}
                                    placeholder=''
                                    prefix={<TeamOutlined />}
                                    type='text'
                                    name='last_name'
                                    value={profileData.last_name || ''}
                                    onChange={handleProfileChange}
                                    onBlur={handleLastNameBlur}
                                />
                                <label>Email</label>
                                <Input
                                    size="large"
                                    status={emailBlur ? 'error' : ''}
                                    placeholder=''
                                    prefix={<MailOutlined />}
                                    type='email'
                                    name='email'
                                    value={profileData.email || ''}
                                    onChange={handleProfileChange}
                                    onBlur={handleEmailBlur}
                                />

                                <label>Confirm Email</label>
                                <Input
                                    size="large"
                                    status={emailConfirmBlur ? 'error' : ''}
                                    placeholder=''
                                    prefix={<MailOutlined />}
                                    type='email'
                                    name='confirmEmail'
                                    value={emailConfirm || ''}
                                    onChange={handleInputChange}
                                    onBlur={handleEmailConfirmBlur}
                                />
                                <br />
                                <Button size="large" type="primary" htmlType="submit">Change Info</Button>
                            </form>}
                        {current === 'password' &&
                            <form className='form' onSubmit={handlePasswordSubmit} style={{ 'display': 'flex', 'flexDirection': 'column', 'justifyContent': 'center', 'alignItems': 'center' }}>

                                <h2>Change Password</h2>
                                <label>Current Password</label>
                                <Input.Password
                                    size="large"
                                    status={currentPasswordBlur ? 'error' : ''}
                                    placeholder="Current Password"
                                    prefix={<LockOutlined />}
                                    iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                                    type='password'
                                    name='currentPassword'
                                    value={passwordData.currentPassword || ''}
                                    onChange={handlePasswordChange}
                                    onBlur={handleCurrentPasswordBlur}
                                />
                                <label>New Password</label>
                                <Input.Password
                                    size="large"
                                    status={passwordBlur ? 'error' : ''}
                                    placeholder="New Password"
                                    prefix={<LockOutlined />}
                                    iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                                    type='password'
                                    name='password'
                                    value={passwordData.password || ''}
                                    onChange={handlePasswordChange}
                                    onBlur={handlePasswordBlur}
                                />
                                <label>Confirm Password</label>
                                <Input.Password
                                    size="large"
                                    status={passwordConfirmBlur ? 'error' : ''}
                                    placeholder="Confirm New Password"
                                    prefix={<LockOutlined />}
                                    iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                                    type='password'
                                    name='confirmPassword'
                                    value={passwordConfirm || ''}
                                    onChange={handleInputChange}
                                    onBlur={handlePasswordConfirmBlur}
                                />
                                <br />
                                <Button size="large" type="primary" htmlType="submit">Change Password</Button>
                            </form>}
                    </>
                }
                {loginCheck === false &&
                    <div>
                        <p>
                            You must be logged in to view this page!
                            <br />
                            Redirecting...
                        </p>
                    </div>
                }
            </Card>
        </div>
    )
}