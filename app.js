const accountInput = document.querySelector('#accountNumber');
const checkBalanceButton = document.querySelector('#checkBalance');
const displayBalance = document.querySelector('#balance');

const rpc = new Web3(
  'https://eth-sepolia.g.alchemy.com/v2/kdwWXZC7BHd7LneRBqLTcpIcl6HhHJHD'
);

let account;

function initApp() {
  console.log(rpc);
}

async function checkBalance() {
  account = accountInput.value;
  const balance = await rpc.eth.getBalance(account);
  displayBalance.innerHTML = rpc.utils.fromWei(balance, 'ether');
}

document.addEventListener('DOMContentLoaded', initApp);
checkBalanceButton.addEventListener('click', checkBalance);
