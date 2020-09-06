//***************************************************************************

export class Card {
  constructor(data, cardSelector, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
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

  // DELETE IMG FUNCTION
  _deletePopupImg(evt) {
    evt.target.closest('.photo-grid__card').remove();
  }

  // LIKE IMG FUNCTION
  _likePopupImg(evt) {
    evt.target.classList.toggle('photo-grid__btn_clicked');
  }

  _setEventListeners() {
    // FULL SIZE IMG
    this._element.querySelector('.photo-grid__image').addEventListener('click', this._handleCardClick);

    // DELETE IMG
    this._element.querySelector('.photo-grid__btn_action_del').addEventListener('click', this._deletePopupImg);

    // LIKE IMG
    this._element.querySelector('.photo-grid__btn_action_like').addEventListener('click', this._likePopupImg);
  }

}
