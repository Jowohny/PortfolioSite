<script setup lang="ts">
import { ref, onMounted, type ComponentPublicInstance } from 'vue'
import { gsap } from 'gsap'
import { SplitText } from 'gsap/SplitText'
import { MotionPathPlugin } from 'gsap/MotionPathPlugin'
import ExperienceCarousel from './ExperienceCarousel.vue'

gsap.registerPlugin(SplitText, MotionPathPlugin)

const emit = defineEmits(['returnToSender'])

const titleRef = ref()
const pageRef = ref() 
const buttonRef = ref<HTMLDivElement | null>(null)
const carouselRef = ref<HTMLDivElement | null>(null)
const leftPathRef = ref<SVGPathElement | null>(null)
const rightPathRef = ref<SVGPathElement | null>(null)
const transitionFinished = ref(false)
let splitTitle: SplitText | null = null

const toast = useToast()

const frameworkReferences = ref<HTMLDivElement[]>([])
const languageReferences = ref<HTMLDivElement[]>([])
const frameworkTweens = ref<{ [key: number]: gsap.core.Tween }>({})
const languageTweens = ref<{ [key: number]: gsap.core.Tween }>({})

const sidebarIcons = {
  frameworks: [
    {
      name: 'Angular',
      image: '/images/icons/frameworks/Angular.svg', 
      description: 'Used in QTC Leidos Capstone Project for college, made proper use of components, used simple CSS, and designed an intuitive user interface.',
      proficiency: 50,
      colorScheme: ['text-pink-500', 'text-purple-500']
    },
    {
      name: 'Nuxt',
      image: '/images/icons/frameworks/Nuxt.svg',
      description: 'Used in the website you\'re going through/looking at right now! Made use of Tailwind CSS for styling along with GSAP for animation. :D',
      proficiency: 70,
      colorScheme: ['text-green-500', 'text-emerald-500']
    },
    {
      name: 'React',
      image: '/images/icons/frameworks/React.svg',
      description: 'Used in the Aery site, a simple website for a simple startup. Used Tailwind CSS for styling and GSAP for animation. (First Project with GSAP)',
      proficiency: 75,
      colorScheme: ['text-blue-500', 'text-cyan-500']
    },
    {
      name: 'SwiftUI',
      image: '/images/icons/frameworks/SwiftUI.svg',
      description: 'Currently unreleased project, will soon be working on an IOS app, details will be kept until time of production... though I\'m not sure what to expect.',
      proficiency: 40,
      colorScheme: ['text-orange-500', 'text-red-500']
    },
    {
      name: 'Vue',
      image: '/images/icons/frameworks/Vue.svg',
      description: 'Will be used for a ,future project, might not even use this since Nuxt is just a better version of Vue anyway lol, but there will be something.',
      proficiency: 70,
      colorScheme: ['text-green-400', 'text-teal-500']
    }
  ],
  languages: [
         {
       name: 'HTML5',
       image: '/images/icons/languages/HTML5.svg',
       description: 'I feel like I don\'t use much of this anymore, but I do at the same time. Regardless, I know it enough to be proficient considering that\'s where I\'m headed.',
       proficiency: 90,
       colorScheme: ['text-orange-500', 'text-orange-400']
     },
     {
       name: 'Java',
       image: '/images/icons/languages/Java.svg',
       description: 'First language I learned for some reason. Not sure why, but I probably know how to code in it better than python, unnaturally so.',
       proficiency: 70,
       colorScheme: ['text-red-600', 'text-red-500']
     },
     {
       name: 'Javascript',
       image: '/images/icons/languages/Javascript.svg',
       description: 'Definitely needed for where I\'m going, or some form of it at least. I have to say though, I do like the type safety of Typescript better.',
       proficiency: 75,
       colorScheme: ['text-yellow-500', 'text-yellow-400']
     },
     {
       name: 'Python',
       image: '/images/icons/languages/Python.svg',
       description: 'I love the simplicity of this language, might be one of my favorite languages to code in for fun (Leetcode/Neetcode), but there are levels to this...',
       proficiency: 60,
       colorScheme: ['text-blue-600', 'text-blue-500']
     },
     {
       name: 'TypeScript',
       image: '/images/icons/languages/Typescript.svg',
       description: 'My go-to language for frontend developing, I just love it. I don\'t know what to say, but for all except the Capstone Project did I use Typescript.',
       proficiency: 80,
       colorScheme: ['text-blue-500', 'text-cyan-400']
     }
  ]
} 

