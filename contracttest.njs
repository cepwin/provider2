import "web3";
//const MyContract = require("/home2/remixshare/PerformanceContract/artifacts");

const init = async () => {
    const web3 = new web3("http://localhost:8545");
    const id = await web3.eth.net.getId();
    const deployedNetwork = MyContract.networks[id];
    const contract = new web3.eth.Contract(MyContract.api);
 
}

init();