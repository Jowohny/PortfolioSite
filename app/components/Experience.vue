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

  gsap.set(titleRef.value, { top: '50%', yPercent: -50 });

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
      y: -100, 
      duration: 0.75,
      color: '#FFFDD0',
      scale: 0.2,
      ease: 'power4.out'
    })
    .to(titleRef.value, {
      top: '10rem',
      yPercent: -25,
      y: -100, 
      duration: 0.75, 
      color: '#98FF98',
      scale: 1,
      ease: 'power4.in'
    })
    .to(titleRef.value, {
      top: '2.5rem',
      yPercent: 0,
      y: 0,
      duration: 1.2,
      ease: 'power3.inOut'
    })
    .to(leftPathRef.value, {
      strokeDashoffset: 0,
      duration: 1.5,
      ease: "power2.inOut"
    }, 10)
    .to(rightPathRef.value, {
      strokeDashoffset: 0,
      duration: 1.5,
      ease: "power2.inOut"
    }, 10)
    
  }
})
</script>

<template>
<svg width="400" height="600" class="z-30 absolute top-40 left-0">
  <path ref="leftPathRef" d="M -10 0 q 360 300 -10 600" stroke="black" fill="none" stroke-width="10"/>
</svg>
<svg width="400" height="600" class="z-30 absolute top-40 right-0">
  <path ref="rightPathRef" d="M 410 600 q -360 -300 10 -600" stroke="black" fill="none" stroke-width="10"/>
</svg>

<div class="bg-slate-500">
  <h1 ref="titleRef" class=" fixed top-10 left-1/2 transform -translate-x-1/2 z-50 text-black text-6xl font-bold text-center">
    Experience
  </h1>
</div>
</template>