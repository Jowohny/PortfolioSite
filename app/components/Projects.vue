<script setup lang="ts">
import {gsap} from 'gsap'
import { SplitText } from 'gsap/SplitText';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { button } from '#build/ui';

gsap.registerPlugin(SplitText, ScrollTrigger)

const splitTitleRef = ref<HTMLHeadingElement | null>(null)
const buttonRef = ref<HTMLDivElement | null>(null)
const carouselRefs = ref<HTMLDivElement[]>([])
const liveRef = ref<HTMLDivElement | null>(null)
let splitTitle: SplitText | null = null
let splitSectionTitles: SplitText[] = []

const emit = defineEmits(['returnToSender'])

const websiteTypes = [
    {    
        type: 'Professional',
        sites: [
            {
                siteImage: '/images/project/AeryLanding.png',
                link: 'https://aery.app'
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
    },
    {    
        type: 'For Fun',
        sites: [
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
                siteImage: '/images/project/GlobalClicker.png',
                link: 'https://clickcounter-lkf1.onrender.com'
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
    },
    {
        type: 'Portfolio Variations',
        sites: [
            {
                siteImage: '/images/project/comingsoon.jpg',
                link: 'https://trollface.dk'
            },
            {   
                siteImage: '/images/project/PortfolioV1.png',
                link: 'https://portfolio-site-lemon-theta.vercel.app/'
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
]

onMounted(() => {

    splitTitle = new SplitText (splitTitleRef.value, { type: 'chars' })
    gsap.set([...splitTitle.chars], {
        opacity: 0,
        y: '50vmin',
        yPercent: -50
    })
    gsap.set([...carouselRefs.value], {
        opacity: 0,
        yPercent: -50
    })
    splitSectionTitles.forEach(splitSection => {
        gsap.set(splitSection.chars, { opacity: 0, xPercent: 50 })
    })

    gsap.set(liveRef.value, { opacity: 0, yPercent: 100 })
		gsap.set(buttonRef.value, { opacity: 0, scale: 0 })

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
    .to([...carouselRefs.value], {
        duration: 0.75,
        opacity: 1,
        ease: 'power4.inOut',
        yPercent: 0,
        stagger: 0.3
    })
    .to(splitSectionTitles.flatMap(splitSection => splitSection.chars), {
        opacity: 1,
        duration: 1.5,
        ease: 'elastic.out(1,0.4)',
        stagger: 0.05,
        xPercent: 0
    }, '-=1.3')
		.to(buttonRef.value, {
			opacity: 1,
			scale: 1,
			duration: 1.5,
			ease: 'elastic.out(1,0.7)'
		}, '-=2')
})

const addCarouselReferences = (el: Element | ComponentPublicInstance | null) => {
    if (el instanceof HTMLDivElement) {
        carouselRefs.value.push(el)
    }
}

const addSectionTitleReferences = (el: Element | ComponentPublicInstance | null) => {
    if (el instanceof HTMLHeadingElement) {
        let splitSection = new SplitText(el, { type: 'chars' })
        splitSectionTitles.push(splitSection)
    } 
}

const reverseOut = () => {
	const timeline = gsap.timeline()
	splitTitle = new SplitText(splitTitleRef.value, { type: 'chars' })

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
		rotateZ: 45,
		duration: 1.5,
		opacity: 0,
		stagger: 0.07,
		ease: 'elastic.out(1, 1)'
	}, '<+=0.2')
	.to([...carouselRefs.value].reverse(), {
		duration: 0.75,
		opacity: 0,
		ease: 'power4.inOut',
		yPercent: -50,
		stagger: 0.3,
	}, '-=1')
	.to(splitSectionTitles.flatMap(splitSection => splitSection.chars), {
        opacity: 0,
        duration: 1.5,
        ease: 'power4.inOut',
        stagger: 0.02,
				rotateX: 90,
				onComplete: () => {
					emit('returnToSender')
				}
    }, '-=1.5')
}

</script>

<template>
    <div class="min-h-screen bg-[#0f172a]">
        <div class="block text-center flex justify-center">
            <h1 ref="splitTitleRef" class="text-8xl mb-20 text-white font-thin tracking-loose font-inter">
                PROJECTS
            </h1>
            <h1 ref="liveRef" class="font-inter font-thin tracking-loose text-red-500 ml-8">(LIVE)</h1>
        </div>
        <div v-for="site in websiteTypes">
            <h1 :ref="(el) => addSectionTitleReferences(el)" class="font-4xl text-emerald-300 tracking-widest font-fira-code my-2 block text-center">
                {{ site.type }}
            </h1>
            <div class="my-4" :ref="(el) => addCarouselReferences(el)">
                <UCarousel
                    v-slot="{ item }"
                    :items="site.sites"
                    pause-on-hover="false"
                    :auto-scroll="true"
                    pause-on-focus="false"
                    :draggable="false"
                    loop
                    :ui="{ item: 'basis-1/6 opacity-70' }">
                    <NuxtLink :to="item.link" external target="_blank" rel="noopener noreferrer">
                        <img :src="item.siteImage" class="h-40">
                    </NuxtLink>
                </UCarousel>
            </div>
        </div>
				<div ref="buttonRef" class="block flex justify-center mt-12">
					<UButton class="py-2 px-8 text-xl font-light tracking-widest" label="Return" size="xl" variant="solid" color="secondary"  @click="reverseOut"/>
				</div>
    </div>
</template>