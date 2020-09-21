//***************************************************************************
// Объявляем импорты:
import '../pages/index.css';

import {
  Card
} from '../components/Card.js';

import {
  FormValidator
} from '../components/FormValidator.js';

import {
  Section
} from '../components/Section.js';

import {
  PopupWithForm
} from '../components/PopupWithForm.js';

import {
  PopupWithImage
} from '../components/PopupWithImage.js';

import {
  PopupConfirm
} from '../components/PopupConfirm.js';

import {
  UserInfo
} from '../components/UserInfo.js';

import {
  validationObject,
  templateId,
  cardListSelector
} from '../utils/constants.js';

import {
  Api
} from '../components/Api.js';

//***************************************************************************
// Объявляем константы:
const {
  submitButtonSelector,
  inactiveButtonClass,
} = validationObject;

const main = document.querySelector(".content");

const editButton = main.querySelector(".profile__btn_action_edit");
const addButton = main.querySelector(".profile__btn_action_add");
const profileAvatar = main.querySelector('.profile__avatar');
const profileName = main.querySelector('.profile__name');
const profileDescription = main.querySelector('.profile__work');

// popup-элементы
const editPopup = document.querySelector(".popup_content_profile");
const addPopup = document.querySelector(".popup_content_card");
const confirmPopup = document.querySelector('.popup-confirm');
const avatarPopup = document.querySelector('.popup-avatar');

// форма редактирования профиля
const editForm = editPopup.querySelector('.popup-edit__form');

// форма добавления карточки
const addForm = addPopup.querySelector('.popup-add__form');

// форма изменения аватарки
const avatarForm = avatarPopup.querySelector('.popup-avatar__form');

// все input из форм
const nameInput = editForm.querySelector(".popup__input_type_name");
const jobInput = editForm.querySelector(".popup__input_type_info");

const addSave = addPopup.querySelector(submitButtonSelector);
const editSave = editPopup.querySelector(submitButtonSelector);
const avatarSave = avatarPopup.querySelector(submitButtonSelector);
const deleteButton = confirmPopup.querySelector(submitButtonSelector);

// валидация (редактирования профиля, добавления карточки, добавления аватара)
const editFormValidator = new FormValidator(validationObject, editForm);
editFormValidator.enableValidation();

const addFormValidator = new FormValidator(validationObject, addForm);
addFormValidator.enableValidation();

const avatarFormValidator = new FormValidator(validationObject, avatarForm);
avatarFormValidator.enableValidation();

//***************************************************************************
// popup картинки в большом размере
const imgPopup = new PopupWithImage('.popup_content_image');
imgPopup.setEventListeners();

//***************************************************************************
// экземпляра класса Api
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-15',
  headers: {
    authorization: '805da766-1e17-442b-aa98-c904fbf55e62',
    'Content-Type': 'application/json'
  }
});

const promises = [api.getUserInfo(), api.getInitialCards()];

Promise.all(promises)
  .then((results) => {
    setupUser(results[0]);
    setupCards(results[1]);

    editButton.addEventListener('click', openPopupEdit);
    addButton.addEventListener('click', openPopupAdd);
    profileAvatar.addEventListener('click', openPopupAvatar);
  })
  .catch(err => console.log(`Error ${err}`));

// переменная запоминания пользователя
let currentUser = null;

//***************************************************************************
// функция установки информации о пользователе
function setupUser(user) {
  profileName.textContent = user.name;
  profileDescription.textContent = user.about;
  profileAvatar.style.backgroundImage = `url(${user.avatar})`;
  currentUser = user;
}

//***************************************************************************
// создание класса UserInfo (инф-я пользователя при смене данных)
const userData = new UserInfo({
  nameSelector: '.profile__name',
  descriptionSelector: '.profile__work',
  avatarSelector: '.profile__avatar'
});

