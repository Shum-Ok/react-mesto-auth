// Register — компонент регистрации пользователя с необходимыми стейт-переменными.

// import components
import { useState } from 'react'

function Register() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <div className='auth root__auth'>
      <h3 className='auth__title'>Регистрация</h3>
      <form className='auth__form'>
        <input className='auth__input' type='email' placeholder='Email' value={email || ''} required />
        <input className='auth__input' type='password' placeholder='Пароль' value={password || ''} required />
        <button type='submit' className='auth__button'>Зарегистрироваться</button>
      </form>
      <span className='auth__link'>Уже зарегистрированы? Войти</span>
    </div>
  )
}

export default Register