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
const user = {
  name: '',
  classId: 0,
  hp: 10,
  lvl: 1
}

function setUserName(event) {
  user.name += event.target.value;
  console.log('user', user);
}

function showNameScreen() {
  classScreen.style.display = 'none';
  nameScreen.style.display = 'flex';
  const nameButton = document.querySelector('.nameButton');
  nameButton.addEventListener('change', setUserName)
}
