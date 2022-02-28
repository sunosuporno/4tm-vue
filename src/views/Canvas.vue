<template>
<div class="time">
  <p>🚀</p>
    <p>
     <span>{{ timeLeft }}</span>
  </p>
</div>
</template>

<script>
import { ref } from "@vue/reactivity";
export default {
  setup() {
    const timeLeft = ref("");
    var countDownDate = new Date("Mar 5, 2022 12:00:00").getTime();

    var x = setInterval(function () {
      var now = new Date().getTime();

      var distance = countDownDate - now;

      var days = Math.floor(distance / (1000 * 60 * 60 * 24));
      var hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((distance % (1000 * 60)) / 1000);

      timeLeft.value =
        days + "d " + hours + "h " + minutes + "m " + seconds + "s ";

      if (distance < 0) {
        clearInterval(x);
        timeLeft.value = "EXPIRED";
      }
    }, 1000);

    return {
      timeLeft,
    };
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Rajdhani:wght@500;600;700&display=swap");
.time{
  font-family: "Rajdhani", sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 10rem;
  font-weight: 600;
  height: 90vh;
  width:100vw;
  
}
span {
  background: -webkit-linear-gradient(45deg, #d3d023 20%, #bb19ec, #00ff95 80%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

@media screen and (max-width: 768px) {
  .time {
    font-size: 5rem;
  }
}
  

</style>