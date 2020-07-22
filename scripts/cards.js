// Six cards from "box"
const initialCards = [{
    name: 'Даунтаун',
    link: './images/sunset_downtown.jpg'
  },
  {
    name: 'Радио-сити',
    link: './images/radio-city_music-hall.jpg'
  },
  {
    name: 'Метрополитен',
    link: './images/new-york_metro.jpg'
  },
  {
    name: 'Фултон центр',
    link: './images/fulton_center.jpg'
  },
  {
    name: '"Утюг"',
    link: './images/flatiron_building.jpg'
  },
  {
    name: 'Бруклинский мост',
    link: './images/brooklyn_bridge.jpg'
  }
];

// Functions for cards
const cardsList = document.querySelector('.photo-grid__list');

// Сard view popup
const viewPopup = document.querySelector('.popup_content_image');
const imageView = viewPopup.querySelector('.popup__image');
const captionView = viewPopup.querySelector('.popup__image-caption');
const closeViewButton = viewPopup.querySelector('.popup__btn_action_close');

// Popup for adding card
const newPlaceButton = document.querySelector('.profile__btn_action_add');
const newPlacePopup = document.querySelector('.popup_content_card');
const newPlaceForm = newPlacePopup.querySelector('.popup__form');

const titleInput = newPlaceForm.querySelector('.popup__item_type_name');
const linkInput = newPlaceForm.querySelector('.popup__item_type_info');

const newPlaceCloseButton = newPlacePopup.querySelector('.popup__btn_action_close');

// Add card with img to the list
const addListItem = function (item) {
  const cardElement = createCard(item);
  cardsList.prepend(cardElement);
}

// Card create
const createCard = function (newCard) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.cloneNode(true);
  cardElement.querySelector('.photo-grid__title').textContent = newCard.name;

  const cardImage = cardElement.querySelector('.photo-grid__image');
  cardImage.src = newCard.link;
  cardImage.alt = newCard.name;

  cardElement.querySelector('.photo-grid__btn_action_like').addEventListener('click', likeCard);
  cardElement.querySelector('.photo-grid__btn_action_del').addEventListener('click', deleteCard);
  cardElement.querySelector('.photo-grid__image').addEventListener('click', () => viewCard(newCard));
  return cardElement;
}

// Like mark
const likeCard = function (evt) {
  evt.target.classList.toggle('photo-grid__btn_clicked');
}

// Delete card
const deleteCard = function (evt) {
  const card = evt.target.closest('.photo-grid__card');
  card.remove();
}

// View img
const viewCard = function (card) {
  imageView.src = card.link;
  imageView.alt = card.name;
  captionView.textContent = card.name;
  togglePopup(viewPopup);
}

// Add card from array
const createCardList = function () {
  initialCards.forEach((item) => {
    addListItem(item);
  });
}

const saveNewCard = function (evt) {
  evt.preventDefault();
  const newItem = {
    name: '',
    link: ''
  };
  newItem.name = titleInput.value;
  newItem.link = linkInput.value;
  addListItem(newItem);

  titleInput.value = '';
  linkInput.value = '';
  togglePopup(newPlacePopup);
}

//******************

createCardList();

closeViewButton.addEventListener('click', () => togglePopup(viewPopup));

newPlaceButton.addEventListener('click', () => togglePopup(newPlacePopup));
newPlaceForm.addEventListener('submit', saveNewCard);
newPlaceCloseButton.addEventListener('click', () => togglePopup(newPlacePopup));
