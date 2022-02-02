<template>
  <div class="container">
    <div class="flex flex-wrap">
      <div v-for="pixel in pixels" :key="pixel.pixelNum">
        <div :class="pixel.color" class="canvas_pixel" ></div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted } from "@vue/runtime-core";
import canvasSetup from "../composables/canvasSetup";
export default {
  setup() {
    const { contract, getCanvas, pixels } = canvasSetup();
    let canvasPixels = [];
    let canvasSize = [];

    const populateCanvas = () => {
      for(let i = canvasSize + 1; i <= 100000; i++ ){
        canvasPixels.push({
          pixelNum: i,
          color: "col_white",
        });
      }
    }

    onMounted( async () => {
      getCanvas();
      canvasSize = console.log(pixels.value.length);
      const res = populateCanvas()
      console.log(canvasPixels);
    });
    return {
      pixels,
    };
  },
};
</script>

<style>
.canvas_pixel {
  width: 10px;
  height: 10px;
}
</style>
