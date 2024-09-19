# Sidebar Components Documentation

This documentation covers the usage of the `Sidebar` and `SidebarMobile` components in your Nuxt 3 project. Both components offer a sidebar navigation menu with icons and links. They are designed to accommodate both desktop and mobile layouts, with minor differences in behavior and functionality. As such they will both be documented together.

## Common Features

Both `Sidebar` and `SidebarMobile` components share the following features:

### Props

- **`menuItems`** (Array of objects): An array representing the menu items. Each object should include:
  - `label` (string): The display name of the menu item.
  - `route` (string): The path or URL the menu item navigates to.
  - `icon` (string): The name of the icon file (without extension, file must, however, be .svg) located in the `/public/icons` folder.

### Example Usage

Both components are used similarly by passing the `menuItems` array as a prop:

```html
<Sidebar
  :menuItems="[
    { label: 'Home', route: '/', icon: 'home' },
    { label: 'Profile', route: '/profile', icon: 'user' },
  ]"
/>
```

### Styling

Both components use similar base styling, focusing on a fixed, full-height sidebar with a gradient background.

#### Note

- The `z-index` of the sidebar inside the `SidebarMobile` is `20`
- the `z-index` of the menu button inside the `SidebarMobile` component is `5`

## Differences in Usage

### 1. `Sidebar` (For Desktop)

The `Sidebar` component is intended for desktop or larger screens where the sidebar remains visible throughout the session.

- **Fixed Position**: The sidebar remains visible at all times and is placed on the left side of the screen.
- **No Toggle Behavior**: There is no button to show or hide the sidebar; it remains static.

### 2. `SidebarMobile` (For Mobile)

The `SidebarMobile` component is designed for mobile screens, where the sidebar can be toggled open or closed to optimize screen space.

#### Additional Features

- **Toggle Functionality**: A button allows users to open and close the sidebar.
- **Overlay**: When the sidebar is open, a dimmed background overlay appears to ease transition on the slide-in animation
- **Slide-in Animation**: The sidebar transitions into view from the left when opened and slides out when closed.

#### State Management

The `SidebarMobile` component uses Vue’s `ref` to manage the open/closed state of the sidebar:

```ts
import { ref } from "vue";

const isSidebarOpen = ref(false);

function toggleSidebar() {
  isSidebarOpen.value = !isSidebarOpen.value;
}
```

#### Sidebar Toggle Button

A button is provided to open and close the sidebar, positioned at the top-left of the screen:

```html
<button @click="toggleSidebar" class="menu-button">
  <img src="../public/icons/menu.svg" alt="Menu" />
</button>
```

### `SidebarMobile` Example Usage

```html
<SidebarMobile
  :menuItems="[
    { label: 'Dashboard', route: '/dashboard', icon: 'dashboard' },
    { label: 'Settings', route: '/settings', icon: 'settings' },
  ]"
/>
```
