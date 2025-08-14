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

onMounted(() => {
  splitTitle = new SplitText(titleRef.value, { 
    type: 'chars', 
    charsClass: 'font-mono text-7xl text-red-500'
  })
  splitTitle.chars.forEach((char, index) => {
    gsap.set(char, {
      rotateZ: index % 2 !== 0 ? -50 : 50,
      y: index % 2 !== 0 ? -20 : 20,
      opacity: 0,
      scale: 0.8
    })
  })

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

    timeline.to(leftPathRef.value, {
      strokeDashoffset: 0,
      duration: 1.5,
      ease: "power2.inOut"
    }, 10)

    timeline.to(rightPathRef.value, {
      strokeDashoffset: 0,
      duration: 1.5,
      ease: "power2.inOut"
    }, 10)
    
  }
})
</script>

<template>
<svg width="400" height="600" class="z-30 absolute top-40 left-0">
  <path ref="leftPathRef" d="M 0 0 q 350 300 0 600" stroke="black" fill="none" stroke-width="10"/>
</svg>
<svg width="400" height="600" class="z-30 absolute top-40 right-0">
  <path ref="rightPathRef" d="M 400 600 q -350 -300 0 -600" stroke="black" fill="none" stroke-width="10"/>
</svg>

<!-- Center Experience title that will appear in the circle -->
<div class="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
  <h1 ref="titleRef" class="text-white text-6xl font-bold text-center">
    Experience
  </h1>
</div>
</template>