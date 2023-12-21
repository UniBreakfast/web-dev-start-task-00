const { exec } = require('child_process');
const https = require('https');
const fs = require('fs');

// Function to execute a command
function executeCommand(command, successMessage, errorMessage) {
  exec(command, (error, stdout) => {
    if (error) {
      console.error(errorMessage);
      return;
    }
    console.log(`${successMessage} ${stdout.trim()}`);
  });
}

// Check for Google Chrome
const chromePaths = [
  `${process.env.ProgramFiles}\\Google\\Chrome\\Application\\chrome.exe`,
  `${process.env['ProgramFiles(x86)']}\\Google\\Chrome\\Application\\chrome.exe`
];
const chromeInstalled = chromePaths.some(path => fs.existsSync(path));

console.log(chromeInstalled ? '✔️  Google Chrome is installed.' : '❌ Google Chrome is not installed.');

// Check Node.js
executeCommand('node --version', '✔️  Node.js version:', '❌ Node.js is not installed.');

// Check Git
executeCommand('git --version', '✔️  Git version:', '❌ Git is not installed.');

// Check GitHub Account
const username = process.argv[2];
if (!username) {
  console.error('Please provide a GitHub username.');
} else {
  https.get(`https://api.github.com/users/${username}`, { headers: { 'User-Agent': 'Node.js' } }, (res) => {
    if (res.statusCode === 200) {
      console.log(`✔️ GitHub account found for username: ${username}`);
    } else {
      console.error(`❌ No GitHub account found for username: ${username}`);
    }
  }).on('error', (e) => {
    console.error(`Error: ${e.message}`);
  });
}
