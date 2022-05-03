function ImagePopup({ card, isOpen, onClose }) {

  return (
    <div className={`popup popup_type_image ${isOpen && 'popup_opened'}`}>
      <div className="popup__image-window">
        <button type="button" className="popup__close-button" onClick={onClose}></button>
        <img className="popup__image-url" src={card.link} alt={card.name} />
        <h2 className="popup__image-name">{card.name}</h2>
      </div>
    </div>
  );
}

export default ImagePopup