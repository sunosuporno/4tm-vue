<template>
  <header className="flex p-6 font-body">
    <span className="flex flex-grow no-underline header">
      <img src="../assets/logo-4tm.png" className="h-6 w-6 mr-2" alt="logo-web" />
      <router-link :to="{ name: 'Home' }">4TheMetaverse</router-link>
    </span>
    <nav>
      <ul className = " flex flex-col md:flex-row">
        <li className = "mb-6 md:mb-0 md:ml-16 links">
            <router-link :to="{ name: 'Canvas' }">Canvas</router-link>
        </li>
        <li className = "mb-6 md:mb-0 md:ml-16 links">
            <router-link :to="{ name: 'Mint' }">Mint</router-link>
        </li>
        <li className = "mb-6 md:mb-0 md:ml-16 links">
            <router-link :to="{ name: 'FAQ' }">FAQ</router-link>
        </li>
        <li className = "mb-6 md:mb-0 md:ml-16 links">
            <router-link :to="{ name: 'GM' }">GM</router-link>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
import { ref, watch } from '@vue/runtime-core';
import { useRouter } from "vue-router";
export default {
  setup() {
    const router = useRouter()
    const currentName = ref('')

    watch(() =>router.currentRoute.value.name, (name) => {
      currentName.value = name
      console.log(currentName.value)
    })
    console.log(router.currentRoute.value.name)



    return {
      currentName
    }
  }
  
  
};
</script>

