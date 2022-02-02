<template>
  <section
    v-if="!account"
    className="flex flex-col justify-center items-center mt-24 md:mt-36 mb-48 p-16 text-lg text-center w-4/6 md:w-1/2 mx-auto"
  >
    <h1 className="text-2xl md:text-4xl uppercase">Get Innnn!!</h1>
    <button className="neu" @click.prevent="handleClick">
      Connect Metamask
    </button>
    <p className="text-red-600 mt-12" v-if="error">{{ error }}</p>
    <!-- <p className="text-green-400" v-if="getChain()">Great! You are connected now. Taking you somewhere now. </p> -->
  </section>

  <div v-else class="container">
    <div class="flex flex-col ml-9 items-center">
      <p class="text-2xl">Hello {{ account }}! 👋</p>
      <div class="p-40" v-if="zeroBalance">
        <p class="text-xl text-center" style="padding-top: 4rem">
          Looks like you minted John Cena, but we would like you to mint a $4TM
        </p>
      </div>
      <div v-else class="flex flex-wrap mypixels">
        <MyPixelsVue />
      </div>
      <div v-if="error" class="error">
        {{ error }}
      </div>
      <div v-if="lessThanQuota" class="flex flex-col items-center">
        <div class="flex items-center justify-evenly" style="margin-top: 4rem">
          <MinusCircleIcon
            style="width: 30px; margin-right: 5px"
            class="plus-minus-icon"
            @click="decrement"
          />
          <span class="amount text-xl">{{ amount }}</span>
          <PlusCircleIcon
            style="width: 30px; margin-left: 5px"
            class="plus-minus-icon"
            @click="increment"
          />
        </div>
        <p>and</p>
        <form>
          <span>Amount for each (in Matic)</span><br />
          <input class="amount-matic" type="number" min="0.00001" placeholder="0.00001" v-model="pay" />
        </form>
        <button class="neu" @click.prevent="mintToken">Mint</button>
      </div>
    </div>
  </div>
</template>

<script>
import MyPixelsVue from "../components/MyPixels.vue";
import { createToast } from "mosha-vue-toastify";
import { PlusCircleIcon, MinusCircleIcon } from "@heroicons/vue/outline";
import "mosha-vue-toastify/dist/style.css";
import { onMounted, onUpdated, ref, watchEffect } from "@vue/runtime-core";
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
    const zeroBalance = ref(false);
    const lessThanQuota = ref(false);
    const pay = ref(0.00001);
    // onMounted(() => {
    //   handleInit();
    // });
    onMounted(() => {
      if (account.value) {
        getChain();
      }
    });

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
      setTimeout(() => {
        if (!account.value) {
          return;
        } else {
          if (net.value !== 80001) {
            createToast("Please connect to Polygon Network");
          }
        }
      }, 700);
    });

    setInterval(() => {
      if (!account.value) {
        return;
      } else {
        getChain();
        console.log(net.value);
      }
    }, 3000);

    setInterval(() => {
      if (!account.value) {
        return;
      } else {
        const accnt = account.value;
        contract.methods
          .balanceOf(accnt)
          .call()
          .then((res) => {
            balance = res;
          });
        if (parseInt(balance) === 0) {
          zeroBalance.value = true;
          lessThanQuota.value = true;
        } else {
          zeroBalance.value = false;
          if (parseInt(balance) < 10) {
            lessThanQuota.value = true;
          }
        }
      }
    }, 1000);

    const increment = () => {
      const bal = parseInt(balance);
      const amt = parseInt(amount.value);
      if (bal + amt < 10) {
        amount.value++;
      }
    };

    const decrement = () => {
      if (amount.value > 1) {
        amount.value--;
      }
    };

    const mintToken = () => {
      error.value = "";
      const amt = amount.value;
      const toPay = amt * web3.utils.toWei(pay.value.toString(), "ether");
      if (toPay === " ") {
        error.value = "Please enter a valid amount";
      } else {
        console.log(toPay);
        contract.methods
          .tokenMint(amt)
          .send({
            from: account.value,
            value: toPay,
          })
          .then((receipt) => {
            console.log(receipt);
          })
          .catch((err) => {
            err.message = error.value;
          });
      }
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
      pay,
      error,
    };
  },
};
</script>

<style scoped>
.mint {
  box-shadow: -6px -6px 14px rgba(255, 255, 255, 0.7),
    -6px -6px 10px rgba(255, 255, 255, 0.5),
    6px 6px 8px rgba(255, 255, 255, 0.075), 6px 6px 10px rgba(0, 0, 0, 0.15);
  padding: 0.3rem 1.2rem;
}
.mypixels {
  width: 85%;
  margin: auto;
  align-items: center;
  justify-content: center;
}
.amount {
  width: 10px;
}
.neu {
  margin-top: 1.5rem;
  padding: 1rem 2.5rem;
  width: fit-content;
}
.plus-minus-icon {
  border-radius: 2cm;
  box-shadow: -6px -6px 14px rgba(255, 255, 255, 0.7),
    -6px -6px 10px rgba(255, 255, 255, 0.5),
    6px 6px 8px rgba(255, 255, 255, 0.075), 6px 6px 10px rgba(0, 0, 0, 0.15);
}
.plus-minus-icon:hover {
  box-shadow: -2px -2px 6px rgba(255, 255, 255, 0.6),
    -2px -2px 4px rgba(255, 255, 255, 0.4),
    2px 2px 2px rgba(255, 255, 255, 0.05), 2px 2px 4px rgba(0, 0, 0, 0.1);
}
.plus-minus-icon:active {
  box-shadow: inset -2px -2px 6px rgba(255, 255, 255, 0.7),
    inset -2px -2px 4px rgba(255, 255, 255, 0.5),
    inset 2px 2px 2px rgba(255, 255, 255, 0.075),
    inset 2px 2px 4px rgba(0, 0, 0, 0.15);
}
.amount-matic {
  width: 100%;
  text-align: center;
  border-radius: 2cm;
  padding: 0.2rem 0.5rem;
  background-color: #efefef;
  box-shadow: inset -2px -2px 6px rgba(255, 255, 255, 0.7),
    inset -2px -2px 4px rgba(255, 255, 255, 0.5),
    inset 2px 2px 2px rgba(255, 255, 255, 0.075),
    inset 2px 2px 4px rgba(0, 0, 0, 0.15);
}
.amount-matic:focus {
  outline: none;
}
</style>
