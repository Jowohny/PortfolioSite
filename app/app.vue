<script setup lang="ts">
import { ref } from 'vue';
import { gsap } from 'gsap';

const showIntro = ref(true);
const showExperience = ref(false);

const introRef = ref()

const trapezoidLeft = ref<HTMLElement | null>(null);
const trapezoidRight = ref<HTMLElement | null>(null);
const centerCircle = ref<HTMLElement | null>(null);
const shapeContainer = ref<HTMLElement | null>(null);
const sectionTitleRef = ref<HTMLHeadingElement | null>(null);

const turnOffIntro = () => {
  showIntro.value = false;
};

const turnOnExperience = () => {
  showExperience.value = true;
}

const onLeave = (el: Element, done: () => void) => {
  const particles = el.querySelectorAll('.sparkle');

  const tl = gsap.timeline();

  tl.set(shapeContainer.value, { autoAlpha: 1 })
    .set(centerCircle.value, { scale: 0 })
    .to(particles, {
      y: gsap.utils.random(-800, -1200, true),
      x: gsap.utils.random(-300, 300, true),
      scale: 10,
      opacity: 0,
      duration: 1,
      stagger: 0.01,
      ease: 'power2.in',
    })
    .fromTo(trapezoidLeft.value,
      { xPercent: -200 },
      { 
        xPercent: 0, 
        duration: 2.5, 
        ease: 'power2.inOut' 
      }, '-=2')
    .fromTo(trapezoidRight.value,
      { xPercent: 200 },
      { 
        xPercent: 0, 
        duration: 2.5, 
        ease: 'power2.inOut',
      onComplete: () => {
        done()
      } 
      },
      "<"
    )
    .to(introRef.value, {
      scale: 0,
      duration: 2,
      opacity: 0,
      ease: 'power2.inOut',
      onComplete: () => {
        turnOnExperience()
      }
    }, '-=4.1')
    .to(centerCircle.value, {
      scale: 1.7,
      duration: 2,
      ease: "elastic.out(1, 0.75)"
    }, '-=0.75')
    .to(centerCircle.value, {
      scale: 6,
      duration: 2,
      ease: 'power3.inOut',
      backgroundColor: '#94A3B8'
    })
    .to(centerCircle.value, {
      opacity: 0,
      backgroundColor: '#000000',
      duration: 2
    }, '-=1')
    .to([trapezoidLeft.value, trapezoidRight.value], {
      opacity: 0,
      duration: 1
    }, '-=2.3')
};
</script>

<template>
  <UApp>
    <div ref="shapeContainer" class="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-0 z-10">
      <div
        ref="trapezoidLeft"
        class="absolute top-0 left-0 h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
        style="width: 130%; clip-path: polygon(0 0, 100% 0, 80% 100%, 0 100%)"
      />
      <div
        ref="trapezoidRight"
        class="absolute top-0 right-0 h-full mix-blend-darken bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
        style="width: 130%; clip-path: polygon(20% 0, 100% 0, 100% 100%, 0% 100%)"
      />
      <div class="absolute top-0 left-0 w-full h-full flex items-center justify-center">
        <div  
          ref="centerCircle"
          class="bg-white rounded-full flex items-center justify-center"
          style="width: 40vh; height: 40vh;"
        >
          <h1 ref="sectionTitleRef" class="text-black text-6xl font-inter font-thin tracking-wide flex items-center justify-center w-full h-full">About Me</h1>
        </div>
      </div>
    </div>
    <Transition
      :css="false"
      @leave="onLeave"
    >
      <Intro ref="introRef" v-if="showIntro" @introTransition="turnOffIntro" />
    </Transition>
    <div v-if="showExperience">
      <AboutMe/>
    </div>
  </UApp>
</template>

<style>
@import '~/assets/css/tailwind.css';

body {
  background-color: #0f172a;
}
</style>
