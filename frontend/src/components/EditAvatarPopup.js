import React from 'react';
import PopupWithForm from './PopupWithForm.js';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {

    const inputEditAvatar = React.useRef(null);

    React.useEffect(() => {
        inputEditAvatar.current.value = '';
    }, [isOpen]);

    function handleSubmit(e) {
        e.preventDefault();
      
        onUpdateAvatar({
          avatar: inputEditAvatar.current.value,
        });
      } 

    return (
        <PopupWithForm
            name={'edit-avatar-form'}
            title={'Обновить аватар'}
            isOpen={isOpen}
            onClose={onClose}
            buttonText={'Сохранить'}
            onSubmit={handleSubmit}
        >
            <input type="url" name="avatar" id="edit-avatar" placeholder="Ссылка на картинку"
                className="input edit-avatar-form__input" ref={inputEditAvatar} required />
            <p className="edit-avatar-form__span edit-avatar-error span"></p>
        </PopupWithForm>
    )
}

export default EditAvatarPopup;