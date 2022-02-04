<template>
  <header className="flex p-6 font-body">
    <span className="flex flex-grow no-underline header">
      <img
        src="../assets/logo-4tm.png"
        className="h-6 w-6 mr-2"
        alt="logo-web"
      />
      <router-link :to="{ name: 'Home' }">4TheMetaverse</router-link>
    </span>
    <!-- <div v-if="innerWidth.valueOf() < 600" @click="handleNav">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M4 6h16M4 12h16M4 18h16"
        />
      </svg>
    </div> -->
    <nav>
      <ul className="flex flex-col md:flex-row">
        <li class="mb-6 md:mb-0 md:ml-16">
          <a href="#"><img src="../assets/twitter.svg" class="twitter" target = "”_blank”" alt="Keep up to date on Twitter!"></a>
        </li>
        <li class="mb-6 md:mb-0 md:ml-16">
          <a href="#"><img src="../assets/discord.svg" class="discord" target = "_blank" alt="Join the party in Discord!"></a>
        </li>
        <li className="mb-6 md:mb-0 md:ml-16 links" @click="handleClick">
          <router-link :to="{ name: 'Canvas' }">Canvas</router-link>
        </li>
        <li className="mb-6 md:mb-0 md:ml-16 links" @click="handleClick">
          <router-link :to="{ name: 'Mint' }">Mint</router-link>
        </li>
        <li className="mb-6 md:mb-0 md:ml-16 links" @click="handleClick">
          <router-link :to="{ name: 'FAQ' }">FAQ</router-link>
        </li>
        <li className="mb-6 md:mb-0 md:ml-16 links" @click="handleClick">
          <router-link :to="{ name: 'GM' }">GM</router-link>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
import { ref, watch } from "@vue/runtime-core";
import { useRouter } from "vue-router";
import fillUpPixel from "../composables/fillUpPixel";


export default {
  setup() {
    const router = useRouter();
    const currentName = ref("");
    // const showNav = ref(false);
    const { error } = fillUpPixel();

    const handleClick = () => {
      if (error.value !== "") {
        error.value = "";
      }
    };

    watch(
      () => router.currentRoute.value.name,
      (name) => {
        currentName.value = name;
        console.log(currentName.value);
      }
    );
    console.log(router.currentRoute.value.name);


    // const innerWidth = ref(window.innerWidth);
    // console.log(innerWidth.value);
    // const handleNav = () => {
    //   console.log('running')
    //   showNav.value = true;
    // };

    return {
      currentName,
      handleClick,
      innerWidth,
    };
  },
};
</script>

<style>
.links:hover {
  color: #8249e4;
}
.twitter, .discord{
  width:30px
}
</style>
