<template>
<p class="note">The way how pixels show up on the canvas does not depend on their token number, but in the order of getting filled up.</p>
<!-- <p v-if="!runningPixelation">
  Fetching your data
</p> -->
  <div v-for="pixel in pixels" :key="pixel.tokenId" class="pixels">
    <div class="flex flex-col items-center">
      <p class="tokenId">{{ pixel.tokenId }}</p>
        <div class="box" :class="pixel.color"></div>
        <div class="quote">message: {{ pixel.message }}</div>
        <div v-if="pixel.message === ''">
          <router-link
            :to="{ name: 'FillUp', params: { tokenId: pixel.tokenId } }"
            class="neu"
            >Fill Up</router-link>
        </div>
        <div v-else>
          <button class="neu filled-up " disabled @click="fillUp">Filled Up</button>
        </div>
    </div>
  </div>
</template>

<script>
import { onBeforeMount, ref} from "@vue/runtime-core";
import setup from "../composables/setup";
import { useRouter } from "vue-router";
export default {
  setup() {
    const { cntrct, account, checkChain } = setup();
    const contract = cntrct.value
    let tokens = []
    let pixels = ref([]);
    let runningPixelation = ref(false);
    let error = ref('')
    const router = useRouter();

    onBeforeMount(async() => {
      error.value = ''
      await checkChain();
      contract.methods
        .getTokensByOwner(account.value)
        .call()
        .then((res) => {
          tokens = res;
          console.log(tokens);
        }).catch(() => {
            error.value = "There was a proble fetching your data. Please sign in again after refreshing.";
          });
    });


    const pixelation = async () => {
      error.value = ''
      await checkChain();
      runningPixelation.value = true;
      pixels.value = [];
      tokens.forEach((token) => {
        contract.methods
          .pixels(token)
          .call()
          .then((res) => {
            pixels.value.push(res);
          }).catch(() => {
            error.value = "There was a problem fetching your data. Please sign in again after refreshing.";
          });
      });
      console.log(pixels.value);
      runningPixelation.value = false;
    };


    setTimeout(() => {
      pixelation();
      console.log("running")
    }, 2500);

    const fillUp = () => {
      router.push({ name: "FillUp", params: { tokenId: pixel.tokenId } });
    };

    return {
      runningPixelation,
      tokens,
      pixels,
      fillUp,
    };
  },
};
</script>

<style scoped>
.note{
  margin-top: 2em;
}
.box {
  width: 280px;
  height: 280px;
  box-shadow: -6px -6px 14px rgba(255, 255, 255, 0.7),
    -6px -6px 10px rgba(255, 255, 255, 0.5),
    6px 6px 8px rgba(255, 255, 255, 0.075), 6px 6px 10px rgba(0, 0, 0, 0.15);
}
.pixels {
  margin: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.tokenId {
  font-size: 1.6rem;
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
.neu{
  margin: 0;
  padding: 0.8rem 2rem;
  border-radius: 0.2rem;
}
.quote{
  margin: 1.5em;
}
</style>