const experienceSlides = [
  {
    company: 'Leidos',
    logo: '/images/experience/LeidosLogo.png',
    timePeriod: 'August 2024 - May 2025',
    title: 'Frontend Developer',
    details: [
      "Developed responsive web applications using Angular.js and Javascript",
      "Collaborated with cross-functional teams to deliver high-quality software",
      "Implemented modern UI/UX designs and maintained code quality standards",
      "Participated in code reviews and contributed to good team practices"
    ],
    imgDetails: ['/images/experience/LeidosDashboard1.jpeg','/images/experience/LeidosDashboard2.jpeg','/images/experience/LeidosDashboard3.jpeg']
  },
  {
    company: 'Aery',
    logo: '/images/experience/AeryLogo.png',
    timePeriod: 'May 2025 - Present',
    title: 'Frontend Developer',
    details: [
      "Developed responsive web applications using React.js and Typescript",
      "Optimizing application performance and user interface",
      "Created simple animations to improve user experience",
      "Actively thought of ideas to create a simple and straightforward website"
    ],
    imgDetails: ['/images/experience/AerySite1.png','/images/experience/AerySite2.png','/images/experience/AerySite3.png','/images/experience/AeryApp1.png']
  },
  {
    company: 'Angel Food Donut',
    logo: '/images/experience/AngelFoodDonutLogo.png',
    timePeriod: 'June 2020 - Present (Irrelevant Exerience)',
    title: 'Cashier Customer Service',
    details: [
      "Handled high-volume cash and card transactions quickly and accurately",
      "Multitasked across cashiering, order taking, and customer support to speed up service",
      "Trained new employees on customer service and workplace conduct",
      "Communicated with diverse customers, learning basic phrases in multiple languages"
    ],
    imgDetails: ['/images/experience/AngelFoodDonut1.jpg','/images/experience/AngelFoodDonut2.jpg','/images/experience/AngelFoodDonut3.jpg']
  },
  {
    company: 'Hello Boba',
    logo: '/images/experience/HelloBobaLogo.png',
    timePeriod: 'August 2023 - Present (Irrelevant Experience)',
    title: 'Bobarista',
    details: [
      "Handled high-volume cash and card transactions quickly and accurately",
      "Multitasked across cashiering, order taking, and customer support to speed up service",
      "Trained new employees on customer service and workplace conduct",
      "Communicated with diverse customers, learning basic phrases in multiple languages"
    ],
    imgDetails: ['/images/experience/HelloBoba1.jpg','/images/experience/HelloBoba2.jpg','/images/experience/HelloBoba3.jpg']
  }
]

