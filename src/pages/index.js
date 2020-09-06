// Объявляем импорты:
//***************************************************************************
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
  UserInfo
} from '../components/UserInfo.js';

import {
  initialCards,
  validationObject,
  templateId,
  cardListSelector
} from '../utils/constants.js';

// Объявляем константы:
//***************************************************************************

const {
  formSelector,
  inputSelector,
  submitButtonSelector,
  inactiveButtonClass,
  inputErrorClass,
  errorClass
} = validationObject;

const main = document.querySelector(".content");
const editButton = main.querySelector(".profile__btn_action_edit");
const addButton = main.querySelector(".profile__btn_action_add");

// массив из popup-элементов
const popups = Array.from(document.querySelectorAll(".popup"));
const editPopup = document.querySelector(".popup_content_profile");
const addPopup = document.querySelector(".popup_content_card");

// форма редактирования профиля (global)
const editFormElement = popups.find((item) =>
  item.querySelector(".popup-edit__form")
);
// форма добавления карточки (global)
const addFormElement = popups.find((item) =>
  item.querySelector(".popup-add__form")
);

// все input из форм
const nameInput = editFormElement.querySelector(".popup__input_type_name");
const jobInput = editFormElement.querySelector(".popup__input_type_info");

// кнопки сохранить (редактирование провиля и добавление карточки)
const addSaveButton = addFormElement.querySelector(submitButtonSelector);
const editSaveButton = editFormElement.querySelector(submitButtonSelector);

// валидация редактирования профиля
const editForm = editPopup.querySelector('.popup-edit__form')
const editFormValidator = new FormValidator(validationObject, editForm);
editFormValidator.enableValidation();

// валидация добавления карточки
const addForm = addPopup.querySelector('.popup-add__form')
const addFormValidator = new FormValidator(validationObject, addForm);
addFormValidator.enableValidation();

const imgPopup = new PopupWithImage('.popup_content_image');
imgPopup.setEventListeners();

//***************************************************************************

// создание класса Card
function createCard(item, templateId) {
  const card = new Card(item, templateId, () => {
    imgPopup.open(item.name, item.link);
  });
  return card;
}

// создание класса Section
const cardList = new Section({
  data: initialCards,
  renderer: (item) => {
    const card = createCard(item, templateId);
    const cardElement = card.generateCard();
    cardList.addItem(cardElement, true);
  }
}, cardListSelector);

cardList.renderItems();

// создание класса Section (пользователь)
const addCardsList = new Section({
  data: []
}, cardListSelector);

// создание класса PopupWithForm
const addPopupElement = new PopupWithForm({
  popupSelector: '.popup_content_card',
  handleFormSubmit: (item) => {
    const card = createCard(item, templateId);
    const cardElement = card.generateCard();
    addCardsList.addItem(cardElement, false);
  }
});

addPopupElement.setEventListeners();

// функция открытия popup (добавление карточки)
function openPopupAdd() {
  addFormValidator.clearErrors();

  addSaveButton.classList.add(inactiveButtonClass);
  addSaveButton.disabled = true;

  addPopupElement.open();
}

// создание класса UserInfo (инф-я пользователя при смене данных)
const userData = new UserInfo({
  nameSelector: '.profile__name',
  descriptionSelector: '.profile__work'
});

// создание класса PopupWithForm (редактирование профиля)
const editPopupElement = new PopupWithForm({
  popupSelector: '.popup_content_profile',
  handleFormSubmit: (item) => {
    userData.setUserInfo(item.name, item.description);

    editPopupElement.close();
  }
});

editPopupElement.setEventListeners();

// функция открытия popup (редактирование профиля)
function openPopupEdit() {
  editFormValidator.clearErrors();

  const userInfo = userData.getUserInfo();
  nameInput.value = userInfo.name;
  jobInput.value = userInfo.description;

  editSaveButton.classList.remove(inactiveButtonClass);
  editSaveButton.disabled = false;

  editPopupElement.open();
}

//***************************************************************************

editButton.addEventListener("click", openPopupEdit);
addButton.addEventListener("click", openPopupAdd);

//***************************************************************************
