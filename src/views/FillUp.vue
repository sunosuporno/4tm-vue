<template>
  <div class="container">
    <div class="text-2xl">Give your pixel some personality!</div>
    <form class="form">
      <span class="text-3xl">{{ token }}</span
      ><br />
      <span class="text-xl">Name Your Pixel</span><br />
      <input
        class="text_input"
        type="text"
        required
        v-model="title"
        placeholder="(*ﾟ▽ﾟ*)"
      />
      <span class="text-xl">Your message/quote</span><br />
      <input
        class="text_input"
        type="text"
        required
        v-model="message"
        placeholder="Type anything really. A shameless plug, a message for your crush or just lyrics of a banger....make it immortal on the chain!"
      /><br />
      <span class="text-xl">Link</span><br />
      <input
        class="text_input"
        type="url"
        required
        v-model="link"
        placeholder="We need the sauce! (source we mean 😅)"
      /><br />
      <div>
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
                required
              />
            </div>
          </div>
        </div>
      </div>
      <p class="error" v-if="error">{{ error }}</p>
      <div class="btn" v-if="!edit">
        <button v-if="!submitting" class="neu" @click.prevent="submitFillUp()">
          Submit
        </button>
        <button v-if="submitting" class="disabled neu" disabled>
          Submitting....
        </button>
      </div>
      <div class="btn" v-if="edit">
        <button v-if="!submitting" class="neu" @click.prevent="sendEdit()">
          Edit
        </button>
        <button v-if="submitting" class="disabled neu" disabled>
          Editing....
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { colors } from "../composables/colors";
import { onMounted, ref } from "vue";
import setup from "../composables/setup";
import fillUpPixel from "../composables/fillUpPixel";
import { useRouter } from "vue-router";
export default {
  props: ["tokenId", "edit"],
  setup(props) {
    const router = useRouter();
    const token = props.tokenId;
    const edit = props.edit;
    const message = ref("");
    const colorName = ref("");
    const link = ref("");
    const { error, sendFilledUp, editPixel } = fillUpPixel();
    const submitting = ref(false);
    const { init } = setup();
    const title = ref("");

    const editValue = (colorClass) => {
      colorName.value = colorClass;
    };

    onMounted(async () => {
      await init();
      console.log(edit);
    });

    const submitFillUp = async () => {
      error.value = "";
      if (
        message.value === "" ||
        colorName.value === "" ||
        title.value === ""
      ) {
        error.value = "Please fill up the pixel fully at one go.";
        return;
      }
      submitting.value = true;
      const tkn = token;
      const msg = message.value;
      const clrNm = colorName.value;
      const ttl = title.value;
      const lnk = link.value;
      const res = await sendFilledUp(tkn, msg, clrNm, ttl, lnk);
      console.log(res);
      if (!error.value) {
        router.push({ name: "Mint" });
        error.value = "";
      }
      submitting.value = false;
    };

    const sendEdit = async () => {
      error.value = "";
      if (message.value === "" || title.value === "") {
        error.value = "Please fill up the pixel fully at one go.";
        return;
      }
      submitting.value = true;
      const tkn = token;
      const msg = message.value;
      const ttl = title.value;
      const clr = colorName.value;
      const lnk = link.value;
      const res = await editPixel(tkn, msg, ttl, clr, lnk);
      console.log(res);
      if (!error.value) {
        router.push({ name: "Mint" });
        error.value = "";
      }
      submitting.value = false;
    };

    return {
      submitting,
      error,
      token,
      colors,
      editValue,
      submitFillUp,
      message,
      colorName,
      edit,
      title,
      sendEdit,
      link,
    };
  },
};
</script>

<style scoped>
.form {
  margin-top: 3em;
}
.text_input {
  width: 100%;
  padding: 0.5em;
  margin-bottom: 2em;
  background-color: #efefef;
  box-shadow: inset -2px -2px 6px rgba(255, 255, 255, 0.7),
    inset -2px -2px 4px rgba(255, 255, 255, 0.5),
    inset 2px 2px 2px rgba(255, 255, 255, 0.075),
    inset 2px 2px 4px rgba(0, 0, 0, 0.15);
}
.text_input:focus {
  outline: none;
}
.palette {
  width: 80px;
  height: 80px;
  box-shadow: -6px -6px 14px rgba(255, 255, 255, 0.7),
    -6px -6px 10px rgba(255, 255, 255, 0.5),
    6px 6px 8px rgba(255, 255, 255, 0.075), 6px 6px 10px rgba(0, 0, 0, 0.15);
  border-radius: 0.5cm;
  margin: 1em;
}
.pixel_box {
  margin: 0.5rem;
}

.disabled {
  text-align: center;
  display: block;
  margin: 2em auto;
  margin-right: 2cm;
  cursor: not-allowed;
  background-color: #c4c4c4;
}
.disabled:hover {
  box-shadow: -6px -6px 14px rgba(255, 255, 255, 0.7),
    -6px -6px 10px rgba(255, 255, 255, 0.5),
    6px 6px 8px rgba(255, 255, 255, 0.075), 6px 6px 10px rgba(0, 0, 0, 0.15);
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
  box-shadow: inset 1em 1em #8249e4;
}
input[type="radio"]:checked::before {
  transform: scale(1);
}
.btn {
  width: fit-content;
  margin: auto;
  margin-top: 20px;
}
</style>
