const PasswordGenerator = require('./generator');

const generator = new PasswordGenerator();

function generatePassword(masterPassword, service, options) {
    return generator.generatePassword(masterPassword, service, options);
}

function validateStrength(password) {
    return generator.validateStrength(password);
}

module.exports = {
    generatePassword,
    validateStrength,
};