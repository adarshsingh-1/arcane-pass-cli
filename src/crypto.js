const crypto = require('crypto');

function generatePassword(site, username, masterPassword, length = 16) {
    const input = `${masterPassword}:${username}@${site}`;
    const hash = crypto.createHash('sha256').update(input).digest('hex');

    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let password = '';
    for (let i = 0; i < length; i++) {
        const chunk = hash.substr(i * 4, 4);
        const num = parseInt(chunk, 16);
        password += chars[num % chars.length];
    }

    // Insert two special characters for complexity
    const specials = '!@#$%^&*';
    const specialIndex1 = parseInt(hash.substr(0, 8), 16) % specials.length;
    const specialIndex2 = parseInt(hash.substr(8, 8), 16) % specials.length;
    const insertPos1 = parseInt(hash.substr(16, 8), 16) % password.length;
    const insertPos2 = parseInt(hash.substr(24, 8), 16) % (password.length + 1);

    let result = password.slice(0, insertPos1) + specials[specialIndex1] + password.slice(insertPos1);

    const adjustedPos2 = insertPos2 <= insertPos1 ? insertPos2 : insertPos2 + 1;
    result = result.slice(0, adjustedPos2) + specials[specialIndex2] + result.slice(adjustedPos2);

    return result;
}

module.exports = { generatePassword };