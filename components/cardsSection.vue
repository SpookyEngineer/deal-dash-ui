<template>
  <div>
    <!-- Search Input -->
    <div class="w-2/3 md:w-2/5 lg:w-1/4 mb-16">
      <input
        type="text"
        v-model="searchInput"
        placeholder="Pesquisar por nome"
        class="bg-[#A5A5A5] bg-opacity-15 rounded-[10px] border-none p-2 focus:outline-none"
      />
    </div>

    <!-- Deal Cards Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
      <div
        v-for="card in cardsData"
        :key="card._id"
        class="bg-betpass-grey py-4 px-8 rounded-2xl hover:shadow-xl"
      >
        <!-- Heading Section -->
        <div class="flex justify-between">
          <div class="flex items-center">
            <div
              :id="`phantom checkbox ${card._id}`"
              class="h-[23px] w-[23px] rounded-lg bg-[#D9D9D9]"
            />
            <p class="ml-2">{{ card.house }}</p>
          </div>
          <div class="flex items-center">
            <button @click="editDeal(card._id)">
              <img src="../public/icons/edit.svg" />
            </button>
            <button @click="removeCard(card._id)" class="ml-4">
              <img src="../public/icons/delete.svg" />
            </button>
          </div>
        </div>

        <!-- Description Section -->
        <div class="flex flex-col text-sm font-medium">
          <p class="mt-8">Descrição do deal</p>
          <p class="mt-6">Nota: {{ card.grade }}</p>
          <p class="my-2">Esgotado: {{ card.soldOut }}</p>
          <p class="mb-8">Data de criação: {{ card.createdDate }}</p>
        </div>
      </div>
    </div>

    <!-- Pagination Controls -->
    <div class="flex justify-center mt-14">
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

    <!-- Sidebars related to card manipulation -->
    <DeleteConformationSidebar
      v-model:deleteDealSidebarOpen="deleteDealSidebarOpen"
      @update:dealDeleted="fetchDeals(currentPage, searchInput)"
      :cardId="cardId"
    />
    <!--     <EditDealsSidebar
      v-model:editDealSidebarOpen="editDealSidebarOpen"
      :cardIndex="cardIndex"
    /> -->
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { useCardStore } from "~/store/useDataStore";
import axios from "axios";

const cardStore = useCardStore();

const deleteDealSidebarOpen = ref(false);
const editDealSidebarOpen = ref(false);
const cardId = ref("");

const baseURL = useRuntimeConfig().public.mongoBaseUrl;
const currentPage = ref(1);
const totalPages = ref(1);

const searchInput = ref("");
const cardsData = ref<Card[]>([]);

const fetchDeals = async (page: number, searchInput: string) => {
  try {
    const response = await axios.get(
      `${baseURL}/deals?page=${page}&searchInput=${encodeURIComponent(
        searchInput
      )}`
    );
    const data = response.data;
    cardsData.value = data.deals;
    totalPages.value = data.totalPages;
    currentPage.value = data.page;
  } catch (error) {
    console.error("Error fetching deals:", error);
  }
};

watch(
  () => searchInput.value,
  (newSearchInput) => {
    fetchDeals(currentPage.value, newSearchInput);
  }
);

const goToPage = (pageIndex: number) => {
  currentPage.value = pageIndex;
  fetchDeals(currentPage.value, searchInput.value);
};

const editDeal = (id?: string) => {
  getCardWithId(id);

  editDealSidebarOpen.value = true;
};

const removeCard = (id?: string) => {
  getCardWithId(id);

  deleteDealSidebarOpen.value = true;
};

function getCardWithId(id?: string) {
  if (!id) return;
  const card = cardsData.value.find((card) => card._id === id);

  if (card) {
    cardId.value = id;
    cardStore.cardBeingEdited = card;
  }
}

onMounted(() => {
  fetchDeals(currentPage.value, searchInput.value);
});
</script>
