import {
  Popup
} from './Popup.js';

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  open(name, link) {
    const imgPopupFull = this._popup.querySelector('.popup__image');
    imgPopupFull.src = link;
    imgPopupFull.alt = `Фото: ${name}`;
    this._popup.querySelector('.popup__image-caption').textContent = name;

    super.open();
  }
}
