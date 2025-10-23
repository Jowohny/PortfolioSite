<script setup lang="ts">
import {gsap} from 'gsap'
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(SplitText)

const splitTitleRef = ref<HTMLHeadingElement | null>(null)
const buttonRef = ref<HTMLDivElement | null>(null)
const carouselRef = ref<HTMLDivElement | null>(null)
const liveRef = ref<HTMLDivElement | null>(null)
let splitTitle: SplitText | null = null

const emit = defineEmits(['returnToSender'])

const isSmallScreen = ref(false)

const websiteTypes = [
  {
    siteImage: '/images/project/AeryLanding.png',
    link: 'https://aery.app'
  },
  {
    siteImage: '/images/project/GlobalClicker.png',
    link: 'https://clickcounter-lkf1.onrender.com'
  },
  {   
    siteImage: '/images/project/PortfolioV1.png',
    link: 'https://portfolio-site-lemon-theta.vercel.app/'
  }
]

let mediaQuery: MediaQueryList
let handleResize: (e: MediaQueryListEvent) => void

onMounted(() => {
    mediaQuery = window.matchMedia('(max-width: 639px)') 
    
    handleResize = (e: Event | MediaQueryListEvent) => {
        isSmallScreen.value = (e as MediaQueryListEvent).matches
    }

    isSmallScreen.value = mediaQuery.matches
    
    mediaQuery.addEventListener('change', handleResize)

    if (!splitTitleRef.value) return;
    splitTitle = new SplitText(splitTitleRef.value, { type: 'chars' });
    if (!splitTitle.chars) return;


    gsap.set(carouselRef.value, { opacity: 0 })
    gsap.set(liveRef.value, { opacity: 0, yPercent: 100 })
    gsap.set(buttonRef.value, { opacity: 0, scale: 0 })

    gsap.to(liveRef.value, {
        opacity: 0.7,
        scale: 1.1,
        repeat: -1,
        yoyo: true,
        duration: 1.5,
        ease: 'power1.inOut',
        delay: 3
    });

		gsap.set(splitTitle!.chars, { opacity: 0, y: 20 });
		gsap.set(carouselRef.value, { y: 100 });

		gsap.set(splitTitle!.chars[1]!,{rotateX: 180, x: 0, y: '40vmin'})
		gsap.set(splitTitle!.chars[2]!,{rotateY: 180, x: '-30vmin', y: '34vmin'})
		gsap.set(splitTitle!.chars[3]!,{clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)', scaleX: 3.8, scaleY: 2.8, opacity: 1, x: '16vmin', y: '29vmin'})
		gsap.set(splitTitle!.chars[4]!,{clipPath: 'inset(100% 0 0 0)', opacity: 1, scaleX: 3.8, scaleY: 2.51, x: '10vmin', y: '73vmin'})
		gsap.set(splitTitle!.chars[5]!,{scale: 0, x: '4vmin', y: '51vmin' })
		gsap.set(splitTitle!.chars[6]!,{rotateZ: 180, x: '-30vmin', y: '-25vmin'}),
		gsap.set(splitTitle!.chars[7]!,{rotateZ: 90, x: '-27.5vmin', y: '90vmin', scale: 2.8})

		const timeline = gsap.timeline()

		timeline.fromTo(splitTitle!.chars[0]!, {
				x: '60vmin', 
				rotateZ: 90, 
				scale: 2 
		}, { 
				x: '12vmin', 
				opacity: 1, 
				duration: 1, 
				ease: 'expoScale(0.5,7,power2.out)'
		})
		.to(splitTitle!.chars[0]!, { 
				rotateZ: 0, 
				scale: 1, 
				duration: 0.8 
		}, '-=0.7')
		.to(splitTitle!.chars[0]!, { 
				scale: 6, 
				duration: 1.5, 
				ease: 'elastic.out(1,0.5)'
		})
		.to(splitTitle!.chars[0]!, { 
				x: '7vmin', 
				y: '60vmin', 
				duration: 1, 
				ease: 'power4.out' 
		}, '<+=0.3')
		.to(splitTitle!.chars[1]!, { 
				opacity: 1, 
				duration: 1, 
				rotateX: 0, 
				scaleY: 3, 
				scaleX: 3.8, 
				y: '28vmin', 
				x: '9vmin', 
				ease: 'power4.out' 
		}, '<+=0.15')
		.to(splitTitle!.chars[2]!, { 
				opacity: 1, 
				duration: 1, 
				rotateY: 0, 
				scaleY: 1.3, 
				scaleX: 1.5, 
				y: '34vmin', 
				x: '-12.5vmin', 
				ease: 'power4.out' 
		}, '<+=0.15')
		.to(splitTitle!.chars[6]!,{ 
				opacity: 1, 
				duration: 1, 
				rotateZ: 0, 
				scaleY: 1.3, 
				scaleX: 1.5, 
				y: '23vmin', 
				x: '-34vmin', 
				ease: 'power4.out' 
		}, '<+=0.151')
		.to(splitTitle!.chars[5]!, { 
				opacity: 1, 
				duration: 1, 
				scale: 3, 
				ease: 'power4.out' 
		}, '<+=0.15')
		.to(splitTitle!.chars[3]!, { 
				duration: 1, 
				clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)', 
				ease: 'power4.out' 
		}, '<+=0.15')
		.to(splitTitle!.chars[4]!, { 
				duration: 1, 
				clipPath: 'inset(0% 0 0 0)', 
				ease: 'power4.out' 
		}, '<+=0.15')
		.to(splitTitle!.chars[7]!, { 
				duration: 1, 
				y: '75vmin', 
				ease: 'bounce.out', 
				opacity: 1 
		}, '<+=0.15')
		.to([...splitTitle!.chars], { 
				duration: 1, 
				stagger: 0.04, 
				y: '50%', 
				x: 0, 
				rotateX: 0, 
				rotateY: 0, 
				rotateZ: 0, 
				ease: 'power4.inOut', 
				scaleX: 1, 
				scaleY: 1 
		})
		.to(liveRef.value, {
				duration: 0.5,
				ease: 'power4.inOut',
				yPercent: 25,
				opacity: 1
		}, '-=0.5')
		.to(carouselRef.value, {
				duration: 0.75,
				opacity: 1,
				ease: 'power4.inOut',
				yPercent: 0
		}, '-=0.5')
		.to(buttonRef.value, {
			opacity: 1,
			scale: 1,
			duration: 1.5,
			ease: 'elastic.out(1,0.7)'
		}, '-=0.7')
})

