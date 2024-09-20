<template>
  <div class="flex">
    <Sidebar class="hidden md:block" :SidebarMenuItems="SidebarMenuItems" />
    <SidebarMobile class="md:hidden" :SidebarMenuItems="SidebarMenuItems" />
    <main class="p-16 md:ml-[210px] flex-grow">
      <NuxtPage />
    </main>
  </div>
</template>

<script setup lang="ts">
const SidebarMenuItems = [
  { label: "Loja de Deals", route: "/", icon: "deals" },
];
</script>
