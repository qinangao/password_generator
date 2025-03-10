const result = document.querySelector(".result");
const btnGeneratePsw = document.querySelector(".generate__btn");

const length = document.getElementById("length");
const checkboxUpperCase = document.querySelector(".checkbox__uppercase");
const checkboxLowerCase = document.querySelector(".checkbox__lowercase");
const checkboxNumber = document.querySelector(".checkbox__number");
const checkboxPunctuation = document.querySelector(".checkbox__punctuation");
const strengthBar = document.querySelector(".strength-bar");

//Function

const passwordGen = function () {
  const data = {
    specials: "!@#$%^&*()_+{}:\"<>?|[];',./`~",
    lowercase: "abcdefghijklmnopqrstuvwxyz",
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    numbers: "0123456789",
  };
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
  result.innerHTML = password;

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
};

btnGeneratePsw.addEventListener("click", passwordGen);

//Check if a password is strong
//length:8-10 waek
//length: 11-13 good
//length:>14 strong

//Theory function
// function passwordGen(
//   length,
//   minSpecials,
//   minLowercase,
//   minUppercase,
//   minNumbers
// ) {
//   const requiredLength = minSpecials + minLowercase + minUppercase + minNumbers;
//   let password = "";
//   let requiredChars = [];

//   if (length >= requiredLength) {
//     for (let i = 0; i < minSpecials; i++)
//       requiredChars.push(randomChar(data.specials));
//     for (let i = 0; i < minLowercase; i++)
//       requiredChars.push(randomChar(data.lowercase));
//     for (let i = 0; i < minUppercase; i++)
//       requiredChars.push(randomChar(data.uppercase));
//     for (let i = 0; i < minNumbers; i++)
//       requiredChars.push(randomChar(data.numbers));

//     let allowedChars = "";
//     if (minSpecials > 0) allowedChars += data.specials;
//     if (minLowercase > 0) allowedChars += data.lowercase;
//     if (minUppercase > 0) allowedChars += data.uppercase;
//     if (minNumbers > 0) allowedChars += data.numbers;

//     for (let i = 0; i < length - requiredLength; i++) {
//       requiredChars.push(randomChar(allowedChars));
//     }

//     password = requiredChars.sort(() => Math.random() - 0.5).join("");
//     return password;
//   } else {
//     return "Your length is invalid";
//   }
// }

// console.log(passwordGen(8, 1, 0, 1, 1));
