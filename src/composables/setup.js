const abi = require('../web3/abi.json')
// dotenv.config({path: '../../.env'})

// const providerUrl = process.env.ALCHEMY_URI

const Web3  = require("web3");
const { ref } = require('vue');
const error = ref('')

let contract
let web3


const instantiate = () => {
  if (typeof web3 !== 'undefined') {
   window.web3 = new Web3(window.ethereum);
    console.log(window.web3)
  } else {
    error.value = "Please install MetaMask" 
  }
  console.log('hello')
}



const startApp = () => {
  const contractAddress = "0x29F17366FEb2eB9e1C3Ba8279D5c32BdAe77251b"
  contract = new web3.eth.Contract(abi, contractAddress);
}


const setup = () => {
  return {
    instantiate,
    startApp,
    error,
    web3
  }
}

export default setup