<template>
  <div class="logo cursor-text" :underline="false" type="success">
    <img src="/image/MRT.png" class="logImg">
  </div>
</template>

<style scoped>
.logo {
  z-index: 22;
  width: var(--admin-sidebar-width);
  height: var(--admin-navbar-height);
  color: var(--doc-text-accent);
  background-color: var(--admin-top-bg-color);
  /* border-right: solid 1px var(--el-menu-border-color); */
  box-sizing: border-box;
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  vertical-align: middle;
}
.logImg{
  width: 100%;
  max-width: 85px;
}
</style>
