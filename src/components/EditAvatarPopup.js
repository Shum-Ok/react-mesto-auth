import { useEffect, useRef } from 'react'
import PopupWithForm from './PopupWithForm'

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const avatar = useRef(null)

  useEffect(() => {
    avatar.current.value = ' '
  }, [isOpen])

  function handleSubmit(e) {
    e.preventDefault()
    onUpdateAvatar({
      avatar: avatar.current.value
    })
  }

  return (
    <PopupWithForm
      onSubmit={handleSubmit}
      isOpen={isOpen}
      onClose={onClose}
      buttonText='Отправить'
      title='Обновить аватар'
      name='edit-avatar'
    >
      <input
        ref={avatar}
        id="avatar" type="url" name="link" placeholder="Ссылка на картинку" className="popup__input popup__input_avatar_url" required />
      <span id="avatar-error" className="popup__error"></span>
    </PopupWithForm>
  )
}

export default EditAvatarPopup