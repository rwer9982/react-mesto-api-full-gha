import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as auth from '../Utils/Auth.js';


const Login = ({ handleLogin }) => {

    const [formValue, setFormValue] = useState({
        username: '',
        password: ''
    })

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormValue({
            ...formValue,
            [name]: value
        });
    }
    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formValue.username || !formValue.password) {
            return;
        }
        auth.authorize(formValue.username, formValue.password)
            .then((data) => {
                if (data) {
                    setFormValue({ username: '', password: '' });
                    localStorage.setItem('jwt', data);
                    localStorage.setItem('username', formValue.username);
                    handleLogin();
                    navigate('/', { replace: true });
                } else {
                    navigate('/login')
                }
            })
            .catch(err => console.log(err));
    }

    return (
        <div className="login">
            <p className="login__header">
                Вход
            </p>
            <form onSubmit={handleSubmit} className="login__form">
                <input value={formValue.username} onChange={handleChange} className="login__input" placeholder="Email" required id="username" name="username" type="text" />
                <input value={formValue.password} onChange={handleChange} className="login__input" placeholder="Пароль" required id="password" name="password" type="password" />
                <button className="login__submit" type="submit">Войти</button>
            </form>
        </div>
    )
}

export default Login;