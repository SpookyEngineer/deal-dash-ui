<template>
  <BaseDealsSidebar :sidebar-open="editDealSidebarOpen">
    <template #sidebarContent>
      <div class="font-bold pr-16">
        <p class="text-2xl mt-8">Editar Deal</p>
        <div class="mt-12">
          <div>
            <p class="mb-3">Nome da casa</p>
            <input
              class="input w-full"
              v-model="localCardData.house"
              placeholder="Exemplo: ABC BET"
              type="text"
            />
          </div>

          <div class="mt-6">
            <p class="mb-3">Descrição</p>
            <input
              class="input w-full"
              v-model="localCardData.description"
              placeholder="Descrição do deal"
              type="text"
            />
          </div>

          <div class="mt-6">
            <p class="mb-3">Nota</p>
            <select class="input" v-model="localCardData.grade">
              <option v-for="value in houseValues" :key="value" :value="value">
                {{ value }}
              </option>
            </select>
          </div>

          <div class="mt-11 flex items-center">
            <UToggle v-model="localCardData.soldOut" />
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
import { computed, ref, watch } from "vue";
import { useCardStore } from "~/store/useDataStore";

const cardStore = useCardStore();

interface Props {
  editDealSidebarOpen: boolean;
  cardId: string;
}

const props = defineProps<Props>();
const emit = defineEmits(["update:editDealSidebarOpen", "update:dealEdited"]);
const toast = useToast();
const toastTimeout = cardStore.toastTimeout;

// Local copy of the card data for editing
const localCardData = ref<Card>({
  house: "",
  grade: 0,
  description: "",
  soldOut: false,
  createdDate: "",
  _id: "",
});

// Watch for changes in the store and update localCardData
watch(
  () => cardStore.cardBeingEdited,
  (newCardData) => {
    localCardData.value = { ...newCardData };
  },
  { deep: true }
);

const houseValues = computed(() => cardStore.houseValues);

function toggleSidebar() {
  emit("update:editDealSidebarOpen", !props.editDealSidebarOpen);
}

async function saveDeal() {
  // Validation for required fields
  if (!localCardData.value.house) {
    toast.add({
      title: "Nome da casa é obrigatório",
      timeout: toastTimeout,
    });
    return;
  }

  if (!localCardData.value.description) {
    toast.add({
      title: "Descrição é obrigatória",
      timeout: toastTimeout,
    });
    return;
  }

  const response = await cardStore.editCard(localCardData.value);

  if (!response) {
    toast.add({
      title: "Erro ao editar deal",
      timeout: toastTimeout,
    });
    return;
  }

  toast.add({
    title: "Deal editado com sucesso",
    timeout: toastTimeout,
  });
  emit("update:dealEdited");
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
