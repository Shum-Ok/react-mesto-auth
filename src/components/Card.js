import { useContext } from 'react'
import { CurrentUserContext } from '../contexts/CurrentUserContext'

function Card({onCardLike, onCardDelete, card, onImagePopup, onCardClick}) {
  const currentUser = useContext(CurrentUserContext)
  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = card.owner._id === currentUser._id;
  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = card.likes.some(i => i._id === currentUser._id)
  
  // Создаём переменную, которую после зададим в `className` для кнопки удаления
  const cardDeleteButtonClassName = (
    `element__delete ${isOwn && 'element__delete_visible'}`
  );
  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = (
    `element__heart ${isLiked && 'element__heart-active'}`
  );

  function handleClick() {
    onImagePopup()
    onCardClick({...card})
  }

  function handleLikeClick() {
    onCardLike(card)
  }

  function handleCardDelete() {
    onCardDelete(card)
  }

  return (
    <article className="element">
      <button className={cardDeleteButtonClassName} onClick={handleCardDelete}></button>
      <img src={card.link} alt={card.name} className="element__photo" onClick={handleClick}/>
      <div className="element__text">
        <h2 className="element__title">{card.name}</h2>
        <div>
          <button type="button" onClick={handleLikeClick} className={cardLikeButtonClassName}></button><br />
          <span className="element__heart-count">{card.likes.length}</span>
        </div>
      </div>
    </article>
  );
}

export default Card