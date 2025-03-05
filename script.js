const data = {
  specials: "!@#$%^&*()_+{}:\"<>?|[];',./`~",
  lowercase: "abcdefghijklmnopqrstuvwxyz",
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  numbers: "0123456789",
};

function randomChar(str) {
  return str[Math.floor(Math.random() * str.length)];
}

function passwordGen(
  length,
  minSpecials,
  minLowercase,
  minUppercase,
  minNumbers
) {
  const requiredLength = minSpecials + minLowercase + minUppercase + minNumbers;
  let password = "";
  let requiredChars = [];

  if (length >= requiredLength) {
    for (let i = 0; i < minSpecials; i++)
      requiredChars.push(randomChar(data.specials));
    for (let i = 0; i < minLowercase; i++)
      requiredChars.push(randomChar(data.lowercase));
    for (let i = 0; i < minUppercase; i++)
      requiredChars.push(randomChar(data.uppercase));
    for (let i = 0; i < minNumbers; i++)
      requiredChars.push(randomChar(data.numbers));

    for (let i = 0; i < length - requiredLength; i++) {
      requiredChars.push(randomChar(Object.values(data).join("")));
    }
    password = requiredChars.sort(() => Math.random() - 0.5).join("");
    return password;
  } else {
    return "Your length is invalid";
  }
}

console.log(passwordGen(16, 2, 5, 1, 1));
