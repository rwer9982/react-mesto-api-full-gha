import React from 'react';
import pen from '../images/pen.png';
import vector from '../images/Vector.png';
import Card from './Card.js';
import api from '../Utils/Api.js'
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick, onCardLike, onCardDelete, cards}) {

  const currentUser = React.useContext(CurrentUserContext)

  return (
    <main className="main">
      <section className="profile">
        <div className="profile__avatar-container"
          onClick={onEditAvatar}
        >
          <img className="profile__avatar" alt="лого_аватар" src={currentUser.avatar}/>
          <img className="profile__pen" />
        </div>
        <div className="profile__info">
          <div className="profile__row">
            <h1 className="profile__title">{currentUser.name}</h1>
            <button type="button" className="profile__edit-button"
              onClick={onEditProfile}
            >
              <img
                src={pen}
                className="profile__img-pen"
                alt="Иконка_ручка" /></button>
          </div>
          <h2 className="profile__subtitle">{currentUser.about}</h2>
        </div>
        <button type="button" className="profile__add-button"
          onClick={onAddPlace}
        >
          <img src={vector} className="profile__vector"
            alt="Картинка_плюс" /></button>
      </section>
      <section className="elements">
        {cards.map((card) =>
          <Card
            card={card}
            key={card._id}
            onCardClick={onCardClick}
            onCardLike={onCardLike}
            onCardDelete={onCardDelete}
          />)}
      </section>
    </main>
  );
}

export default Main;