const chalk = require('chalk');
const clipboardy = require('clipboardy');

function displayPassword(password, hidden = true) {
  if (hidden) {
    console.log(chalk.yellow("Password (hidden): ") + "*".repeat(password.length));
  } else {
    console.log(chalk.green("Password: ") + password);
  } 
}

function displayStrength(strength) {
  const levels = ["Very Weak", "Weak", "Medium", "Strong", "Very Strong"];
  console.log(chalk.magenta("Strength:"), levels[strength] || "Unknown");
}

async function copyToClipboard(password) {
  try {
    await clipboardy.write(password);
    console.log(chalk.cyan("Password copied to clipboard!"));
  } catch (error) {
    console.log(chalk.yellow("Could not copy to clipboard. Password displayed above."));
  }
}

module.exports = {
  displayPassword,
  displayStrength,
  copyToClipboard,
};