<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'
import { SplitText } from 'gsap/SplitText'

gsap.registerPlugin(SplitText)

const titleRef = ref()
const leftPathRef = ref<SVGPathElement | null>(null)
const rightPathRef = ref<SVGPathElement | null>(null)
let splitTitle: SplitText | null = null
let timeline: GSAPTimeline | null = null

const experienceSlides = [
  {
    logo: '/images/LeidosLogo.png', // Corrected path
    timePeriod: 'August 2024 - May 2025',
    title: 'QTC Leidos Frontend Developers',
    details: ["Detail 1", "Detail 2", "Detail 3", "Detail 4"]
  },
  {
    logo: '/images/AeryLogo.png', // Corrected path
    timePeriod: 'May 2025 - Present',
    title: 'Frontend Developer',
    details: ["Detail A", "Detail B", "Detail C", "Detail D"]
  }
]

onMounted(() => {
  splitTitle = new SplitText(titleRef.value, { 
    type: 'chars', 
    charsClass: 'font-mono text-7xl'
  })
  splitTitle.chars.forEach((char, index) => {
    gsap.set(char, {
      rotateZ: index % 2 !== 0 ? -50 : 50,
      y: index % 2 !== 0 ? -20 : 20,
      opacity: 0,
      scale: 0.8
    })
  })

  gsap.set(titleRef.value, { yPercent: 45 });

  if (leftPathRef.value && rightPathRef.value) {
    const leftLength = leftPathRef.value.getTotalLength()
    const rightLength = rightPathRef.value.getTotalLength()
    
    gsap.set(leftPathRef.value, { 
      strokeDasharray: leftLength,
      strokeDashoffset: leftLength
    })
    gsap.set(rightPathRef.value, { 
      strokeDasharray: rightLength,
      strokeDashoffset: rightLength 
    })

    timeline = gsap.timeline()
    
    timeline.to(splitTitle.chars, {
      rotateZ: 0,
      y: 0,
      opacity: 1,
      scale: 1,
      duration: 0.8,
      stagger: 0.05,
      ease: "back.out(1.7)"
    }, 2)
    .to(titleRef.value, {
      yPercent: 0,
      duration: 1.5, 
      color: '#98FF98',
      scale: 1,
      ease: 'power4.inOut',
    })
    .to(splitTitle.chars, {
      rotateX: 360,
      stagger: 0.05,
      duration: 1
    }, '-=1.3')
    .to([leftPathRef.value, rightPathRef.value], {
      strokeDashoffset: 0,
      duration: 1.5,
      ease: "power2.inOut",
      stagger: 0.2
    }, 4.5)
    
  }
})
</script>

<template>
  <svg width="400" height="600" class="z-30 absolute top-40 bottom-0 left-0">
    <path ref="leftPathRef" d="M -10 0 q 360 300 -10 600" stroke="#98FF98" fill="none" stroke-width="10"/>
  </svg>
  <svg width="400" height="600" class="z-30 absolute top-40 right-0">
    <path ref="rightPathRef" d="M 410 600 q -360 -300 10 -600" stroke="#98FF98" fill="none" stroke-width="10"/>
  </svg>

  <div class="min-h-screen flex flex-col items-center" style="background: radial-gradient(circle at 50% 50%, #94A3B8, #0f172a);">
    <div class="w-full text-center z-50 pt-8 pb-12">
      <h1 ref="titleRef" class="text-black text-6xl font-bold">
        Experience
      </h1>
    </div>

    <div class="flex-1 w-2/3 max-w-4xl justify-center">
    <UCarousel 
      :items="experienceSlides" 
      :items-to-show="1" 
      indicators 
      arrows
    >
      <template #default="{ item }">
        <div class="relative w-full h-full text-left p-4">
          <img :src="item.logo" class="w-full h-80 object-contain rounded-t-lg bg-white/10" draggable="false">
          <div class="w-full p-6 bg-black/50 backdrop-blur-sm rounded-b-lg">
            <h3 class="text-2xl font-bold text-white">{{ item.title }}</h3>
            <p class="text-sm text-gray-300 mb-4">{{ item.timePeriod }}</p>
            <ul class="list-disc list-inside text-white/80">
              <li v-for="(detail, i) in item.details" :key="i">{{ detail }}</li>
            </ul>
          </div>
        </div>
      </template>
    </UCarousel>
  </div>
  </div>
</template>