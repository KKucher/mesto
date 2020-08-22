// Объявляем импорты:
//***************************************************************************

import {
  Card
} from './Card.js';

import {
  FormValidator
} from './FormValidator.js';

import {
  openPopup,
  closePopup
} from './utils.js';

import {
  initialCards,
  validationObject,
  templateId
} from './constants.js';

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

// массив из кнопок закрытия для всех popup-элементов
const closeButtons = popups.map((item) =>
  item.querySelector(".popup__btn_action_close")
);
// форма редактирования профиля из всего массива popup
const editFormElement = popups.find((item) =>
  item.querySelector(".popup-edit__form")
);
// форма добавления карточки из всего массива popup
const addFormElement = popups.find((item) =>
  item.querySelector(".popup-add__form")
);

// все input из форм
const nameInput = editFormElement.querySelector(".popup__input_type_name");
const jobInput = editFormElement.querySelector(".popup__input_type_info");
const titleInput = addFormElement.querySelector(".popup__input_type_title");
const linkInput = addFormElement.querySelector(".popup__input_type_link");

const profileName = main.querySelector(".profile__name");
const profileJob = main.querySelector(".profile__work");

// блок в html, куда далее будут вставляться карточки
const elementsList = document.querySelector(".photo-grid__list");

// валидация редактирования профиля
const editForm = editPopup.querySelector('.popup-edit__form')
const editFormValidator = new FormValidator(validationObject, editForm);
editFormValidator.enableValidation();

// валидация добавления карточки
const addForm = addPopup.querySelector('.popup-add__form')
const addFormValidator = new FormValidator(validationObject, addForm);
addFormValidator.enableValidation();

//***************************************************************************

// добавление карточек из массива
initialCards.forEach((item) => {
  elementsList.append(createCard(item));
});

// функция открытия popup (редактирование профиля)
function openPopupEdit() {
  const editSaveButton = editFormElement.querySelector(submitButtonSelector);
  editSaveButton.classList.remove(inactiveButtonClass);
  editSaveButton.disabled = false;

  editFormValidator.clearErrors();

  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;

  openPopup(editPopup);
}

// функция открытия popup (добавление карточки)
function openPopupAdd() {
  const addSaveButton = addFormElement.querySelector(submitButtonSelector);
  addSaveButton.classList.remove(inactiveButtonClass);
  addSaveButton.disabled = false;

  addFormValidator.clearErrors();

  // titleInput.value = "";
  // linkInput.value = "";
  newCardForm.reset();

  openPopup(addPopup);
}

// функция отправки формы профиля
function editFormSubmitHandler(evt) {
  evt.preventDefault();

  const name = nameInput.value;
  const job = jobInput.value;

  profileName.textContent = name;
  profileJob.textContent = job;

  closePopup(editPopup);
}

// функция добавления карточки в DOM
function addCardToDOM(card) {
  elementsList.prepend(card);
}

function createCard(data) {
  const card = new Card(data, templateId);
  const cardElement = card.generateCard();
  return cardElement;
}

// функция отправки формы добавления карточки
function addCardFormSubmitHandler(evt) {
  evt.preventDefault();
  const data = {
    name: titleInput.value,
    link: linkInput.value,
  };

  addCardToDOM(createCard(data));

  closePopup(addPopup);
}

//***************************************************************************

editButton.addEventListener("click", openPopupEdit);
addButton.addEventListener("click", openPopupAdd);
closeButtons.forEach((item) => item.addEventListener("click", () => closePopup(item.closest('.popup'))));

// закрытие popup кликом мышки за пределами контейнера
popups.forEach((item) => item.addEventListener("click", (evt) => {
  if (evt.target.classList.contains('popup')) {
    closePopup(item);
  }
}));

// Прикрепление обработчика к форме
//***************************************************************************

editFormElement.addEventListener('submit', editFormSubmitHandler);
addFormElement.addEventListener('submit', addCardFormSubmitHandler);

//***************************************************************************
