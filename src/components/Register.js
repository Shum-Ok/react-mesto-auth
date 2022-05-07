import React, { useState } from 'react'
import { Link } from 'react-router-dom'
// import components

function Register({ onRegister }) {
  const [state, setState] = useState({
    email: '',
    password: ''
  })

  function handleChange(e) {
    const {name, value} = e.target
    setState((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    onRegister(state.password, state.email)
  }

  return (
    <div className='auth root__auth'>
      <h3 className='auth__title'>Регистрация</h3>
      <form onSubmit={handleSubmit} className='auth__form'>
        <input
          onChange={handleChange}
          value={state.email || ''}
          className='auth__input'
          name='email'
          type='email'
          placeholder='Email'
          required
        />
        <input
          onChange={handleChange}
          value={state.password || ''}
          className='auth__input'
          name='password'
          type='password'
          placeholder='Пароль'
          required
        />
        <button type='submit' className='auth__button'>Зарегистрироваться</button>
      </form>
      <Link to="./sign-in" className='auth__link'>
        Уже зарегистрированы? Войти
      </Link>
    </div>
  )
}

export default Register