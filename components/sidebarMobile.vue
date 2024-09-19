<template>
  <div>
    <!-- Menu Button -->
    <button @click="toggleSidebar" class="menu-button">
      <img src="../public/icons/menu.svg" alt="Menu" />
    </button>

    <!-- Sidebar -->

    <TransitionSlide :offset="['-100%', 0]">
      <aside v-if="isSidebarOpen" class="sidebar">
        <!-- Close Button inside the sidebar -->
        <button @click="toggleSidebar" class="close-button">
          <img src="../public/icons/menu.svg" alt="Close" />
        </button>

        <!-- Navigation -->
        <nav class="mt-12">
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
      </aside>
    </TransitionSlide>

    <!-- Overlay -->
    <TransitionFade>
      <div
        v-if="isSidebarOpen"
        class="overlay fixed inset-0 bg-betpass-grey opacity-[.81] w-full"
      ></div>
    </TransitionFade>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

interface Props {
  SidebarMenuItems: SidebarMenuItem[];
}

const props = defineProps<Props>();

const isSidebarOpen = ref(false);

function toggleSidebar() {
  isSidebarOpen.value = !isSidebarOpen.value;
}
</script>

<style scoped>
.menu-button {
  position: fixed;
  top: 16px;
  left: 16px;
  background: none;
  border: none;
  cursor: pointer;
  z-index: 5;
}

.close-button {
  position: absolute;
  top: 16px;
  left: 16px;
  background: none;
  border: none;
  cursor: pointer;
}

.sidebar {
  @apply p-6 bg-gradient-to-br from-betpass-grey to-betpass-dark-grey rounded-r-3xl;
  width: 210px;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background-color: #f5f5f5;
  z-index: 20;
}

nav ul {
  list-style-type: none;
  padding: 0;
}

nav ul li {
  margin: 1rem 0;
}
</style>
