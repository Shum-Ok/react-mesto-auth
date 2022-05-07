// import components
import { useState } from 'react'

function Login({ onLogin }) {
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
    onLogin(state.password, state.email)
  }

  return (
    <div className='auth root__auth'>
      <h3 className='auth__title'>Вход</h3>
      <form onSubmit={handleSubmit} className='auth__form'>
        <input onChange={handleChange} className='auth__input' type='email' placeholder='Email' name='email' value={state.email || ''} required />
        <input onChange={handleChange} className='auth__input' type='password' placeholder='Пароль' name='password' value={state.password || ''} required />
        <button type='submit' className='auth__button'>Войти</button>
      </form>
    </div>
  )
}

export default Login