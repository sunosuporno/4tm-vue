<template>
  <div
    v-if="isFetchingAllPixels"
    class="flex flex-col justify-center items-center"
  >
    <p class="text-3xl fetch">Fetching all the pixels. Might take a minute</p>
    <img
      src="../assets/ready.jpeg"
      alt="Let's Fucking Go!"
      type="image/jpeg"
      class="lfg"
    />
  </div>
  <div v-else>
    <div class="canvas-container">
      <div class="flex flex-wrap">
        <div v-for="pixel in pixels" :key="pixel._id">
          <div
            :class="pixel.color"
            class="canvas_pixel"
            @click="showAboutPixel(pixel._id)"
            @mouseenter="showAbout(pixel._id, pixel.color)"
            @mouseleave="closeIt()"
          ></div>
        </div>
      </div>
    </div>
    <div class="about" v-if="show">
      {{ pixelNum }}
      <div v-if="isBought">
        <div class="flex justify-evenly">
          <p>Pixel Name: {{ onePixel.title }}</p>
          <p>Message: {{onePixel.message}}</p>
            Click/Long-click to Know More
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from "@vue/runtime-core";
import canvasSetup from "../composables/canvasSetup";
import { useRouter } from "vue-router";

export default {
  setup() {
    const show = ref(false);
    const {
      contract,
      getCanvas,
      pixels,
      isFetchingAllPixels,
      isSortingAllPixels,
      isRendering,
    } = canvasSetup();

    const router = useRouter();
    const pixelNum = ref("");
    const onePixel = ref("");
    const isBought = ref(false);

    const showAboutPixel = (pixel) => {
      const forward = router.resolve({
        name: "AboutPixel",
        params: {
          pixelId: pixel,
        },
      });
      window.open(forward.href, "_blank");
    };

    onMounted(async () => {
      getCanvas();
    });

    const showAbout = async (pixelId, color) => {
      console.log(pixelId);
      pixelNum.value = pixelId;
      show.value = true;

      if (color !== "col_unknown") {
        const pixel = await contract.methods.pixels(pixelId).call();
        console.log(pixel)
        const url = "http://localhost:8080/get"
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ipfsHash: pixel.ifpsHash,
          }),
        });
        const data = await response.json();
        onePixel.value = {
          ...pixel,
          message: data.data.message,
          title: data.data.title,
        };
        isBought.value = true;
      }
    };

    const closeIt = () => {
      show.value = false;
      isBought.value = false;
    };

    return {
      pixels,
      showAboutPixel,
      showAbout,
      show,
      pixelNum,
      closeIt,
      onePixel,
      isFetchingAllPixels,
      isSortingAllPixels,
      isRendering,
      isBought,
    };
  },
};
</script>

<style>
.canvas-container {
  margin: auto;
  margin-bottom: 4em;
  width: 1250px;
}
.canvas_pixel {
  width: 5px;
  height: 5px;
}
.canvas_pixel:hover,
.canvas_pixel:active {
  cursor: crosshair;
  box-shadow: -6px -6px 14px rgba(255, 255, 255, 0.7),
    -6px -6px 10px rgba(255, 255, 255, 0.5),
    6px 6px 8px rgba(255, 255, 255, 0.075), 6px 6px 10px rgba(0, 0, 0, 0.15);
  border: 1px solid rgb(245, 8, 8);
}
.about {
  position: fixed;
  background-color: #8249e4;
  bottom: 0;
  width: 100%;
  text-align: center;
  height: fit-content;
  color: white;
}
.lfg {
  width: 12em;
}
.fetch {
  text-align: center;
  margin-top: 7em;
  margin-bottom: 1em;
}
.is-ready {
  margin-top: 10em;
}
</style>
