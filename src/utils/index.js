export const getRandomInt = (min, max) => {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min)) + min //The maximum is exclusive and the minimum is inclusive
}

export const generatePassword = () => {
  const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
  const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numberChars = "0123456789";
  const specialChars = "!@#$%^&*()_+-=";
  const allowedChars = lowercaseChars + uppercaseChars + numberChars + specialChars;

  let password = "";

  password += getRandomChar(lowercaseChars);

  password += getRandomChar(uppercaseChars);

  password += getRandomChar(numberChars);

  password += getRandomChar(specialChars);

  for (let i = password.length; i < 16; i++) {
    password += getRandomChar(allowedChars);
  }

  password = shuffleString(password);

  return password;
}

function getRandomChar(characters) {
  return characters.charAt(Math.floor(Math.random() * characters.length));
}

function shuffleString(string) {
  for (let i = string.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [string[i], string[j]] = [string[j], string[i]];
  }
  return string;
}

