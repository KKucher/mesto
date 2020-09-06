import brooklynBridge from '../images/brooklyn_bridge.jpg';
import flatironBuilding from '../images/flatiron_building.jpg';
import fultonCenter from '../images/fulton_center.jpg';
import newYorkMetro from '../images/new-york_metro.jpg';
import radioCityMusicHall from '../images/radio-city_music-hall.jpg';
import sunsetDowntown from '../images/sunset_downtown.jpg';

export const initialCards = [
  { name: 'Бруклинский мост', link: brooklynBridge },
  { name: '"Утюг"', link: flatironBuilding },
  { name: 'Фултон центр', link: fultonCenter },
  { name: 'Метрополитен', link: newYorkMetro },
  { name: 'Радио-сити', link: radioCityMusicHall },
  { name: 'Даунтаун', link: sunsetDowntown }
];

export const validationObject = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__btn',
  inactiveButtonClass: 'popup__btn_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

export const templateId = '#card-template';

export const cardListSelector = '.photo-grid__list';
