// Login — компонент авторизации пользователя с необходимыми стейт-переменными.

// import components
import { useState } from 'react'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <div className='auth root__auth'>
      <h3 className='auth__title'>Вход</h3>
      <form className='auth__form'>
        <input className='auth__input' type='email' placeholder='Email' value={email || ''} required />
        <input className='auth__input' type='password' placeholder='Пароль' value={password || ''} required />
        <button type='submit' className='auth__button'>Войти</button>
      </form>
    </div>
  )
}

export default Login