const dotenv = require('dotenv')
dotenv.config()


import { ref } from '@vue/reactivity';
const contractABI = require('../web3/abi.json')
const {ALCHEMY_URI} = process.env
const pixels = ref([])
const Web3 = require("web3");

const web3 = new Web3(new Web3.providers.HttpProvider("https://polygon-mumbai.g.alchemy.com/v2/YqNc-8eloyNGSB3BzrzwD8rnGpK0MZ4X"));

console.log(web3);
const contractAddress = '0x00BC27AFFCf94c1389D6d26C4b47365Db7F83acf'

const contract = new web3.eth.Contract(contractABI, contractAddress)
const isFetchingAllPixels = ref(false)
const isSortingAllPixels = ref(false)
const isRendering = ref(false)


const getCanvas = async () => {
    // isFetchingAllPixels.value = true
    // const res = await contract.methods.getCanvas().call()
    // console.log(res)
    // let newPixels = [...res]
    // console.log(newPixels);
    // isFetchingAllPixels.value = false
    // isSortingAllPixels.value = true
    // for (let i = 1; i <= 100000; i++) {
    //   if (newPixels.find((pixel) => pixel.pixelNum == i)) {
    //     continue;
    //   } else {
    //     newPixels.push({
    //       pixelNum: i,
    //       color: "col_unknown",
    //     });
    //   }
    // }
    // newPixels.sort((a, b) => {
    //   return a.pixelNum - b.pixelNum;
    // });
    // console.log(newPixels);
    // isSortingAllPixels.value = false
    // isRendering.value = true
    // pixels.value = newPixels
    // isRendering.value = false
    try{
        isFetchingAllPixels.value = true
        const url = "http://localhost:8080/getCanvas"
        const res = await fetch(url)
        const jsonRes = await res.json()
        console.log(jsonRes.data);
        let newPixels = [...jsonRes.data]
        newPixels.sort((a, b) => {
            return a._id - b._id;
          });
        pixels.value = newPixels
        isFetchingAllPixels.value = false
    } catch(err){
        console.log(err);
    }
}

const canvasSetup = () => {
    return { contract, getCanvas, pixels, isFetchingAllPixels, isSortingAllPixels, isRendering }
}

export default canvasSetup