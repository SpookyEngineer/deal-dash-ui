<template>
  <div>
    <!-- Heading Section -->
    <div class="flex justify-between items-center">
      <h1 class="text-2xl text-betpass-green font-bold">DEALS</h1>
      <button @click="toggleCreateDealsSidebar()">
        <div class="bg-betpass-green rounded-3xl py-[10px] px-4 md:px-[34px]">
          <span class="text-betpass-dark-green font-bold text-sm">
            CRIAR DEALS
          </span>
        </div>
      </button>
    </div>
    <div class="border-t border-white opacity-20 w-full h-px my-8" />

    <!-- Cards Section -->
    <CardsSection :searchInput="searchInput" />

    <CreateDealsSidebar
      v-model:createDealsSidebarOpen="createDealsSidebarOpen"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useCardStore } from "~/store/useDataStore";

const cardStore = useCardStore();

const searchInput = ref("");
const createDealsSidebarOpen = ref(false);

function toggleCreateDealsSidebar() {
  createDealsSidebarOpen.value = !createDealsSidebarOpen.value;
}

onMounted(() => {
  cardStore.loadInitialData();
});
</script>