onMounted(() => {
  splitTitle = new SplitText(titleRef.value, { 
    type: 'chars', 
    charsClass: 'font-mono text-7xl'
  })
  splitTitle.chars.forEach((char, index) => {
    gsap.set(char, {
      rotateZ: index % 2 !== 0 ? -50 : 50,
      y: index % 2 !== 0 ? -20 : 20,
      opacity: 0,
      scaleY: 1,
			color: '#fff'
    })
  })

	gsap.set(buttonRef.value, { opacity: 0, scale: 0 })
  gsap.set(titleRef.value, { yPercent: '460' });
  gsap.set(carouselRef.value, { borderColor: '#00bbff' })
	gsap.set(pageRef.value, { opacity: 0, scale: 0 })
  gsap.set([...languageReferences.value, ...frameworkReferences.value], { opacity: 0 })

  if (leftPathRef.value && rightPathRef.value) {
    const leftLength = leftPathRef.value.getTotalLength()
    const rightLength = rightPathRef.value.getTotalLength()
    
    gsap.set(leftPathRef.value, { 
      strokeDasharray: leftLength,
      strokeDashoffset: leftLength
    })
    gsap.set(rightPathRef.value, { 
      strokeDasharray: rightLength,
      strokeDashoffset: rightLength 
    })

    gsap.set(carouselRef.value, {
      borderBottom: 0,
      borderTop: 0,
      opacity: 0,
      scaleY: 0
    })

    const timeline = gsap.timeline()

    timeline.to(pageRef.value, {
			opacity: 1,
			scale: 1,
			duration: 3,
			ease: 'elastic.out(1,0.4)'
		})
		.to(splitTitle.chars, {
      rotateZ: 0,
      y: 0,
      opacity: 1,
      scale: 1,
      duration: 0.8,
      stagger: 0.05,
      ease: "back.out(1.7)"
    }, '-=1')
    .to(titleRef.value, {
      yPercent: -15,
      duration: 1.5, 
      color: '#fff',
      scale: 1,
      ease: 'power4.inOut',
    }, '-=0.5')
    .to(splitTitle.chars, {
      rotateX: 360,
      stagger: 0.05,
      duration: 1,
      onComplete: () => {
        transitionFinished.value = true
      }
    }, '-=1.3')
		.to(splitTitle.chars, {})

    frameworkReferences.value.forEach((icon, index) => {
      const leftPath = leftPathRef.value!
      if (timeline)
        timeline.to(icon, {
          motionPath: {
            path: leftPath,
            align: leftPath,
            alignOrigin: [0.5, 0.5],
            start: 0,
            end: (0.8 / sidebarIcons.frameworks.length) + (index / (sidebarIcons.frameworks.length + 1))
        },
        ease: 'power4.inOut',
        opacity: 1,
        duration: 1
      }, '-=1')
    })

    languageReferences.value.forEach((icon, index) => {
      const rightPath = rightPathRef.value!
      if (timeline)
          timeline.to(icon, {
            motionPath: {
              path: rightPath,
              align: rightPath,
              alignOrigin: [0.5, 0.5],
              start: 0,
              end: (0.8 / sidebarIcons.frameworks.length) + (index / (sidebarIcons.frameworks.length + 1))
        },
        ease: 'power4.inOut',
        opacity: 1,
        duration: 1
      }, '-=1')
    })

    frameworkReferences.value.forEach((icon, index) => {
      const tween = gsap.fromTo(icon, 
      {
        yPercent: -5,
        rotateZ: -5
      },
      {
        yPercent: 5,
        duration: 1,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        rotateZ: 5,
        delay: 0.15*index
      })
      
      frameworkTweens.value[index] = tween
    })

    languageReferences.value.forEach((icon, index) => {
      const tween = gsap.fromTo(icon, 
      {
        yPercent: -5,
        rotateZ: -5
      },
      {
        yPercent: 5,
        duration: 1,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        rotateZ: 5,
        delay: 0.15*index
      })
      
      languageTweens.value[index] = tween
    })

    timeline.to(carouselRef.value, {
      opacity: 1,
      scaleY: 1,
      duration: 1.5,
      ease: "power4.inOut",
			onComplete: () => {
        toast.add({
          title: "Hover over the icons!",
          description: "To get more information, hover over each of them to get some insight on how well I feel about them.",
          icon: "i-lucide-lightbulb",
          ui: {
            root: 'w-full p-4 rounded-lg shadow-lg bg-white dark:bg-gray-900 ring-1 ring-gray-200 dark:ring-gray-800',
          },
          closeIcon: 'i-lucide-arrow-right',
          duration: 5000
        })
      }
    }, '-=0.5')
		.to(buttonRef.value, {
			opacity: 1,
			scale: 1,
			ease: 'elastic.inOut(1,0.7)',
		
		})

  }
})

