<template>
  <BaseDealsSidebar :sidebar-open="editDealsSidebarOpen">
    <template #sidebarContent>
      <div class="font-bold pr-16">
        <p class="text-2xl mt-8">Editar Deal</p>
        <div class="mt-12">
          <div>
            <p class="mb-3">Nome da casa</p>
            <input
              class="input w-full"
              v-model="cardData.house"
              placeholder="Exemplo: ABC BET"
              type="text"
            />
          </div>

          <div class="mt-6">
            <p class="mb-3">Descrição</p>
            <input
              class="input w-full"
              v-model="cardData.description"
              placeholder="Descrição do deal"
              type="text"
            />
          </div>

          <div class="mt-6">
            <p class="mb-3">Nota</p>
            <select class="input" v-model="cardData.grade">
              <option v-for="value in houseValues" :key="value" :value="value">
                {{ value }}
              </option>
            </select>
          </div>

          <div class="mt-11 flex items-center">
            <UToggle v-model="cardData.soldOut" />
            <p class="ml-4">Esgotar deal</p>
          </div>
        </div>
      </div>

      <div class="flex mt-[74px] font-bold">
        <button class="button text-[12px]" @click="toggleSidebar">
          Cancelar
        </button>
        <button
          class="button text-[12px] bg-betpass-green text-betpass-dark-green rounded-3xl"
          @click="saveDeal"
        >
          Salvar
        </button>
      </div>
    </template>
  </BaseDealsSidebar>
</template>

<script setup lang="ts">
import { computed, watch } from "vue";
import { useCardStore } from "~/store/useDataStore";

const cardStore = useCardStore();

interface Card {
  house: string;
  grade: number;
  description: string;
  soldOut: boolean;
  createdDate: string;
}

interface Props {
  editDealsSidebarOpen: boolean;
  dealIndex: number;
}

const props = defineProps<Props>();
const emit = defineEmits(["update:editDealsSidebarOpen"]);

// Computed property to keep cardData synchronized with the store
const cardData = computed({
  get: () => cardStore.cardBeingEdited,
  set: (value: Card) => {
    cardStore.cardBeingEdited = value;
  },
});

// Watch for changes in the store and update cardData
watch(
  () => cardStore.cardBeingEdited,
  (newCardData) => {
    cardData.value = newCardData;
  },
  { deep: true }
);

const houseValues = computed(() => cardStore.houseValues);

function toggleSidebar() {
  emit("update:editDealsSidebarOpen", !props.editDealsSidebarOpen);
}

function saveDeal() {
  cardStore.modifyCard(props.dealIndex, cardData.value);
  toggleSidebar();
}
</script>

<style scoped>
.button {
  @apply py-[10px] px-9;
}

.input {
  @apply bg-betpass-lightgrey rounded-lg border border-white py-3 px-5 text-sm;
}
</style>
