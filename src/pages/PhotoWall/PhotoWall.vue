<script setup lang="ts">
import { onMounted } from 'vue';
import photoData from './data.json'

function waitForAllImagesLoaded() {
  const imgItem = document.querySelectorAll('img')
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const imagePromises:any = []
  imgItem.forEach((img) => {
    const promise = new Promise((resolve, reject) => {
      img.addEventListener('load', () => resolve(img))
      img.addEventListener('error', () => reject(new Error('Image failed to load')))
    })
    imagePromises.push(promise)
  })
  return Promise.all(imagePromises)
}

function adjustHeight(img) {
  const container = img.parentElement;
  container.style.height = img.offsetHeight + 'px';
  container.style.gridRowEnd = `span ${img.offsetHeight}`
}

onMounted(() => {
  document.querySelectorAll('img').forEach(img => {
  if (img.complete) {
    adjustHeight(img);
  } else {
    img.onload = () => adjustHeight(img);
  }
});
})

</script>

<template>
  <div class="photo-wall">
    <div class="content">
      <div class="photo-item" v-for="item in photoData.photos" :key="item.id"
        :style="{ backgroundColor: item.backgroundColor }">
        <img :src="item.url" style="width: 100%;" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.photo-wall {
  width: 100%;
  height: 100%;

  .content {
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: repeat(5, minmax(142px, 270px));
    grid-auto-rows: 1px;
    grid-gap: 0 20px;

    // align-items: end;
    .photo-item {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>
