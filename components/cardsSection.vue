<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
    <div
      v-for="(card, index) in cardsData"
      :key="index"
      class="bg-betpass-grey py-4 px-8 rounded-2xl hover:shadow-xl"
    >
      <!-- Heading Section -->
      <div class="flex justify-between">
        <div class="flex items-center">
          <!-- Assuming this is a checkbox, however with no further context no further development is possible -->
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
import { useCardStore } from "~/store/useDataStore";

interface Card {
  house: string;
  grade: number;
  description: string;
  soldOut: boolean;
  createdDate: string;
}

interface Props {
  cardsData: Card[];
}

const props = defineProps<Props>();

const cardStore = useCardStore();

const deleteDealSidebarOpen = ref(false);
const editDealSidebarOpen = ref(false);
const cardIndex = ref(0);

function toggleDeleteDealsSidebar() {
  deleteDealSidebarOpen.value = !deleteDealSidebarOpen.value;
}

function toggleEditDealsSidebar() {
  editDealSidebarOpen.value = !editDealSidebarOpen.value;
}

function editDeal(index: number) {
  cardStore.cardBeingEdited = props.cardsData[index];
  cardIndex.value = index;
  toggleEditDealsSidebar();
}

function removeCard(index: number) {
  cardIndex.value = index;
  toggleDeleteDealsSidebar();
}
</script>
