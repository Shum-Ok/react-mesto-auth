// InfoTooltip — компонент модального окна,который информирует пользователя об успешной 
// (или не очень) регистрации.

// import components
import React from 'react'

// import images
import infoOk from '../images/info-ok.svg';
import infoErr from '../images/info-err.svg';

function InfoTooltip() {
  return (
    <div className='popup reg-info popup_opened'>
      <div className="reg-info__window">
        <button type="button" className="popup__close-button"></button>
        <img className='reg-info__img' src={infoOk} alt='изображените' />
        <h3 className='reg-info__text'>Вы успешно зарегистрировались</h3>
      </div>
    </div>
  )
}

export default InfoTooltip