// All valid credit card numbers
const valid1 = [4, 5, 3, 9, 6, 7, 7, 9, 0, 8, 0, 1, 6, 8, 0, 8];
const valid2 = [5, 5, 3, 5, 7, 6, 6, 7, 6, 8, 7, 5, 1, 4, 3, 9];
const valid3 = [3, 7, 1, 6, 1, 2, 0, 1, 9, 9, 8, 5, 2, 3, 6];
const valid4 = [6, 0, 1, 1, 1, 4, 4, 3, 4, 0, 6, 8, 2, 9, 0, 5];
const valid5 = [4, 5, 3, 9, 4, 0, 4, 9, 6, 7, 8, 6, 9, 6, 6, 6];
const valid6 = [3, 5, 2, 9, 7, 1, 2, 7, 8, 7, 2, 1, 5, 6, 0, 3];
const valid7 = [3, 6, 7, 2, 4, 4, 3, 4, 1, 7, 2, 0, 8, 9];
const valid8 = "36724434172089";
const valid9 = "4532171286078645";

// All invalid credit card numbers
const invalid1 = [4, 5, 3, 2, 7, 7, 8, 7, 7, 1, 0, 9, 1, 7, 9, 1];
const invalid2 = [5, 7, 9, 5, 5, 9, 3, 3, 9, 2, 1, 3, 4, 6, 4, 3];
const invalid3 = [3, 7, 5, 7, 9, 6, 0, 8, 4, 4, 5, 9, 9, 1, 4];
const invalid4 = [6, 0, 1, 1, 1, 2, 7, 9, 6, 1, 7, 7, 7, 9, 3, 5];
const invalid5 = [5, 3, 8, 2, 0, 1, 9, 7, 7, 2, 8, 8, 3, 8, 5, 4];

// Can be either valid or invalid
const mystery1 = [3, 4, 4, 8, 0, 1, 9, 6, 8, 3, 0, 5, 4, 1, 4];
const mystery2 = [5, 4, 6, 6, 1, 0, 0, 8, 6, 1, 6, 2, 0, 2, 3, 9];
const mystery3 = [6, 0, 1, 1, 3, 7, 7, 0, 2, 0, 9, 6, 2, 6, 5, 6, 2, 0, 3];
const mystery4 = [4, 9, 2, 9, 8, 7, 7, 1, 6, 9, 2, 1, 7, 0, 9, 3];
const mystery5 = [4, 9, 1, 3, 5, 4, 0, 4, 6, 3, 0, 7, 2, 5, 2, 3];

// An array of all the arrays above
const batch = [valid1, valid2, valid3, valid4, valid5, valid6, valid7, valid8, valid9, invalid1, invalid2, invalid3, invalid4, invalid5, mystery1, mystery2, mystery3, mystery4, mystery5];

const convertToArray = str => {
  const arr = str.split('');
  const num = arr.map((element) => {
    return parseInt(element);
  })
  return num;
}

const validateCred = (arr, valid=true) => {
  const lastElement = arr[arr.length-1];
  const arr2 = arr.slice(0, arr.length-1).reverse();

  const reducer = (accumulator, currentValue, index) => {
    if (index % 2 === 0){
      return currentValue * 2 > 9 ? currentValue * 2 - 9 + accumulator : currentValue * 2 + accumulator;
    } else {
      return accumulator + currentValue;
    }
  }

  const result = arr2.reduce(reducer, 0);

  if (valid){
    return (result + lastElement) % 10 === 0 ? true : false
  } else {
    return (result % 10 === 0) ? 0 : 10 - (result % 10);
  }
}


const findInvalidCards = arr => {
  result = [];
  for (let i = 0; i <= arr.length-1; i++) {
    let j = [];
    if (typeof arr[i] === 'string'){
      j = convertToArray(arr[i]);
    } else {
      j = arr[i];
    }
    if (!validateCred(j)) {
      result.push(j);
    }
  }
  return result;
}

const idInvalidCardCompanies = arr => {
  const newArr = arr.map((arr) => {
    switch (arr[0]) {
      case 3:
        return 'Amex';
        break;
      case 4:
        return 'Visa';
         break;
      case 5:
        return 'Mastercard';
        break;
      case 6:
        return 'Discover';
        break;
      default:
        return 'Company not found';
    }
  })

  const comparation = (str, index, arr) => {
    return arr.indexOf(str) === index;
  }

  const result = newArr.filter(comparation);

  return result;
}

const invalid = findInvalidCards(batch);

console.log("===== Invalid cards manufacturer: ")
console.log(idInvalidCardCompanies(invalid));


const createValidCards = arr => {
  let newArr = [];
  for (let i = 0; i <= arr.length-1; i++){
    let count = validateCred(arr[i],false);
    arr[i].pop();
    newArr[i] = arr[i];
    newArr[i].push(count);
    if (!validateCred(newArr[i])){
      return;
    }
  }
  return arr;
}

console.log();
console.log("==== Invalid cards become valid cards: ");
console.log(createValidCards(invalid));
