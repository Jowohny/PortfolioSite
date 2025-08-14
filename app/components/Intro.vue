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
let splitTitle: SplitText | null = null
let splitTitleAlternate: SplitText | null = null
let splitSubText: SplitText | null = null
let splitSubTextAlternate: SplitText | null = null
let hoverTimelineTitle: gsap.core.Timeline | null = null
let hoverTimelineSubText: gsap.core.Timeline | null = null


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
      duration: 0.3
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
})

const createDynamicParticles = () => {
  if (!particlesRef.value) return
  const colors = ['#3B82F6', '#6366F1', '#06B6D4', '#7C3AED', '#A78BFA']
  const fragment = document.createDocumentFragment()

  for (let i = 0; i < 100; i++) {
    const particle = document.createElement('div')
    const size = gsap.utils.random(2, 10)
    const duration = gsap.utils.random(3, 8)
    const delay = gsap.utils.random(0, 5)

    gsap.set(particle, {
      className: 'sparkle particle-shape absolute rounded-full',
      width: size,
      height: size,
      left: `${gsap.utils.random(0, 100)}%`,
      top: `${gsap.utils.random(0, 100)}%`,
      backgroundColor: gsap.utils.random(colors),
      opacity: gsap.utils.random(0.2, 0.8),
    })

    gsap.to(particle, {
      y: gsap.utils.random(-80, 80),
      x: gsap.utils.random(-70, 70),
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
  gsap.to(buttonRef.value, {
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
defineExpose({
  particlesRef,
})
</script>

<template>
  <div
    ref="sceneRef"
    class="min-h-screen relative overflow-hidden flex items-center justify-center bg-slate-900 z-0"
    style="background: radial-gradient(circle at 50% 50%, #1e1b4b, #0f172a);"
  >
    <div ref="particlesRef" class="absolute inset-0 z-0"></div>

    <div class="relative z-0 text-center px-4">
        <div @mouseenter="playTitleHoverAnimation" @mouseleave="reverseTitleHoverAnimation" class="mb-8">
            <h1
                ref="titleAlternateRef"
                class="top-0 left-0 text-9xl text-white font-bold mix-blend-difference yabadaba"
            >
                Welome to my <br> Portfolio!
            </h1>
            <h1
                ref="titleRef"
                class="absolute top-0 left-0 right-0 text-9xl font-bold text-white tracking-tight mix-blend-difference yabadaba"
            >
                I'm Johny Vu, <br> the creator
            </h1>
        </div>

        <div @mouseenter="playSubTextHoverAnimation" @mouseleave="reverseSubTextHoverAnimation" class="relative">
            <p
            ref="subtitleRef"
            class="text-lg md:text-2xl text-indigo-200/80 mb-10 font-semibold text-white yabadaba"
                  >
                I specialize in frontend development with<br>a higher focus on animation, web design, and UI.
            </p>      
            <p
            ref="subtitleAlternateRef"
            class="absolute top-0 left-0 right-0 text-lg md:text-2xl text-indigo-200/80 mb-10 font-semibold text-white yabadaba"
                  >
                This portfolio gives me a chance to show<br> off and maybe even have a chance to be hired.
            </p>
        </div>

      <button
        ref="buttonRef"
        @click="$emit('introTransition')"
        class="border-4 border-blue-400 text-white font-semibold px-8 py-4 text-base rounded-full yabadaba"
      >
        Lets Get Started
      </button>
    </div>
  </div>
</template>
