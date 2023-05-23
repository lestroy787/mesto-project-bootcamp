const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

let profileName = document.querySelector('.profile__name');
let profileAbout = document.querySelector('.profile__about');
let popupEdit = document.querySelector('.popup_edit');
let formRedaction = popupEdit.querySelector('.form__redaction');
let formRedactionName = popupEdit.querySelector('.form__redaction_name');
let formRedactionAbout = popupEdit.querySelector('.form__redaction_about');
let popupAdd = document.querySelector('.popup_add');
let formNew = popupAdd.querySelector('.form__new');
let listElements = document.querySelector('.elements');
let popupPhoto = document.querySelector('.popup_photos');

function createNewCard(name, link) {
  let cardTemplate = document.getElementById('card-template').content;
  let cardElement = cardTemplate.querySelector('.element').cloneNode(true);
  let cardsElementImage = cardElement.querySelector('.element__image');
  cardsElementImage.src = link;
  cardsElementImage.alt = name;
  cardElement.querySelector('.element__title').textContent = name;
  cardsElementImage.addEventListener('click', function(event) {
    let Image = document.querySelector('.popup__image');
    Image.src = event.target.src;
    Image.alt = event.target.alt;
    let description = popupPhoto.querySelector('.popup__description');
    description.textContent = Image.alt;
    popupPhoto.classList.add('popup_open');
  });
  let chosenLike = cardElement.querySelector('.element__button-like');
  chosenLike.addEventListener('click', function(event) {
    event.target.classList.toggle('element__button-like_active');
  });
  let chosenTrash = cardElement.querySelector('.element__button-trash');
  chosenTrash.addEventListener('click', function(event) {
    let res = event.target.closest('.element');
    res.remove();
  });
  return cardElement;
}

let profileButtonEdit = document.querySelector('.profile__button-edit');
profileButtonEdit.addEventListener('click', function() {
  formRedactionName.value = profileName.textContent;
  formRedactionAbout.value = profileAbout.textContent;
  popupEdit.classList.add('popup_open');
});


let popupButtonClose = popupEdit.querySelector('.form__button-save');
popupButtonClose.addEventListener('click', function(){
  popupEdit.classList.remove('popup_open');
});

formRedaction.addEventListener('submit', function() {
  evt.preventDefault();
  profileName.textContent = formRedactionName.value;
  profileAbout.textContent = formRedactionAbout.value;
  popupEdit.classList.remove('popup_open');
});


let profileButtonAdd = document.querySelector('.profile__button-add');
profileButtonAdd.addEventListener('click', function(){
  popupAdd.classList.add('popup_open');
});

let getClosedPopupRedaction = popupAdd.querySelector('.popup__button-close');
getClosedPopupRedaction.addEventListener('click', function(){
  popupAdd.classList.remove('popup_open');
});

formNew.addEventListener('submit', function() {
  evt.preventDefault();
  let formNewName = popupAdd.querySelector('.form__new_name');
  let formNewLink = popupAdd.querySelector('.form__new_link');
  let cardElement = createNewCard(formNewName.value, formNewLink.value);
  listElements.append(cardElement);
  popupAdd.classList.remove('popup_open');
});


const popupPhotoButtonClose = popupPhoto.querySelector('.popup__button-close');
popupPhotoButtonClose.addEventListener('click', function(){
  popupPhoto.classList.remove('popup_open');
});

for (let card = initialCards.length - 1; card >= 0; --card) {
  listElements.append(createNewCard(initialCards[card].name, initialCards[card].link));
}