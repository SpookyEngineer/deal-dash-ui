<template>
  <div class="sidebar">
    <nav>
      <ul>
        <li v-for="(item, index) in SidebarMenuItems" :key="index">
          <div class="flex">
            <img :src="`/icons/${item.icon}.svg`" />
            <NuxtLink
              class="pl-3 text-betpass-green font-bold"
              :to="item.route"
              >{{ item.label }}</NuxtLink
            >
          </div>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script setup lang="ts">
interface Props {
  SidebarMenuItems: SidebarMenuItem[];
}

const props = defineProps<Props>();
</script>

<style scoped>
.sidebar {
  @apply p-6 bg-gradient-to-br from-betpass-grey to-betpass-dark-grey rounded-r-3xl;

  width: 210px;
  background-color: #f5f5f5;
  height: 100vh;
  position: fixed;
}
nav ul {
  list-style-type: none;
  padding: 0;
}
nav ul li {
  margin: 1rem 0;
}
</style>
