//***************************************************************************

export class Card {
  constructor(data, cardSelector, currentUserId, handleCardClick, deletePopupImg, likePopupImg, dislikePopupImg) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._owner = data.owner;
    this._cardSelector = cardSelector;
    this._currentUserId = currentUserId;
    this._handleCardClick = handleCardClick;
    this._deletePopupImg = deletePopupImg;
    this._likePopupImg = likePopupImg;
    this._dislikePopupImg = dislikePopupImg;
  }

  _getTemplate() {
    const cardElement = document.querySelector(this._cardSelector).content.querySelector('.photo-grid__card').cloneNode(true);

    return cardElement;
  }

  _isLiked() {
    return this._likes.some((item) => {
      return item._id === this._currentUserId
    })
  }

  _renderLikesBtn() {
    if (this._isLiked()) {
      this._element.querySelector('.photo-grid__btn_action_like').classList.add('photo-grid__btn_clicked');
    } else {
      this._element.querySelector('.photo-grid__btn_action_like').classList.remove('photo-grid__btn_clicked');
    };
  }

  _likesCount() {
    this._element.querySelector('.photo-grid__like-amount').textContent = this._likes.length;
  }

  _createLikes() {
    this._renderLikesBtn();
    this._likesCount();
  }

  updateLikes(likes) {
    this._likes = likes;
    this._createLikes();
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    this._createLikes();
    const elementImg = this._element.querySelector('.photo-grid__image');
    elementImg.src = this._link;
    elementImg.alt = `Фото: ${this._name}`;
    this._element.querySelector('.photo-grid__title').textContent = this._name;

    if (this._owner._id !== this._currentUserId) {
      this._element.querySelector('.photo-grid__btn_action_del').remove();
    }

    // this._likes.forEach((item) => {
    //   if (item._id !== this._currentUserId) {
    //     this._element.querySelector('.photo-grid__btn_action_like').classList.add('photo-grid__btn_clicked');
    //   }
    // });

    return this._element;
  }

  _setEventListeners() {
    // FULL SIZE IMG
    this._element.querySelector('.photo-grid__image').addEventListener('click', this._handleCardClick);

    // DELETE IMG
    this._element.querySelector('.photo-grid__btn_action_del').addEventListener('click', this._deletePopupImg);

    // LIKE IMG
    this._element.querySelector('.photo-grid__btn_action_like').addEventListener('click', (evt) => {
      this._isLiked() ? this._dislikePopupImg(evt) : this._likePopupImg(evt);
    });
  }
}
