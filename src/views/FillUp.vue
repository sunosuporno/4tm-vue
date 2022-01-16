<template>
  <div class="container">
    <div class="text-2xl">Give your pixel some personality!</div>
    <form class="form" >
      <span class="text-3xl">{{ token }}</span
      ><br />
      <span class="text-xl">Your message/quote</span><br />
      <input
        class="text_input"
        type="text"
        required
        v-model="message"
        placeholder="Type anything really. A shameless plug, a message for your crush or just lyrics of some banger....make it immortal on the chain!"
      /><br />
      <label class="colorpicker text-xl">Choose a color</label><br />
      <div class="flex flex-wrap items-centre justify-center">
        <div v-for="color in colors" :key="color.id" class="pixel_box">
          <div class="flex items-center">
            <div class="palette" :class="color.class"></div>
            <input
              type="radio"
              @click="editValue(color.class)"
              name="button"
              :id="color.class"
              value=" "
            />
          </div>
        </div>
      </div>
      <div class="btn">
        <button class="submit" @click.prevent="submitFillUp()">Submit</button>
      </div>
    </form>
  </div>
</template>

<script>
import { colors } from "../composables/colors";
import { ref } from "vue";
import fillUpPixel from "../composables/fillUpPixel";
import { useRouter } from "vue-router";
export default {
  props: ["tokenId"],
  setup(props) {
    const router = useRouter();
    const token = props.tokenId;
    const message = ref("");
    const colorName = ref("");
    const {error, sendFilledUp} = fillUpPixel();

    const editValue = (colorClass) => {
      colorName.value = colorClass;
    };

    const submitFillUp = async () => {
      const tkn = token
      const msg = message.value
      const clrNm = colorName.value
      const res = await sendFilledUp(tkn, msg, clrNm);
      console.log(res);
      if(!error.value) {
        router.push({name: 'Mint'})
      }
    };

    return {
      token,
      colors,
      editValue,
      submitFillUp,
      message,
      colorName,
    };
  },
};
</script>

<style>
.container {
  margin: auto;
  max-width: 85%;
  margin-bottom: 2em;
}
.form {
  margin-top: 3em;
}
.text_input {
  width: 100%;
  border-bottom: rgb(146, 18, 219) solid 3px;
  margin-bottom: 2em;
}
.palette {
  width: 80px;
  height: 80px;
  border: 10px double rgb(51, 49, 49);
  border-radius: 0.5cm;
  margin: 1em;
}
.pixel_box {
  margin: 0.5rem;
}
.submit {
  text-align: center;
  margin-top: 2em;
  color: rgb(8, 8, 8);
  border: 2px solid black;
  border-radius: 3rem;
  padding: 0.5rem 1rem;
  font-size: 1.5rem;
  cursor: pointer;
}
.btn {
  margin: auto;
  width: 12%;
}
input[type="radio"] {
  appearance: none;
  width: 1.15em;
  height: 1.15em;
  border: 2px solid black;
  border-radius: 3px;
  color: blue;
  display: grid;
  place-content: center;
}
input[type="radio"]::before {
  content: "";
  width: 0.65em;
  height: 0.65em;
  border-radius: 2px;
  transform: scale(0);
  transition: 120ms transform ease-in-out;
  box-shadow: inset 1em 1em #8249E4;
}
input[type="radio"]:checked::before {
  transform: scale(1);
}
</style>
