<script setup lang="ts">
import Navbar from './Navbar.vue'
import Sidebar from './Sidebar.vue'
</script>

<template>
  <div>
    <Navbar />
    <Sidebar />

    <section class="main">
      <el-scrollbar>
        <slot />
      </el-scrollbar>
    </section>
  </div>
</template>

<style scoped>
.main {
  overflow: hidden;
  overflow-y: auto;
  width: calc(100vw - var(--admin-sidebar-width));
  position: absolute;
  z-index: 1001;
  top: calc((var(--admin-navbar-height) * 2) + var(--admin-tagbar-height));
  left: var(--admin-sidebar-width);
  bottom: 0;
}
</style>
