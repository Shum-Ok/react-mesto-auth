import { useState, useEffect } from 'react'
import { Switch, Route, Redirect, useHistory } from 'react-router-dom'
import { CurrentUserContext } from '../contexts/CurrentUserContext'
// import components
import Header from './Header'
import Main from './Main'
import Footer from './Footer'
import PopupWithForm from './PopupWithForm'
import ImagePopup from './ImagePopup'
import EditProfilePopup from './EditProfilePopup'
import EditAvatarPopup from './EditAvatarPopup'
import AddPlacePopup from './AddPlacePopup'
import Login from './Login'
import Register from './Register'
import InfoTooltip from './InfoTooltip'
// HOC
import ProtectedRoute from './ProtectedRoute'
// import api
import api from '../../src/utils/Api'
import auth from '../../src/utils/Auth'
// import images
import infoOk from '../images/info-ok.svg';
import infoErr from '../images/info-err.svg';


function App() {
  const history = useHistory()

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false)
  const [isImageCardPopupOpen, setIsImageCardPopupOpen] = useState(false)
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = useState(false)
  const [loggedIn, setLoggedIn] = useState(false)

  const [selectedCard, setSelectedCard] = useState({})
  const [currentUser, setCurrentUser] = useState({})
  const [message, setMessage] = useState({});

  const [cards, setCards] = useState([])
  const [userEmail, setUserEmail] = useState(null)

  useEffect(() => {
    handlTokenCheck()
    if(!loggedIn) {
      api.getAllData()
        .then(([data, user]) => {
          setCards(data)
          setCurrentUser(user)
        })
        .catch(err => console.log(err))
    }
  }, [])

  useEffect(() => {
    if(loggedIn) {
      history.push('/')
    }
  }, [loggedIn])


  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id) // Проверяем, есть ли уже лайк на этой карточке
    api.changeLikeCardStatus(card._id, !isLiked) // Отправляем запрос в API и получаем обновлённые данные карточки
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c))
      })
      .catch(err => console.log(err))
  }
  
  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id))
      })
      .catch(err => console.log(err))
  }

  function handleUpdateUser({ name, about }) {
    api.setUserInfo(name, about)
      .then(user => {
        setCurrentUser(user)
      })
      .catch(err => console.log(err))
    closeAllPopups()
  }

  function handleUpdateAvatar({ avatar }) {
    api.setUserAvatar(avatar) 
      .then(user => {
        setCurrentUser(user)
      })
      .catch(err => console.log(err))
    closeAllPopups()
  }

  function handleAddPlaceSubmit({ name, link }) {
    api.createCard({name, link})
      .then(newCard => {
        setCards([newCard, ...cards])
      })
      .catch(err => console.log(err))
    closeAllPopups()
  }

  function handleCardClick(card) {
    setSelectedCard({name: card.name, link: card.link})
  }
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true)
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true)
  }
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true)
  }
  function handleImageCardClick() {
    setIsImageCardPopupOpen(true)
  }
  function closeAllPopups() {
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setIsEditAvatarPopupOpen(false)
    setIsImageCardPopupOpen(false)
    setIsInfoTooltipPopupOpen(false)
    setSelectedCard({name: '', link: ''})
  }

  function handleRegister(password, email) {
    auth
      .register(password, email)
      .then(res => {
        if (res) {
          setMessage({
            imgInfo: infoOk,
            text: 'Вы успешно зарегистрировались!' 
          })
          history.push('/sing-in')
        }
      })
      .catch(setMessage({
        imgInfo: infoErr,
        text: 'Что-то пошло не так! Попробуйте ещё раз.' 
      }))
      .finally(() => setIsInfoTooltipPopupOpen(true))
  }

  function handleLogin(password, email) {
    auth
      .login(password, email)
      .then(res => {
        if(res.token) {
          localStorage.setItem('token', res.token)
          setUserEmail(email)
          setLoggedIn(true)
        } else {
          setMessage({
            imgInfo: infoErr, 
            text: 'Что-то пошло не так! Попробуйте ещё раз.' 
          })
          setIsInfoTooltipPopupOpen(true)
        }
      })
      .catch((err) => console.log(err))
  }

  function handlTokenCheck() {
    const token = localStorage.getItem('token')
    if(token) {
      auth
        .tokenValid(token)
        .then(res => {
          if(res) {
            setLoggedIn(true)
            setUserEmail(res.data.email)
            history.push('/')
          }
        })
        .catch((err) => console.log(err))
    }
  }

  function handleSingOut() {
    setLoggedIn(false)
    localStorage.removeItem('token')
    history.push('/sing-in')
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header onSingOut={handleSingOut} userEmail={userEmail} />
      <Switch>
        <ProtectedRoute
          exact
          path='/'
          loggedIn={loggedIn}
          component={Main}
          onCardClick={handleCardClick}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onImagePopup={handleImageCardClick}
          cards={cards}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
        />
        <Route path="/sign-up">
          <Register onRegister={handleRegister} />
        </Route>
        <Route path="/sign-in">
          <Login onLogin={handleLogin} />
        </Route>
        <Route>{loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}</Route>
      </Switch>
      <Footer />

      <InfoTooltip
        isOpen={isInfoTooltipPopupOpen}
        onClose={closeAllPopups}
        imgInfo={message.imgInfo}
        textInfo={message.text}
      />
      <EditProfilePopup
        onUpdateUser={handleUpdateUser}
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
      />
      <EditAvatarPopup
        onUpdateAvatar={handleUpdateAvatar}
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
      />
      <AddPlacePopup
        onAddPlace={handleAddPlaceSubmit}
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
      />

      <PopupWithForm buttonText='Да' title='Вы уверены?' name='delete' />

      <ImagePopup card={selectedCard} isOpen={isImageCardPopupOpen} onClose={closeAllPopups} />
    </CurrentUserContext.Provider>
  );
}

export default App