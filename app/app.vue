<script setup lang="ts">
import { ref } from 'vue';
import { gsap } from 'gsap';

const showIntro = ref(true);

const introRef = ref()

const trapezoidLeft = ref<HTMLElement | null>(null);
const trapezoidRight = ref<HTMLElement | null>(null);
const trapezoidContainer = ref<HTMLElement | null>(null);

const turnOffIntro = () => {
  showIntro.value = false;
};


const onLeave = (el: Element, done: () => void) => {
  const particles = el.querySelectorAll('.sparkle');

  const tl = gsap.timeline({
  });

  tl.set(trapezoidContainer.value, { autoAlpha: 1 })
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
      { xPercent: 0, duration: 2, ease: 'power2.inOut' },
      "-=1"
    )
    .fromTo(trapezoidRight.value,
      { xPercent: 200 },
      { xPercent: 0, duration: 2, ease: 'power2.inOut' },
      "<"
    )
    .to(introRef.value, {
      scale: 0,
      duration: 2,
      opacity: 0,
      ease: 'power2.inOut'
    },
    '-=2'
  );
};
</script>

<template>
  <UApp class="bg-[#0f172a] antialiased">
    <div ref="trapezoidContainer" class="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-0 z-50">
      <div
        ref="trapezoidLeft"
        class="absolute top-0 left-0 h-full mix-blend-difference backdrop-blur-3xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
        style="width: 130%; clip-path: polygon(0 0, 100% 0, 80% 100%, 0 100%)"
      ></div>
      <div
        ref="trapezoidRight"
        class="absolute top-0 right-0 h-full mix-blend-difference backdrop-blur-3xl bg-purple-900"
        style="width: 130%; clip-path: polygon(20% 0, 100% 0, 100% 100%, 0% 100%)"
      ></div>
    </div>

    <Transition
      :css="false"
      @leave="onLeave"
    >
      <Intro ref="introRef" v-if="showIntro" @introTransition="turnOffIntro" />
    </Transition>

  </UApp>
</template>

<style>
/* Your existing tailwind import */
@import '~/assets/css/tailwind.css';
</style>
