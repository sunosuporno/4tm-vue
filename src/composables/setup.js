import { ref } from '@vue/reactivity';
const contractABI = require('../web3/abi.json')
const Web3 = require("web3");
const error = ref('')
const wb3 = ref(null)
const cntrct = ref(null)
let account = ref('')
let success = ref('')
const net = ref('')
const balance = ref('')

const contractAddress = '0x6763C068Bc9165f611dCaC18f251fcc1cb7C258a'

// web3 = new Web3 (Web3.givenProvider)


const init = async () => {
  error.value = "";
  if(typeof(window.ethereum) !== 'undefined'){
    let web3 = new Web3(Web3.givenProvider);
    console.log(web3);
    cntrct.value = new web3.eth.Contract(contractABI, contractAddress)
    console.log(cntrct.value);
    wb3.value = web3;
    return {wb3, cntrct}
  } else {
    error.value = "You need to install Metamask or sign into it before proceeding."
  }
}

// if(window.ethereum){
// ethereum.request({method: 'eth_requestAccounts' }).then(accounts => {
//   console.log(accounts)

// })} else {
//   error.value = "Please install MetaMask and try again."
// }



const connect = async () => {
  error.value = "";
  let web3 = wb3.value
  if(!window.ethereum){
    error.value = "Please install MetaMask and try again."
  }
   net.value = await web3.eth.net.getId();
    if(net.value !== 80001){
        error.value = "Wrong network. Please select Polygon Mainnet and refresh.";
        success.value = false;
    } else {
      try{
        const accounts = await ethereum.request({method: 'eth_requestAccounts' })
        account.value = accounts[0]
        success.value = true;
      } catch(err){
        error.value = err.message;
        success.value = false;
      }
    }
}

const checkChain = async () => {
  let web3 = wb3.value
  error.value = "";
  try{
    net.value = await web3.eth.net.getId();
    if(net.value !== 80001){
        error.value = "Wrong network. Please select Polygon Mainnet and refresh.";
    }
    else{
      return true
    }
  } catch(err){
    error.value = err.message;
  }
}

const checkBalance = async () => {
  let web3 = wb3.value
  let contract = cntrct.value
  error.value = "";
  if(await checkChain()){
    if (!account.value) {
      console.log('ran checkChain')
      error.value = "Can't detect your account. Please refresh/connect MetaMask and try again."
    } else {
      const accnt = account.value;
      contract.methods
        .balanceOf(accnt)
        .call()
        .then((res) => {
          balance.value = res;
        }).catch(()=> {
          error.value = "Some error occurred in fetching your balance. Please try again." 
        })
    }
  } else{
    error.value = "Wrong network. Please select Polygon Mainnet and refresh."
  }
}



const setup = () => {
  return {
    wb3, error, init, connect, account, success, net, cntrct, balance, checkChain, checkBalance
  }
}

export default setup