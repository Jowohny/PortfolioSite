<script setup lang="ts">
import { gsap } from 'gsap'
import { SplitText } from 'gsap/SplitText'
import { ScrambleTextPlugin } from 'gsap/all'

gsap.registerPlugin(ScrambleTextPlugin) 

const firstTimeAnimated = ref<boolean>(true)

const sectionReferences = ref<HTMLDivElement[]>([])
const currentClassRef = ref<HTMLDivElement | null>(null)
const sectionTweens = ref<gsap.core.Timeline[]>([])
const nameplateRef = ref<HTMLHeadingElement | null>(null)
const selfImageRef = ref<HTMLImageElement | null>(null)
const githubRef = ref<HTMLImageElement | null>(null)
const paragraphSectionRef = ref<HTMLDivElement | null>(null)
const aboutMeRef = ref<HTMLHeadingElement | null>(null)
const currentComponent = ref<string>('current')
const currentAnimatorCom = ref<any | null>(null)
let timeline: GSAPTimeline | null = null
let timelineOut: GSAPTimeline | null = null

const experienceTransition = () => {
    firstTimeConversion()
    animateOut(0)
}

const projectsTransition = () => {
    firstTimeConversion()
    animateOut(1) 
}

const hobbiesTransition = () => {
    firstTimeConversion()
    animateOut(2) 
}

const contactTransition = () => {
    firstTimeConversion()
    animateOut(3)
}

const firstTimeConversion = () => {
    firstTimeAnimated.value = false
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
		console.log(el)

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

	timeline.set([...sectionReferences.value], { opacity: 0, y: 100, scaleX: 0 })
	.set([githubRef.value, '.fishsauce'], { opacity: 0, xPercent: 100 })
	.set(selfImageRef.value, { scale: 0 })
	.set(aboutMeRef.value, { y: -300, opacity: 0 })
	.to(selfImageRef.value, {
			scale: 1,
			duration: 1,
			ease: 'power4.inOut'
	}, '+=2')
	.to(selfImageRef.value, {
			border: 5,
			duration: 0.5,
			ease: 'power2.out'
	}, '<')
	.to(selfImageRef.value, {
			border: 0,
			duration: 0.5,
			ease: 'power1.inOut'
	}, '<+=0.4')
	.fromTo(aboutMeRef.value, 
	{
			opacity: 1
	},
	{
			y: 0,
			duration: 2,
			ease: 'bounce.out'
	}, '<')
	.to(nameplateRef.value, {
			scrambleText: {
					text: 'As introduced, my name is Johny Vu',
					chars: 'XO',
					speed: 0.2
			},
			duration: 1
	}, '<')
	.to(nameplateRef.value, {
			yPercent: -100,
			opacity: 0,
			duration: 1
	}, '+=0.5')
	.fromTo(nameplateRef.value, 
	{
			yPercent: 100,
	},
	{
			scrambleText: {
					text: 'Johny Vu',
					chars: '1234675890',
					speed: 1
			},
			duration: 2,
			yPercent: 0,
			opacity: 1
	})
	.to(['.fishsauce', githubRef.value], {
			duration: 1.5,
			stagger: 0.5,
			opacity: 1,
			xPercent: 0,
			ease: 'power4.inOut'
	}, '<+=0.2')
	.to([...sectionReferences.value], {
			duration: 1,
			ease: 'power4.inOut',
			y: 0,
			scaleX: 1,
			opacity: 1,
			stagger: 0.11
	}, '<')   
})

