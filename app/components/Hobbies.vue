<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface Hobby {
  title: string
  displayTitle: string
  titleColor: string
  icon: string,
  description: string,
  start: string
}

const hobbies: Hobby[] = [
  {
    title: 'Keyboard Creation',
    displayTitle: 'Keyboard Creation',
    titleColor: '#22d3ee',
    icon: 'i-lucide-keyboard',
    description: 'This hobby gives me the chance to express my creativity when it comes to creating practical items for use, in this case it would be keyboards, ' + 
      'in which I have made around 2 personal keyboards and around 5 keyboard as a gift to other friends. I plan on continuing to make more keyboards in the future ' +
      'as long as I can afford it and as long as I feel the want to make some for other people I know in my life.',
    start: 'March 2024 - Present'
  },
  {
    title: '3D Modeling',
    displayTitle: '3D Modeling',
    titleColor: '#fb923c',
    icon: 'i-material-symbols-blender',
    description: 'This is yet another hobby that gives me almost unlimited freedom to create what I see fit. In this, I have made stuff like, a custom boat for a game in ' +
      'a game development class I took in college, a custom keycap holder as little gift for my friends and modeling some keyboard I made my friends for some basic practice' +
      '(both an extention of my keyboard hobby), along with many more! (Donuts, Pokemon, Electronic Devices, etc.)',
    start: 'June 2024 - Present'
  },
  {
    title: 'Speed Cubing',
    displayTitle: 'Speed Cubing',
    titleColor: '#ef4444',
    icon: 'i-hugeicons-rubiks-cube',
    description: 'A simple passion that I took on quite early in comparison to the rest of my hobbies, and possibly the most expensive one, but we won\'t get into that. ' +
      'Basic backstory is that I messed up my teacher\'s Rubik\'s cube, which at the time I had no idea how to solve and tasked me to put it back to how it was before(solved), ' +
      'or he\'d give me detention since it wasn\'t mine to mess with, so I came back the next day and solved it in 15 minutes, making that my first solve ever.',
    start: 'October 2019 - Present'
  },
  {
    title: 'Animation',
    displayTitle: 'Animation',
    titleColor: '#a4b53e',
    icon: 'i-material-symbols-animation',
    description: 'I started this in response to 3D modeling as it was another part of Blender, the program I was using. I mainly started with simply animations like a bouncing ball, ' +
      'a simple stick fight, a functioning clock, basic impact frames, and some more. This was then used later to make a few animations for a startup I was a part of. (Aery LLC) ' +
      'Though it is something I am passionate about, it probably isn\'t going to last that much longer as I find other hobbies a litte more entertaining.',
    start: 'June 2024 - Present'
  },
  {
    title: 'Cooking',
    displayTitle: 'Cooking',
    titleColor: '#feaafe',
    icon: 'i-material-symbols-cooking',
    description: 'I would\'ve liked to start this a lot sooner than I did. In a sense, I did technically start cooking a good while before, but those were simple dishes, like just ' +
    'a steak on its own, mashed potatoes with gravy, fries, etc, all stuff that didnt need all that much preparation or skill to execute. It wasn\'t until much more recently that I ' +
    'had more interest in finding places to get fresher produce. I also found a butcher that allowed me to access good quality meat. So yes, I am making more complex things now.',
    start: 'January 2025 - Present'
  },
]

const mainContainer: Ref<HTMLDivElement | null> = ref(null)
const introTitleContainer: Ref<HTMLDivElement | null> = ref(null)
const introTitle: Ref<HTMLHeadingElement | null> = ref(null)
const leftCover: Ref<HTMLDivElement | null> = ref(null)
const rightCover: Ref<HTMLDivElement | null> = ref(null)
const pinnedContainer: Ref<HTMLDivElement | null> = ref(null)
const titleWrapper: Ref<HTMLDivElement | null> = ref(null)
const titleRefs: Ref<HTMLDivElement[]> = ref([])
const shapeRefs: Ref<HTMLDivElement[]> = ref([])

let ctx: gsap.Context | null = null

const addTitleRef = (el: Element | ComponentPublicInstance | null) => {
  if (el instanceof HTMLDivElement) titleRefs.value.push(el)
}

