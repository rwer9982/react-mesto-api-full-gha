import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function Card({ card, onCardClick, onCardLike, onCardDelete }) {

    const currentUser = React.useContext(CurrentUserContext);
    const isOwn = card.owner._id === currentUser._id;

    const isLiked = card.likes.some(i => i._id === currentUser._id);

    // Создаём переменную, которую после зададим в `className` для кнопки лайка
    const cardLikeButtonClassName = (`element__like ${isLiked && 'element__like_active'}`);

    function handleClick() {
        onCardClick(card)
    }

    function handleLikeClick() {
        onCardLike(card)
    }

    function handleDeleteClick() {
        onCardDelete(card)
    }

    return (
        <div className="element">
            {isOwn && <button type="button" className="element__trash-button" onClick={handleDeleteClick}></button>}
            <img className="element__image" id="element-image" src={card.link} alt={card.name}
                onClick={handleClick} />
            <div className="element__title">
                <h2 className="element__text">{card.name}</h2>
                <div className="element__likes-container">
                    <button type="button" className={cardLikeButtonClassName} id="like-button" onClick={handleLikeClick}></button>
                    <span className="element__likes-count">{card.likes.length}</span>
                </div>
            </div>
        </div>
    );
}

export default Card;