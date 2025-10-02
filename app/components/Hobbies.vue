<template>
  <div ref="mainContainer" class="relative overflow-hidden bg-[#0f172a] font-sans text-white">
    <div ref="introTitleContainer" class="fixed inset-0 z-[60] flex items-center justify-center">
      <h1 ref="introTitle" class="text-center text-9xl font-bold uppercase tracking-widest text-gray-400">
        Hobbies
      </h1>
    </div>

    <div ref="leftCover" class="fixed left-0 top-0 z-50 h-full w-1/2 bg-[#1a1a1a]"></div>
    <div ref="rightCover" class="fixed right-0 top-0 z-50 h-full w-1/2 bg-[#1a1a1a]"></div>

    <div ref="pinnedContainer" class="relative h-screen w-full overflow-hidden">
      <div class="absolute inset-0 z-0 opacity-20">
        <div ref="shape1" class="absolute left-[15%] top-[20%] h-48 w-48 border-4"></div>
        <div ref="shape2" class="absolute right-[20%] top-[55%] h-36 w-36 border-2"></div>
        <div ref="shape3" class="absolute right-[40%] top-[70%] h-52 w-52 border-3"></div>
        <div ref="shape4" class="absolute right-[75%] top-[65%] h-68 w-68 border-2"></div>
        <div ref="shape5" class="absolute right-[10%] top-[20%] h-80 w-80 border-3"></div>
        <div ref="shape6" class="absolute right-[30%] top-[10%] h-96 w-96 border-2"></div>
				<div ref="shape7" class="absolute rounded-full right-[50%] top-[55%] h-36 w-36 border-1"></div>
        <div ref="shape8" class="absolute rounded-full right-[45%] top-[5%] h-96 w-96 border-2"></div>
				<div ref="shape9" class="absolute rounded-full right-[80%] top-[25%] h-48 w-48 border-1"></div>
        <div ref="shape10" class="absolute rounded-full right-[20%] top-[40%] h-96 w-96 border-4"></div>
      </div>

      <div ref="titleWrapper" class="absolute flex h-full w-1/2 items-center justify-center">
        <div class="relative h-full w-full">
          <h1
            v-for="hobby in hobbies"
            :key="hobby.title"
            :ref="(el) => addTitleRef(el)"
            class="absolute w-full text-8xl text-center font-black font-inter tracking-wide"
          >
					{{ hobby.displayTitle }}
          </h1>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const hobbies = [
  {
    title: 'Keyboard Creation',
    displayTitle: 'Keyboard Creation',
    titleColor: '#22d3ee',
  },
  {
    title: '3D Modeling',
    displayTitle: '3D Modeling',
    titleColor: '#fb923c',
  },
  {
    title: 'Speed Cubing',
    displayTitle: 'Speed Cubing',
    titleColor: '#ef4444',
  }
]

const mainContainer = ref(null)
const introTitleContainer = ref(null)
const introTitle = ref(null)
const leftCover = ref(null)
const rightCover = ref(null)
const pinnedContainer = ref(null)
const titleWrapper = ref(null)
const shape1 = ref(null)
const shape2 = ref(null)
const shape3 = ref(null)
const shape4 = ref(null)
const shape5 = ref(null)
const shape6 = ref(null)
const shape7 = ref(null)
const shape8 = ref(null)
const shape9 = ref(null)
const shape10 = ref(null)
const titleRefs = ref([])
let ctx


const addTitleRef = (el) => {
  if (el) titleRefs.value.push(el)
}

onMounted(() => {
  ctx = gsap.context(() => {
    const introTl = gsap.timeline()
    introTl.from(introTitle.value, { 
			y: 30, 
			opacity: 0, 
			duration: 0.8, 
			ease: 'power3.out' 
		})
		.to(introTitleContainer.value, { 
			opacity: 0, 
			duration: 1, 
			ease: 'power3.in', 
			delay: 0.5, 
			onComplete: () => gsap.set(introTitleContainer.value, { display: 'none' }) })
		.to(leftCover.value, { 
			xPercent: -100, 
			duration: 1.2, 
			ease: 'power4.inOut' 
		}, '-=1')
		.to(rightCover.value, { 
			xPercent: 100, 
			duration: 1.2, 
			ease: 'power4.inOut' 
		}, '<')

    gsap.set(titleRefs.value, {
      top: '50%',
      yPercent: -50,
      opacity: (i) => (i === 0 ? 1 : 0),
      y: (i) => `${i * 100}%`
    })

    const shapes = [shape1.value, shape2.value, shape3.value, shape4.value, shape5.value, shape6.value, shape7.value, shape8.value, shape9.value, shape10.value]
    const mainTl = gsap.timeline({
      scrollTrigger: {
        trigger: mainContainer.value,
        start: 'top top',
        end: `+=${hobbies.length * 100}%`,
        scrub: 1.2,
        pin: pinnedContainer.value,
        anticipatePin: 1,
      },
    })

    hobbies.forEach((hobby, index) => {
      const isEven = index % 2 === 0

      mainTl.to(titleWrapper.value, { 
				x: isEven ? '0' : '50vw', 
				ease: 'sine.inOut' 
			})
			.to(shapes, {
				borderColor: hobby.titleColor, 
				rotation: `+=${45 + index * 45}`, 
				ease: 'sine.inOut' 
			}, '<')
      .to(titleRefs.value, {
				y: (i) => `${(i - index) * 100}%`,
				opacity: (i) => (i === index ? 1 : 0),
				color: (i) => (i === index ? hobby.titleColor : '#4a5568'),
				ease: 'sine.inOut',
			}, '<')
    })

  }, mainContainer.value)
})

onUnmounted(() => {
  if (ctx) {
    ctx.revert()
  }
})
</script>

