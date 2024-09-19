<template>
  <BaseDealsSidebar :sidebar-open="createDealsSidebarOpen">
    <template #sidebarContent>
      <div class="font-bold pr-16">
        <p class="text-2xl mt-8">Criar Deal</p>

        <div class="mt-12">
          <div>
            <p class="mb-3">Nome da casa</p>
            <input
              class="input w-full"
              v-model="houseName"
              placeholder="Exemplo: ABC BET"
              type="text"
            />
          </div>

          <div class="mt-6">
            <p class="mb-3">Descrição</p>
            <input
              class="input w-full"
              v-model="description"
              placeholder="Descrição do deal"
              type="text"
            />
          </div>

          <div class="mt-6">
            <p class="mb-3">Nota</p>
            <select class="input" v-model="grade">
              <option v-for="value in houseValues" :key="value" :value="value">
                {{ value }}
              </option>
            </select>
          </div>

          <div class="mt-11 flex items-center">
            <UToggle v-model="soldOut" />
            <p class="ml-4">Esgotar deal</p>
          </div>
        </div>
      </div>

      <div class="flex mt-[74px] font-bold">
        <button class="button text-[12px]" @click="resetAndToggleSidebar">
          Cancelar
        </button>
        <button
          class="button text-[12px] bg-betpass-green text-betpass-dark-green rounded-3xl"
          @click="createDeal"
        >
          Salvar
        </button>
      </div>
    </template>
  </BaseDealsSidebar>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useCardStore } from "~/store/useDataStore";

const cardStore = useCardStore();

interface Props {
  createDealsSidebarOpen: boolean;
}

const props = defineProps<Props>();

const emit = defineEmits(["update:createDealsSidebarOpen"]);
const toast = useToast();

const houseName = ref("");
const description = ref("");
const grade = ref<number>(0);
const soldOut = ref<boolean>(false);

const currentDate = () => {
  const today = new Date();
  const day = String(today.getDate()).padStart(2, "0");
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const year = today.getFullYear();

  return `${day}/${month}/${year}`;
};

let defaultGradeValue = ref<number>(0);

const houseValues = computed(() => cardStore.houseValues);

// Watching for changes in houseValues to set the default grade
watch(
  houseValues,
  (newValues) => {
    if (newValues.length > 0 && grade.value === 0) {
      // Setting the default value as the first option
      grade.value = newValues[0];
      defaultGradeValue.value = newValues[0];
    }
  },
  { immediate: true }
);

function createDeal() {
  const response = cardStore.addCard({
    house: houseName.value,
    grade: grade.value,
    description: description.value,
    soldOut: soldOut.value,
    createdDate:
      typeof currentDate === "function" ? currentDate() : currentDate,
    //The above ensures that if currentDate is a function, it gets called to return a string.
    // If currentDate is already a string, it is used as is.
  });

  if (!response) {
    toast.add({ title: "Erro ao criar deal" });
  }

  cardStore.fetchDeals(1, ""); // Resets page to 1 and without search input
  toast.add({ title: "Deal criado" });
  resetAndToggleSidebar();
}

function resetAndToggleSidebar() {
  resetValues();
  toggleSidebar();
}

function resetValues() {
  houseName.value = "";
  description.value = "";
  grade.value = defaultGradeValue.value;
  soldOut.value = false;
}

function toggleSidebar() {
  emit("update:createDealsSidebarOpen", !props.createDealsSidebarOpen);
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
