const crypto = require('crypto');

class PasswordGenerator {
    generatePassword(masterPassword, service, options = {}) {
        const input = `${masterPassword}:${service}`;
        const hash = crypto.createHash('sha256').update(input, 'utf8').digest('hex');
        
        let chars = '';
        if (options.includeUppercase !== false) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        if (options.includeLowercase !== false) chars += 'abcdefghijklmnopqrstuvwxyz';
        if (options.includeNumbers !== false) chars += '0123456789';
        if (options.includeSpecial !== false) chars += '!@#$%^&*';
        
        if (!chars) chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
        
        const length = options.length ?? 16;
        if (!Number.isInteger(length) || length < 8 || length > 64) {
            throw new Error('Password length must be an integer between 8 and 64.');
        }
        let password = '';
        
        for (let i = 0; i < length; i++) {
            const start = (i * 4) % hash.length;
            const chunk = hash.substring(start, start + 4);
            const num = parseInt(chunk, 16);
            password += chars[num % chars.length];
        }
        
        return password;
    }

    validateStrength(password) {
        let score = 0;
        if (password.length >= 12) score++;
        if (/[A-Z]/.test(password)) score++;
        if (/[a-z]/.test(password)) score++;
        if (/[0-9]/.test(password)) score++;
        if (/[^A-Za-z0-9]/.test(password)) score++;
        return Math.min(score, 4);
    }
}

module.exports = PasswordGenerator;
