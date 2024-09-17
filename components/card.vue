<template>
  <div
    class="bg-betpass-grey flex flex-col max-w-[374px] py-4 px-8 rounded-2xl"
  >
    <div class="flex justify-between">
      <div class="flex items-center">
        <UCheckbox />
        <p class="ml-2">Casa A</p>
      </div>

      <div class="flex items-center">
        <button>
          <img src="../public/icons/edit.svg" />
        </button>
        <button class="ml-4">
          <img src="../public/icons/delete.svg" />
        </button>
      </div>
    </div>
    <div class="flex flex-col">
      <p>Descrição do deal</p>
      <p>Nota: 5</p>
      <p>Esgotado</p>
      <p>Data de criação: 12/08/2024</p>
    </div>
  </div>
</template>
