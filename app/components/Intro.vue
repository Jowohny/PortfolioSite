<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'
import { SplitText } from 'gsap/SplitText'

gsap.registerPlugin(SplitText)

const sceneRef = ref<HTMLElement | null>(null)
const titleRef = ref<HTMLElement | null>(null)
const subtitleRef = ref<HTMLElement | null>(null)
const subtitleAlternateRef = ref<HTMLElement | null>(null)
const buttonRef = ref<HTMLElement | null>(null)
const particlesRef = ref<HTMLElement | null>(null)
const titleAlternateRef = ref<HTMLElement | null>(null)
const existance = ref(true)
const toast = useToast()
let splitTitle: SplitText | null = null
let splitTitleAlternate: SplitText | null = null
let splitSubText: SplitText | null = null
let splitSubTextAlternate: SplitText | null = null
let hoverTimelineTitle: gsap.core.Timeline | null = null
let hoverTimelineSubText: gsap.core.Timeline | null = null
let buttonTimeline: gsap.core.Timeline | null = null
let resizeTimeout: NodeJS.Timeout | null = null


onMounted(() => {
  createDynamicParticles()

  const timeline = gsap.timeline({
    defaults: { ease: 'power3.out' }
  })

  splitTitle = new SplitText(titleRef.value, { type: 'chars' })
  splitSubText = new SplitText(subtitleRef.value, { type: 'lines '})

  timeline
    .from(sceneRef.value, { autoAlpha: 0, duration: 1 })
    .from(splitTitle.chars,
    {
      y: 50,
      scale: 0.8,
      rotationX: -90,
      transformOrigin: '50% 50% -50',
      stagger: 0.04,
      duration: 0.3,
      onComplete: () => {
        toast.add({
          title: "Don't forget to hover!",
          description: "Hover over the title and subtext for some extra information!",
          icon: "i-lucide-lightbulb",
          ui: {
            root: 'w-full p-4 rounded-lg shadow-lg bg-white dark:bg-gray-900 ring-1 ring-gray-200 dark:ring-gray-800',
          },
          closeIcon: 'i-lucide-arrow-right',
          duration: 3000
        })
      }
    },'-=0.5')
    .from(splitSubText.lines, {
      autoAlpha: 0,
      y: 20,
      duration: 0.8,
      stagger: 0.3
    }, '-=0.6')
    .from(buttonRef.value, {
      autoAlpha: 0,
      y: 20,
      scale: 0.9,
      duration: 0.8
    }, '-=0.4')

  startContinuousAnimations()
  setupTitleHoverEffect()
  
  // Add resize listener for responsive particles
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  if (resizeTimeout) {
    clearTimeout(resizeTimeout)
  }
  window.removeEventListener('resize', handleResize)
})

const handleResize = () => {
  if (resizeTimeout) {
    clearTimeout(resizeTimeout)
  }
  
  resizeTimeout = setTimeout(() => {
    // Clear existing particles
    if (particlesRef.value) {
      particlesRef.value.innerHTML = ''
    }
    // Recreate particles with new responsive settings
    createDynamicParticles()
  }, 250) // Debounce resize events
}

const createDynamicParticles = () => {
  if (!particlesRef.value) return
  const colors = ['#3B82F6', '#6366F1', '#06B6D4', '#7C3AED', '#A78BFA']
  const fragment = document.createDocumentFragment()

  // Responsive particle count based on screen size
  const particleCount = window.innerWidth < 768 ? 50 : window.innerWidth < 1024 ? 75 : 100

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div')
    // Responsive particle size based on screen size
    const baseSize = window.innerWidth < 768 ? 8 : window.innerWidth < 1024 ? 12 : 16
    const size = gsap.utils.random(baseSize, baseSize + 8)
    const duration = gsap.utils.random(3, 8)
    const delay = gsap.utils.random(0, 5)

    gsap.set(particle, {
      className: 'sparkle particle-shape absolute',
			textContent: '☆',
			fontSize: size,
      color: gsap.utils.random(colors),
      left: `${gsap.utils.random(0, 100)}%`,
      top: `${gsap.utils.random(0, 100)}%`,
      opacity: gsap.utils.random(0.2, 0.8),
    })

    // Responsive animation range based on screen size
    const animationRange = window.innerWidth < 768 ? 100 : window.innerWidth < 1024 ? 150 : 200
    
    gsap.to(particle, {
      y: gsap.utils.random(-animationRange, animationRange),
      x: gsap.utils.random(-animationRange, animationRange),
			rotateZ: gsap.utils.random(0, 180),
      duration: duration,
      delay: delay,
      ease: 'power1.inOut',
      repeat: -1,
      yoyo: true,
    })

    fragment.appendChild(particle)
  }
  particlesRef.value.appendChild(fragment)
}

const startContinuousAnimations = () => {
  buttonTimeline = gsap.timeline();
  buttonTimeline.to(buttonRef.value, {
    scale: 1.03,
    duration: 2,
    ease: 'power1.inOut',
    repeat: -1,
    yoyo: true,
  })
}

