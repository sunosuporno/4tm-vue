<template>
  <section
    v-if="!account"
    className="flex flex-col font-body mt-24 md:mt-36 mb-48 p-16 border-2 border-black rounded-md text-lg text-center w-4/6 md:w-1/2 mx-auto"
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
    <div class="flex flex-col ml-9 items-center">
      <p class="text-2xl">Hello {{ account }}! 👋</p>
      <div class="p-40">
        <p class="text-xl" style="padding-top: 4rem">Looks like you minted John Cena, but we would like you to mint a $4TM</p>
      </div>
      <div class="flex items-center justify-around" style="margin-top: 4rem">
        <MinusCircleIcon style="width: 30px; margin-right: 5px"/>
        <span class="text-xl">1</span> 
        <PlusCircleIcon style="width: 30px; margin-left: 5px"/>
      </div>
      <button class="mint">Mint</button>
    </div>
  </div>
</template>

<script>
import { createToast } from "mosha-vue-toastify";
import { PlusCircleIcon, MinusCircleIcon } from "@heroicons/vue/solid";
import "mosha-vue-toastify/dist/style.css";
import { onMounted, watchEffect } from "@vue/runtime-core";
import setup from "../composables/setup";
import { useRouter } from "vue-router";
export default {
  components: {
    PlusCircleIcon, MinusCircleIcon
  },
  setup() {
    const { getChain, handleInit, error, account, success, net } = setup();
    const router = useRouter();
    onMounted(() => {
      handleInit();
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
      if (net.value !== 80001) {
        createToast("Please connect to Polygon Network");
      }
    });

    setInterval(() => {
      getChain();
    }, 1000);

    // setInterval(() => {
    //   const address = contract.options.address
    //   console.log(address)
    // }, 1000)


    return { handleClick, error, getChain, account };
  },
};
</script>

<style>
.mint{
  border: 3px solid #000;
  padding: 0.3rem 1rem;
  border-radius: 3cm;
}
</style>