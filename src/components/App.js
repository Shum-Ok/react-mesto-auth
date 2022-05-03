// import components
import { useState, useEffect } from 'react'
import Header from './Header'
import Main from './Main'
import Footer from './Footer'
import PopupWithForm from './PopupWithForm'
import ImagePopup from './ImagePopup'
import EditProfilePopup from './EditProfilePopup'
import EditAvatarPopup from './EditAvatarPopup'
import AddPlacePopup from './AddPlacePopup'
import api from '../../src/utils/Api'
import { CurrentUserContext } from '../contexts/CurrentUserContext'


function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false)
  const [isImageCardPopupOpen, setIsImageCardPopupOpen] = useState(false)
  const [selectedCard, setSelectedCard] = useState({})
  const [currentUser, setCurrentUser] = useState({})
  const [cards, setCards] = useState([])

  useEffect(() => {
    api.getAllData()
      .then(([data, user]) => {
        setCards(data)
        setCurrentUser(user)
      })
      .catch(err => console.log(err))
  }, [])

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
    setSelectedCard({name: '', link: ''})
  }


  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header />
      <Main
        onCardClick={handleCardClick}
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
        onImagePopup={handleImageCardClick}
        cards={cards}
        onCardLike={handleCardLike}
        onCardDelete={handleCardDelete}
      />
      <Footer />
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