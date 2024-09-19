# Sidebar Component Documentation

This Vue component is a sidebar that slides in from the right side of the screen and includes an overlay that fades in. The component uses two custom transitions: `TransitionSlide` for the sidebar and `TransitionFade` for the overlay.

## Usage

### Template

```html
<SidebarComponent :sidebarOpen="true">
  <template v-slot:sidebarContent>
    <!-- Your sidebar content here -->
  </template>
</SidebarComponent>
```

### Props

- `sidebarOpen` (boolean): Controls the visibility of both the sidebar and the overlay. Set this to `true` to open the sidebar and display the overlay, or `false` to hide them.

### Slots

- `sidebarContent`: The content to display inside the sidebar.

## Transitions

- **TransitionSlide**: Handles the slide-in animation for the sidebar. The sidebar enters from the right when `sidebarOpen` is true and exits when `sidebarOpen` is false.
- **TransitionFade**: Handles the fade-in animation for the overlay. The overlay appears when `sidebarOpen` is true and fades out when `sidebarOpen` is false.

## CSS Styling

- **Sidebar Styling**: The `.sidebar` class controls the size and positioning of the sidebar. On larger screens (MD breakpoint), it takes up a maximum width of 40% of the screen and has rounded corners on the left side. Otherwise covers the entire screen.

  - `z-index`: 20 to ensure it appears above the site content and above the overlay.
  - `position`: Fixed to ensure the sidebar stays in view when scrolling.

- **Overlay Styling**: The `.overlay` class covers the entire screen behind the sidebar, providing a darkened background.
  - `z-index`: 10 to ensure it appears behind the sidebar.
  - `opacity`: Set to 0.81 to give the overlay a semi-transparent effect, opacity value defined by Figma design.

## Dependencies

This component relies on custom transitions:

- `TransitionSlide`: For the sidebar sliding in from the right.
- `TransitionFade`: For the overlay fading in and out.

These are provided by the `@morev/vue-transitions` library

## Example

```vue
<template>
  <SidebarComponent :sidebarOpen="isOpen">
    <template v-slot:sidebarContent>
      <p>This is the sidebar content.</p>
    </template>
  </SidebarComponent>
</template>

<script setup lang="ts">
import { ref } from "vue";

const isOpen = ref(true);
</script>
```
