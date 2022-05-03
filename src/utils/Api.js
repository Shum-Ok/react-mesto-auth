class Api {
    constructor({ url, headers }) {  // передаем url API и заголовок
      this._url = url
      this._headers = headers
    }

    getAllData() {
      return Promise.all([this.getInitialCards(), this.getUser()])
    }

    getUser() { // загружаем имя пользователя
      return fetch(
        `${this._url}users/me`, 
        { 
          headers: this._headers
        }
      )
        .then(onError)
    }

    setUserInfo(name, about) { // запрос на изменение данных пользователя метод PATCH
      return fetch(
        `${this._url}users/me`, 
        {
          method: 'PATCH',
          headers: this._headers,
          body: JSON.stringify({
            name,
            about,
          })
        })
        .then(onError)
    }

    getInitialCards() { // получить карточки метотд GET
      return fetch(
        `${this._url}cards`, 
        { 
          headers: this._headers
        }
      )
        .then(onError)
    }

    createCard(card) { // создать карточку метотд POST
      return fetch(
        `${this._url}cards`, 
        { 
          method: 'POST',
          headers: this._headers,
          body: JSON.stringify({
            name: card.name,
            link: card.link,
          }) 
        })
        .then(onError)
    }

    deleteCard(id) { // удалить карточку метотд DELETE
      return fetch(
        `${this._url}cards/${id}`, 
        { 
          method: 'DELETE',
          headers: this._headers,
        })
        .then(onError)
    }

    changeLikeCardStatus(id, isLiked) { // добавить лайк метотд PUT
      return fetch(
        `${this._url}cards/${id}/likes`, 
        { 
          method: isLiked ? 'PUT' : 'DELETE',
          headers: this._headers,
        })
        .then(onError)
    }
    
    setUserAvatar(avatar) { // запрос на изменение аватара пользователя, метод PATCH
      return fetch(
        `${this._url}users/me/avatar`, 
        {
          method: 'PATCH',
          headers: this._headers,
          body: JSON.stringify({
            avatar
          }),
        })
        .then(onError)
    }
}

const onError = res => {
  if (res.ok) {
    return res.json()
  }
  return Promise.reject('Произошла ошибка')
}

const api = new Api({
  url: 'https://nomoreparties.co/v1/cohort-37/',
  headers: {
    authorization: '975e0bed-b421-4a9a-8ad5-c6281150f147',
    'Content-Type': 'application/json'
  }
})

export default api