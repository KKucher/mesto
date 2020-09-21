export class FormValidator {
  constructor(data, validatingForm) {
    this._formSelector = data.formSelector;
    this._inputSelector = data.inputSelector;
    this._submitButtonSelector = data.submitButtonSelector;
    this._inactiveButtonClass = data.inactiveButtonClass;
    this._inputErrorClass = data.inputErrorClass;
    this._errorClass = data.errorClass;

    this._validatingForm = validatingForm;

    this._inputList = Array.from(this._validatingForm.querySelectorAll(this._inputSelector));
    this._buttonElement = validatingForm.querySelector(this._submitButtonSelector);
  }

  enableValidation() {
    this._setEventListeners();
    this._validatingForm.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
  }

  _setEventListeners() {
    this._toggleButtonState(this._inputList, this._buttonElement);
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(this._validatingForm, inputElement);
        this._toggleButtonState(this._inputList, this._buttonElement);
      });
    });
  }

  _toggleButtonState() {
    if (this._hasInvalidInput(this._inputList)) {
      this.inactivateButton(this._buttonElement);
    }
    else {
      this.activateButton(this._buttonElement);
    }
  }

  inactivateButton() {
    this._buttonElement.classList.add(this._inactiveButtonClass);
    this._buttonElement.disabled = true;
  }

  activateButton() {
    this._buttonElement.classList.remove(this._inactiveButtonClass);
      this._buttonElement.disabled = false;
  }

  _hasInvalidInput(inputList) {
    return inputList.some((inputElements) => {
      return !inputElements.validity.valid;
    })
  }

  _checkInputValidity(formElement, inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(formElement, inputElement);
    }
  }

  _hideInputError(formElement, inputElement) {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  }

  _showInputError(formElement, inputElement, errorMessage) {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  }

  clearErrors() {
    this._inputList.forEach((inputElement) => {
      if (inputElement.classList.contains(this._inputErrorClass)) {
        this._hideInputError(this._validatingForm, inputElement);
      }
    });
  };

}
