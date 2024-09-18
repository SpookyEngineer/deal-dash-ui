<template>
  <div>
    <!-- Menu Button -->
    <button @click="toggleSidebar" class="menu-button">
      <img src="../public/icons/menu.svg" alt="Menu" />
    </button>

    <!-- Sidebar with transition -->
    <aside
      :class="{
        'sidebar-open': isSidebarOpen,
        'sidebar-closed': !isSidebarOpen,
      }"
      class="sidebar"
    >
      <!-- Close Button inside the sidebar -->
      <button @click="toggleSidebar" class="close-button">
        <img src="../public/icons/menu.svg" alt="Close" />
      </button>

      <!-- Navigation -->
      <nav class="mt-12">
        <ul>
          <li v-for="(item, index) in menuItems" :key="index">
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

// Define menu items and sidebar state
const menuItems = [{ label: "Loja de Deals", route: "/", icon: "deals" }];
const isSidebarOpen = ref(false);

// Toggle sidebar open/close state
function toggleSidebar() {
  isSidebarOpen.value = !isSidebarOpen.value;
}
</script>

<style scoped>
/* Menu Button */
.menu-button {
  position: fixed;
  top: 16px;
  left: 16px;
  background: none;
  border: none;
  cursor: pointer;
  z-index: 5;
}

/* Close Button */
.close-button {
  position: absolute;
  top: 16px;
  left: 16px;
  background: none;
  border: none;
  cursor: pointer;
}

/* Sidebar Styles */
.sidebar {
  @apply p-6 bg-gradient-to-br from-betpass-grey to-betpass-dark-grey rounded-r-3xl;
  width: 210px;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background-color: #f5f5f5;
  z-index: 20;
  transition: transform 0.3s ease-in-out;
  /* Initially hidden off-screen */
  transform: translateX(100%);
}

/* Sidebar open state */
.sidebar-open {
  transform: translateX(0);
}

/* Sidebar closed state */
.sidebar-closed {
  transform: translateX(-100%);
}

/* Navigation and list styles */
nav ul {
  list-style-type: none;
  padding: 0;
}

nav ul li {
  margin: 1rem 0;
}
</style>
