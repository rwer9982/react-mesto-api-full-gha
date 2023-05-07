import React from 'react';
//import PopupWithForm from './PopupWithForm.js';
import erorauth from '../images/erorauth.png';
import successauth from '../images/successauth.png';

function InfoTooltip({ isOpen, onClose, Registred }) {

    return (
        <div
            className={`popup ${isOpen && "popup_opened"}`}
        >
            <div className="popup__form-container">
                <div
                    className="form edit-form"
                >
                    <button type="button" className="edit-form__close-button popup__close" onClick={onClose} />
                    {Registred ? <img src={successauth} className="edit-form__auth-image" alt="Успешная_регистрация" /> : <img src={erorauth} className="edit-form__auth-image" alt="Неуспешная_регистрация" />}
                    {Registred ? <h3 className="edit-form__auth-text">Вы успешно зарегистрировались!</h3> : <h3 className="edit-form__auth-text">Что-то пошло не так! Попробуйте ещё раз.</h3>}
                </div>
            </div>
        </div>
    )
}

export default InfoTooltip;