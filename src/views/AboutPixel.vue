<template>
  <div class="container">
    <div v-if="isFetching">
      <p class="text-3xl fetch">Fetching Pixel Data...</p>
    </div>
    <div v-else>
      <div
        v-if="noPixel"
        class="flex flex-col justify-center items-center no-pixel"
      >
        <p class="text-3xl mr-3">This Pixel does not exist yet</p>
        <img src="../assets/crying-bw.png" type="image/png" alt="sed" />
      </div>
      <div v-else>
        <p class="text-center text-2xl owner">Owned by {{ pixel.owner }}</p>
        <div class="flex items-center about-pixel">
          <div class="flex flex-col items-center left-col">
            <p class="text-xl">Pixel No: {{ pixel.number }}</p>
            <p class="text-xl">NFT #{{ pixel.tokenId }}</p>
            <div :class="pixel.color" class="pixel"></div>
          </div>
          <div class="flex flex-col text-xl right-col">
            <p class="message title">
              <span class="text-[#8249E4]">Name:</span> {{ pixel.title }}
            </p>
            <p class="message">
              <span class="text-[#8249E4]">Message:</span> {{ pixel.message }}
            </p>
            <p>
              <span class="text-[#8249E4]">Link:</span>
              <span class="text-lg"> Here will be a link</span>
            </p>
          </div>
        </div>
      </div>
      <div class="explore">
        <p class="text-xl">Explore another pixel:</p>
        <form>
          <p>Enter a number between 1 and {{ totalPixels }}</p>
          <input
            type="number"
            v-model="pixelNum"
            min="1"
            max="{{totalPixels.value}}"
            class="input"
            required
          />
          <div v-if="error" class="error">{{ error }}</div>
          <button type="button" @click="fetchPixel" class="neu">Explore</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from "@vue/runtime-core";
import canvasSetup from "../composables/canvasSetup";
import { useRouter } from "vue-router";
export default {
  props: ["pixelId"],
  setup(props) {
    const error = ref("");
    const pixelNum = ref("");
    const isFetching = ref(true);
    const router = useRouter();
    const pixelId = props.pixelId;
    const { contract } = canvasSetup();
    const pixel = ref("");
    const totalPixels = ref("");
    const noPixel = ref(false);

    onMounted(async () => {
      error.value = "";
      try {
        console.log(pixel.value);
        const tempPixel = await contract.methods.pixels(pixelId).call();
        if (tempPixel.tokenId == 0) {
          noPixel.value = true;
        } else {
          const url = "http://api.4themetaverse.xyz/get";
          const response = await fetch(url, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              ipfsHash: tempPixel.ifpsHash,
            }),
          });
          const data = await response.json();
          pixel.value = {
            ...tempPixel,
            message: data.data.message,
            title: data.data.title,
            color: data.data.color,
          };
          console.log(pixel);
        }
        totalPixels.value = await contract.methods.totalSupply().call();
        console.log(totalPixels.value);
        isFetching.value = false;
      } catch (err) {
        error.value = err.message;
        isFetching.value = false;
      }
    });

    const fetchPixel = () => {
      console.log(typeof pixelNum.value);
      if (
        pixelNum.value > totalPixels.value ||
        pixelNum.value < 1 ||
        typeof pixelNum.value != "number"
      ) {
        error.value =
          "Please enter a number between 1 and " + totalPixels.value;
      } else {
        const forward = router.resolve({
          name: "AboutPixel",
          params: {
            pixelId: pixelNum.value,
          },
        });
        window.open(forward.href, "_blank");
      }
    };

    return {
      error,
      isFetching,
      pixelId,
      pixel,
      totalPixels,
      pixelNum,
      fetchPixel,
      noPixel,
    };
  },
};
</script>

<style scoped>
.pixel {
  width: 20em;
  height: 20em;
  box-shadow: -6px -6px 14px rgba(255, 255, 255, 0.7),
    -6px -6px 10px rgba(255, 255, 255, 0.5),
    6px 6px 8px rgba(255, 255, 255, 0.075), 6px 6px 10px rgba(0, 0, 0, 0.15);
}
.owner {
  margin-top: 1.25em;
  margin-bottom: 2.1em;
}
.about-pixel {
  width: 90%;
  margin: 0 auto;
}
.left-col {
  padding-left: 2em;
}
.right-col {
  margin-left: 4em;
}
.message {
  margin-bottom: 2em;
}
.title {
  font-size: large;
}
.fetch {
  text-align: center;
  margin-top: 10em;
}
img {
  width: 200px;
  height: 200px;
  margin: 0;
  margin-top: 0.75em;
}
.no-pixel {
  margin-top: 10em;
}
.explore {
  width: 90%;
  margin: 0 auto;
  text-align: center;
  margin-top: 2em;
}
.input {
  width: 100%;
  padding: 0.5em;
  margin-bottom: 1em;
  background-color: #efefef;
  box-shadow: inset -2px -2px 6px rgba(255, 255, 255, 0.7),
    inset -2px -2px 4px rgba(255, 255, 255, 0.5),
    inset 2px 2px 2px rgba(255, 255, 255, 0.075),
    inset 2px 2px 4px rgba(0, 0, 0, 0.15);
}
input:focus {
  outline: none;
}
</style>
