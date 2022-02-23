const ids = {
  classScreen: 'classScreen',
  nameScreen: 'nameScreen',
}
const classes = {
  kinght: 1,
  ranger: 2,
  wizard: 3,
}

const classScreen = document.getElementById(ids.classScreen)
const nameScreen = document.getElementById(ids.nameScreen)
const character = {
  name: '',
  classId: 0,
  hp: 10,
  lvl: 1
}

function showNameScreen() {
  classScreen.style.display = 'none';
  nameScreen.style.display = 'flex';
  const nameInput = document.querySelector('.nameInput');

  nameInput.addEventListener('change', (event) => {
    character.name = event.target.value;
    console.log('character', character);
  });
}

function selectCard(card) {
  const character2 = JSON.parse(localStorage.getItem('character'));

  const selectedString = ' selected'
  const classCardString = 'classCard';
  const selectedCard = document.getElementById(card.id);
  const cardClass = selectedCard.className;
  if (cardClass.match(selectedString)) {
    selectedCard.className = classCardString;
  } else {
    const allCards = Array.from(document.getElementsByClassName(classCardString));
    allCards.forEach((card) => card.className = classCardString)
    selectedCard += selectedString;
  }
}

function startGame() {
  const cards = document.querySelectorAll('.classCard');
  cards.forEach(card => {
    card.setAttribute('onclick', `selectCard(${card.id})`)
  });
  localStorage.setItem('character', JSON.stringify(character));

  const cardDiv = document.createElement('div');
  cardDiv.className = 'classCard';
  cardDiv.id = 'wizardCard';

  const cardImg = document.createElement('img');
  cardImg.src = './assets/classes/wizard.gif';
  cardImg.alt = 'wizard';

  const cardTitle = document.createElement('span');
  cardTitle.innerHTML = 'Wizard';

  const classesContainer = document.querySelector('.classesContainer');
  cardDiv.appendChild(cardImg);
  cardDiv.appendChild(cardTitle);
  classesContainer.appendChild(cardDiv);
}

startGame();
