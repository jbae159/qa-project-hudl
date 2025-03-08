# QA Project for Hudl

This project contains automated tests for the Hudl platform using Playwright and TypeScript. It includes end-to-end tests for logging in with various credentials and other user flows.

## Prerequisites

Before you start, make sure you have the following installed:

- **Node.js**: Version `>=22.x` (Use `nvm` or install from [Node.js official website](https://nodejs.org/en/))
- **npm**: Version `>=10.x` (npm is bundled with Node.js, so it will be installed along with Node)

### Check Node.js and npm Versions
To ensure you have the correct version of Node.js and npm, run the following commands in your terminal:

```bash
node -v
npm -v
```

If you don't have the required versions, update Node.js and npm.

## Installation

### 1. Clone the Repository
Start by cloning this repository to your local machine:

```bash
git clone https://github.com/yourusername/qa-project-hudl.git
```

### 2. Install Dependencies
Navigate to the project folder:

```bash
cd qa-project-hudl
```
Install the project dependencies using npm:

```bash
npm install
```
This will install the necessary dependencies, including:
- `playwright` and `@playwright/test` for end-to-end testing with Playwright
- `dotenv` for handling credentials
- `typescript`, `ts-node`, and `typescript-eslint` for TypeScript support

## Setting Up Credentials
This test require your **Hudl credentials** (username and password) to run successfully.
1. Create a `.env` file in the root of the project directory.
2. Add your credentials to the `.env` file like this:

```env
HUDL_USERNAME="your_username"
HUDL_PASSWORD="your_password"
```
**Note:** Keep this file secure and never commit it to version control. You may add it to `.gitignore` to ensure it's excluded.

```bash
echo ".env" >> .gitignore
```

## Running the Test Suite
To run the test suite, use the following npm script:

```bash
npm run test
```

This will execute the Playwright tests defined in the `tests/e2e` directory using the `playwright.config.ts` configuration file.

### Headless vs Headed Mode
By default, Playwright runs in **headless** mode, meaning the browser will run in the background without a visible UI.

If you want to run the tests in **headed mode** (i.e., with the browser UI visible), you can change the `headless` setting in the `playwright.config.ts` file. Find the `use` block and modify the `headless` property:

```ts
use: {
   headless: false,
}
```
Save this change, when you run `npm run test`, the browser window will open and you can watch the tests being executed.

## Test Structure
This project follows a **Page Object Model (POM)** structure. Here's the tree directory of the structure:

```
├── node_modules
├── tempArtifacts
├── testResults
├── tests
│   ├── e2e
│   │   ├── login.test.ts
│   │   ├── login.test.ts-snapshots
│   ├── page-objects
│   │   ├── login-page.ts
├── .env
├── .gitignore
├── package.json
├── package-lock.json
├── playwright.config.ts
├── README.md
└── tsconfig.json
```
- `tests`: contains all your test scripts
- `page-objects`: contains the page objects
- `login.test.ts-snapshots`: contains screenshots for comparison

## Troubleshooting

### Test Failures
If a test fails unexpectedly, you can enable more detailed logging by modifying the `reporter` in the configuration:

```ts
reporter: [
  ['list'],
  ['html', { outputFolder: './testResults' }],
]
```
This will generate an HTML report of the test run that can help with debugging.
