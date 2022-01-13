<template>
  <div class="text-center">This is the FAQ page</div>
  <div>
    {{ account }}
  </div>
  <button>Click!</button>
</template>

<script>
import {
  onBeforeMount,
  onMounted,
  onRenderTriggered,
  ref,
} from "@vue/runtime-core";
import setup from "../composables/setup";
import { useRouter } from "vue-router";

export default {
  setup() {
    const { web3, handleInit } = setup();
    const account = ref('')
    const router = useRouter();

    const handleAccnt = async () => {
        const accounts = await web3.value
        console.log(accounts)
    }

    onMounted(() => {
        handleAccnt()
    });
    return { account  };
  },
};
</script>
