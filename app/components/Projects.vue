<script setup lang="ts">
import {gsap} from 'gsap'
import { SplitText } from 'gsap/SplitText';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { split } from 'postcss/lib/list';

gsap.registerPlugin(SplitText, ScrollTrigger)

const splitTitleRef = ref<HTMLHeadingElement | null>(null)
let splitTitle: SplitText | null = null

onMounted(() => {

    splitTitle = new SplitText (splitTitleRef.value, { type: 'chars' })
    gsap.set([...splitTitle.chars], {
        opacity: 0,
        y: '50vh',
        yPercent: -50
    })

    gsap.set(splitTitle.chars[1]!,{rotateX: 180, x: 0, y: '40vh'})
    gsap.set(splitTitle.chars[2]!,{rotateY: 180, x: '-30vw', y: '34vh'})
    gsap.set(splitTitle.chars[3]!,{clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)', scaleX: 3.8, scaleY: 2.8, opacity: 1, x: '12vw', y: '29vh'})
    gsap.set(splitTitle.chars[4]!,{clipPath: 'inset(100% 0 0 0)', opacity: 1, scaleX: 3.8, scaleY: 2.51, x: '8vw', y: '73vh'})
    gsap.set(splitTitle.chars[5]!,{scale: 0, x: '5vw', y: '51vh' })    
    gsap.set(splitTitle.chars[6]!,{rotateZ: 180, x: '-30vw', y: '-25vh'}),
    gsap.set(splitTitle.chars[7]!,{rotateZ: 90, x: '-13.5vw', y: '90vh', scale: 2.8})

    const timeline = gsap.timeline()

    timeline.fromTo(splitTitle.chars[0]!, 
    {
        x: '60vw',
        rotateZ: 90,
        scale: 2
    },
    {
        x: '12vw',
        opacity: 1,
        duration: 1,
        ease: 'expoScale(0.5,7,power2.out)'
    })
    .to(splitTitle.chars[0]!, {
        rotateZ: 0,
        scale: 1,
        duration: 0.8
    }, '-=0.7')
    .to(splitTitle.chars[0]!, {
        scale: 6,
        duration: 1.5,
        ease: 'elastic.out(1,0.5)'
    })
    .to(splitTitle.chars[0]!, {
        x: '7vw',
        y: '60vh',
        duration: 1,
        ease: 'power4.out'
    }, '<+=0.3')
    .to(splitTitle.chars[1]!, {
        opacity: 1,
        duration: 1,
        rotateX: 0,
        scale: 3,
        y: '28vh',
        x: '7vw',
        ease: 'power4.out'
    }, '<+=0.15')
    .to(splitTitle.chars[2]!, {
        opacity: 1,
        duration: 1,
        rotateY: 0,
        scaleY: 1.3,
        scaleX: 1.5,
        y: '34vh',
        x: '-4.5vw',
        ease: 'power4.out'
    }, '<+=0.15')
    .to(splitTitle.chars[6]!,{
        opacity: 1,
        duration: 1,
        rotateZ: 0,
        scaleY: 1.3,
        scaleX: 1.5,
        y: '23vh',
        x: '-17vw',
        ease: 'power4.out'
    }, '<+=0.151')
    .to(splitTitle.chars[5]!, {
        opacity: 1,
        duration: 1,
        scale: 3,
        ease: 'power4.out'
    }, '<+=0.15')
    .to(splitTitle.chars[3]!, {
        duration: 1,
        clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
        ease: 'power4.out'
    }, '<+=0.15')
    .to(splitTitle.chars[4]!, {
        duration: 1,
        clipPath: 'inset(0% 0 0 0)',
        ease: 'power4.out'
    }, '<+=0.15')
    .to(splitTitle.chars[7]!, {
        duration: 1,
        y: '75vh',
        ease: 'bounce.out',
        opacity: 1
    }, '<+=0.15')
    
})

</script>

<template>
    <div class="min-h-screen bg-[#0f172a]">
        <h1 ref="splitTitleRef" class="block text-8xl text-white font-thin tracking-loose font-inter text-center">
            PROJECTS
        </h1>
    </div>
</template>