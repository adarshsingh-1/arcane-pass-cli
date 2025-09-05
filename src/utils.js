const { execSync } = require('child_process');
const chalk = require('chalk');

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
    if (process.platform === 'darwin') {
      execSync(`echo "${password}" | pbcopy`);
    } else if (process.platform === 'linux') {
      execSync(`echo "${password}" | xclip -selection clipboard`);
    } else if (process.platform === 'win32') {
      execSync(`echo "${password}" | clip`);
    }
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