const dotenv = require('dotenv')
dotenv.config()


import { ref } from '@vue/reactivity';
const contractABI = require('../web3/abi.json')
const {ALCHEMY_URI} = process.env
const pixels = ref([])
const Web3 = require("web3");

const web3 = new Web3(new Web3.providers.HttpProvider("https://polygon-mumbai.g.alchemy.com/v2/rmj40sxWEbvyNYW60d-1AKx2Adf9SREs"));

console.log(web3);
const contractAddress = '0x6763C068Bc9165f611dCaC18f251fcc1cb7C258a'

const contract = new web3.eth.Contract(contractABI, contractAddress)


const getCanvas = async () => {
    const res = await contract.methods.getCanvas().call()
    console.log(res)
    let newPixels = [...res]
    console.log(newPixels);
    for (let i = 1; i <= 100000; i++) {
      if (newPixels.find((pixel) => pixel.pixelNum == i)) {
        continue;
      } else {
        newPixels.push({
          pixelNum: i,
          color: "col_unknown",
        });
      }
    }
    newPixels.sort((a, b) => {
      return a.pixelNum - b.pixelNum;
    });
    console.log(newPixels);
    pixels.value = newPixels
    
}

const canvasSetup = () => {
    return { contract, getCanvas, pixels }
}

export default canvasSetup