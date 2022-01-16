<template>
  <section
    v-if="!account"
    className="flex flex-col mt-24 md:mt-36 mb-48 p-16 border-2 border-black rounded-md text-lg text-center w-4/6 md:w-1/2 mx-auto"
  >
    <h1 className="text-2xl md:text-4xl uppercase">Get Innnn!!</h1>
    <button
      className="border-2 border-black p-1 text-xl md:text-3xl w-15 md:w-80 rounded-2xl mx-auto mt-24 hover:cursor-pointer"
      @click.prevent="handleClick"
    >
      Connect Metamask
    </button>
    <p className="text-red-600 mt-12" v-if="error">{{ error }}</p>
    <!-- <p className="text-green-400" v-if="getChain()">Great! You are connected now. Taking you somewhere now. </p> -->
  </section>

  <div v-else>
    <div class="flex flex-col ml-9 items-center container">
      <p class="text-2xl">Hello {{ account }}! 👋</p>
      <div class="p-40" v-if="zeroBalance">
        <p class="text-xl" style="padding-top: 4rem">
          Looks like you minted John Cena, but we would like you to mint a $4TM
        </p>
      </div>
      <div v-else class="flex flex-wrap mypixels">
        <MyPixelsVue />
      </div>
      <div v-if="lessThanQuota" class="flex flex-col items-center">
        <div class="flex items-center justify-evenly" style="margin-top: 4rem">
          <MinusCircleIcon
            style="width: 30px; margin-right: 5px"
            @click="decrement"
          />
          <span class="amount text-xl">{{ amount }}</span>
          <PlusCircleIcon
            style="width: 30px; margin-left: 5px"
            @click="increment"
          />
        </div>
        <button class="mint" @click.prevent="mintToken">Mint</button>
      </div>
    </div>
  </div>
</template>

<script>
import MyPixelsVue from "../components/MyPixels.vue";
import { createToast } from "mosha-vue-toastify";
import { PlusCircleIcon, MinusCircleIcon } from "@heroicons/vue/solid";
import "mosha-vue-toastify/dist/style.css";
import { ref, watchEffect } from "@vue/runtime-core";
import setup from "../composables/setup";
export default {
  components: {
    PlusCircleIcon,
    MinusCircleIcon,
    MyPixelsVue,
  },
  setup() {
    const { web3, getChain, error, account, success, net, contract } = setup();

    const amount = ref(1);
    let balance;
    const zeroBalance = ref(true)
    const lessThanQuota = ref(false)
    // onMounted(() => {
    //   handleInit();
    // });

    const handleClick = () => {
      getChain();
      if (success.value) {
        createToast("Great! You are connected now.", {
          showCloseButton: true,
          hideProgressBar: true,
          timeout: 4000,
          type: "success",
          showIcon: true,
        });
      }
    };
    watchEffect(() => {
      if (net.value !== 80001) {
        createToast("Please connect to Polygon Network");
      }
    });

    setInterval(() => {
      getChain();
    }, 1000);

    setInterval(() => {
      const accnt = account.value;
      contract.methods
        .balanceOf(accnt)
        .call()
        .then((res) => {
          balance = res;
        });
      if(parseInt(balance) === 0){
        zeroBalance.value = true;
        lessThanQuota.value = true;
      }
      else{
        zeroBalance.value = false;
        if(parseInt(balance) < 4){
          lessThanQuota.value = true;
        }
      }
    }, 1000);

    const increment = () => {
      const bal = parseInt(balance);
      const amt = parseInt(amount.value);
      if (bal + amt < 4) {
        amount.value++;
      }
    };

    const decrement = () => {
      if (amount.value > 1) {
        amount.value--;
      }
    };

    const mintToken = () => {
      const amt = amount.value;
      const pay = amt * web3.utils.toWei("0.00001", "ether");
      contract.methods
        .tokenMint(amt)
        .send({
          from: account.value,
          value: pay,
        })
        .then((receipt) => {
          console.log(receipt);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    return {
      handleClick,
      error,
      getChain,
      account,
      amount,
      increment,
      decrement,
      mintToken,
      balance,
      zeroBalance,
      lessThanQuota,
    };
  },
};
</script>

<style>
.mint {
  border: 3px solid #000;
  padding: 0.3rem 1rem;
  border-radius: 3cm;
}
.mypixels {
  width: 85%;
  margin: auto;
  align-items: center;
  justify-content: center;
}
.amount{
  width: 10px;
}
</style>
