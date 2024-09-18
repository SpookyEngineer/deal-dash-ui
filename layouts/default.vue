<template>
  <div class="flex">
    <Sidebar class="hidden md:block" :menuItems="menuItems" />
    <SidebarMobile class="md:hidden" :menuItems="menuItems" />
    <main class="p-16 md:ml-[210px] flex-grow">
      <NuxtPage />
    </main>
  </div>
</template>

<script setup lang="ts">
const menuItems = [{ label: "Loja de Deals", route: "/", icon: "deals" }];
</script>
