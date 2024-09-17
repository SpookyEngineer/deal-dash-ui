<template>
  <div>
    <!-- Sidebar Content -->
    <TransitionSlide :offset="['100%', 0]">
      <div
        v-if="sidebarOpen"
        class="sidebar fixed inset-y-0 right-0 bg-betpass-lightgrey p-12 my-[6px] border border-black rounded-l-2xl"
      >
        <div class="font-bold pr-16">
          <p v-if="!editingDeal" class="text-2xl mt-8">Criar Deal</p>
          <p v-else class="text-2xl mt-8">Editar Deal</p>

          <p>Editing Deal: {{ editingDeal }}</p>

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
                <option
                  v-for="value in houseValues"
                  :key="value"
                  :value="value"
                >
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
            v-if="!editingDeal"
            class="button text-[12px] bg-betpass-green text-betpass-dark-green rounded-3xl"
            @click="createDeal"
          >
            Salvar
          </button>
          <button
            v-else
            class="button text-[12px] bg-betpass-green text-betpass-dark-green rounded-3xl"
            @click="editDeal()"
          >
            Edit
          </button>
        </div>
      </div>
    </TransitionSlide>

    <!-- Overlay -->
    <TransitionFade>
      <div
        v-if="sidebarOpen"
        class="overlay fixed inset-0 bg-betpass-grey opacity-[.81] w-full"
      ></div>
    </TransitionFade>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useCardStore } from "~/store/useDataStore";

const cardStore = useCardStore();

interface Card {
  house: string;
  grade: number | "";
  soldOut: boolean;
  createdDate: string;
}

interface Props {
  sidebarOpen: boolean;
  dealIndex: number;
}

const props = defineProps<Props>();

const emit = defineEmits(["update:sidebarOpen"]);

const editingDeal = computed(() => {
  if (cardStore.editingDeal && props.dealIndex) {
    return true;
  }
  return false;
});

const houseName = ref("");
const description = ref("");
const grade = ref<number | "">("");
const soldOut = ref<boolean>(false);

const houseValues = computed(() => cardStore.houseValues);

let defaultGradeValue = ref<number | "">("");

// Watching for changes in houseValues to set the default grade
watch(
  houseValues,
  (newValues) => {
    if (newValues.length > 0 && grade.value === "") {
      // Setting the default value as the first option
      grade.value = newValues[0];
      defaultGradeValue.value = newValues[0];
    }
  },
  { immediate: true }
);

function createDeal() {
  cardStore.addCard({
    house: houseName.value,
    grade: grade.value,
    soldOut: soldOut.value,
    createdDate:
      typeof currentDate === "function" ? currentDate() : currentDate,
    //The above ensures that if currentDate is a function, it gets called to return a string.
    // If currentDate is already a string, it is used as is.
  });
  resetAndToggleSidebar();
}

function editDeal(cardIndex: number, updatedData: Partial<Card>) {
  cardStore.modifyCard(cardIndex, updatedData);
}

function resetAndToggleSidebar() {
  resetValues();
  toggleSidebar();
  cardStore.editingDeal = false;
}

function resetValues() {
  houseName.value = "";
  description.value = "";
  grade.value = defaultGradeValue.value;
  soldOut.value = false;
}

const currentDate = () => {
  const today = new Date();
  const day = String(today.getDate()).padStart(2, "0");
  const month = String(today.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const year = today.getFullYear();

  return `${day}/${month}/${year}`;
};

function toggleSidebar() {
  emit("update:sidebarOpen", !props.sidebarOpen);
}
</script>

<style scoped>
.button {
  @apply py-[10px] px-9;
}

.input {
  @apply bg-betpass-lightgrey rounded-lg border border-white py-3 px-5 text-sm;
}

.sidebar {
  max-width: 40%;
  width: 100%;
  z-index: 20;
}

.overlay {
  z-index: 10;
}
</style>
