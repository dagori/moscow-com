const openButton = document.querySelector('.registration-button');
const popup = document.querySelector('.reg-popup');
const closeButton = document.querySelector('.reg-popup__close');
const overlay = document.querySelector('.overlay');
const form = document.querySelector('.reg-form');
const requiredForm = document.querySelector('.reg-form__required');
const optionalForm = document.querySelector('.reg-form__optional');
const fields = form.getElementsByTagName('input');
const nextButton = form.querySelector('.reg-form__next');
const ENTER = 13;

nextButton.addEventListener('click', (e) => {
  e.preventDefault();
  requiredForm.style.display = 'none';
  optionalForm.style.display = 'flex';
});

function changeButtonAccess() {
  var status = Array.from(fields).every(item => item.validity.valid);
  if(status) {
    nextButton.disabled = false;
  } else {
    nextButton.disabled = true;
  }
}

openButton.addEventListener('click', () => {
  overlay.style.display = 'block';
  popup.style.display = 'flex';
});

closeButton.addEventListener('click', () => {
  requiredForm.style.display = 'block';
  optionalForm.style.display = 'none';
  overlay.style.display = 'none';
  popup.style.display = 'none';
});

/*Validation*/
const post = document.getElementById('email');
const nickName = document.getElementById('nick-name');
const agreement = document.getElementById('agreement');
const password_1 = document.getElementById('password-1');
const password_2 = document.getElementById('password-2');
const rulesBlock = document.querySelectorAll('.form-requirement__rule-block');

function ruleValid(block, rule) {
  rulesBlock[block].children[rule].classList.add('ok');
  rulesBlock[block].children[rule].classList.remove('error');
}

function ruleInvalid(block, rule) {
  rulesBlock[block].children[rule].classList.remove('ok');
  rulesBlock[block].children[rule].classList.add('error');
}

agreement.addEventListener('change', () => {
  changeButtonAccess();
});

document.addEventListener('keydown', (e) => {
  if(agreement.nextElementSibling === document.activeElement && e.keyCode === ENTER) {
    agreement.checked = !agreement.checked;
    changeButtonAccess();
  }
});

// Валидация почты
post.addEventListener('change', () => {
  !post.checkValidity() ? rulesBlock[0].nextElementSibling.style.display = 'block' : rulesBlock[0].nextElementSibling.style.display = 'none';
  changeButtonAccess();
});

const firstStep = {
  name: false,
  password: false
}
// Валидация никнейма
nickName.addEventListener('input', () => {
  var regFirstSymbol = /[a-z]/i;
  var regString = /^[a-z_;0-9]*$/i;
  if(nickName.value.length >= 2)  {
    firstStep.name = true;
  }
  if(firstStep.name) {
    nickName.value.length >= 3 ? ruleValid(1, 0) : ruleInvalid(1, 0);
    regString.test(nickName.value) && nickName.value.length ? ruleValid(1, 1) : ruleInvalid(1, 1);
    regFirstSymbol.test(nickName.value[0]) && nickName.value.length ? ruleValid(1, 2) : ruleInvalid(1, 2);
  }
  changeButtonAccess();
});

// Валидация пароля 1
password_1.addEventListener('input', () => {
  var regNumber = /[0-9]+/;
  var regLetter = /(?=.*[a-z|а-я])(?=.*[A-Z|А-Я]).*$/;
  if(password_1.value.length >= 2) {
    firstStep.password = true;
  }
  if(firstStep.password) {
    password_1.value.length >= 6 ? ruleValid(2, 0) : ruleInvalid(2, 0);
    regNumber.test(password_1.value) ? ruleValid(2, 1) : ruleInvalid(2, 1);
    regLetter.test(password_1.value) ? ruleValid(2, 2) : ruleInvalid(2, 2);
    password_1.value === nickName.value || password_1.value === post.value ? rulesBlock[2].nextElementSibling.style.display = 'block' : rulesBlock[2].nextElementSibling.style.display = 'none';
  }
  changeButtonAccess();
});

// Подтверждение пароля
password_2.addEventListener('input', () => {
  password_2.value != password_1.value ? rulesBlock[3].nextElementSibling.style.display = 'block' : rulesBlock[3].nextElementSibling.style.display = 'none';
  changeButtonAccess();
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  var result = {};
  var arr = [];
  var data = new FormData(form);
  for(let [key, value] of data.entries()) {
    if(key === 'subscription' && result[key]) {
      result[key] = (result[key] + ', ' + value).split(',');
    } else {
      result[key] = value;
    }
  }
  console.log(JSON.stringify(result));
  popup.style.display = 'none';
  overlay.style.display = 'none';
  openButton.disabled = true;
});
