const result = document.querySelector(".result");
const btnGeneratePsw = document.querySelector(".generate__btn");

const length = document.getElementById("length");
const checkboxUpperCase = document.querySelector(".checkbox__uppercase");
const checkboxLowerCase = document.querySelector(".checkbox__lowercase");
const checkboxNumber = document.querySelector(".checkbox__number");
const checkboxPunctuation = document.querySelector(".checkbox__punctuation");
const strengthBar = document.querySelector(".strength-bar");
const historyList = document.querySelector(".histroy__list");

const registerModal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCancel = document.querySelector(".btn__cancel");
//App Function
let historyPassword = [];
const passwordGen = function () {
  const data = {
    specials: "!@#$%^&*()_+{}:<>?|[];',./`~",
    lowercase: "abcdefghijklmnopqrstuvwxyz",
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    numbers: "0123456789",
  };

  //Free password condition
  if (historyPassword.length > 4) {
    console.log(historyPassword.length);
    result.textContent = "************";
    registerModal.classList.remove("modal__hidden");
    overlay.classList.remove("overlay__hidden");
    return;
  }

  btnCancel.addEventListener("click", function () {
    registerModal.classList.add("modal__hidden");
    overlay.classList.add("overlay__hidden");
  });

  //Select ramdom character from a string
  function randomChar(str) {
    return str[Math.floor(Math.random() * str.length)];
  }

  let password = "";
  let pswCharacter = [];
  let allowedChars = "";

  if (checkboxPunctuation.checked) allowedChars += data.specials;
  if (checkboxLowerCase.checked) allowedChars += data.lowercase;
  if (checkboxUpperCase.checked) allowedChars += data.uppercase;
  if (checkboxNumber.checked) allowedChars += data.numbers;

  if (allowedChars.length === 0) {
    result.textContent = "Please select at least one character type!";
    result.classList.add("result__error");
    return;
  }

  result.classList.remove("result__error");

  result.textContent = "";

  for (let i = 0; i < parseInt(length.value); i++) {
    pswCharacter.push(randomChar(allowedChars));
  }

  password = pswCharacter.sort(() => Math.random() - 0.5).join("");
  result.textContent = String(password);

  // console.log(password);
  // console.log(password.length);
  //Check strength
  const strengthTester = function () {
    let width = 0;
    if (password.length <= 10) {
      width = 30;

      strengthBar.style.backgroundColor = "red";
    }
    if (password.length > 10 && password.length <= 14) {
      width = 60;

      strengthBar.style.backgroundColor = "orange";
    }
    if (password.length >= 15) {
      width = 100;

      strengthBar.style.backgroundColor = "var(--green)";
    }
    strengthBar.style.width = width + "%";
  };
  strengthTester();

  //display history password

  historyPassword.push(password);

  const displayHistory = function () {
    historyList.innerHTML = "";

    let html = historyPassword
      .map((psw) => `<li>${psw}</li>`)
      .reverse()
      .join("");

    historyList.insertAdjacentHTML("beforeend", html);
  };
  displayHistory();
};

btnGeneratePsw.addEventListener("click", passwordGen);

//effect
const btnShowHistory = document.querySelector(".collapsible");
btnShowHistory.addEventListener("click", function () {
  historyList.classList.toggle("histroy__active");
});
