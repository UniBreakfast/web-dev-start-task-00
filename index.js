const { exec } = require('child_process');

// Function to execute a command and print the result
function executeCommand(command, successMessage, errorMessage) {
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${errorMessage}`);
      console.error(stderr);
      return;
    }
    console.log(
      successMessage,
      stdout.replace(/\n/g, '').replace(/[a-f0-9]{20}/g, '')
    );
  });
}

// Check if Git is installed
executeCommand(
  'git --version',
  'Git is installed:',
  'Git is not installed. Please install Git.'
);

// Check if VSCode is installed
executeCommand(
  'code --version',
  'VSCode is installed:',
  'VSCode is not installed. Please install VSCode.'
);
