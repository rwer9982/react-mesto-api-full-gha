import React from 'react';
import PopupWithForm from './PopupWithForm.js';

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {

    const inputAddCardText = React.useRef(null);
    const inputAddCardImage = React.useRef(null);

    React.useEffect(() => {
        inputAddCardText.current.value = '';
        inputAddCardImage.current.value = '';
    }, [isOpen]);

    function handleSubmit(e) {

        e.preventDefault();

        onAddPlace({

            name: inputAddCardText.current.value,
            link: inputAddCardImage.current.value
        });
    }

    return (
        <PopupWithForm
            name={'add-item-form'}
            title={'Новое место'}
            isOpen={isOpen}
            onClose={onClose}
            buttonText={'Создать'}
            onSubmit={handleSubmit}
        >
            <input type="text" name="name" id="add-card-text" placeholder="Название" className="edit-form__input input"
                minLength="2" maxLength="30" ref={inputAddCardText} required />
            <p className="edit-form__span add-card-text-error span"></p>
            <input type="url" name="link" id="add-card-image" placeholder="Ссылка на картинку"
                className="edit-form__input input" ref={inputAddCardImage} required />
            <p className="edit-form__span add-card-image-error span"></p>
        </PopupWithForm>
    )
}

export default AddPlacePopup;