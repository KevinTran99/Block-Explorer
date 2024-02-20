const rpc = new Web3(
  'https://eth-sepolia.g.alchemy.com/v2/kdwWXZC7BHd7LneRBqLTcpIcl6HhHJHD'
);

function initApp() {
  console.log(rpc);
}

document.addEventListener('DOMContentLoaded', initApp);
