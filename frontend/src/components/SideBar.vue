<template>
  <el-menu default-active="2" class="" :collapse="isCollapse">
    <el-menu-item
      v-for="item in menuItems"
      :key="item.id"
      :index="item.id.toString()"
      @click="isCollapse = !isCollapse"
    >
      <el-icon>
        <img :src="item.src">
      </el-icon>
      <template #title>
        <div class="pl-2">{{ item.title }}</div>
      </template>
    </el-menu-item>
  </el-menu>
</template>

<script setup>
  import { ref, } from 'vue'

  const isCollapse = ref(true)
  const menuItems = ref([
    {
      id: 1,
      src: new URL('../assets/menu/Vector.svg', import.meta.url),
      title: 'Manage'
    }, {
      id: 2,
      src: new URL('../assets/menu/Vector1.svg', import.meta.url),
      title: 'Main Page'
    }, {
      id: 3,
      src: new URL('../assets/menu/Vector2.svg', import.meta.url),
      title: 'Recorder'
    }, {
      id: 4,
      src: new URL('../assets/menu/Vector3.svg', import.meta.url),
      title: 'Order Page'
    }, {
      id: 5,
      src: new URL('../assets/menu/Vector4.svg', import.meta.url),
      title: 'Help'
    }
  ])
</script>
  
<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
}
</style>
  