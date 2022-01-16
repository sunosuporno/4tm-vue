import { ref } from '@vue/reactivity';
const contractABI = require('../web3/abi.json')
const Web3 = require("web3");
const error = ref('')
let web3
let account = ref('')
let success = ref('')
const net = ref('')

const contractAddress = '0x29F17366FEb2eB9e1C3Ba8279D5c32BdAe77251b'

web3 = new Web3 (Web3.givenProvider)
ethereum.request({method: 'eth_requestAccounts' }).then(accounts => {
  console.log(accounts)
})

// const handleInit = async () => {
//     error.value = ''
//   if (window.ethereum) {
    
//     web3 = new Web3(window.ethereum);
//     try{
//     console.log("Metamask is connected");
    
//     console.log(web3);
//     }catch(err){
//         console.log(err.message);
//         err.message = error.value
//     }
//   } else if (window.web3) {
//     web3 = new Web3(window.web3.currentProvider);
//     console.log(web3)
//     console.log("Using web3 detected from external source like Metamask");
//   } else {
//     error.value = "No web3 detected. Please install Metamask";
//   }
// };

// setTimeout(() => {
//   handleInit()
// }, 500);

web3.eth.getAccounts().then(console.log)

const getChain = async () => {
  error.value = "";
   net.value = await web3.eth.net.getId();
    if(net.value !== 80001){
        error.value = "Wrong network. Please select Polygon Mainnet and try to connect again.";
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



const contract = new web3.eth.Contract(contractABI, contractAddress)


const setup = () => {
  return {
    web3, error, getChain, account, success, net, contract
  }
}

export default setup