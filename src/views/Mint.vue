<template>
  <div class="container">
    <section
      v-if="!account"
      className="flex flex-col justify-center items-center mt-24 md:mt-36 mb-48 p-16 text-lg text-center w-4/6 md:w-1/2 mx-auto"
    >
      <h1 className="text-2xl md:text-4xl uppercase">Get Innnn!!</h1>
      <button className="neu" @click.prevent="handleClick">
        Connect Metamask
      </button>
      <p className="text-red-600 mt-12" v-if="error">{{ error }}</p>
    </section>

    <div v-else class="container">
      <div class="flex flex-col items-center">
        <p class="text-2xl">Hello {{ account }}! 👋</p>
        <div class="p-40" v-if="zeroBalance">
          <p class="text-xl text-center" style="padding-top: 4rem">
            Looks like you minted John Cena, but we would like you to mint a
            $4TM
          </p>
        </div>
        <div v-else>
          <MyPixelsVue />
        </div>
        <div v-if="error" class="error">
          {{ error }}
        </div>
        <div v-if="lessThanQuota" class="flex flex-col items-center">
          <form>
            <span>Token number of Pixel you want to mint</span><br />
            <input
              class="num-token"
              type="number"
              min="1"
              max="100000"
              v-model="tokenNum"
            />
          </form>
          <div v-if="error">
            {{ error }}
          </div>
          <button class="neu" @click.prevent="mintToken" v-if="!isMinting">
            Mint
          </button>
          <button class="neu minting" v-if="isMinting" disabled>
            Minting....
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MyPixelsVue from "../components/MyPixels.vue";
import { createToast } from "mosha-vue-toastify";
import "mosha-vue-toastify/dist/style.css";
import { ref } from "@vue/runtime-core";
import setup from "../composables/setup";
export default {
  components: {
    MyPixelsVue,
  },
  setup() {
    const {
      wb3,
      connect,
      error,
      account,
      success,
      cntrct,
      checkBalance,
      balance,
      checkSupply,
      totalTokens,
    } = setup();
    const isMinting = ref(false);
    const web3 = wb3.value;
    const contract = cntrct.value;
    const zeroBalance = ref(false);
    const lessThanQuota = ref(false);
    const tokenNum = ref(1);

    const handleClick = async () => {
      await connect();
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

    setInterval(async () => {
      if (!account.value) {
        return;
      } else {
        await checkBalance();
        await checkSupply();
        if (
          parseInt(balance.value) === 0 &&
          parseInt(totalTokens.value) != 100000
        ) {
          zeroBalance.value = true;
          lessThanQuota.value = true;
        } else {
          zeroBalance.value = false;
          if (
            parseInt(balance.value) < 20 &&
            parseInt(totalTokens.value) != 100000
          ) {
            lessThanQuota.value = true;
          }
        }
      }
    }, 3000);

    const mintToken = async () => {
      error.value = "";
      const tokenNumber = tokenNum.value;
      tokenNumber.toString();
      let toPay;
      let nftNum;
      try {
        if (tokenNumber <= 36250) {
          toPay = web3.utils.toWei((0.00003).toString(), "ether");
        } else if (36250 < tokenNumber && tokenNumber <= 78000) {
          toPay = web3.utils.toWei((0.00002).toString(), "ether");
        } else {
          toPay = web3.utils.toWei((0.00001).toString(), "ether");
        }
        if (tokenNumber === " ") {
          error.value = "Please enter a valid number between 1 and 100000";
        } else {
          isMinting.value = true;
          const res = await contract.methods.pixels(tokenNumber).call();
          if (res.number == 0) {
            const res2 = await contract.methods.totalSupply().call();
            nftNum = Number(res2) + 1;
            const url = "http://api.4themetaverse.xyz/postToken";
            const response = await fetch(url, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                pixelNum: tokenNumber,
                tokenId: nftNum,
              }),
            });
            const jsonRes = await response.json();
            const ipfsHash = jsonRes.ipfsHash;
            console.log(ipfsHash, tokenNumber, toPay);
            const tx = await contract.methods.tokenMint(tokenNumber, ipfsHash).send({
              from: account.value,
              value: toPay,
            });
            if (tx) {
              createToast("Minted 🥳! Refresh now to see changes.", {
                showCloseButton: true,
                hideProgressBar: true,
                timeout: 4000,
                type: "success",
                showIcon: true,
              });
            }
            isMinting.value = false;
          } else {
            error.value = "This pixel has already been taken :(";
            isMinting.value = false;
          }
        }
      } catch (err) {
        err.message = error.value;
        isMinting.value = false;
      }
    };

    return {
      handleClick,
      error,
      account,
      mintToken,
      balance,
      zeroBalance,
      lessThanQuota,
      tokenNum,
      isMinting,
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
.amount {
  width: 10px;
}
.minting {
  background-color: #cdcaca;
}
.minting:hover {
  cursor: not-allowed;
  box-shadow: -6px -6px 14px rgba(255, 255, 255, 0.7),
    -6px -6px 10px rgba(255, 255, 255, 0.5),
    6px 6px 8px rgba(255, 255, 255, 0.075), 6px 6px 10px rgba(0, 0, 0, 0.15);
}
.neu {
  margin-top: 1.5rem;
  padding: 1rem 2.5rem;
  width: fit-content;
}

.num-token {
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
.num-token:focus {
  outline: none;
}
</style>
