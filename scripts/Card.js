//***************************************************************************

import {
  openPopup
} from './utils.js';

//***************************************************************************

export class Card {
  constructor(data, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._openPopupImg = this._openPopupImg.bind(this);
    this._deletePopupImg = this._deletePopupImg.bind(this);
    this._likePopupImg = this._likePopupImg.bind(this);
  }

  _getTemplate() {
    const cardElement = document.querySelector(this._cardSelector).content.querySelector('.photo-grid__card').cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    const elementImg = this._element.querySelector('.photo-grid__image');
    elementImg.src = this._link;
    elementImg.alt = `Фото: ${this._name}`;
    this._element.querySelector('.photo-grid__title').textContent = this._name;

    return this._element;
  }

  // FULL SIZE IMG FUNCTION
  _openPopupImg() {
    const imgPopup = document.querySelector('.popup_content_image');
    const imgPopupFull = imgPopup.querySelector('.popup__image')
    imgPopupFull.src = this._link;
    imgPopupFull.alt = `Фото: ${this._name}`;
    imgPopup.querySelector('.popup__image-caption').textContent = this._name;

    openPopup(imgPopup);
  }

  // DELETE IMG FUNCTION
  _deletePopupImg(evt) {
    evt.target.closest('.photo-grid__card').remove();
  }

  // LIKE IMG FUNCTION
  _likePopupImg(evt) {
    evt.target.classList.toggle('photo-grid__btn_clicked');
  }

  // _setEventListeners() {
  //   // FULL SIZE IMG
  //   this._element.querySelector('.photo-grid__image').addEventListener('click', this._openPopupImg);

  //   // DELETE IMG
  //   this._element.querySelector('.photo-grid__btn_action_del').addEventListener('click', function (evt) {
  //     evt.target.closest('.photo-grid__card').remove();
  //   });

  //   // LIKE IMG
  //   this._element.querySelector('.photo-grid__btn_action_like').addEventListener('click', function (evt) {
  //     evt.target.classList.toggle('photo-grid__btn_clicked');
  //   });
  // }

   _setEventListeners() {
    // FULL SIZE IMG
    this._element.querySelector('.photo-grid__image').addEventListener('click', this._openPopupImg);

    // DELETE IMG
    this._element.querySelector('.photo-grid__btn_action_del').addEventListener('click', this._deletePopupImg);

    // LIKE IMG
    this._element.querySelector('.photo-grid__btn_action_like').addEventListener('click', this._likePopupImg);
  } 

}
