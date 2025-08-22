<script setup lang="ts">
import { ref } from 'vue';
import { gsap } from 'gsap';

const props = defineProps({
  item: {
    type: Object,
    required: true
  }
});

const displayImageRefs = ref<{ [key: string]: HTMLImageElement | null }>({});

const setDisplayImageRef = (key: string, el: any) => {
  if (el) {
    displayImageRefs.value[key] = el;
  }
};

const zoomIn = (imgKey: string) => {
  const image = displayImageRefs.value[imgKey];
  if (!image) return;
  gsap.to(image, { scale: 3, duration: 0.3, opacity: 1, ease: 'power3.out' });
};

const zoomOut = (imgKey: string) => {
  const image = displayImageRefs.value[imgKey];
  if (!image) return;
  gsap.to(image, { scale: 1, duration: 0.3, opacity: 0, ease: 'power3.in' });
};

</script>

<template>
  <div class="relative w-full h-full overflow-hidden">
    <div class="w-full h-full flex flex-col">
      <div class="flex items-center justify-center">
        <img :src="item.logo" :alt="item.title" class="h-72 w-auto object-contain bg-white rounded-3xl p-8 border-black border-4" />
      </div>
      <div class="flex-1 p-6 flex flex-col justify-center">
        <div class="justify-center text-center">
          <h3 class="text-2xl font-bold text-black mb-2">{{ item.title }}</h3>
          <p class="text-sm text-gray-300 mb-4">{{ item.timePeriod }}</p>
        </div>
        <ul class="list-disc list-inside text-white space-y-2 mx-auto mb-8">
          <li v-for="(detail, i) in item.details" :key="i" class="tracking-wide pb-0 font-semibold border-b">{{ detail }}</li>
        </ul>
      </div>
      <div class="flex flex-row justify-around">
        <img 
          v-for="(imgDetail, i) in item.imgDetails" 
          :src="imgDetail" 
          class="h-32"
          @mouseenter="zoomIn(`${item.company}displayImage${i}`)"
          @mouseleave="zoomOut(`${item.company}displayImage${i}`)"
        />
      </div>              
      <div v-for="(imgDetail, i) in item.imgDetails" :key="i" class="absolute z-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-full">
        <img 
          :src="imgDetail" 
          :ref="(el) => setDisplayImageRef(`${item.company}displayImage${i}`, el)"
          class="h-36 opacity-0"
        />
      </div>
    </div>
  </div>
</template>