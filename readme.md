# Arcane-Pass CLI

Arcane-Pass is a stateless password generator. The same master password and service name always produce the same password. Nothing is stored.

## Installation

### Global Install
```bash
npm install -g arcane-pass-cli
```

### Local Development
```bash
git clone <repository-url>
cd arcane-pass-cli
npm install
npm link
```

## Usage

### Generate a Password
```bash
arcane-pass generate
```

You will be prompted for:
- Service name (for example: gmail, github)
- Master password (hidden input)

### Quick Options
```bash
arcane-pass generate -s gmail
arcane-pass generate -s github -l 24
arcane-pass generate -s twitter --show
arcane-pass generate -s reddit --copy
```

### Help and Version
```bash
arcane-pass --help
arcane-pass generate --help
arcane-pass --version
```

## Options

| Option | Alias | Default | Description |
|--------|-------|---------|-------------|
| `--service <name>` | `-s` | - | Service name (prompted if missing) |
| `--length <number>` | `-l` | `16` | Password length (8 to 64) |
| `--show` | - | `false` | Show the password in the output |
| `--copy` | `-c` | `false` | Copy the password to clipboard |

## Examples

```bash
$ arcane-pass generate -s gmail -l 20 --show --copy
? Enter master password: ********

Password generated for: gmail
Password: K9#mL2vX8@nQ4sR7pY1Z
Strength: Very Strong
Password copied to clipboard!
```

## How It Works

1. Combines the master password and service name.
2. Hashes the input with SHA-256.
3. Converts the hash into a password with a mixed character set.

## Security Notes

- Passwords are never stored.
- Use a strong master password.
- Keep service names consistent to reproduce the same password.

## Troubleshooting

### Command Not Found
```bash
npm link
```

### Clipboard Issues
If clipboard copy fails, the password is still shown when you use `--show`.
