const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(theQuestion) {
    return new Promise(resolve => readline.question(theQuestion, answ => resolve(answ)));
}

module.exports = question;
