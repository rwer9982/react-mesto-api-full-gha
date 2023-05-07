import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as auth from '../Utils/Auth.js';

const Register = ({ openAuthPopup, isRegistred }) => {

    const [formValue, setFormValue] = useState({
        email: '',
        password: '',
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
        const { email, password } = formValue;
        auth.register(email, password)
            .then((res) => {
                navigate('/login', { replace: true });
            })
            .then(function () {
                openAuthPopup()
                isRegistred(true)
            })
            .catch(function (err) {
                openAuthPopup()
                isRegistred(false)
            })
        //            .finally(function () {
        //                openAuthPopup()
        //            })
    }

    return (
        <div className="login">
            <p className="login__header">
                Регистрация
            </p>
            <form className="login__form" onSubmit={handleSubmit}>
                <input value={formValue.email} onChange={handleChange} className="login__input" placeholder="Email" required id="email" name="email" type="text" />
                <input value={formValue.password} onChange={handleChange} className="login__input" placeholder="Пароль" required id="password" name="password" type="password" />
                <button onSubmit={handleSubmit} className="login__submit" type="submit">Зарегистрироваться</button>
            </form>
            <div className="login__link-container">
                <p className="login__link-header">Уже зарегистрированы?</p>
                <Link to="/login" className="login__link">Войти</Link>
            </div>
        </div>
    )
}

export default Register;