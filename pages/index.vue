<template>
  <div>
    <!-- Heading Section -->
    <div class="flex justify-between items-center">
      <h1 class="text-2xl text-betpass-green font-bold">DEALS</h1>
      <button @click="toggleCreateDealsSidebar()">
        <div class="bg-betpass-green rounded-3xl py-[10px] px-[34px]">
          <span class="text-betpass-dark-green font-bold text-sm"
            >CRIAR DEALS</span
          >
        </div>
      </button>
    </div>
    <div class="border-t border-white opacity-20 w-full h-px my-8" />

    <CreateDealsSidebar
      v-model:createDealsSidebarOpen="createDealsSidebarOpen"
    />
    <EditDealsSidebar
      v-model:editDealsSidebarOpen="editDealsSidebarOpen"
      :dealIndex="dealIndex"
    />

    <!-- Input filter -->
    <div class="flex flex-col w-1/4">
      <input
        type="text"
        v-model="searchInput"
        placeholder="Pesquisar por nome"
        class="bg-[#A5A5A5] bg-opacity-15 rounded-[10px] border-none p-2 focus:outline-none"
      />
    </div>

    <!-- Cards Section -->
    <div class="mt-16">
      <CardsSection
        :cardsData="filteredCardsData"
        @update:editingDeal="handleEditingDeal"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useCardStore } from "~/store/useDataStore";

const cardStore = useCardStore();

const searchInput = ref("");

const createDealsSidebarOpen = ref(false);
const editDealsSidebarOpen = ref(false);
const dealIndex = ref<number>(0);

function toggleCreateDealsSidebar() {
  createDealsSidebarOpen.value = !createDealsSidebarOpen.value;
}

function toggleEditDealsSidebar() {
  editDealsSidebarOpen.value = !editDealsSidebarOpen.value;
}

function handleEditingDeal(cardIndex: number) {
  dealIndex.value = cardIndex;
  toggleEditDealsSidebar();
}

const filteredCardsData = computed(() => {
  const searchTerm = searchInput.value.toLowerCase();
  return cardStore.cardData.filter((card) =>
    card.house.toLowerCase().includes(searchTerm)
  );
});

onMounted(() => {
  cardStore.loadInitialData();
});
</script>
