<script setup lang="ts">
import photoData from './data.json'

</script>

<template>
<div class="photo-wall">
  <div class="content">
    <div class="photo-item" v-for="item in photoData.photos" :style="{ backgroundColor: item.backgroundColor, width: `${item.width}px`, height: `${item.height}px` }">

    </div>
  </div>
</div>
</template>

<style lang="scss" scoped>
.photo-wall {
  width: 100%;
  height: 100%;
  display: grid;

}
</style>
