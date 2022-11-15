'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];


const displayMovements = function (movements,sort=false) {
  containerMovements.innerHTML = '';
  const movs = sort ? movements.slice().sort((a, b) =>
    a - b) : movements;
  movs.forEach(function (mov, i) {
const type=mov>0?'deposit':'withdrawal'

    const html = `  <div class="movements__row">
    <div class="movements__type movements__type--${type}">${i + 1}${type}</div>
    <div class="movements__value">${mov}</div>
  </div>`;
    containerMovements.insertAdjacentHTML('afterbegin',html);
  })

}
const calcDisplayBalance = function (acc) {
  acc.balance =acc.movements.reduce(function (ac, mov) {
    return ac + mov;
  }, 0);
  console.log(acc.balance)
  labelBalance.textContent = ` ${acc.balance}$`;
  
}









const createUserNames = function (accs) {
  accs.forEach(function (acc) {
    acc.userName=acc.owner.toLowerCase().split(' ').map(name => name[0]).join('');
  })
}
createUserNames(accounts);

const deposits = movements.filter(function (mov) {
  return mov > 0;
})


const calcDisplaySummary = function (accs) {
  const totalDeposits = accs.movements.filter(mov => mov > 0)
    .reduce((acc, arr) => acc + arr, 0);
  labelSumIn.textContent = `${totalDeposits}$`
  
const out= accs.movements.filter(mov => mov < 0)
.reduce((acc, arr) => acc + arr, 0);
  labelSumOut.textContent =`${Math.abs(out)}$`

  const interest = accs.movements.filter(mov => mov > 0)
    .map((depo) => (depo * accs.interestRate /100))
    .reduce((acc, arr) => acc + arr, 0);
  labelSumInterest.textContent=`${interest}$`
}
const displayUi = function (acc) {
   //display movements
   displayMovements(acc.movements);

   //display balance
calcDisplayBalance(acc)

   //display summary
calcDisplaySummary(acc)
}
// event handlers
let currentAccount;
btnLogin.addEventListener('click', function (e) {
  e.preventDefault();
  currentAccount = accounts.find(acc => acc.userName === inputLoginUsername.value)

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
//display ui and message
    labelWelcome.textContent = `Welcome back ${currentAccount.owner.split(' ')[0]}`
    containerApp.style.opacity = 100;
    
    
    displayUi(currentAccount);
  }

})

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault()
  const receiverAcc = accounts.find(acc => acc.userName === inputTransferTo.value);
 
  const amount = Number(inputTransferAmount.value);
  inputTransferAmount.value = inputTransferTo.value = ' ';
  if (amount > 0 && currentAccount.balance>=amount && currentAccount.userName!==receiverAcc?.userName) {
    currentAccount.movements.push(-amount)
    receiverAcc.movements.push(amount)
    //
    
displayUi(currentAccount)
  }

  
})
btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  const current = accounts.find(acc => acc.userName === inputCloseUsername.value);
  inputCloseUsername.value=inputClosePin.value=''
  if (currentAccount.userName === current.userName && currentAccount.pin === current.pin) {
    const index = accounts.findIndex(acc => acc.userName === currentAccount.userName)
    console.log(index)
    accounts.splice(index, 1);

    containerApp.style.opacity = 0;
  }
})
btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputLoanAmount.value);
  inputLoanAmount.value=''
  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    currentAccount.movements.push(amount);
    displayUi(currentAccount)
  }

})
let sorte=false
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorte);
  sorte=!sorte
})
// console.log(accounts)
// const withdrawals = movements.filter(mov => mov < 0);
// const euroTO = 1.1
//////////////////////////////questions/////////////////////////

// //coding test
// const julia = [3, 5, 2, 12, 7];
// const kate = [4, 1, 15, 8, 3];
// let dogs = [];
// const checkDogs = function (julia, kate) {
//   let sjulia = [...julia];
//   sjulia= sjulia.slice(1, -2);
//  dogs = [...sjulia, ...kate];
//   dogs.forEach(function (d,i) {
//     const type = d > 3 ? 'adult' : 'puppy';
//     const pri = `DOg number ${i+1} is a ${type} `;
//     console.log(pri);
//   })

// }
// checkDogs(julia, kate);

// let humanAge = [];
// const calcAvgHumanage = function (dog) {
//   humanAge= dog.map(function (d) {
//     return d <= 2 ? (2 * d ): (16 + d * 4);
//   })
//  humanAge= humanAge.filter(function (d) {
//     return d > 18;
//  })
//   console.log( humanAge);
// }
// calcAvgHumanage(dogs)
// const dogs = [
//   { weight: 22, currFood: 250, owners: ['Alice', 'Bob'] },
//   { weight: 8, currFood: 200, owners: ['matlinda'] },
//   { weight: 13, currFood: 191, owners: ['sarah', 'john'] },
//   { weight: 32, currFood: 340, owners: ['michael'] },
// ];
// //1
// dogs.forEach(function (acc,i) {
//   acc.recommendedFood = acc.weight ** 0.75 * 28;
// })

// //2
// //   currentAccount = accounts.find(acc => acc.userName === inputLoginUsername.value)
// const dogSarah = dogs.find((dog) => dog.owners.includes('sarah'));
// console.log(dogSarah
// )
