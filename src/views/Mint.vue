<template>
  <section
    className="flex flex-col font-body mt-24 md:mt-36 mb-48 p-16 border-2 border-black rounded-md text-lg text-center w-4/6 md:w-1/2 mx-auto"
  >
    <h1 className="text-2xl md:text-4xl uppercase">Get Innnn!!</h1>
    <span
      className="border-2 border-black p-1 text-xl md:text-3xl w-15 md:w-80 rounded-2xl mx-auto mt-24"
      @click="handleClick"
      >Connect Metamask</span
    >
    <p className="text-red-600 mt-12" v-if="error">{{ error }}</p>
    <button @click="getChain">Get chain Id</button>
    
  </section>
</template>

<script>
import { ref } from '@vue/reactivity';
export default {
  setup() {
    const Web3 = require("web3");
    const error = ref('')
 let web3 = ref('')


    const handleClick = async () => {
        error.value = ''
      if (window.ethereum) {
        
        web3 = new Web3(window.ethereum);
        try{
        ;
        console.log("Metamask is connected");
        
        console.log(web3);
        }catch(err){
            console.log(err.message);
            err.message = error.value
        }
      } else if (window.web3) {
        web3 = new Web3(window.web3.currentProvider);
        console.log(web3)
        console.log("Using web3 detected from external source like Metamask");
      } else {
        console.log('Download Metamask');
      }
    };

    const connectWallet = async () => {
      error.value = "";
      if (typeof window.ethereum !== "undefined") {
        console.log("MetaMask is installed!");
        const accounts = await ethereum.request({
          method: "eth_requestAccounts",
        });

        const account = accounts[0];
        console.log(account);
        if (account) {
          web3.eth
            .getChainId()
            .then((chainId) => {
              console.log(chainId);
              if (chainId !== 80001) {
                error.value = "Wrong network. Please selct Polygon Mainnet.";
              }
            })
            .catch(() => {
              error.value = "Some error occured! Please try again.";
            });
        }
      }
    };

    const getChain = async () => {
       const net = await web3.eth.net.getId()
        if(net !== 80001){
            error.value = "Wrong network. Please select Polygon Mainnet.";
        }
    }

    return { handleClick, error, getChain };
  },
};
</script>
