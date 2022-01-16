<template>
    <div class="qna mt-8">
        <div v-for="question in questions" :key="question.id" class="mt-2 w-2/3 m-auto">
            <Disclosure as="div"  v-slot="{ open }">
                <DisclosureButton
                class="flex justify-between w-full px-4 py-2 text-sm font-medium text-left text-white bg-[#8249E4] rounded-lg hover:bg-purple-800 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75"
                >
                {{ question.question }}
                <ChevronDownIcon
                    :class="open ? 'transform rotate-180' : ''"
                    class="w-5 h-5 text-purple-100"
                />
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

<style></style>
