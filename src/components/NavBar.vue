<template>
  <header className="flex p-6 font-body">
    <span className="flex flex-grow">
      <img src="../assets/logo-4tm.png" className="h-6 w-6 mr-2" alt="logo-web" />
      <router-link :to="{ name: 'Home' }">4TheMetaverse</router-link>
    </span>
    <nav>
      <ul className = " flex flex-col md:flex-row">
        <li className = "mb-6 md:mb-0 md:ml-16">
            <router-link :to="{ name: 'Canvas' }">Canvas</router-link>
        </li>
        <li className = "mb-6 md:mb-0 md:ml-16">
            <router-link :to="{ name: 'Mint' }">Mint</router-link>
        </li>
        <li className = "mb-6 md:mb-0 md:ml-16">
            <router-link :to="{ name: 'FAQ' }">FAQ</router-link>
        </li>
        <li className = "mb-6 md:mb-0 md:ml-16">
            <router-link :to="{ name: 'GM' }">GM</router-link>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {};
</script>
