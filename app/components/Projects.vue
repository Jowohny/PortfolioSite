<script setup lang="ts">
import {gsap} from 'gsap'
import { SplitText } from 'gsap/SplitText';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(SplitText, ScrollTrigger)

const splitTitleRef = ref<HTMLHeadingElement | null>(null)
let splitTitle: SplitText | null = null

onMounted(() => {

    splitTitle = new SplitText (splitTitleRef.value, { type: 'chars' })
    gsap.set(splitTitleRef.value, {
        opacity: 1,
        y: '50vh',
        yPercent: -50
    })

    const timeline = gsap.timeline()

    timeline.fromTo(splitTitle.chars[0]!, 
    {
        x: '60vw',
        rotateZ: 90,
        scale: 2,
        opacity: 1
    },
    {
        x: 0,
        duration: 2.1,
        ease: 'expo.inOut'
    })
    .to(splitTitle.chars[0]!, {
        rotateZ: 0,
        scale: 1,
        duration: 1.5
    }, '-=1')

    
})

</script>

<template>
    <div class="min-h-screen bg-[#0f172a]">
        <h1 ref="splitTitleRef" class="block text-8xl font-bold text-white tracking-loose text-center">
            Projects
        </h1>
    </div>
</template>