const addShapeRef = (el: Element | ComponentPublicInstance | null) => {
  if (el instanceof HTMLDivElement) shapeRefs.value.push(el)
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
			onComplete: () => {
        gsap.set(introTitleContainer.value, { display: 'none' })
			}
		})
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
      left: '0%',
      yPercent: -50,
      opacity: (i: number) => (i === 0 ? 1 : 0),
      y: (i: number) => `${i * 100}%`,
    })

    const shapes: (HTMLDivElement | null)[] = [...shapeRefs.value]

    const mainTl = gsap.timeline({
      scrollTrigger: {
        trigger: pinnedContainer.value,
        start: 'top top',
        end: `+=${hobbies.length * 100}%`,
        scrub: 1.2,
        pin: true,
        anticipatePin: 1
      },
    })

    hobbies.forEach((hobby, index) => {
      mainTl.to(titleWrapper.value, { 
				x: index % 2 === 0 ? '0' : '50vw', 
				ease: 'sine.inOut' 
			})
			.to(shapes, { 
				borderColor: hobby.titleColor, 
				rotation: `+=${45 + index * 45}`, 
				ease: 'sine.inOut' 
			}, '<')
			.to(titleRefs.value, {
				y: (i: number) => `${(i - index) * 100}%`,
				opacity: (i: number) => (i === index ? 1 : 0),
				color: (i: number) => i === index ? hobby.titleColor : '#4a5568',
				ease: 'sine.inOut',
			}, '<')
    })

    const detailSections = gsap.utils.toArray('.hobby-detail-section')
    detailSections.forEach((section) => {
      const visual = (section as HTMLElement).querySelector('.visual-container')
      const text = (section as HTMLElement).querySelector('.text-container')

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section as Element,
          start: 'top 75%',
          toggleActions: 'play none none reverse'
        }
      })

      tl.from(visual, { 
				opacity: 0, 
				scale: 0.8, 
				duration: 0.8, 
				ease: 'power3.out' 
			})
			.from(text!.children, {
				opacity: 0,
				y: 30,
				duration: 0.6,
				ease: 'power3.out',
				stagger: 0.2
			}, '-=0.5')
    })

  }, mainContainer.value!)
})

onUnmounted(() => {
  if (ctx) ctx.revert()
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
        <div :ref="addShapeRef" class="absolute left-[15%] top-[20%] h-48 w-48 border-4"></div>
        <div :ref="addShapeRef" class="absolute right-[20%] top-[55%] h-36 w-36 border-2"></div>
        <div :ref="addShapeRef" class="absolute right-[40%] top-[70%] h-52 w-52 border-3"></div>
        <div :ref="addShapeRef" class="absolute right-[75%] top-[65%] h-68 w-68 border-2"></div>
        <div :ref="addShapeRef" class="absolute right-[10%] top-[20%] h-80 w-80 border-3"></div>
        <div :ref="addShapeRef" class="absolute right-[30%] top-[10%] h-96 w-96 border-2"></div>
        <div :ref="addShapeRef" class="absolute rounded-full right-[50%] top-[55%] h-36 w-36 border-1"></div>
        <div :ref="addShapeRef" class="absolute rounded-full right-[45%] top-[5%] h-96 w-96 border-2"></div>
        <div :ref="addShapeRef" class="absolute rounded-full right-[80%] top-[25%] h-48 w-48 border-1"></div>
        <div :ref="addShapeRef" class="absolute rounded-full right-[20%] top-[40%] h-96 w-96 border-4"></div>
      </div>

      <div ref="titleWrapper" class="absolute flex h-full w-1/2 items-center justify-center">
        <div class="relative h-full w-full">
          <div
            v-for="hobby in hobbies"
            :key="hobby.title"
            :ref="addTitleRef"
            class="absolute w-full flex items-center justify-center"
          >
            <h1 class="text-8xl text-center shrink font-black tracking-wide">
              {{ hobby.displayTitle }}
            </h1>
						<UIcon :name="hobby.icon" class="size-40"/>
          </div>
        </div>
      </div>
    </div>

    <div class="relative z-10 bg-[#0f172a] px-8">
      <div
        v-for="(hobby, index) in hobbies"
        :key="`${hobby.title}${index}`"
        class="hobby-detail-section grid min-h-[80vh] w-full max-w-7xl mx-auto items-center gap-12 py-24 grid-cols-2"
      >
        <div
          class="visual-container flex justify-center aspect-square items-center"
          :class="{'order-last': index % 2 === 0}"
        >
          <div class="relative rounded-2xl bg-slate-900 p-8 flex place-content-center blur w-4/5 h-4/5" :style="{backgroundColor: hobby.titleColor, opacity: 0.5}"/>
            
        </div>

        <div class="text-container">
          <h3 
            class="block mb-2 font-semibold text-lg"
            :style="{ color: hobby.titleColor }"
          >
            {{ hobby.start }}
				</h3>
          <h2 class="mb-6 text-6xl font-bold text-slate-100">
            {{ hobby.title }}
          </h2>
          <p class="text-lg text-slate-400 leading-relaxed">
            {{ hobby.description }}
          </p>
        </div>
      </div>
    </div>

  </div>
</template>