const sectionAnimate = (index: number) => {
	if(sectionTweens.value[index]) {
    sectionTweens.value[index].restart(true)
	} else {
		console.log('dayum')
		const splitText = new SplitText(sectionReferences.value[index]!, { type: 'chars' })
		const glorp = gsap.timeline()
		glorp.to(splitText.chars, {
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
	}
}

const animateOut = (selectedIndex: number) => {
    timelineOut = gsap.timeline()

    gsap.set(paragraphSectionRef.value, {
        transformOrigin: "0% 50%",
        transformStyle: "preserve-3d"
    })
    gsap.set(selfImageRef.value, {
        transformOrigin: "100% 50%",
        transformStyle: "preserve-3d"
    })

    const sectionsToAnimate = sectionReferences.value.filter((_, index) => index !== selectedIndex)
    const sectionToAnimate = sectionReferences.value.filter((_, index) => index === selectedIndex)

    timelineOut.to(aboutMeRef.value, {
        scaleX: 2,
        scaleY: 0.5,
        duration: 1.7,
        ease: 'elastic.out(1, 1)'
    })
    .to(aboutMeRef.value, {
        scaleX: 0.7,
        scaleY: 1.7,
        duration: 1,
        y: -50,
        ease: 'power4.out'
    }, '-=0.9')
    .to(aboutMeRef.value, {
        y: -300,
        duration: 1.5,
        ease: 'power4.out'
    }, '-=0.9')
    .to(sectionsToAnimate, {
        y: 1000,
        duration: 3,
        ease: 'power4.inOut',
        stagger: 0.1
    }, '-=2.5')
    .to(sectionToAnimate, {
        rotateY: 720,
        duration: 3,
        opacity: 0,
        scaleY: 0.7,
        ease: 'power4.inOut'
    }, '<')
    .to(paragraphSectionRef.value, {
        rotateY: -90,
        duration: 1,
        ease: 'power2.out'
    }, '-=1.51')
    .to(selfImageRef.value, {
        rotateY: 90,
        duration: 1.1,
        ease: 'power2.out',
				onComplete: () => {
					switchComponent(selectedIndex)
				}
    }, '<')
}

const switchComponent = (selectedIndex: number) => {
	if (selectedIndex === 0) {
			currentComponent.value = 'experience'
		} else if (selectedIndex === 1) {
			currentComponent.value = 'projects'
		} else if (selectedIndex === 2) {
			currentComponent.value = 'hobbies'
		} else if (selectedIndex === 3) {
			currentComponent.value = 'contact'
		}

		
}

const setBack = async() => {
	sectionReferences.value = []
  sectionTweens.value = []

	currentComponent.value = 'current'
	await nextTick() 
	const timeline1 = gsap.timeline()

	if (currentClassRef.value) {
		timeline1.set(currentClassRef.value, { opacity: 0, yPercent: -50 })

		timeline1.to(currentClassRef.value, {
			opacity: 1,
			duration: 1.5,
			ease: 'power4.inOut',
			yPercent: 0
		})
	}

}

</script>

<template>
    
    <div ref="currentClassRef" v-if="currentComponent === 'current'" class="min-h-screen flex flex-col items-center">
        <div>
            <h1 ref="aboutMeRef" class="block h-[15vh] text-center text-6xl content-center bg-clip-text text-transparent bg-linear-to-r/decreasing from-indigo-500 to-teal-400 font-inter tracking-wider font-thin">
                About Me
            </h1>
        </div>
        <div class="flex flex-row w-3/5 mb-8">
            <div ref="paragraphSectionRef" class="h-[65vh] flex flex-col px-8 text-left mr-8">
                <h1 ref="nameplateRef" class="text-white text-2xl font-inter block text-center tracking-tight font-thin mb-2 px-8">Izza Me Jowohny</h1>
                <p class="text-white opacity-80 text-xl font-inter text-left tracking-wide font-thin leading-snug mb-4 fishsauce">
                    I am many things, but for the purpose of this portfolio, I'll keep it short... at least I'll try to. I am a Frontend 
                    Developer who specializes in optimized and fun animations primarily through the use of GSAP (Green Sock Animation
                    Platform).
                </p>
                <p class="text-white opacity-80 text-xl font-inter text-left tracking-wide font-thin leading-snug mb-4 fishsauce">
                    Yes, this portfolio may be a little overly animated, but I have fun seeing what I can set up. This website is mainly 
                    for fun, so I will be most likely creating a more professional version that will have link routes for easy access to 
                    projects and experience.
                </p>
                <p class="text-white opacity-80 text-xl font-inter text-left tracking-wide font-thin leading-snug mb-8 fishsauce">
                    Since this is not only something to put myself out there, but also a passion project I put some time and effort into, 
                    the non-important stuff like my hobbies and separate side projects will be off in another section to keep the site from 
                    getting flooded.
                </p>

                <img ref="githubRef" src="/images/AboutMe/GithubContributions.png" class="border rounded-xl border-none w-full mt-auto">
            </div>
            <img ref="selfImageRef" src="/images/AboutMe/JohnyVu.png" class="border rounded-3xl h-[65vh] w-auto object-contain z-10">
        </div>
        <div class="flex flex-row pt-2 w-2/3 justify-center">
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

		<div>
			<Experience ref="currentAnimatorCom" @returnToSender="setBack" v-if="currentComponent === 'experience'" />
			<Projects ref="currentAnimatorCom" @returnToSender="setBack" v-if="currentComponent === 'projects'" />
			<!--<Hobbies ref="currentAnimatorCom" v-if="currentComponent === 'hobbies'"/>-->
			<Contact ref="currentAnimatorCom" @returnToSender="setBack" v-if="currentComponent === 'contact'"/>
		</div>

</template>