//***************************************************************************
// создание класса PopupWithForm (редактирование профиля)
const editPopupElement = new PopupWithForm({
  popupSelector: '.popup_content_profile',
  handleFormSubmit: (item) => {
    editSave.textContent = 'Сохранение...';
    api.editProfile(item)
      .then((result) => {
        userData.setUserInfo(result);
        editSave.textContent = 'Сохранить';
        editPopupElement.close();
      })
      .catch(err => console.log(`Error ${err}`));
  },
});

editPopupElement.setEventListeners();

//***************************************************************************
// функция открытия popup (редактирование профиля)
function openPopupEdit() {
  editFormValidator.clearErrors();
  editFormValidator.activateButton();

  const userInfo = userData.getUserInfo();
  nameInput.value = userInfo.name;
  jobInput.value = userInfo.description;

  editPopupElement.open();
}

//***************************************************************************
// создание класса PopupWithForm (редактирование аватара)
const avatarPopupElement = new PopupWithForm({
  popupSelector: '.popup-avatar',
  handleFormSubmit: (item) => {
    avatarSave.textContent = 'Сохранение...';
    api.editAvatar(item)
      .then((result) => {
        userData.setUserInfo(result);
        avatarSave.textContent = 'Сохранить';
        avatarPopupElement.close();
      })
      .catch(err => console.log(`Error ${err}`));
  },
});

avatarPopupElement.setEventListeners();

//***************************************************************************
// функция открытия popup (редактирование аватара)
function openPopupAvatar() {
  avatarFormValidator.clearErrors();
  avatarFormValidator.inactivateButton();

  avatarPopupElement.open();
}

//***************************************************************************
// создание класса PopupConfirm (подтверждение удаления карточки)
const confirmPopupElement = new PopupConfirm({
  popupSelector: '.popup-confirm',
  handleSubmit: (item) => {
    deleteButton.textContent = 'Удаление...';
    api.deleteCard(item._id)
      .then(() => {
        item._element.remove();
        item._element = null;
        deleteButton.textContent = 'Да';
        confirmPopupElement.close();
      })
      .catch(err => console.log(`Error ${err}`));
  },
});

confirmPopupElement.setEventListeners();

//***************************************************************************
// создание класса Card
function createCard(item, templateId) {
  const card = new Card(
    item,
    templateId,
    currentUser._id,
    () => {
      imgPopup.open(item.name, item.link);
    },
    () => {
      card._id = item._id;
      confirmPopupElement.open(card);
    },
    () => {
      api.addLike(item._id)
        .then((result) => {
          card.updateLikes(result.likes)
        })
        .catch(err => console.log(`Error ${err}`))
    },
    () => {
      api.deleteLike(item._id)
        .then((result) => {
          card.updateLikes(result.likes)
        })
        .catch(err => console.log(`Error ${err}`))
    }
  );
  return card;
}

//***************************************************************************
// функция добавления карточек с сервера
function setupCards(cards) {
  const cardList = new Section({
      data: cards,
      renderer: (item) => {
        if (item.link.slice(0, 6) == 'https:') {
          const card = createCard(item, templateId);
          const cardElement = card.generateCard();
          cardList.addItem(cardElement, true);
        }
      },
    },
    cardListSelector
  );
  cardList.renderItems();
}

//***************************************************************************
// создание класса Section (пользователь)
const addCardsList = new Section({
  data: []
}, cardListSelector);

//***************************************************************************
// создание класса PopupWithForm (добавление карточки)
const addPopupElement = new PopupWithForm({
  popupSelector: '.popup_content_card',
  handleFormSubmit: (item) => {
    addSave.textContent = 'Сохранение...';
    api.addNewCard(item)
      .then((result) => {
        const card = createCard(result, templateId);
        const cardElement = card.generateCard();
        addCardsList.addItem(cardElement, false);
        addSave.textContent = 'Сохранить';
        addPopupElement.close();
      })
      .catch(err => console.log(`Error ${err}`));
  },
});

addPopupElement.setEventListeners();

//***************************************************************************
// функция открытия popup (добавление карточки)
function openPopupAdd() {
  addFormValidator.clearErrors();
  addFormValidator.inactivateButton();

  addPopupElement.open();
}
