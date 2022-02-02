<template>
  <div class="qna mt-8">
    <div
      v-for="question in questions"
      :key="question.id"
      class="mt-2 w-2/3 m-auto"
    >
      <Disclosure as="div">
        <DisclosureButton
          class="flex disc-btn justify-between w-full px-4 py-2 text-sm font-medium text-left text-white bg-[#8249E4] rounded-lg focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75"
        >
          {{ question.question }}
          <!-- <ChevronDownIcon
                    :class="open ? 'transform rotate-180' : ''"
                    class="w-5 h-5 text-purple-100 arrow"
                /> -->
        </DisclosureButton>
        <DisclosurePanel class="px-4 pt-4 pb-2 text-sm text-gray-500">
          {{ question.answer }}
        </DisclosurePanel>
      </Disclosure>
    </div>
  </div>
</template>

<script>
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/vue";
import { questions } from "../composables/qna";

import { ChevronDownIcon } from "@heroicons/vue/solid";

export default {
  components: {
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    ChevronDownIcon,
  },
  setup() {
    return {
      questions,
    };
  },
};
</script>

<style>
.arrow {
  transition: transform 0.2s ease-in-out;
  width: 1.25rem;
  height: 1.25rem;
}
.disc-btn {
  box-shadow: -6px -6px 14px rgba(255, 255, 255, 0.7),
    -6px -6px 10px rgba(255, 255, 255, 0.5),
    6px 6px 8px rgba(255, 255, 255, 0.075), 6px 6px 10px rgba(0, 0, 0, 0.15);
}
.disc-btn:hover {
  box-shadow: -2px -2px 6px rgba(255, 255, 255, 0.6),
    -2px -2px 4px rgba(255, 255, 255, 0.4),
    2px 2px 2px rgba(255, 255, 255, 0.05), 2px 2px 4px rgba(0, 0, 0, 0.1);
}
.disc-btn:active{
    box-shadow: inset -2px -2px 6px rgba(255, 255, 255, 0.7),
    inset -2px -2px 4px rgba(255, 255, 255, 0.5),
    inset 2px 2px 2px rgba(255, 255, 255, 0.075),
    inset 2px 2px 4px rgba(0, 0, 0, 0.15);
}
</style>
