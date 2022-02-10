<template>
  <div class="container">
    <div class="flex flex-wrap">
      <div v-for="pixel in pixels" :key="pixel.pixelNum">
        <div
          :class="pixel.color"
          class="canvas_pixel"
          @click="showAboutPixel(pixel.pixelNum)"
          @mouseenter="showAbout(pixel.pixelNum)"
          @mouseleave="closeIt()"
        ></div>
      </div>
    </div>
  </div>
  <div class="about" v-if="show">
    {{pixelNum}}
  </div>
</template>

<script>
import { onMounted, ref } from "@vue/runtime-core";
import canvasSetup from "../composables/canvasSetup";
import { useRouter } from "vue-router";
import AboutPixel from "../components/AboutPixel.vue";
export default {
  // components: { AboutPixel },
  setup() {
    const show = ref(false);
    const { contract, getCanvas, pixels } = canvasSetup();
    const router = useRouter();
    let canvasPixels = [];
    let canvasSize = [];
    const isOpen = ref(false);
    const pixelNum = ref('');

    const populateCanvas = () => {
      for (let i = canvasSize + 1; i <= 100000; i++) {
        canvasPixels.push({
          pixelNum: i,
          color: "col_white",
        });
      }
    };

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
      canvasSize = console.log(pixels.value.length);
      const res = populateCanvas();
      console.log(canvasPixels);
    });

    const showAbout = (pixelId) => {
        pixelNum.value = pixelId;
        console.log(pixelNum.value);
        show.value = true;
    }
    const closeIt = () => {
      show.value = false;
    }
    return {
      pixels,
      showAboutPixel,
      showAbout,
      show,
      pixelNum,
      closeIt
    };
  },
};
</script>

<style>
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
}
.about{
  position: fixed;
    background-color: blue;
    bottom: 0;
    width: 100%;
    text-align: center;
    height: fit-content;
    color: white;
}
</style>
