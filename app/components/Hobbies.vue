<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface Hobby {
  title: string
  displayTitle: string
  titleColor: string
}

const hobbies: Hobby[] = [
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
  },
]

const mainContainer: Ref<HTMLDivElement | null> = ref(null)
const introTitleContainer: Ref<HTMLDivElement | null> = ref(null)
const introTitle: Ref<HTMLHeadingElement | null> = ref(null)
const leftCover: Ref<HTMLDivElement | null> = ref(null)
const rightCover: Ref<HTMLDivElement | null> = ref(null)
const pinnedContainer: Ref<HTMLDivElement | null> = ref(null)
const titleWrapper: Ref<HTMLDivElement | null> = ref(null)
const titleRefs: Ref<HTMLHeadingElement[]> = ref([])
const shapeRefs: Ref<HTMLDivElement[]> = ref([])

let ctx: gsap.Context | null = null

const addTitleRef = (el: Element | ComponentPublicInstance | null) => {
  if (el instanceof HTMLHeadingElement) titleRefs.value.push(el)
}

const addShapeRef = (el: Element | ComponentPublicInstance | null) => {
  if (el instanceof HTMLDivElement) shapeRefs.value.push(el)
}

onMounted(() => {
  ctx = gsap.context(() => {
    const introTl = gsap.timeline()
    introTl
      .from(introTitle.value, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
      })
      .to(introTitleContainer.value, {
        opacity: 0,
        duration: 1,
        ease: 'power3.in',
        delay: 0.5,
        onComplete: () => {
          gsap.set(introTitleContainer.value, { display: 'none' })
				}
      })
      .to(
        leftCover.value,
        {
          xPercent: -100,
          duration: 1.2,
          ease: 'power4.inOut',
        },
        '-=1'
      )
      .to(
        rightCover.value,
        {
          xPercent: 100,
          duration: 1.2,
          ease: 'power4.inOut',
        },
        '<'
      )

    gsap.set(titleRefs.value, {
      top: '50%',
      yPercent: -50,
      opacity: (i: number) => (i === 0 ? 1 : 0),
      y: (i: number) => `${i * 100}%`,
    })

    const shapes: (HTMLDivElement | null)[] = [...shapeRefs.value]

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

      mainTl
        .to(titleWrapper.value, {
          x: isEven ? '0' : '50vw',
          ease: 'sine.inOut',
        })
        .to(
          shapes,
          {
            borderColor: hobby.titleColor,
            rotation: `+=${45 + index * 45}`,
            ease: 'sine.inOut',
          },
          '<'
        )
        .to(
          titleRefs.value,
          {
            y: (i: number) => `${(i - index) * 100}%`,
            opacity: (i: number) => (i === index ? 1 : 0),
            color: (i: number) =>
              i === index ? hobby.titleColor : '#4a5568',
            ease: 'sine.inOut',
          },
          '<'
        )
    })
  }, mainContainer.value!)
})

onUnmounted(() => {
  if (ctx) {
    ctx.revert()
  }
})
</script>

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
        <div :ref="(el) => addShapeRef(el)" class="absolute left-[15%] top-[20%] h-48 w-48 border-4"></div>
        <div :ref="(el) => addShapeRef(el)" class="absolute right-[20%] top-[55%] h-36 w-36 border-2"></div>
        <div :ref="(el) => addShapeRef(el)" class="absolute right-[40%] top-[70%] h-52 w-52 border-3"></div>
        <div :ref="(el) => addShapeRef(el)" class="absolute right-[75%] top-[65%] h-68 w-68 border-2"></div>
        <div :ref="(el) => addShapeRef(el)" class="absolute right-[10%] top-[20%] h-80 w-80 border-3"></div>
        <div :ref="(el) => addShapeRef(el)" class="absolute right-[30%] top-[10%] h-96 w-96 border-2"></div>
				<div :ref="(el) => addShapeRef(el)" class="absolute rounded-full right-[50%] top-[55%] h-36 w-36 border-1"></div>
        <div :ref="(el) => addShapeRef(el)" class="absolute rounded-full right-[45%] top-[5%] h-96 w-96 border-2"></div>
				<div :ref="(el) => addShapeRef(el)" class="absolute rounded-full right-[80%] top-[25%] h-48 w-48 border-1"></div>
        <div :ref="(el) => addShapeRef(el)" class="absolute rounded-full right-[20%] top-[40%] h-96 w-96 border-4"></div>
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

