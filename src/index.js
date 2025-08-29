const { isValidLength, promptHidden, copyToClipboard } = require("./util");
const { generatePassword } = require("./crypto");

async function main() {
  const site = process.argv[2];
  const length = parseInt(process.argv[3], 10) || 16;

  if (!site) {
    console.error("Usage: node src/index.js <site> [length]");
    process.exit(1);
  }

  if (!isValidLength(length)) {
    console.error("Password length must be between 8 and 64.");
    process.exit(1);
  }

  const masterPassword = await promptHidden("Enter master password: ");

  const password = generatePassword(masterPassword, site, length);

  console.log(`Generated password for "${site}":\n${password}`);

  copyToClipboard(password);
  console.log("(Password copied to clipboard)");
}

main().catch((err) => {
    console.error("Error:", err);
    process.exit(1);
});