const onHoverEnter = (e: MouseEvent) => {
    gsap.to(e.currentTarget, { scale: 1.05, duration: 0.3, ease: 'power1.out' });
}
const onHoverLeave = (e: MouseEvent) => {
    gsap.to(e.currentTarget, { scale: 1, duration: 0.3, ease: 'power1.out' });
}

const reverseOut = () => {
  if (!splitTitle) return;

  const timeline = gsap.timeline()

  timeline.to(liveRef.value, {
    xPercent: 200,
    duration: 1.2,
    ease: 'power4.inOut',
    opacity: 0
  })
  .to(buttonRef.value, {
    opacity: 0,
    duration: 1.5,
    ease: 'elastic.inOut(1,0.3)',
    scale: 0
  }, '<')
  .to(splitTitle!.chars, {
    yPercent: -100,
    rotateZ: 90,
    duration: 1.5,
    opacity: 0,
    stagger: 0.07,
    ease: 'elastic.out(1, 1)'
  }, '<+=0.2')
  .to(carouselRef.value, {
    duration: 0.75,
    opacity: 0,
    ease: 'power4.inOut',
    yPercent: -50,
    onComplete: () => {
      emit('returnToSender')
    }
  }, '-=1.5')
}

</script>

<template>
  <div class="min-h-screen bg-[#0f172a] overflow-hidden"> 
    <div class="block text-center flex justify-center">
      <h1 ref="splitTitleRef" class="text-5xl sm:text-7xl md:text-8xl mb-8 sm:mb-12 md:mb-24 text-white font-thin tracking-loose font-inter  ">
          PROJECTS
      </h1>
      <h1 ref="liveRef" class="font-inter font-thin tracking-loose text-red-500 ml-4 sm:ml-6 md:ml-8 text-base sm:text-lg md:text-xl">(LIVE)</h1>
    </div>

    <div>
      <div class="px-2 sm:px-4 md:px-6 mb-40" ref="carouselRef">
        <UCarousel
          v-slot="{ item }"
          :items="websiteTypes"
          :orientation="isSmallScreen ? 'vertical' : 'horizontal'"
          :pause-on-hover="false"
          :auto-scroll="true"
          :pause-on-focus="false"
          :draggable="false"
          loop
          :ui= "{item:'basis-1/2 justify-center flex'}"
        >
          <NuxtLink 
            :to="item.link" 
            external 
            target="_blank" 
            rel="noopener noreferrer"
            @mouseenter="onHoverEnter"
            @mouseleave="onHoverLeave"
          >
            <img :src="item.siteImage" class="object-cover rounded-md shadow-lg">
          </NuxtLink>
        </UCarousel>
      </div>
    </div>
    
    <div ref="buttonRef" class="block flex justify-center mb-12 mt-12 sm:mt-16 md:mt-24">
      <UButton 
        class="py-2 px-8 text-lg md:text-xl font-light tracking-widest" 
        label="Return" 
        size="xl" 
        variant="solid" 
        color="secondary"  
        @click="reverseOut"
        @mouseenter="onHoverEnter"
        @mouseleave="onHoverLeave"
      />
    </div>
  </div>
</template>