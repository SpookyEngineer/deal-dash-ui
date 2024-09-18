<template>
  <div>
    <!-- Heading Section -->
    <div class="flex justify-between items-center">
      <h1 class="text-2xl text-betpass-green font-bold">DEALS</h1>
      <button @click="toggleCreateDealsSidebar()">
        <div class="bg-betpass-green rounded-3xl py-[10px] px-[34px]">
          <span class="text-betpass-dark-green font-bold text-sm">
            CRIAR DEALS
          </span>
        </div>
      </button>
    </div>
    <div class="border-t border-white opacity-20 w-full h-px my-8" />

    <CreateDealsSidebar
      v-model:createDealsSidebarOpen="createDealsSidebarOpen"
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
      <CardsSection :cardsData="paginatedCardsData" />
    </div>

    <!-- Pagination Controls -->
    <div class="flex justify-center">
      <button
        v-for="page in totalPages"
        :key="page"
        :class="[
          'mx-1 h-[30px] w-[30px] text-black font-bold rounded-lg',
          {
            'bg-betpass-green': currentPage === page,
            'bg-gray-200': currentPage !== page,
          },
        ]"
        @click="goToPage(page)"
      >
        {{ page }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from "vue";
import { useCardStore } from "~/store/useDataStore";

const cardStore = useCardStore();

const searchInput = ref("");
const createDealsSidebarOpen = ref(false);

const currentPage = ref(1);
const itemsPerPage = 6;

function toggleCreateDealsSidebar() {
  createDealsSidebarOpen.value = !createDealsSidebarOpen.value;
}

const filteredCardsData = computed(() => {
  const searchTerm = searchInput.value.toLowerCase();
  return cardStore.cardData.filter((card) =>
    card.house.toLowerCase().includes(searchTerm)
  );
});

const paginatedCardsData = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return filteredCardsData.value.slice(startIndex, endIndex);
});

const totalPages = computed(() =>
  Math.ceil(filteredCardsData.value.length / itemsPerPage)
);

function goToPage(page: number) {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
}

watch(searchInput, () => {
  currentPage.value = 1;
});

onMounted(() => {
  cardStore.loadInitialData();
});
</script>
