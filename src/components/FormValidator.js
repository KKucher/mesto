export class FormValidator {
  constructor(data, validatingForm) {
    this._formSelector = data.formSelector;
    this._inputSelector = data.inputSelector;
    this._submitButtonSelector = data.submitButtonSelector;
    this._inactiveButtonClass = data.inactiveButtonClass;
    this._inputErrorClass = data.inputErrorClass;
    this._errorClass = data.errorClass;

    this._validatingForm = validatingForm;
  }

  enableValidation() {
    this._setEventListeners();
    this._validatingForm.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
  }

  _setEventListeners() {
    const inputList = Array.from(this._validatingForm.querySelectorAll(this._inputSelector));
    const buttonElement = this._validatingForm.querySelector(this._submitButtonSelector);

    this._toggleButtonState(inputList, buttonElement);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(this._validatingForm, inputElement);
        this._toggleButtonState(inputList, buttonElement);
      });
    });
  }

  _toggleButtonState(inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(this._inactiveButtonClass);
      buttonElement.disabled = true;
    } else {
      buttonElement.classList.remove(this._inactiveButtonClass);
      buttonElement.disabled = false;
    }
  }

  _hasInvalidInput(inputList) {
    return inputList.some((inputElements) => {
      return !inputElements.validity.valid;
    })
  }

  _checkInputValidity(validatingForm, inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(validatingForm, inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(validatingForm, inputElement);
    }
  }

  _hideInputError(validatingForm, inputElement) {
    const errorElement = validatingForm.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  }

  _showInputError(validatingForm, inputElement, errorMessage) {
    const errorElement = validatingForm.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  }

  clearErrors() {
    const inputList = Array.from(this._validatingForm.querySelectorAll(this._inputSelector));

    inputList.forEach((inputElement) => {
      if (inputElement.classList.contains(this._inputErrorClass)) {
        this._hideInputError(this._validatingForm, inputElement);
      }
    });
  };

}
