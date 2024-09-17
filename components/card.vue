<template>
  <div class="grid grid-cols-3 gap-12">
    <div
      v-for="(card, index) in cardData"
      :key="index"
      class="bg-betpass-grey py-4 px-8 rounded-2xl"
    >
      <div class="flex justify-between">
        <div class="flex items-center">
          <UCheckbox />
          <p class="ml-2">{{ card.house }}</p>
        </div>

        <div class="flex items-center">
          <button>
            <img src="../public/icons/edit.svg" />
          </button>
          <button @click="removeCard(index)" class="ml-4">
            <img src="../public/icons/delete.svg" />
          </button>
        </div>
      </div>

      <div class="flex flex-col text-sm font-medium">
        <p class="mt-8">Descrição do deal</p>
        <p class="mt-6">Nota: {{ card.grade }}</p>
        <p class="my-2">Esgotado: {{ card.soldOut }}</p>
        <p class="mb-8">Data de criação: {{ card.createdDate }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCardStore } from "~/store/useDataStore";

const cardStore = useCardStore();

const removeCard = (index: number) => {
  cardStore.removeCard(index);
};

interface Card {
  house: string;
  grade: number;
  soldOut: boolean;
  createdDate: string;
  selected: boolean;
}

interface Props {
  cardData: Card[];
}

const props = defineProps<Props>();
</script>
