const ids = {
  classScreen: 'classScreen',
  nameScreen: 'nameScreen',
  confirmScreen: 'confirmScreen'
}
const classes = {
  1: {
    name: 'Knight',
    card: 'knightCard',
    imgSrc: '../assets/classes/knight.gif'
  },
  2: {
    name: 'Ranger',
    card: 'rangerCard',
    imgSrc: '../assets/classes/ranger.gif'
  },
  3: {
    name: 'Wizard',
    card: 'wizardCard',
    imgSrc: '../assets/classes/wizard.gif'
  },
}

const selectedClass = ' selected'
const classCardClass = 'classCard';
const buttonClass = 'button';
const activeButtonClass = ' activeButton';

const classScreen = document.getElementById(ids.classScreen)
const nameScreen = document.getElementById(ids.nameScreen)
const confirmScreen = document.getElementById(ids.confirmScreen)
const character = {
  name: '',
  classId: 0,
  hp: 10,
  lvl: 1,
  inventory: {
    weapons: []
  }
}

function showNameScreen() {
  classScreen.style.display = 'none';
  nameScreen.style.display = 'flex';
  const nameButton = document.getElementById('nameButton');
  const nameInput = document.querySelector('.nameInput');
  nameInput.addEventListener('change', (event) => {
    if (event.target.value) {
      nameButton.disabled = false;
      nameButton.className += activeButtonClass;
    } else {
      nameButton.disabled = true;
      nameButton.className += buttonClass;
    }
    const inputValue = event.target.value;
    const characterName = (inputValue?.charAt(0)?.toUpperCase() + inputValue?.slice(1))?.trim();
    character.name = characterName;
  })
}

function unselectCards() {
  const allCards = document.querySelectorAll('.' + classCardClass);
  allCards.forEach((card) => card.className = classCardClass)
}

function selectCard(card, cardId) {
  const classButton = document.getElementById('classButton');
  const selectedCard = document.getElementById(card.id);
  const cardClass = selectedCard.className;
  if (cardClass.match(selectedClass)) {
    selectedCard.className = classCardClass;
    character.classId = 0;
    classButton.disabled = true;
    classButton.className = buttonClass;
  } else {
    unselectCards();
    selectedCard.className += selectedClass;
    character.classId = cardId;
    classButton.disabled = false;
    classButton.className += activeButtonClass;
  }
}

function showConfirmScreen() {
  if (character.name) {
    nameScreen.style.display = 'none';
    confirmScreen.style.display = 'flex';
    const buttonsContainer = document.querySelector('.buttonsContainer');
    const characterCard = createCharacterCard();
    confirmScreen.insertBefore(characterCard, buttonsContainer)
  }
}

function confirmCharacter() {
  localStorage.setItem('character', JSON.stringify(character));
  window.location.href = '../menu/index.html';
}

function cancelConfirm() {
  character.classId = 0;
  confirmScreen.style.display = 'none';
  classScreen.style.display = 'flex';
  unselectCards();
  const characterCard = document.getElementById('characterCard');
  characterCard.remove();
}

function createCharacterCard() {
  const cardDiv = document.createElement('div');
  cardDiv.className = classCardClass + selectedClass;
  cardDiv.id = 'characterCard';

  const cardName = document.createElement('span');
  cardName.innerHTML = character.name;

  const cardImg = document.createElement('img');
  cardImg.src = classes[character.classId].imgSrc;
  cardImg.alt = classes[character.classId].name;

  const cardTitle = document.createElement('span');
  cardTitle.innerHTML = classes[character.classId].name;

  cardDiv.appendChild(cardName);
  cardDiv.appendChild(cardImg);
  cardDiv.appendChild(cardTitle);

  return cardDiv;
}

function setCharacterCreation() {
  const cardDiv = document.createElement('div');
  cardDiv.className = classCardClass;
  cardDiv.id = classes[3].card;

  const cardImg = document.createElement('img');
  cardImg.src = classes[3].imgSrc;
  cardImg.alt = classes[3].name;

  const cardTitle = document.createElement('span');
  cardTitle.innerHTML = classes[3].name;

  const classesContainer = document.querySelector('.classesContainer');
  cardDiv.appendChild(cardImg);
  cardDiv.appendChild(cardTitle);
  classesContainer.appendChild(cardDiv);

  const cards = document.querySelectorAll('.' + classCardClass);
  cards.forEach((card, index) => {
    card.setAttribute('onclick', `selectCard(this, ${index + 1})`)
  });
}

setCharacterCreation();
