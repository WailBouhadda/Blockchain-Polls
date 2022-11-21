import Web3 from 'web3';

const contractAbi = require("./contractABI.json");

export let  selectedaccount;
let contract;
let isInitialzed = false;

export const init = async () => {

    const contractAdrees = "0xe78A0F7E598Cc8b0Bb87894B0F60dD2a88d6a8Ab";
    

    let provider = window.ethereum;

    if(typeof provider !== 'undefined'){
      provider.request({method: 'eth_requestAccounts'}).then((accounts) => {selectedaccount = accounts[0]}).catch((err) => {console.log(err); return;});
      window.ethereum.on('accountsChanged', function(accounts){
        selectedaccount =  accounts[0];
      });
    }
    
    const web3 = new Web3(provider);
    contract = new web3.eth.Contract(contractAbi, contractAdrees);

    isInitialzed = false;
    
}



export const executeTransaction = async (fnName, ...args) => {

  if(!isInitialzed){
    await init();
  }
  contract.methods[fnName](...args).send({ from: selectedaccount})

}


export const call = async (fnName, ...args) => {

  if(!isInitialzed){
    await init();
  }
  return contract.methods[fnName](...args).call({ from: selectedaccount})
}


