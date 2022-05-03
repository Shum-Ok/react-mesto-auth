import { useState, useEffect } from 'react'
import PopupWithForm from './PopupWithForm'

function AddPlacePopup({isOpen, onClose, onAddPlace}) {
  const [name, setName] = useState('')
  const [link, setLink] = useState('')

  useEffect(() => {
    setName('')
    setLink('')
  }, [isOpen])

  function handleChangeName(e) {
    setName(e.target.value)
  }
  function handleChangeLink(e) {
    setLink(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault()
    onAddPlace({
      name,
      link,
    })
  }

  return (
    <PopupWithForm
      onSubmit={handleSubmit}
      isOpen={isOpen}
      onClose={onClose}
      buttonText='Отправить'
      title='Новое место'
      name='card'
    >
      <input
        value={name || ''}
        onChange={handleChangeName}
        id="card-name" type="text" name="name" placeholder="Название места" className="popup__input popup__input_card_name" required />
      <span id="card-name-error" className="popup__error"></span>
      <input
        value={link || ''}
        onChange={handleChangeLink}
        id="cardUrl" type="url" name="link" placeholder="Ссылка на картинку" className="popup__input popup__input_card_url" required />
      <span id="cardUrl-error" className="popup__error"></span>
    </PopupWithForm>
  )
}

export default AddPlacePopup