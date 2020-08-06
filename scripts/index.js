// Объявляем константы:
//***************************************************************************

const main = document.querySelector(".content");
const editButton = main.querySelector(".profile__btn_action_edit");
const addButton = main.querySelector(".profile__btn_action_add");

// массив из popup-элементов
const popups = Array.from(document.querySelectorAll(".popup"));
const editPopup = document.querySelector(".popup_content_profile");
const addPopup = document.querySelector(".popup_content_card");
const imgPopup = document.querySelector(".popup_content_image");

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

// блок в html, куда далее будут вставляться все карточки с местами
const elementsList = document.querySelector(".photo-grid__list");

// шаблон
const elementTemplate = document.querySelector("#card-template").content;

//***************************************************************************

const initialCards = [{
    name: 'Бруклинский мост',
    link: './images/brooklyn_bridge.jpg'
  },
  {
    name: '"Утюг"',
    link: './images/flatiron_building.jpg'
  },
  {
    name: 'Фултон центр',
    link: './images/fulton_center.jpg'
  },
  {
    name: 'Метрополитен',
    link: './images/new-york_metro.jpg'
  },
  {
    name: 'Радио-сити',
    link: './images/radio-city_music-hall.jpg'
  },
  {
    name: 'Даунтаун',
    link: './images/sunset_downtown.jpg'
  }
];

//***************************************************************************

// функция добавления карточки на страницу
function addElement(titleValue, imgValue) {
  const cardElement = elementTemplate.cloneNode(true);

  cardElement.querySelector(".photo-grid__image").src = imgValue;
  cardElement.querySelector(".photo-grid__title").textContent = titleValue;

  cardElement.querySelector(".photo-grid__btn_action_like").addEventListener("click", function (evt) {
    evt.target.classList.toggle("photo-grid__btn_clicked");
  });

  cardElement.querySelector(".photo-grid__btn_action_del").addEventListener("click", function (evt) {
    evt.target.closest(".photo-grid__card").remove();
  });

  cardElement.querySelector(".photo-grid__image").addEventListener("click", openPopupImg);

  return cardElement;
}

// добавление карточек из массива
initialCards.forEach((item) =>
  elementsList.append(addElement(item.name, item.link))
);

// функция открытия popup (редактирование профиля)
function openPopupEdit() {
  const editSaveButton = editFormElement.querySelector('.popup__btn');
  editSaveButton.classList.add('popup__btn_disabled');
  editSaveButton.disabled = true;

  hideInputError(editFormElement, nameInput, validationObject);
  hideInputError(editFormElement, jobInput, validationObject);

  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;

  openPopup(editPopup);
}

// функция открытия popup (добавление карточки)
function openPopupAdd() {
  const addSaveButton = addFormElement.querySelector('.popup__btn');
  addSaveButton.classList.add('popup__btn_disabled');
  addSaveButton.disabled = true;

  hideInputError(addFormElement, titleInput, validationObject);
  hideInputError(addFormElement, linkInput, validationObject);

  titleInput.value = "";
  linkInput.value = "";

  openPopup(addPopup);
}

// функция открытия popup (картинка)
function openPopupImg(img) {
  const element = img.target.closest(".photo-grid__card");

  const cardImg = element.querySelector(".photo-grid__image").src;
  const cardTitle = element.querySelector(".photo-grid__title").textContent;

  imgPopup.querySelector(".popup__image").src = cardImg;
  imgPopup.querySelector(".popup__image-caption").textContent = cardTitle;

  openPopup(imgPopup);
}

// функция открытия popup (все popup-элементы)
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', keyHandler);
}

// функция закрытия popup (все popup-элементы)
function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener('keydown', keyHandler);
}

// функция отправки формы профиля
function formSubmitHandler(evt) {
  evt.preventDefault();

  const popupOpened = document.querySelector('.popup_opened');

  const name = nameInput.value;
  const job = jobInput.value;

  profileName.textContent = name;
  profileJob.textContent = job;

  closePopup(popupOpened);
}

// функция отправки формы добавления карточки
function addFormSubmitHandler(evt) {
  evt.preventDefault();

  const popupOpened = document.querySelector('.popup_opened');

  const title = titleInput.value;
  const link = linkInput.value;

  elementsList.prepend(addElement(title, link));

  closePopup(popupOpened);
}

// функция для закрытия popup помощью 'escape'
function keyHandler(evt) {
  const popupOpened = document.querySelector('.popup_opened');
  if (evt.key === "Escape") {
    closePopup(popupOpened);
  }
}

editButton.addEventListener("click", openPopupEdit);
addButton.addEventListener("click", openPopupAdd);

closeButtons.forEach((item) => item.addEventListener("click", () => closePopup(item.closest('.popup'))));

// закрытие popup кликом мышки за пределами контейнера
popups.forEach((item) => item.addEventListener("click", (evt) => {
  if (evt.target.classList.contains('popup')) {
    closePopup(item);
  }
}));

// Прикрепление обработчика к форме:
editFormElement.addEventListener("submit", formSubmitHandler);
addFormElement.addEventListener("submit", addFormSubmitHandler);

//***************************************************************************