const reverseOut = () => {
	const timeline = gsap.timeline({ onComplete: () => {emit('returnToSender')} })
	splitTitle = new SplitText(titleRef.value, { type: 'chars' })

	timeline.to(buttonRef.value, {
		opacity: 0,
		duration: 1,
		scale: 0,
		ease: 'elastic.in(1,0.7)'
	})	
	.to(splitTitle.chars, {
		rotateZ: -90,
		duration: 1.2,
		opacity: 0,
		yPercent: -100,
		ease: 'power4.inOut',
		stagger: 0.05
	}, '<')
	.to(splitTitle.chars, {}, '<+=1.2')

	frameworkReferences.value.forEach((icon, index) => {
      const leftPath = leftPathRef.value!
      if (timeline)
        timeline.to(icon, {
          motionPath: {
            path: leftPath,
            align: leftPath,
            alignOrigin: [0.5, 0.5],
            start: (0.8 / sidebarIcons.frameworks.length) + (index / (sidebarIcons.frameworks.length + 1)),
            end: 0
        },
        ease: 'power4.inOut',
        opacity: 0,
        duration: 1
      }, '<')
    })

    languageReferences.value.forEach((icon, index) => {
      const rightPath = rightPathRef.value!
      if (timeline)
          timeline.to(icon, {
            motionPath: {
              path: rightPath,
              align: rightPath,
              alignOrigin: [0.5, 0.5],
              start: (0.8 / sidebarIcons.frameworks.length) + (index / (sidebarIcons.frameworks.length + 1)),
              end: 0
        },
        ease: 'power4.inOut',
        opacity: 0,
        duration: 1
      }, '<')
	})
	timeline.to(carouselRef.value, {
		scale: 0,
		duration: 1.5,
		ease: 'power4.inOut',
		opacity: 0
	}, '-=0.5')
	.to(pageRef.value, {
		scale: 0,
		opacity: 0,
		duration: 2,
		ease: 'power4.inOut'
	}, '-=1.3')
}

const showIconDetails = (index: number, type: string) => {
  if(type === 'framework') { 
    if(frameworkTweens.value[index] && frameworkReferences.value[index]) {
      frameworkTweens.value[index].pause()

      gsap.to(frameworkReferences.value[index], {
        yPercent: 0,
        rotateZ: 0,
        scale: 1.5,
        duration: 1,
        ease: 'elastic.out(1, 0.3)',

      })
    }
  } else if(type === 'language') {
    if(languageTweens.value[index] && languageReferences.value[index]) {
      languageTweens.value[index].pause()
 
      gsap.to(languageReferences.value[index], {
        yPercent: 0,
        rotateZ: 0,
        scale: 1.5,
        duration: 1,
        ease: 'elastic.out(1, 0.3)'
      })
    }
  }
}

const closeIconDetails = (index: number, type: string) => {
  if(type === 'framework') { 
    if(frameworkTweens.value[index] && frameworkReferences.value[index]) {
      frameworkTweens.value[index].resume()      

      gsap.fromTo(frameworkReferences.value[index], 
      {
        scale: 1.5
      },
      {
        scale: 1,
        duration: 1,
        ease: 'elastic.out(1, 0.3)'
      })
    }
  } else if(type === 'language') {
    if(languageTweens.value[index] && languageReferences.value[index]) {
      languageTweens.value[index].resume()
      
      gsap.fromTo(languageReferences.value[index], 
      {
        scale: 1.5
      }, 
      {
        scale: 1,
        duration: 1,
        ease: 'elastic.out(1, 0.3)'
      })
    }
  }
}

const addFrameworkRef = (el: Element | ComponentPublicInstance | null) => {
  if (el instanceof HTMLDivElement) frameworkReferences.value.push(el)
}

