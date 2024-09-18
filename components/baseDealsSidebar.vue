<template>
  <div>
    <!-- Sidebar Content -->
    <TransitionSlide :offset="['100%', 0]">
      <div
        v-if="sidebarOpen"
        class="sidebar md:max-w-[40%] fixed inset-y-0 right-0 bg-betpass-lightgrey p-12 md:my-[6px] border border-black md:rounded-l-2xl"
      >
        <slot name="sidebarContent" />
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
interface Props {
  sidebarOpen: boolean;
}

const props = defineProps<Props>();
</script>

<style scoped>
.sidebar {
  width: 100%;
  z-index: 20;
}

.overlay {
  z-index: 10;
}
</style>
