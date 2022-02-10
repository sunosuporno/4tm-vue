<template>
  <Dialog :open="isOpen" @close="setIsOpen">
    <DialogOverlay />

    <DialogTitle>{{ pixelId }}</DialogTitle>
    <DialogDescription>
      This will permanently deactivate your account
    </DialogDescription>

    <p>
      Are you sure you want to deactivate your account? All of your data will be
      permanently removed. This action cannot be undone.
    </p>

    <!--
      You can render additional buttons to dismiss your dialog by setting your
      `isOpen` state to `false`. 
    -->
    <button @click="setIsOpen(false)">Close</button>
  </Dialog>
</template>

<script>
import { ref } from "vue";
import {
  Dialog,
  DialogOverlay,
  DialogTitle,
  DialogDescription,
} from "@headlessui/vue";
export default {
  components: { Dialog, DialogOverlay, DialogTitle, DialogDescription },
  props: ["isOpen", "pixelId"],
  setup() {
      console.log(pixelId)
    // const isOpen = isOpen
    // const setIsOpen = (value) => {
    //   isOpen.value = value;
    // };

    return {
        pixelId
    };
  },
};
</script>

<style></style>
