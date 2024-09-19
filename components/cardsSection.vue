<template>
  <div>
    <!-- Deal Cards Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
      <div
        v-for="(card, index) in cardsData"
        :key="index"
        class="bg-betpass-grey py-4 px-8 rounded-2xl hover:shadow-xl"
      >
        <!-- Heading Section -->
        <div class="flex justify-between">
          <div class="flex items-center">
            <div
              :id="`phantom checkbox ${index}`"
              class="h-[23px] w-[23px] rounded-lg bg-[#D9D9D9]"
            />
            <p class="ml-2">{{ card.house }}</p>
          </div>
          <div class="flex items-center">
            <button @click="editDeal(index)">
              <img src="../public/icons/edit.svg" />
            </button>
            <button @click="removeCard(index)" class="ml-4">
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
      :cardIndex="cardIndex"
    />
    <EditDealsSidebar
      v-model:editDealSidebarOpen="editDealSidebarOpen"
      :cardIndex="cardIndex"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useCardStore } from "~/store/useDataStore";
import axios from "axios";

interface Card {
  house: string;
  grade: number;
  description: string;
  soldOut: boolean;
  createdDate: string;
}

const cardStore = useCardStore();

const deleteDealSidebarOpen = ref(false);
const editDealSidebarOpen = ref(false);
const cardIndex = ref(0);

const baseURL = useRuntimeConfig().public.mongoBaseUrl;
const currentPage = ref(1);
const totalPages = ref(1);

const cardsData = ref<Card[]>([]);

const fetchDeals = async (page: number) => {
  try {
    const response = await axios.get(`${baseURL}/deals?page=${page}`);
    const data = await response.data;
    cardsData.value = data.deals;
    totalPages.value = data.totalPages;
    currentPage.value = data.page;
  } catch (error) {
    console.error("Error fetching deals:", error);
  }
};

const goToPage = (pageIndex: number) => {
  currentPage.value = pageIndex;
  fetchDeals(currentPage.value);
};

const editDeal = (index: number) => {
  cardStore.cardBeingEdited = cardsData.value[index];
  cardIndex.value = index;
  editDealSidebarOpen.value = true;
};

const removeCard = (index: number) => {
  cardIndex.value = index;
  deleteDealSidebarOpen.value = true;
};

onMounted(() => {
  fetchDeals(currentPage.value);
});
</script>
