const accountInput = document.querySelector('#accountNumber');
const checkBalanceButton = document.querySelector('#checkBalance');
const displayBalance = document.querySelector('#balance');

const toAccountInput = document.querySelector('#toAccountNumber');
const valueInput = document.querySelector('#amount');
const sendButton = document.querySelector('#sendTx');

const refreshButton = document.querySelector('#refreshBlocks');
const transactionList = document.querySelector('#transactions');

const rpc = new Web3('HTTP://127.0.0.1:7545');

let account;

function initApp() {
  console.log(rpc);
  getBlockNumber();
}

async function checkBalance() {
  account = accountInput.value;
  const balance = await rpc.eth.getBalance(account);
  displayBalance.innerHTML = rpc.utils.fromWei(balance, 'ether');
  await getLatestBlockNumber();
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

async function getBlockNumber() {
  try {
    const blockNumber = await rpc.eth.getBlockNumber();
    document.getElementById('numberOfBlocks').innerText =
      blockNumber + ' Blocks';
  } catch (error) {
    console.error(error);
  }
}

async function getLatestBlockNumber() {
  try {
    const latestBlock = await rpc.eth.getBlock('latest');
    if (latestBlock !== null) {
      await displayHistory(latestBlock.transactions);
    } else {
      return null;
    }
  } catch (error) {
    console.error(error);
  }
}

async function displayHistory(transactions) {
  transactionList.innerHTML = '';
  for (let hash of transactions) {
    let trx = await rpc.eth.getTransaction(hash);
    console.log(trx);
    createTransactionList(trx);
  }
}

function createTransactionList(transaction) {
  transactionList.innerHTML += `<span>${transaction.from}</span>
  <span>${transaction.to}</span>
  <span>${rpc.utils.fromWei(transaction.value, 'ether')} ETH</span>`;
}

document.addEventListener('DOMContentLoaded', initApp);
checkBalanceButton.addEventListener('click', checkBalance);
sendButton.addEventListener('click', sendTransaction);
refreshButton.addEventListener('click', getBlockNumber);
