<template>
  <BaseDealsSidebar :sidebar-open="deleteDealSidebarOpen">
    <template #sidebarContent>
      <div class="font-bold pr-16">
        <div>
          <p class="text-2xl mt-8">Excluir Deal</p>
          <p class="mt-12 font-normal">
            Tem certeza que deseja excluir o deal
            <span class="font-bold">{{ card.house }}</span
            >?
          </p>
        </div>
      </div>

      <div class="flex mt-[74px] font-bold">
        <button class="button text-[12px]" @click="toggleSidebar">
          Cancelar
        </button>
        <button
          class="button text-[12px] bg-betpass-red text-white rounded-3xl"
          @click="removeCard"
        >
          Confirmar exclusão
        </button>
      </div>
    </template>
  </BaseDealsSidebar>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useCardStore } from "~/store/useDataStore";

interface Props {
  deleteDealSidebarOpen: boolean;
  cardIndex: number;
}

const cardStore = useCardStore();
const props = defineProps<Props>();
const emit = defineEmits(["update:deleteDealSidebarOpen"]);

const card = computed(() => cardStore.cardData[props.cardIndex]);

function toggleSidebar() {
  emit("update:deleteDealSidebarOpen", !props.deleteDealSidebarOpen);
}

function removeCard() {
  cardStore.removeCard(props.cardIndex);
  toggleSidebar();
}
</script>

<style scoped>
.button {
  @apply py-[10px] px-4;
}
</style>
