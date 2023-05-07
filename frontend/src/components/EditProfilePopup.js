import React from 'react';
import PopupWithForm from './PopupWithForm.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {

    const currentUser = React.useContext(CurrentUserContext);

    const [name, setName] = React.useState(currentUser.name);
    const [description, setDescription] = React.useState(currentUser.about);

    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser, isOpen]);

    function handleChange(e) {
        if (e.target.name === 'name') {
            setName(e.target.value)
        }
        if (e.target.name === 'job') {
            setDescription(e.target.value)
        }
    }

    function handleSubmit(e) {
        e.preventDefault();

        onUpdateUser({
            name: name,
            about: description,
        });
    }

    return (
        <PopupWithForm
            name={'edit-form'}
            title={'Редактировать профиль'}
            isOpen={isOpen}
            onClose={onClose}
            buttonText={'Сохранить'}
            onSubmit={handleSubmit}
        >
            <input onChange={handleChange} value={name || ''} type="text" name="name" placeholder="Введите имя" id="edit-form-title" className="edit-form__input input"
                minLength="2" maxLength="40" required />
            <p className="edit-form__span edit-form-title-error span"></p>
            <input onChange={handleChange} value={description || ''} type="text" name="job" id="edit-form-subtitle" placeholder="Введите занятие" className="edit-form__input input"
                minLength="2" maxLength="200" required />
            <p className="edit-form__span edit-form-subtitle-error span"></p>
        </PopupWithForm>
    );
}

export default EditProfilePopup;