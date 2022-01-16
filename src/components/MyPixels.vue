<template>
  <div v-for="pixel in pixels" :key="pixel.tokenId" class="pixels">
    <div class="flex">
      <p class="tokenId">{{ pixel.tokenId }}</p>
      <div class="flex flex-col items-center">
        <div class="box border-2" :class="pixel.color"></div>
        <div>message: {{ pixel.message }}</div>
        <div v-if="pixel.message === ''">
          <router-link
            :to="{ name: 'FillUp', params: { tokenId: pixel.tokenId } }"
            class="fill-up"
            >Fill Up</router-link
          >
        </div>
        <div v-else>
          <button class="filled-up" disabled @click="fillUp">Filled Up</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from "@vue/runtime-core";
import setup from "../composables/setup";
import { useRouter } from "vue-router";
export default {
  setup() {
    const { contract, account } = setup();
    let tokens = [];
    let pixels = ref([]);
    const router = useRouter();

    onMounted(() => {
      contract.methods
        .getTokensByOwner(account.value)
        .call()
        .then((res) => {
          tokens = res;
          console.log(tokens);
        });
    });

    const pixelation = () => {
      pixels.value = [];
      tokens.forEach((token) => {
        contract.methods
          .pixels(token)
          .call()
          .then((res) => {
            pixels.value.push(res);
          });
      });
      console.log(pixels.value);
    };
    setTimeout(pixelation, 1500);

    const fillUp = () => {
      router.push({ name: "FillUp", params: { tokenId: pixel.tokenId } });
    };

    return {
      pixels,
      fillUp,
    };
  },
};
</script>

<style>
.box {
  width: 280px;
  height: 280px;
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
  border: 3px solid #000;
  padding: 0.05rem 0.4rem;
  border-radius: 3cm;
}
.filled-up {
  background-color: #cdcaca;
}
.filled-up:hover {
  cursor: not-allowed;
}
</style>
