// import components
import React from 'react'

function InfoTooltip({ isOpen, onClose, imgInfo, textInfo }) {
  return (
    <div className={`popup reg-info ${isOpen && 'popup_opened'}`}>
      <div className="reg-info__window">
        <button onClick={onClose} type="button" className="popup__close-button"></button>
        <img className='reg-info__img' src={imgInfo} alt='изображените' />
        <h3 className='reg-info__text'>{textInfo}</h3>
      </div>
    </div>
  )
}

export default InfoTooltip