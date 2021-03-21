let humanScore = 0;
let computerScore = 0;
let currentRoundNumber = 1;

const generateTarget = () => Math.floor(Math.random() * 10);

const getAbsoluteDistance = (number1, number2) => Math.abs(number1 - number2)

const checkUserNumber = (number) => {
   if (number < 0 || number > 10){
    return true
  }
}

const compareGuesses = (userNumber, computerNumber, secretNumber) => {
  let userDifference = getAbsoluteDistance(userNumber, secretNumber)
  let computerDifference = getAbsoluteDistance(computerNumber, secretNumber)
  return userDifference <= computerDifference
}

const updateScore = winner => (winner == 'human') ? humanScore++ : computerScore++

const advanceRound = () => currentRoundNumber++
