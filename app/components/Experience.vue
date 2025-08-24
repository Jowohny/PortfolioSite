<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { gsap } from 'gsap'
import { SplitText } from 'gsap/SplitText'
import ExperienceCarousel from './ExperienceCarousel.vue'

gsap.registerPlugin(SplitText)

const titleRef = ref()
const carouselRef = ref<HTMLDivElement | null>(null)
const leftPathRef = ref<SVGPathElement | null>(null)
const rightPathRef = ref<SVGPathElement | null>(null)
const transitionFinished = ref(false)
let splitTitle: SplitText | null = null
let timeline: GSAPTimeline | null = null


const sidebarIcons = {
  frameworks: [
    '/images/icons/frameworks/Angular.svg',
    '/images/icons/frameworks/Nuxt.svg',
    '/images/icons/frameworks/React.svg',
    '/images/icons/frameworks/SwiftUI.svg',
    '/images/icons/frameworks/Vue.svg'
  ],
  languages: [
    '/images/icons/languages/HTML5.svg',
    '/images/icons/languages/Java.svg',
    '/images/icons/languages/Javascript.svg',
    '/images/icons/languages/Python.svg',
    '/images/icons/languages/Typescript.svg'
  ]
}
  
  

const experienceSlides = [
  {
    index: 1,
    company: 'Leidos',
    logo: '/images/LeidosLogo.png',
    timePeriod: 'August 2024 - May 2025',
    title: 'Frontend Developer',
    details: [
      "Developed responsive web applications using Vue.js and TypeScript",
      "Collaborated with cross-functional teams to deliver high-quality software",
      "Implemented modern UI/UX designs and maintained code quality standards",
      "Participated in code reviews and contributed to team best practices"
    ],
    imgDetails: ['/images/LeidosDashboard1.jpeg','/images/LeidosDashboard2.jpeg','/images/LeidosDashboard3.jpeg']
  },
  {
    index: 2,
    company: 'Aery',
    logo: '/images/AeryLogo.png',
    timePeriod: 'May 2025 - Present',
    title: 'Frontend Developer',
    details: [
      "Building scalable frontend applications with modern frameworks",
      "Optimizing application performance and user experience",
      "Working with design teams to implement pixel-perfect interfaces",
      "Mentoring junior developers and sharing technical knowledge"
    ],
    imgDetails: ['/images/AerySite1.png','/images/AerySite2.png','/images/AerySite3.png']
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
      scaleY: 1
    })
  })

  gsap.set(titleRef.value, { yPercent: 580 });


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

    gsap.set(carouselRef.value, {
      borderBottom: 0,
      borderTop: 0,
      opacity: 0,
      scaleY: 0
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
      color: '#00BFFF',
      scale: 1,
      ease: 'power4.inOut',
    })
    .to(splitTitle.chars, {
      rotateX: 360,
      stagger: 0.05,
      duration: 1
    }, '-=1.3')
    .to(carouselRef.value, {
      opacity: 1,
      scaleY: 1,
      duration: 1.5,
      ease: "power4.inOut",
      onComplete: () => {
        transitionFinished.value = true
      }
    }, '-=1')
    .to(carouselRef.value, {
      borderBottom: 20,
      borderTop: 20,
      duration: 0.5,
      ease: "power4.in"
    }, '-=1.65')
    .to(carouselRef.value, {
      borderBottom: 0,
      borderTop: 0,
      duration: 0.5,
      ease: "power4.out"
    }, '-=0.64')
    .to([leftPathRef.value, rightPathRef.value], {
      strokeDashoffset: 0,
      duration: 1.5,
      ease: "power2.inOut",
      stagger: 0.2
    }, 4)
    
  }
})
</script>

<template>
  <svg width="400" height="600" class="z-30 absolute top-40 bottom-0 left-0">
    <path ref="leftPathRef" d="M -10 0 q 360 300 -10 600" stroke="#00BFFF" fill="none" stroke-width="10"/>
  </svg>
  <svg width="400" height="600" class="z-30 absolute top-40 right-0">
    <path ref="rightPathRef" d="M 410 600 q -360 -300 10 -600" stroke="#00BFFF" fill="none" stroke-width="10"/>
  </svg>

  <div class="min-h-screen flex flex-col items-center" style="background: radial-gradient(circle at 50% 50%, #94A3B8, #0f172a);">
    <div class="w-full text-center z-50 pt-8 pb-12">
      <h1 ref="titleRef" class="font-fira-condensed text-black text-6xl font-bold">
        Experience
      </h1>
    </div>

    <div ref="carouselRef" class="w-2/3 h-1/2 p-12">
      <UCarousel
        v-slot="{ item }"
        :items="experienceSlides"
        :items-to-show="1"
        :autoplay= "transitionFinished ? { delay: 5000 } : false"
        prev-icon="i-lucide-chevron-left"
        next-icon="i-lucide-chevron-right"
        loop
        dots
        fade
        :ui="{
          item: 'min-w-full h-full',
        }"
      >
          <ExperienceCarousel :item="item" :index="item.index" :experienceCount="experienceSlides.length"/>
      </UCarousel>
    </div>
  </div>
</template>