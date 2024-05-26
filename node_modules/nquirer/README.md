
# nquirer

Hierarchical configuration with [nconf](https://github.com/indexzero/nconf)
combined with [inquirer](https://github.com/SBoudrias/Inquirer.js) to prompt
user for missing configuration.

## Install

```bash
npm install --save nquirer
```

## Usage

Here's an example retrieving username and password with following rules:

- Username required as command line argument.
- Password optional as command line argument.
- Prompt for password if command line argument not provided.

```javascript
const { nconf, necessitate, inquire } = require('nquirer');

// Default nconf configuration
// https://github.com/indexzero/nconf
nconf
  .env()
  .argv({
    "username": {
      "alias": "u",
      "describe": "Username",
      "demand": true
    },
    "password": {
      "alias": "p",
      "describe": "Password"
    }
  })
  .file('path/to/default-config.json');

// Prompt for missing configurations via Inquirer questions.
// Questions passed directly to Inquirer.
// https://github.com/SBoudrias/Inquirer.js#questions
necessitate([{
  type: 'password',
  name: 'password',
  message: 'Password'
}]);

// Prompt for missing configurations and continue with application logic...
inquire().then(nconf => {
  const username = nconf.get('username');
  const password = nconf.get('password');
  console.log(`Username: ${username}`);
  console.log(`Password: ${password}`);
  // ...
});

```

## API

API documentation can be found here: https://coreyferguson.github.io/nquirer/module-nquirer.html

It can also be found directly in the source: [`src/nquirer.js`](./src/nquirer.js)

## Contribution

See [CONTRIBUTE.md](./CONTRIBUTE.md)
