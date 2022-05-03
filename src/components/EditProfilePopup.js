import { useState, useContext, useEffect } from 'react'
import PopupWithForm from './PopupWithForm'
import { CurrentUserContext } from '../contexts/CurrentUserContext'

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  // Подписка на контекст
  const currentUser = useContext(CurrentUserContext);

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')

  // После загрузки текущего пользователя из API
  // его данные будут использованы в управляемых компонентах.
  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  function handleChangeName(e) {
    setName(e.target.value)
  }
  function handleChangeDescription(e) {
    setDescription(e.target.value)
  }

  const handleSubmit = (e) => { // функция срабатывает при кнопке сохранить
    e.preventDefault()
    
    onUpdateUser({
      name,
      about: description,
    })
  }

  return (
    <PopupWithForm 
      onSubmit={handleSubmit}
      isOpen={isOpen}
      onClose={onClose}
      buttonText='Сохранить'
      title='Редактировать профиль'
      name='edit'
    >
      <input
        value={name || ''}
        onChange={handleChangeName}
        id="name" type="text" name="name" placeholder="Имя" className="popup__input popup__input_string_name" required
      />
      <span id="name-error" className="popup__error"></span>
      <input
        value={description || ''}
        onChange={handleChangeDescription}
        id="profession" type="text" name="about" placeholder="Работа" className="popup__input popup__input_string_jop" required
        />
      <span id="profession-error" className="popup__error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup