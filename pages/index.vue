<template>
  <div>
    <div class="flex justify-between items-center">
      <h1 class="text-2xl text-betpass-green font-bold">DEALS</h1>
      <button>
        <div class="bg-betpass-green rounded-3xl py-[10px] px-[34px]">
          <span class="text-betpass-dark-green font-bold text-sm"
            >CRIAR DEALS</span
          >
        </div>
      </button>
    </div>
    <div class="border-t border-white opacity-20 w-full h-px my-8" />

    <div class="flex flex-col w-1/4">
      <input
        type="text"
        placeholder="Pesquisar por nome"
        class="placeholder-[#999999] bg-[#A5A5A5] rounded-[10px] border-none p-2 focus:outline-none"
      />
      <UInput placeholder="Pesquisar por nome" />
    </div>

    <div>
      <card />
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute();

const searchInput = ref("");
</script>
