import React from 'react';

function ImagePopup({ isOpen, onClose, title, link }) {
  return (
    <div className={`popup ${isOpen && "popup_opened"}`}>
      <div className="increased-image">
        <button type="button" className="increased-image__close-button popup__close"
          id="increased-image-close-button" onClick={onClose}></button>
        <img className="increased-image__image" alt={title} src={link}
        />
        <h4 className="increased-image__title">{title}</h4>
      </div>
    </div>

  );
}

export default ImagePopup;