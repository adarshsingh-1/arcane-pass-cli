# ArcanePass CLI

A stateless password generator CLI tool that creates deterministic passwords based on your master password and service name. No storage required - the same inputs always generate the same password.

## Features

- 🔒 **Stateless**: No password storage, generates same password from same inputs
- 🎯 **Deterministic**: Same master password + service = same password every time
- 📋 **Clipboard Integration**: Copy passwords directly to clipboard
- 🎨 **Colorful Output**: Easy-to-read colored terminal output
- 🔐 **Secure**: Uses SHA-256 hashing for password generation
- ⚡ **Fast**: Instant password generation with no dependencies on external services

## Installation

### Global Installation
```bash
npm install -g arcane-pass-cli
```

### Development Installation
```bash
git clone <repository-url>
cd arcane-pass-cli
npm install
npm link
```

## Usage

### Basic Commands

#### Generate Password
```bash
arcanapass generate
# or use alias
arcanapass gen
```

This will prompt you for:
- Service name (e.g., gmail, facebook, twitter)
- Master password (hidden input)

#### Get Help
```bash
arcanapass --help
arcanapass generate --help
```

#### Check Version
```bash
arcanapass --version
```

### Command Options

#### Generate with Service Name
```bash
arcanapass generate -s gmail
arcanapass generate --service facebook
```

#### Generate with Custom Length
```bash
arcanapass generate -s twitter -l 20
arcanapass generate --service github --length 32
```

#### Show Password (Visible)
```bash
arcanapass generate -s linkedin --show
```
*By default, passwords are hidden with asterisks*

#### Copy to Clipboard
```bash
arcanapass generate -s instagram --copy
arcanapass generate -s reddit -c
```

#### Combine Options
```bash
# Generate 24-character password for Gmail, show it, and copy to clipboard
arcanapass generate -s gmail -l 24 --show --copy

# Generate password with prompts, copy to clipboard
arcanapass generate --copy
```

## Examples

### Example 1: Basic Usage
```bash
$ arcanapass generate
? Enter service name: gmail
? Enter master password: ********

Password generated for: gmail
Password (hidden): ****************
Strength: Strong
```

### Example 2: With Options
```bash
$ arcanapass generate -s facebook -l 20 --show --copy
? Enter master password: ********

Password generated for: facebook
Password: K9#mL2vX8@nQ4sR7pY1Z
Strength: Very Strong
Password copied to clipboard!
```

### Example 3: Quick Service Setup
```bash
$ arcanapass gen -s twitter --copy
? Enter master password: ********

Password generated for: twitter
Password (hidden): ****************
Strength: Strong
Password copied to clipboard!
```

## Command Reference

| Command | Alias | Description |
|---------|-------|-------------|
| `generate` | `gen` | Generate a password for a service |
| `--help` | `-h` | Show help information |
| `--version` | `-V` | Show version number |

### Generate Command Options

| Option | Alias | Default | Description |
|--------|-------|---------|-------------|
| `--service <name>` | `-s` | - | Service name (prompts if not provided) |
| `--length <number>` | `-l` | `16` | Password length |
| `--show` | - | `false` | Display password visibly |
| `--copy` | `-c` | `false` | Copy password to clipboard |

## How It Works

1. **Input**: Takes your master password and service name
2. **Hashing**: Combines inputs using SHA-256 cryptographic hashing
3. **Generation**: Converts hash to password using character set
4. **Output**: Same inputs always produce the same password

### Character Set
Default character set includes:
- Uppercase letters: `A-Z`
- Lowercase letters: `a-z` 
- Numbers: `0-9`
- Special characters: `!@#$%^&*`

## Security Notes

- ✅ **No Storage**: Passwords are never stored anywhere
- ✅ **Deterministic**: Same inputs = same password
- ✅ **Cryptographic**: Uses SHA-256 for secure hashing
- ⚠️ **Master Password**: Keep your master password secure
- ⚠️ **Service Names**: Use consistent service names

## Troubleshooting

### Command Not Found
If you get `command not found: arcanapass`:
```bash
npm link
# or
npm install -g .
```

### Dependencies Issues
If you encounter module errors:
```bash
npm install chalk@4 inquirer@8
```

### Clipboard Not Working
The clipboard feature requires:
- **macOS**: Built-in `pbcopy`
- **Linux**: Install `xclip`
- **Windows**: Built-in `clip`

Install xclip on Linux:
```bash
sudo apt-get install xclip  # Ubuntu/Debian
sudo yum install xclip      # CentOS/RHEL
```

## Development

### Project Structure
```
arcane-pass-cli/
├── bin/
│   └── arcanapass.js       # CLI entry point
├── src/
│   ├── generator.js        # Password generation logic
│   └── utils.js           # Utility functions
├── package.json
└── README.md
```

### Contributing
1. Fork the repository
2. Create a feature branch
3. Make changes
4. Test with `npm link`
5. Submit a pull request

