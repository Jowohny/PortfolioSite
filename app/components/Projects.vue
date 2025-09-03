<script setup lang="ts">
import {gsap} from 'gsap'
import { SplitText } from 'gsap/SplitText';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(SplitText, ScrollTrigger)

const splitTitleRef = ref<HTMLHeadingElement | null>(null)
let splitTitle: SplitText | null = null

const websiteTypes = {
    professionalWebsites: [
        {
            siteImage: '/images/project/comingsoon.jpg',
            link: 'https://trollface.dk'
        },
        {
            siteImage: '/images/project/comingsoon.jpg',
            link: 'https://trollface.dk'
        },
        {
            siteImage: '/images/project/comingsoon.jpg',
            link: 'https://trollface.dk'
        },
        {
            siteImage: '/images/project/comingsoon.jpg',
            link: 'https://trollface.dk'
        },
        {
            siteImage: '/images/project/comingsoon.jpg',
            link: 'https://trollface.dk'
        }
    ],
    forFunSites: [
        {
            siteImage: '/images/project/comingsoon.jpg',
            link: 'https://trollface.dk'
        },
        {
            siteImage: '/images/project/comingsoon.jpg',
            link: 'https://trollface.dk'
        },
        {
            siteImage: '/images/project/comingsoon.jpg',
            link: 'https://trollface.dk'
        },
        {
            siteImage: '/images/project/comingsoon.jpg',
            link: 'https://trollface.dk'
        },
        {
            siteImage: '/images/project/comingsoon.jpg',
            link: 'https://trollface.dk'
        }
    ],
    portfolioVariations: [
        {   
            siteImage: '/images/project/comingsoon.jpg',
            link: 'https://trollface.dk'
        },
        {
            siteImage: '/images/project/comingsoon.jpg',
            link: 'https://trollface.dk'
        },
        {
            siteImage: '/images/project/comingsoon.jpg',
            link: 'https://trollface.dk'
        },
        {
            siteImage: '/images/project/comingsoon.jpg',
            link: 'https://trollface.dk'
        },
        {
            siteImage: '/images/project/comingsoon.jpg',
            link: 'https://trollface.dk'
        }
    ]
}

onMounted(() => {

    splitTitle = new SplitText (splitTitleRef.value, { type: 'chars' })
    gsap.set([...splitTitle.chars], {
        opacity: 0,
        y: '50vmin',
        yPercent: -50
    })

    gsap.set(splitTitle.chars[1]!,{rotateX: 180, x: 0, y: '40vmin'}) // R
    gsap.set(splitTitle.chars[2]!,{rotateY: 180, x: '-30vmin', y: '34vmin'}) // O
    gsap.set(splitTitle.chars[3]!,{clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)', scaleX: 3.8, scaleY: 2.8, opacity: 1, x: '16vmin', y: '29vmin'}) // J
    gsap.set(splitTitle.chars[4]!,{clipPath: 'inset(100% 0 0 0)', opacity: 1, scaleX: 3.8, scaleY: 2.51, x: '10vmin', y: '73vmin'}) // E
    gsap.set(splitTitle.chars[5]!,{scale: 0, x: '4vmin', y: '51vmin' }) // C
    gsap.set(splitTitle.chars[6]!,{rotateZ: 180, x: '-30vmin', y: '-25vmin'}), // T
    gsap.set(splitTitle.chars[7]!,{rotateZ: 90, x: '-27.5vmin', y: '90vmin', scale: 2.8}) // S

    const timeline = gsap.timeline()

    timeline.fromTo(splitTitle.chars[0]!, 
    {
        x: '60vmin', 
        rotateZ: 90,
        scale: 2
    },
    {
        x: '12vmin',
        opacity: 1,
        duration: 1,
        ease: 'expoScale(0.5,7,power2.out)'
    }, '+=3')
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
        x: '7vmin', 
        y: '60vmin',
        duration: 1,
        ease: 'power4.out'
    }, '<+=0.3')
    .to(splitTitle.chars[1]!, {
        opacity: 1,
        duration: 1,
        rotateX: 0,
        scaleY: 3,
        scaleX: 3.8,
        y: '28vmin',
        x: '9vmin', 
        ease: 'power4.out'
    }, '<+=0.15')
    .to(splitTitle.chars[2]!, {
        opacity: 1,
        duration: 1,
        rotateY: 0,
        scaleY: 1.3,
        scaleX: 1.5,
        y: '34vmin', 
        x: '-12.5vmin',
        ease: 'power4.out'
    }, '<+=0.15')
    .to(splitTitle.chars[6]!,{
        opacity: 1,
        duration: 1,
        rotateZ: 0,
        scaleY: 1.3,
        scaleX: 1.5,
        y: '23vmin', 
        x: '-34vmin',
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
        y: '75vmin', 
        ease: 'bounce.out',
        opacity: 1
    }, '<+=0.15')
    .to([...splitTitle.chars], {
        duration: 1,
        stagger: 0.04,
        y: 0,
        x: 0,
        rotateX: 0,
        rotateY: 0,
        rotateZ: 0,
        ease: 'power4.inOut',
        scaleX: 1,
        scaleY: 1
    })

    
})

</script>

<template>
    <div class="min-h-screen bg-[#0f172a] pt-20">
        <div class="block text-center flex justify-center">
            <h1 ref="splitTitleRef" class="text-8xl text-white font-thin tracking-loose font-inter">
                PROJECTS
            </h1>
            <h1 class="font-inter font-thin tracking-loose text-red-500 ml-8">(LIVE)</h1>
        </div>
        <div v-for="sites in websiteTypes" class="my-4">
            <UCarousel
                v-slot="{ item }"
                :items="sites"
                pause-on-hover="false"
                :auto-scroll="true"
                pause-on-focus="false"
                :draggable="false"
                loop
                :ui="{ item: 'basis-1/4' }">

                <NuxtLink :to="item.link" external target="_blank" rel="noopener noreferrer">
                    <img :src="item.siteImage" class="h-56">
                </NuxtLink>

            </UCarousel>
        </div>
    </div>
</template>