const setupTitleHoverEffect = () => {
  splitTitle = new SplitText(titleRef.value, { type: 'chars' })
  splitSubText = new SplitText(subtitleRef.value, { type: 'chars' })
  splitTitleAlternate = new SplitText(titleAlternateRef.value, { type: 'chars' })
  splitSubTextAlternate = new SplitText(subtitleAlternateRef.value, { type: 'chars' })

  gsap.set(splitTitleAlternate.chars, {
    autoAlpha: 0,
    rotationX: 80,
    transformOrigin: '50% 50% -40px'
  })

  gsap.set(splitSubTextAlternate.chars, {
    autoAlpha: 0,
    rotationX: 80,
    transformOrigin: '50% 50% -10px'
  })


  hoverTimelineTitle = gsap.timeline({ paused: true })
    .to(splitTitle.chars, {
      duration: 0.3,
      autoAlpha: 0,
      rotationX: -80,
      transformOrigin: '50% 50% -40px',
      stagger: 0.03,
      ease: 'power2.in'
    })
    .to(splitTitleAlternate.chars, {
      duration: 0.3,
      autoAlpha: 1,
      rotationX: 0,
      stagger: 0.03,
      ease: 'power2.out'
    }, "-=0.65") 

    hoverTimelineSubText = gsap.timeline({ paused: true })
    .to(splitSubText.chars, {
      duration: 0.2,
      autoAlpha: 0,
      rotationX: -80,
      transformOrigin: '50% 50% -10px',
      stagger: 0.01,
      ease: 'power2.in'
    })
    .to(splitSubTextAlternate.chars, {
      duration: 0.2,
      autoAlpha: 1,
      rotationX: 0,
      stagger: 0.01,
      ease: 'power2.out'
    }, "-=0.75") 
}

const playTitleHoverAnimation = () => {
  if (hoverTimelineTitle) {
    hoverTimelineTitle.play()
  }
}

const reverseTitleHoverAnimation = () => {
  if (hoverTimelineTitle) {
    hoverTimelineTitle.reverse()
  }
}

const playSubTextHoverAnimation = () => {
  if (hoverTimelineSubText) {
    hoverTimelineSubText.play()
  }
}

const reverseSubTextHoverAnimation = () => {
  if (hoverTimelineSubText) {
    hoverTimelineSubText.reverse()
  }
}

const buttonDestroy = () => {
  existance.value = false;
  
  if (buttonTimeline) {
    buttonTimeline.pause();
  }
  
  gsap.to(buttonRef.value, {
    rotateY: 360,
    duration: 1,
    opacity: 0,
    scaleX: 2,
    scaleY: 0.3,
    ease: 'power2.inOut'
  });
}

defineExpose({
  particlesRef,
})
</script>

<template>
  <div
    ref="sceneRef"
    class="min-h-screen relative overflow-hidden flex items-center justify-center z-0"
    style="background: radial-gradient(circle at 50% 50%, #1e1b4b, #0f172a);"
  >
    <div ref="particlesRef" class="absolute inset-0 z-0"></div>

    <div class="relative z-0 text-center px-4 sm:px-6 lg:px-8">
        <div @mouseenter="playTitleHoverAnimation" @mouseleave="reverseTitleHoverAnimation" class="mb-6 sm:mb-8 lg:mb-12">
            <h1
                ref="titleAlternateRef"
                class="top-0 left-0 text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl text-white font-bold mix-blend-difference yabadaba leading-tight"
            >
                Welome to my <br> Portfolio!
            </h1>
            <h1
                ref="titleRef"
                class="absolute top-0 left-0 right-0 text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold text-white tracking-tight mix-blend-difference yabadaba leading-tight"
            >
                I'm Johny Vu, <br> the creator
            </h1>
        </div>

        <div @mouseenter="playSubTextHoverAnimation" @mouseleave="reverseSubTextHoverAnimation" class="relative mb-8 sm:mb-10 lg:mb-12">
            <p
            ref="subtitleRef"
            class="text-base sm:text-lg md:text-xl lg:text-2xl text-indigo-200/80 font-semibold text-white yabadaba leading-relaxed px-2"
                  >
                I specialize in frontend development with<br>a higher focus on animation, web design, and UI.
            </p>      
            <p
            ref="subtitleAlternateRef"
            class="absolute top-0 left-0 right-0 text-base sm:text-lg md:text-xl lg:text-2xl text-indigo-200/80 font-semibold text-white yabadaba leading-relaxed px-2"
                  >
                This portfolio gives me a chance to show<br> off and maybe even have a chance to be hired.
            </p>
        </div>

      <button
        ref="buttonRef"
        @click="() => { $emit('introTransition'); buttonDestroy(); }"
        class="border-2 sm:border-3 lg:border-4 border-blue-400 text-white font-semibold px-6 py-3 sm:px-8 sm:py-4 lg:px-10 lg:py-5 text-sm sm:text-base lg:text-lg rounded-full yabadaba hover:bg-blue-400 hover:text-gray-900 transition-colors duration-300"
      >
        Lets Get Started
      </button>
    </div>
  </div>
</template>
