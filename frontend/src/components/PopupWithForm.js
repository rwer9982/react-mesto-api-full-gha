import React from 'react';

function PopupWithForm({name, title, children, isOpen, onClose, buttonText, onSubmit}) {

  return (
    <div
      className={`popup popup-${name} ${isOpen && "popup_opened"}`}
      >
      <div className="popup__form-container">
        <form
          className={`form ${name}`}
          onSubmit={onSubmit}
          >
        
          <button type="button" className="edit-form__close-button popup__close" onClick={onClose}/>
          <h3 className="edit-form__title">{title}</h3>
          {children}
          <button type="submit" className="edit-form__submit-button submit-button">{buttonText}</button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;