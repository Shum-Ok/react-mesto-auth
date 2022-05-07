class Auth {
  constructor({ baseUrl }) {
    this._baseUrl = baseUrl
  }

  register(password, email) {
    return fetch(
      `${this._baseUrl}/signup`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          password,
          email
        })
      }
    )
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      
    })
    .catch((err) => console.log(err));
  }

  login(password, email) {
    return fetch(
      `${this._baseUrl}/signin`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          password,
          email
        })
      }
    )
    .then((res) => {
      return res.json();
    })
  }

  tokenValid(token) {
    return fetch(
      `${this._baseUrl}/users/me`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      }
    )
    .then(res => {
      return res.json()
    })
  }
}

const auth = new Auth({
  baseUrl: 'https://auth.nomoreparties.co'
})

export default auth