//import images
import { useContext } from 'react'
import editImg from '../images/icon-edit.svg'
import addImg from '../images/icon-add.svg'
import Card from './Card'
import { CurrentUserContext } from '../contexts/CurrentUserContext'


function Main({ onEditProfile, onAddPlace, onEditAvatar, onImagePopup, onCardClick, cards, onCardLike, onCardDelete }) {
  const currentUser = useContext(CurrentUserContext)

  return (
    <main className="content">
      <section className="profile content__profile">
        <div className="profile__avatar-img">
          <img src={currentUser.avatar} alt="Фото профеля" className="profile__avatar" />
          <button onClick={onEditAvatar} title="Загрузить аватар" className="profile__avatar-button"></button>
        </div>
        <h1 className="profile__user-name">{currentUser.name}</h1>
        <p className="profile__user-jop">{currentUser.about}</p>
        <button onClick={onEditProfile} type="button" className="edit-profile profile__edit-profile">
          <img src={editImg} alt="Редактировать профиль" className="edit-profile__icon" />
        </button>
        <button onClick={onAddPlace} type="button" className="add-button profile__add-button">
          <img src={addImg} alt="Добавить" className="add-button__icon" />
        </button>
      </section>

      <section className="elements content__elements">
        {
          cards.map(item => (
            <Card
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
              card={item}
              key={item._id}
              onImagePopup={onImagePopup}
              onCardClick={onCardClick}
            />
          ))
        }
      </section>
    </main>
  );
}

export default Main