const addLanguageRef = (el: Element | ComponentPublicInstance | null) => {
  if (el instanceof HTMLDivElement) languageReferences.value.push(el)
}
</script>

<template>
  <svg width="400" height="600" class="z-30 absolute top-1/2 -translate-y-1/2 left-0">
    <path ref="leftPathRef" d="M -10 0 q 360 300 -10 600" fill="none"/>
  </svg>
  <svg width="400" height="600" class="z-30 absolute top-1/2 -translate-y-1/2 right-0">
    <path ref="rightPathRef" d="M 410 600 q -360 -300 10 -600" fill="none"/>
  </svg>


  <div
    v-for="(icon, index) in sidebarIcons.frameworks"
    :key="`framework-${index}`"
    :ref="(el) => addFrameworkRef(el)"
    class="w-16 h-16 absolute z-50"
    @mouseenter="showIconDetails(index, 'framework')"
    @mouseleave="closeIconDetails(index, 'framework')" >
      <UPopover 
        mode="hover"
        arrow
        :content="{ side: 'right' }" >        

        <img :src="icon.image" class="w-full h-full object-contain">

      <template #content>
        <div class="h-32 w-88 py-2 px-4 ">
          <h1 class="font-bold text-lg tracking-loose text-center block" :class="icon.colorScheme[0]">
            {{ icon.name }}
          </h1>
          <p class="font-semibold text-xs tracking-loose mb-4" :class="icon.colorScheme[1]">
            {{ icon.description }}
          </p>
          <UProgress v-model="icon.proficiency" size="lg"/>
        </div>
      </template>
      
    </UPopover>
  </div>



  <div
    v-for="(icon, index) in sidebarIcons.languages"
    :key="`language-${index}`"
    :ref="(el) => addLanguageRef(el)"
    class="w-16 h-16 absolute z-50"
    @mouseenter="showIconDetails(index, 'language')"
    @mouseleave="closeIconDetails(index, 'language')"
    >
    
    <UPopover
        mode="hover"
        arrow
        :content="{ side: 'left' }" >  

      <img :src="icon.image" class="w-full h-full object-contain">

      <template #content>
        <div class="h-32 w-88 py-2 px-4 ">
          <h1 class="font-bold text-lg tracking-loose text-center block" :class="icon.colorScheme[0]">
            {{ icon.name }}
          </h1>
          <p class="font-semibold text-xs tracking-loose mb-4" :class="icon.colorScheme[1]">
            {{ icon.description }}
          </p>
          <UProgress v-model="icon.proficiency" getalueLabel="Proficiency: ~{{item}}" size="lg"/>
        </div>
      </template>

    </UPopover>

  </div>

  <div ref="pageRef" class="min-h-screen flex items-center flex-col items-center" style="background: radial-gradient(ellipse at 50%, #59626e, #0f172a 70%);">
    <div class="w-full text-center z-50 pt-2 pb-4">
      <h1 ref="titleRef" class="font-inter text-black text-8xl font-thin tracking-loose">
        EXPERIENCE
      </h1>
    </div>

    <div ref="carouselRef" class="w-2/3 h-1/2 p-12">
      <UCarousel
        v-slot="{ item }"
        :items="experienceSlides"
        :items-to-show="1"
        :autoplay= "transitionFinished ? { delay: 5000 } : false"
        loop
        dots
        fade
        :ui="{
          item: 'min-w-full h-full',
        }"
      >
          <ExperienceCarousel :item="item"/>
      </UCarousel>
    </div>

		<div ref="buttonRef" class="absolute top-8 left-8 block z-100">
			<UButton class="py-2 px-8 text-xl font-light tracking-widest" label="Return" size="xl" icon="i-mdi-arrow-left-bold" variant="solid" color="secondary"  @click="reverseOut"/>
		</div>
  </div>
</template>