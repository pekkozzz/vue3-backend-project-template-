<script setup lang="ts">
import { nextTick, onMounted, ref } from 'vue';
import photoData from './data.json'

// function waitForAllImagesLoaded() {
//   const imgItem = document.querySelectorAll('img')
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const imagePromises: any = []
//   imgItem.forEach((img) => {
//     const promise = new Promise((resolve, reject) => {
//       img.addEventListener('load', () => resolve(img))
//       img.addEventListener('error', () => reject(new Error('Image failed to load')))
//     })
//     imagePromises.push(promise)
//   })
//   return Promise.all(imagePromises)
// }


const photoWallData = ref(photoData.photos)
// 模拟分页加载
setTimeout(() => {
  photoWallData.value.push({
    "id": 1,
    "title": "照片1",
    "url": "https://img1.baidu.com/it/u=537499422,2207377086&fm=253&fmt=auto&app=120&f=JPEG?w=800&h=1067",
    "width": 180,
    "height": 420,
    "backgroundColor": "#e6f2ff"
  })
  handleNewImages()
}, 3000);

// 设置每个图片的容器高度
function adjustHeight(img: any) {
  const container = img.parentElement
  if (!container) return
  container.style.height = img.offsetHeight + 'px'
  container.style.gridRowEnd = `span ${img.offsetHeight + 8}`
}
// 处理新加载的图片
async function handleNewImages() {
  await nextTick() // dom更新
  const imagesDoms = document.querySelectorAll('.photo-item img:not([data-processed])') // 新插入的图片
  imagesDoms.forEach((imgDom: any) => {
    imgDom.setAttribute('data-processed', 'true')
    // imgDom.style.
    if (imgDom?.complete) {
      adjustHeight(imgDom)
    } else {
      const imgLoadSuccess = () => {
        adjustHeight(imgDom)
        imgDom.removeEventListener('load', imgLoadSuccess)
        imgDom.removeEventListener('error', imsLoadError)
      }
      const imsLoadError = () => {
        console.error('Image failed to load:', imgDom.src)
        imgDom.removeEventListener('load', imgLoadSuccess)
        imgDom.removeEventListener('error', imsLoadError)
      }
      imgDom.addEventListener('load', imgLoadSuccess)
      imgDom.addEventListener('error', imsLoadError)
    }
  })
}

handleNewImages()
</script>

<template>
  <div class="photo-wall">
    <div class="content">
      <!-- 容器不能设置宽度 -->
      <div class="photo-item" v-for="item in photoWallData" :key="item.id"
        :style="{ backgroundColor: item.backgroundColor }">
        <img :src="item.url" style="width: 100%;" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.photo-wall {
  display: flex;
  justify-content: center;
  box-sizing: border-box;
  padding: 8px;

  .content {
    height: 100%;
    display: grid;
    grid-template-columns: repeat(6, minmax(142px, 270px));
    grid-auto-rows: 1px;
    grid-gap: 0 8px;

    .photo-item {
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 16px;
      overflow: hidden;
    }
  }

  @media screen and (max-width: 1455px) {
    .content {
      grid-template-columns: repeat(5, minmax(142px, 270px));
    }
  }
   @media screen and (max-width: 790px) {
    .content {
      grid-template-columns: repeat(4, minmax(142px, 270px));
    }
  }
   @media screen and (max-width: 540px) {
    .content {
      grid-template-columns: repeat(2, minmax(142px, 270px));
    }
  }
}
</style>
