import React, { useState, useEffect } from 'react';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import PopupWithForm from './PopupWithForm.js';
import api from '../Utils/Api.js';
import ImagePopup from './ImagePopup.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import { Route, Routes, Navigate, BrowserRouter, useNavigate } from 'react-router-dom';
import ProtectedRouteElement from "./ProtectedRoute";
import Login from './Login';
import Register from './Register';
import InfoTooltip from './InfoTooltip';
import * as auth from '../Utils/Auth.js';

function App() {

  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [IsEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [IsAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [IsEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [isImagePopupOpen, setisImagePopupOpen] = React.useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
  const [checkRegister, setCheckRegister] = React.useState(false);
  const jwt = localStorage.getItem('jwt');
  //console.log(jwt)

  const tokenCheck = () => {
    if (localStorage.getItem('jwt')) {
      if (jwt) {
        auth.getContent(jwt)
          .then((res) => {
            if (res) {
              const user = localStorage.getItem('username');
              setUserData(user);
              setLoggedIn(true);
              navigate("/", { replace: true })
            }
          })
          .catch(function (err) {
            console.log('Ошибка', err)
          })
      }
    }
  }

  const handleLogin = () => {
    setLoggedIn(true);
  }

  useEffect(() => {
    tokenCheck();
  }, [])

  React.useEffect(() => {
    api.getProfile(currentUser)
      .then((res) => {
        setCurrentUser(res)
      })
      .catch(function (err) {
        console.log('Ошибка', err)
      })
  }, [loggedIn])

  React.useEffect(() => {
    api.getCards()
      .then((cards) => {
        setCards(cards)
      })
      .catch(function (err) {
        console.log('Ошибка', err)
      })
  }, [loggedIn])

  function handleOpenImageClick() {
    setisImagePopupOpen(!isImagePopupOpen)
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(!IsEditProfilePopupOpen)
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(!IsAddPlacePopupOpen)
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(!IsEditAvatarPopupOpen)
  }

  function handleInfoTooltip() {
    setIsInfoTooltipOpen(!isInfoTooltipOpen)
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard({});
    setisImagePopupOpen(false);
    setIsInfoTooltipOpen(false);
  }

  function handleCardClick(card) {
    handleOpenImageClick()
    setSelectedCard(card);
  }

  function handleCardLike(card) {

    const isLiked = card.likes.some(i => i._id === currentUser._id);

    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch(function (err) {
        console.log('Ошибка', err)
      })
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((s) => s._id !== card._id))
      })
      .catch(function (err) {
        console.log('Ошибка', err)
      })
  }

  function handleUpdateUser(data) {
    api.editProfile(data.name, data.about)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch(function (err) {
        console.log('Ошибка', err)
      })
  }

  function handleUpdateAvatar(data) {
    api.editAvatar(data.avatar)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch(function (err) {
        console.log('Ошибка', err)
      })
  }

  function handleAddPlaceSubmit(data) {
    api.addCard(data.name, data.link)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch(function (err) {
        console.log('Ошибка', err)
      })
  }

  function signOut() {
    localStorage.removeItem('jwt');
  }

  function setRegistredState(state) {
    if (state) {
      setCheckRegister(true)
    }
    else {
      setCheckRegister(false)
    }
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header signOut={signOut} userMail={userData} />
        <Routes>
          <Route path="/" element={<ProtectedRouteElement
            loggedIn={loggedIn}
            element={Main}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
            cards={cards} />} />
          <Route path="/login" element={<Login handleLogin={handleLogin} />} />
          <Route path="/register" element={<Register openAuthPopup={handleInfoTooltip} isRegistred={setRegistredState} />} />
        </Routes>

        <ImagePopup
          link={selectedCard.link}
          title={selectedCard.name}
          onClose={closeAllPopups}
          isOpen={isImagePopupOpen}
        />
        <EditProfilePopup
          isOpen={IsEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        >
        </EditProfilePopup>
        <AddPlacePopup
          isOpen={IsAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        >
        </AddPlacePopup>
        <EditAvatarPopup
          isOpen={IsEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        >
        </EditAvatarPopup>
        <InfoTooltip
          onClose={closeAllPopups}
          isOpen={isInfoTooltipOpen}
          Registred={checkRegister}
        >
        </InfoTooltip>
        <Footer />
      </div>
    </CurrentUserContext.Provider>

  );
}

export default App;