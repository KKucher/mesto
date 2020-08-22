// функция открытия popup для всех popup-элементов
//***************************************************************************
export function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', keyHandler);
}

// функция закрытия popup для всех popup-элементов
//***************************************************************************
export function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', keyHandler);
}

// функция для закрытия модального окна с помощью esc
//***************************************************************************
function keyHandler(evt) {
  const popupOpened = document.querySelector('.popup_opened');
  if (evt.key === 'Escape') {
    closePopup(popupOpened);
  }
}
