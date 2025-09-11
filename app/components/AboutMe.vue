<script setup lang="ts">
import { gsap } from 'gsap'
import { SplitText } from 'gsap/SplitText'
import { ScrambleTextPlugin } from 'gsap/all'

gsap.registerPlugin(ScrambleTextPlugin) 

const sectionReferences = ref<HTMLDivElement[]>([])
const sectionTweens = ref<gsap.core.Timeline[]>([])
const nameplateRef = ref<HTMLHeadingElement>()
let timeline: GSAPTimeline | null = null
let mainline: GSAPTimeline | null = null

const experienceTransition = () => {
    console.log('apoadsfijpeoijfpaoeijfpoaijefpoaijefpoaije')
}

const projectsTransition = () => {
    console.log('apoadsfijpeoijfpaoeijfpoaijefpoaijefpoaije')
}

const hobbiesTransition = () => {
    console.log('apoadsfijpeoijfpaoeijfpoaijefpoaijefpoaije')
}

const contactTransition = () => {
    console.log('apoadsfijpeoijfpaoeijfpoaijefpoaijefpoaije')
}

const menuOptions = [ 
    {
        name:'Experience',
        onClick: experienceTransition
    }, 
    {
        name: 'Projects',
        onClick: projectsTransition
    }, 
    {
        name: 'Hobbies',
        onClick: hobbiesTransition
    }, 
    {
        name: 'Contact',
        onClick: contactTransition    
    } 
]

const addSectionRef = (el: Element | ComponentPublicInstance | null) => {
  if (el instanceof HTMLDivElement) {
    sectionReferences.value.push(el)

    const splitText = new SplitText(el, { type: 'chars' })
    const glorp = gsap.timeline({ paused: true })
    const tween = glorp.to(splitText.chars, {
        stagger: 0.05,
        y: -5,
        color: '#00ffff',
        duration: 0.4
    })
    .to(splitText.chars, {
        stagger: 0.05,
        y: 0,
        color: '#fff',
        duration: 0.4
    }, '-=0.5')

    sectionTweens.value.push(tween)
  }
}

onMounted(() => {
    timeline = gsap.timeline()
    mainline = gsap.timeline()

    gsap.set([...sectionReferences.value], { opacity: 0, y: 100, scaleX: 0 })
    gsap.set('.fishsauce', { opacity: 0, x: -100, y: -100 })

    mainline.to(nameplateRef.value!, {
        scrambleText: {
            text: 'As introduced, my name is Johny Vu',
            chars: 'XO',
            speed: 0.5
        },
        duration: 1.5
    })
    .to(nameplateRef.value!, {
        scrambleText: {
            text: 'Johny Vu',
            chars: '1234675890',
            speed: 0.2
        },
        duration: 2
    })
    .to('.fishsauce', {
        duration: 1.5,
        stagger: 0.5,
        opacity: 1,
        x: 0,
        y:0,
        ease: 'power4.inOut'
    })

    timeline.to([...sectionReferences.value], {
        duration: 1,
        ease: 'power4.inOut',
        y: 0,
        scaleX: 1,
        opacity: 1,
        stagger: 0.1
    })
})

const sectionAnimate = (index: number) => {
    sectionTweens.value[index]?.restart(true)
}

</script>

<template>
    
    <div class="min-h-screen flex flex-col items-center">
        <div>
            <h1 class="block h-[15vh] text-center text-7xl content-center bg-clip-text text-transparent bg-linear-to-r/decreasing from-indigo-500 to-teal-400 font-inter tracking-wider font-thin">
                About Me
            </h1>
        </div>
        <div class="flex flex-row w-3/5 mb-8">
            <div class="h-[65vh] px-8 text-left mr-8">
                <h1 ref="nameplateRef" class="text-white text-2xl font-inter block text-center tracking-wide font-thin mb-2 px-8">
                    
                </h1>
                <p class="text-white opacity-80 text-xl font-inter text-left tracking-wide font-thin leading-snug mb-4 fishsauce">
                    I am many things, but for the purpose of this portfolio, I'll keep it short... at least I'll try to. I am a Frontend Developer
                    who specializes in optimized and fun animations primarily through the use of GSAP (Green Sock Animation
                    Platform).
                </p>
                <p class="text-white opacity-80 text-xl font-inter text-left tracking-wide font-thin leading-snug mb-4 fishsauce">
                    I also try my best to avoid vibe coding when it comes to creating these sites to make the best out of my 
                    own creativity. What good is a Frontend Developer without a good sense of how to organize things on their
                    own?
                </p>
                <p class="text-white opacity-80 text-xl font-inter text-left tracking-wide font-thin leading-snug mb-8 fishsauce">
                    Since this is not only something to put myself out there, but also a passion project I put some time and
                    effort into, the non-important stuff like my hobbies and separate side projects will be off in another 
                    section to keep the site from getting flooded.
                </p>

                <img src="/images/AboutMe/GithubContributions.png" class="border rounded-xl border-none w-full">
            </div>
            <img src="/images/JohnyVu.jpg" class="border rounded-3xl h-[65vh] w-auto object-contain">
        </div>
        <div class="flex flex-row border-t-1 pt-2 w-2/3 justify-center">
            <div 
                v-for="(options, index) in menuOptions" 
                @click="options.onClick" 
                @mouseenter="sectionAnimate(index)" 
                :key="index" 
                :ref="(el) => addSectionRef(el)"
                class="text-center text-3xl tracking-wider font-inter p-3 border-0 text-slate-100 mx-12 font-thin text-2xl border rounded-xl cursor-pointer">

                {{ options.name }}

            </div>
        </div>
    </div>

</template>