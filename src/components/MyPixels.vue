<template>
  <div>
    <p class="text-center fetch text-3xl" v-if="runningPixelation">
      Fetching your data
    </p>
    <div v-else class="pixel-col">
      <div v-for="pixel in pixelCollection" :key="pixel.tokenId" class="pixels">
        <div class="flex flex-col items-center">
          <p class="tokenId">NFT #{{ pixel.tokenId }}</p>
          <p class="tokenId">Pixel No.{{pixel.number}}</p>
          <div class="box" :class="pixel.color"></div>
          <div>Name: {{pixel.title}}</div>
          <div class="quote">Message: {{ pixel.message }}</div>
          <div class="link">Link: {{ pixel.link }}</div>
          <div v-if="pixel.message === ''">
            <router-link
              :to="{ name: 'FillUp', params: { tokenId: pixel.tokenId } }"
              class="neu"
              >Fill Up</router-link
            >
          </div>
          <div v-else>
            <!-- <button class="neu filled-up " disabled @click="fillUp">Filled Up</button> -->
            <router-link
              class="neu"
              :to="{
                name: 'Edit Pixel',
                params: { tokenId: pixel.tokenId, edit: true },
              }"
              >Edit</router-link
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onBeforeMount, onMounted, ref } from "@vue/runtime-core";
import setup from "../composables/setup";
import { useRouter } from "vue-router";
export default {
  setup() {
    const { cntrct, account, checkChain } = setup();
    const contract = cntrct.value;
    let tokens = [];
    const pixelCollection = ref("");
    const runningPixelation = ref(true);
    let error = ref("");
    const pixelArray = [];
    const pixels = [];
    const router = useRouter();
    let pixelObj

    const pixelation = async () => {
      error.value = "";
      try {
        runningPixelation.value = true;
        await checkChain();
        tokens = await contract.methods.getTokensByOwner(account.value).call();
        console.log(tokens);
        for (let token of tokens) {
          const pixel = await contract.methods.tokens(token).call();
          pixels.push(pixel);
        }
        for (let pixel of pixels) {
          pixelObj = await contract.methods.pixels(pixel.pixelId).call();
          if (pixelObj.ifpsHash !== "") {
            const url = "http://api.4themetaverse.xyz/get";
            const response = await fetch(url, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                ipfsHash: pixelObj.ifpsHash,
              }),
            });
            const jsonRes = await response.json();
            const completePixel = {
              ...pixelObj,
              ...jsonRes.data,
            };
            pixelArray.push(completePixel);
          }
          else{
            const completePixel = {
              ...pixelObj,
              message: "",
              color: "col_unknown",
              title: ""
            };
            pixelArray.push(completePixel);
          }
        }
        pixelArray.sort((a, b) => {
          return a.tokenId - b.tokenId;
        });
        console.log(pixelArray);
        pixelCollection.value = pixelArray;
        console.log(pixelCollection.value);
        runningPixelation.value = false;
      } catch (e) {
        console.log(e);
        error.value =
          "There was a problem fetching your data. Please sign in again after refreshing.";
        runningPixelation.value = false;
      }
    };

    onBeforeMount(() => {
      pixelation();
    });

    const fillUp = () => {
      router.push({ name: "FillUp", params: { tokenId: pixel.tokenId } });
    };

    return {
      runningPixelation,
      tokens,
      pixelCollection,
      fillUp,
    };
  },
};
</script>

<style scoped>
.note {
  margin-top: 2em;
}
.box {
  width: 280px;
  height: 280px;
  box-shadow: -6px -6px 14px rgba(255, 255, 255, 0.7),
    -6px -6px 10px rgba(255, 255, 255, 0.5),
    6px 6px 8px rgba(255, 255, 255, 0.075), 6px 6px 10px rgba(0, 0, 0, 0.15);
    margin-top: 10px;
}
.pixels {
  margin: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.tokenId {
  font-size: 1rem;
  margin-right: 1em;
}
.fill-up,
.filled-up {
  margin-top: 10px;
  padding: 0.4rem 0.8rem;
  border-radius: 3cm;
}
.filled-up {
  background-color: #cdcaca;
}
.filled-up:hover {
  cursor: not-allowed;
  box-shadow: -6px -6px 14px rgba(255, 255, 255, 0.7),
    -6px -6px 10px rgba(255, 255, 255, 0.5),
    6px 6px 8px rgba(255, 255, 255, 0.075), 6px 6px 10px rgba(0, 0, 0, 0.15);
}
.neu {
  margin: 0;
  padding: 0.8rem 2rem;
  border-radius: 0.2rem;
}
.quote {
  width: 280px;
  text-align: center;
}
.pixel-col {
  display: flex;
  flex-flow: wrap;
  justify-content: space-around;
  align-items: baseline;
}
.link{
  margin-bottom: 1.5em;
  width: 280px;
  text-align: center;
}
</style>
