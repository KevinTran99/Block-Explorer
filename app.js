const accountInput = document.querySelector('#accountNumber');
const checkBalanceButton = document.querySelector('#checkBalance');
const displayBalance = document.querySelector('#balance');

const toAccountInput = document.querySelector('#toAccountNumber');
const valueInput = document.querySelector('#amount');
const sendButton = document.querySelector('#sendTx');

const rpc = new Web3('HTTP://127.0.0.1:7545');

let account;

function initApp() {
  console.log(rpc);
}

async function checkBalance() {
  account = accountInput.value;
  const balance = await rpc.eth.getBalance(account);
  displayBalance.innerHTML = rpc.utils.fromWei(balance, 'ether');
}

async function sendTransaction() {
  const toAddress = toAccountInput.value;
  const amount = valueInput.value;

  try {
    const trx = await rpc.eth.sendTransaction({
      from: account,
      to: toAddress,
      value: rpc.utils.toWei(amount, 'ether'),
    });
  } catch (error) {
    console.log(error);
  }
}

document.addEventListener('DOMContentLoaded', initApp);
checkBalanceButton.addEventListener('click', checkBalance);
sendButton.addEventListener('click', sendTransaction);
