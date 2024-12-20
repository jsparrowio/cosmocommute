import { useState, FormEvent, ChangeEvent } from "react";
import cosmocommutelogo from "../assets/images/cosmocommutelogo.png"
import validator from "validator";
import { Input, Card, Button, Menu } from 'antd';
import { ToastContainer, toast, Slide } from 'react-toastify';
import Auth from '../utils/auth';
import { login } from "../apis/authAPI";
import { signup } from "../apis/signupAPI";
import { UserOutlined, EyeInvisibleOutlined, EyeTwoTone, MailOutlined, LockOutlined, RobotOutlined, TeamOutlined, SolutionOutlined } from '@ant-design/icons';
import type { UserLogin } from "../interfaces/UserLogin";
import type { UserSignup } from "../interfaces/UserSignup";
import type { MenuProps } from 'antd';

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
    {
        label: 'Login',
        key: 'login',
        icon: <LockOutlined />,
    },
    {
        label: 'Signup',
        key: 'signup',
        icon: <SolutionOutlined />,
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

export default function LoginPage() {

  const [usernameBlur, setUsernameBlur] = useState(false);
  const [firstNameBlur, setFirstNameBlur] = useState(false);
  const [lastNameBlur, setLastNameBlur] = useState(false);
  const [emailBlur, setEmailBlur] = useState(false);
  const [emailConfirmBlur, setEmailConfirmBlur] = useState(false);
  const [passwordBlur, setPasswordBlur] = useState(false);
  const [passwordConfirmBlur, setPasswordConfirmBlur] = useState(false);

  const handleUsernameBlur = () => {
    signupData.username === '' ? setUsernameBlur(true) : setUsernameBlur(false);
  };
  const handleFirstNameBlur = () => {
    signupData.first_name === '' ? setFirstNameBlur(true) : setFirstNameBlur(false);
  };
  const handleLastNameBlur = () => {
    signupData.last_name === '' ? setLastNameBlur(true) : setLastNameBlur(false);
  };
  const handleEmailBlur = () => {
    signupData.email === '' ? setEmailBlur(true) : setEmailBlur(false);
  };
  const handleEmailConfirmBlur = () => {
    emailConfirm === '' ? setEmailConfirmBlur(true) : setEmailConfirmBlur(false);
  };
  const handlePasswordBlur = () => {
   signupData.password === '' ? setPasswordBlur(true) : setPasswordBlur(false);
  };
  const handlePasswordConfirmBlur = () => {
    passwordConfirm === '' ? setPasswordConfirmBlur(true) : setPasswordConfirmBlur(false);
  };


    const [current, setCurrent] = useState('login');

    const onClick: MenuProps['onClick'] = (e) => {
        toast.dismiss();
        console.log('click ', e);
        setCurrent(e.key);
    };

    const [loginData, setLoginData] = useState<UserLogin>({
        username: '',
        password: ''
    });

    const [signupData, setSignupData] = useState<UserSignup>({
        username: '',
        first_name: '',
        last_name: '',
        email: '',
        password: ''
    });

    const [passwordConfirm, setPasswordConfirm] = useState<string>('');
    const [emailConfirm, setEmailConfirm] = useState<string>('');

    const handleLoginChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setLoginData({
            ...loginData,
            [name]: value
        });
    };

    const handleLoginSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (!loginData.username) {
            showWarn('A username must be entered');
            return;
        }
        if (!loginData.password) {
            showWarn('A password must be entered');
            return;
        }
        try {
            const data = await login(loginData);
            Auth.login(data[0].token);
        } catch (err) {
            console.error('Failed to login;', err);
            if(err === 401 || err === 403) {
            showError('Username or password was incorrect!');
            } else {
            showError(`Oops! Something went wrong! If this continues, please contact the site administrator. Error code: ${err}`);
            }
            setLoginData({
                username: '',
                password: ''
            });
        }
    };

    const handleSignupChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setSignupData({
            ...signupData,
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

    const handleSignupSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!signupData.username || !signupData.first_name || !signupData.last_name || !signupData.email || !signupData.password || !emailConfirm || !passwordConfirm) {
            showWarn('All fields must be completed');
            return;
        }
        if (signupData.email !== emailConfirm) {
            showWarn('Email must match');
            return;
        }
        if (signupData.password !== passwordConfirm) {
            showWarn('Password must match');
            return;
        }
        if (!validateEmail(signupData.email)) {
            showError('Email is invalid');
            return;
        }
        if (!validatePassword(signupData.password)) {
            showError('Password does not meet requirements of: At least 8 characters, 1 uppercase, 1 lowercase, 1 number, and 1 symbol');
            return;
        }
        try {
            await signup(signupData);
            console.log('Signup success!');
            showSuccess('Signup success! Now please login using information provided!');
            setCurrent('login');
            setSignupData({
                username: '',
                first_name: '',
                last_name: '',
                email: '',
                password: ''
            })
            setEmailConfirm('');
            setPasswordConfirm('');
        } catch (err) {
            console.log('There was an error signing up user: ', err);
            if(err === 409) {
                showError('Username or email already exist. Please use another.');
                setEmailBlur(true);
                setUsernameBlur(true);
                } else {
                showError(`Oops! Something went wrong! If this continues, please contact the site administrator. Error code: ${err}`);
                }
            setEmailConfirm('');
            setPasswordConfirm('');
        }
    };

    return (
        <div style={{ 'display': 'flex', 'justifyContent': 'center', 'alignItems': 'center', 'margin': '3rem' }}>
            <Card bordered={true} style={{ width: 300 }}>
                <ToastContainer
                    position="top-center" />
                <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} style={{ position: 'relative', display: 'flex', justifyContent: 'center' }} />
                <br />
                {current === 'login' &&
                    <form className='form' onSubmit={handleLoginSubmit} style={{ 'display': 'flex', 'flexDirection': 'column', 'justifyContent': 'center', 'alignItems': 'center' }}>

                        <img src={cosmocommutelogo} style={{ 'height': '100px', 'width': '100px' }}></img>
                        <h2>Login to CosmoCommute</h2>
                        <label>Username</label>
                        <Input
                            size="large"
                            placeholder="Username"
                            prefix={<RobotOutlined />}
                            type='text'
                            name='username'
                            value={loginData.username || ''}
                            onChange={handleLoginChange}
                        />
                        <label>Password</label>
                        <Input.Password
                            size="large"
                            placeholder="Password"
                            prefix={<LockOutlined />}
                            iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                            type='password'
                            name='password'
                            value={loginData.password || ''}
                            onChange={handleLoginChange}
                        />
                        <br />
                        <Button size="large" type="primary" htmlType="submit">Login</Button>
                    </form>}
                {current === 'signup' &&
                    <form className='form' onSubmit={handleSignupSubmit} style={{ 'display': 'flex', 'flexDirection': 'column', 'justifyContent': 'center', 'alignItems': 'center' }}>

                        <img src={cosmocommutelogo} style={{ 'height': '100px', 'width': '100px' }}></img>
                        <h2>Signup for a CosmoCommute account!</h2>
                        <label>Username</label>
                        <Input
                            size="large"
                            status={usernameBlur ? 'error' : ''}
                            placeholder="Username"
                            prefix={<RobotOutlined />}
                            type='text'
                            name='username'
                            value={signupData.username || ''}
                            onChange={handleSignupChange}
                            onBlur={handleUsernameBlur}
                        />
                        <label>First Name</label>
                        <Input
                            size="large"
                            status={firstNameBlur ? 'error' : ''}
                            placeholder="First Name"
                            prefix={<UserOutlined />}
                            type='text'
                            name='first_name'
                            value={signupData.first_name || ''}
                            onChange={handleSignupChange}
                            onBlur={handleFirstNameBlur}
                        />
                        <label>Last Name</label>
                        <Input
                            size="large"
                            status={lastNameBlur ? 'error' : ''}
                            placeholder="Last Name"
                            prefix={<TeamOutlined />}
                            type='text'
                            name='last_name'
                            value={signupData.last_name || ''}
                            onChange={handleSignupChange}
                            onBlur={handleLastNameBlur}
                        />
                        <label>Email</label>
                        <Input
                            size="large"
                            status={emailBlur ? 'error' : ''}
                            placeholder="example@example.com"
                            prefix={<MailOutlined />}
                            type='email'
                            name='email'
                            value={signupData.email || ''}
                            onChange={handleSignupChange}
                            onBlur={handleEmailBlur}
                        />
                        <label>Confirm Email</label>
                        <Input
                            size="large"
                            status={emailConfirmBlur ? 'error' : ''}
                            placeholder="example@example.com"
                            prefix={<MailOutlined />}
                            type='email'
                            name='confirmEmail'
                            value={emailConfirm || ''}
                            onChange={handleInputChange}
                            onBlur={handleEmailConfirmBlur}
                        />
                        <label>Password</label>
                        <Input.Password
                            size="large"
                            status={passwordBlur ? 'error' : ''}
                            placeholder="Password"
                            prefix={<LockOutlined />}
                            iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                            type='password'
                            name='password'
                            value={signupData.password || ''}
                            onChange={handleSignupChange}
                            onBlur={handlePasswordBlur}
                        />
                        <label>Confirm Password</label>
                        <Input.Password
                            size="large"
                            status={passwordConfirmBlur ? 'error' : ''}
                            placeholder="Password"
                            prefix={<LockOutlined />}
                            iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                            type='password'
                            name='confirmPassword'
                            value={passwordConfirm || ''}
                            onChange={handleInputChange}
                            onBlur={handlePasswordConfirmBlur}
                        />
                        <br />
                        <Button size="large" type="primary" htmlType="submit">Signup!</Button>
                    </form>}
            </Card>
        </div>
    )
}