const readline = require('readline');

function isValidLength(length) {
    return Number.isInteger(length) && length >= 8 && length <= 64;
}

function promptInput(query) {
    return new Promise((resolve) => {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        rl.question(query, (value) => {
            rl.close();
            resolve(value.trim());
        });
    });
}

function promptHidden(query) {
    return new Promise((resolve) => {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        // Hide input
        process.stdout.write(query);
        process.stdin.on('data', (char) => {
            char = char + "";
            switch (char) {
                case "\n":
                case "\r":
                case "\u0004":
                    process.stdout.write("\n");
                    rl.close();
                    break;
                default:
                    process.stdout.clearLine();
                    process.stdout.cursorTo(0);
                    process.stdout.write(query + "*".repeat(rl.line.length));
                    break;
            }
        });

        rl.question('', (value) => {
            rl.history = rl.history.slice(1);
            resolve(value.trim());
        });
    });
}

function copyToClipboard(text) {
    const { execSync } = require('child_process');
    try {
        if (process.platform === 'darwin') {
            execSync(`echo "${text}" | pbcopy`);
        } else if (process.platform === 'linux') {
            execSync(`echo "${text}" | xclip -selection clipboard`);
        } else {
            console.warn('Clipboard copy not supported on this platform.');
        }
    } catch (err) {
        console.error('Failed to copy to clipboard:', err.message);
    }
}

module.exports = {
    isValidLength,
    promptInput,
    promptHidden,
    copyToClipboard
};