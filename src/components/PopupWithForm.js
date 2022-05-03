import React from 'react'

function PopupWithForm({buttonText, title, name, children, isOpen, onClose, onSubmit}) {
  return (
    <div className={`popup popup_type_${name} ${isOpen && 'popup_opened'}`}>
      <div className="popup__window">
        <button onClick={onClose} type="button" className="popup__close-button"></button>
        <h3 className="popup__title">{title}</h3>
        <form onSubmit={onSubmit} name={`${name}-form`} className="popup__form">
          {children}
          <button type="submit" className="popup__save-button">{buttonText}</button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm