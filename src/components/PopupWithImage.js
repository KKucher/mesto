import {
  Popup
} from './Popup.js';

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);

    this._popupFullImg = this._popup.querySelector('.popup__image');
    this._popupFullCaption = this._popup.querySelector('.popup__image-caption');
  }

  open(name, link) {
    this._popupFullImg.src = link;
    this._popupFullImg.alt = `Фото: ${name}`;
    this._popupFullCaption.textContent = name;

    super.open();
  }
}
