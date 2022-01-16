import { ref } from '@vue/reactivity';
const contractABI = require('../web3/abi.json')
const Web3 = require("web3");
const error = ref('')
let web3
let account = ref('')
let success = ref('')
const net = ref('')

const contractAddress = '0x29F17366FEb2eB9e1C3Ba8279D5c32BdAe77251b'


const getChain = async () => {
  error.value = "";
   net.value = await web3.eth.net.getId()
    if(net.value !== 80001){
        error.value = "Wrong network. Please select Polygon Mainnet and try to connect again.";
        success.value = false;
    } else {
      const accounts = await web3.eth.getAccounts()
      account.value = accounts[0]
      success.value = true;
    }
}
web3 = new Web3 (window.ethereum)
console.log(web3)

const contract = new web3.eth.Contract(contractABI, contractAddress)


const setup = () => {
  return {
    web3, error, getChain, account, success, net, contract
  }
}

export default setup