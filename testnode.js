

let contract = require("/home2/remixshare/artifacts/SquareCalculator.json");
let Web3 = require('web3'); // https://www.npmjs.com/package/web3
var transReceipt = "";

init = async () => {
    // Create a web3 connection to a running geth node over JSON-RPC running at
    // http://localhost:8545
    // For geth VPS server + SSH tunneling see
    // https://gist.github.com/miohtama/ce612b35415e74268ff243af645048f4
    let web3 = new Web3();
    web3.setProvider(new web3.providers.HttpProvider('http://127.0.0.1:8545'));

    // ABI description as JSON structure
    let abi = contract.abi;// JSON.parse(contracts.PerformanceContract.abi);
    let data = contract.data.bytecode.object;
    let code = '0x' + data;
    
    // Smart contract EVM bytecode as hex

    let contract2 = new web3.eth.Contract(abi);
    let res = contract2.deploy({data:code});
    res.send({
        from: '0x7f9C63BdeE2c33f474C82E85a5b5D3E5d478adfa',
        gas: 1500000,
        gasPrice: '30000000000000'
    })
    .then(function(newContractInstance){
        transReceipt = newContractInstance.options.address;
        console.log("contract address: " + newContractInstance.options.address) // instance with the new contract address
        var contractRetrieve = new web3.eth.Contract(abi, transReceipt, {
          from: '0x7f9C63BdeE2c33f474C82E85a5b5D3E5d478adfa', // default from address
          gasPrice: '20000000000' // default gas price in wei, 20 gwei in this case
        });
        console.log("retrieved contract first: " + contractRetrieve.address);
      });
    
}

// http://stackoverflow.com/questions/951021/what-is-the-javascript-version-of-sleep
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// note: parts taken from https://ethereum.stackexchange.com/questions/7255/deploy-contract-from-nodejs-using-web3
retrieveContract = async () => {
  let web3 = new Web3();
  let abi = contract.abi;
  web3.setProvider(new web3.providers.HttpProvider('http://127.0.0.1:8545'));
  while (true) {
    if (transReceipt) {
       console.log("Your contract is found at at http://127.0.0.1:8545/" + transReceipt);
       break;
    }
    console.log("Waiting a mined block to include your contract... currently in block " + web3.eth.blockNumber);
    console.log("Waiting a mined block to include your contract... currently in block " + web3.eth.blockNumber);
    await sleep(4000);
  }
  var contractRetrieve = await new web3.eth.Contract(abi, transReceipt, {
    from: '0x7f9C63BdeE2c33f474C82E85a5b5D3E5d478adfa', // default from address
    gasPrice: '20000000000' // default gas price in wei, 20 gwei in this case
})  
console.log('retrieved ' + contractRetrieve.options.address);

}

init();
retrieveContract();



