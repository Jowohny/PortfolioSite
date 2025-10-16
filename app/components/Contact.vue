<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'
import { gsap } from 'gsap'

const emit = defineEmits(['returnToSender'])


const socialMediaLinks = [
  {
    icon: 'i-mdi-instagram',
    link: 'https://www.instagram.com/johny._.vu/'
  },
  {
    icon: 'i-mdi-youtube',
    link: "https://www.youtube.com/@johnyvu1598"
  },
  {
    icon: 'i-ic-baseline-tiktok',
    link: 'https://www.tiktok.com/@johnyrcvu?_t=ZP-905tWm1NYNj&_r=1'
  },
	{
    icon: 'i-mdi-github',
    link: 'https://github.com/Jowohny'
  },
  {
    icon: 'i-mdi-linkedin',
    link: 'https://www.linkedin.com/in/johny-vu-2620182aa/'
  }
]

const mediaIcons = ['i-ic-baseline-snapchat', 'i-ic-baseline-facebook', 'i-mdi-twitter', 'i-fa-brands-x-twitter', 'i-mdi-pinterest',
                    'i-ic-baseline-tiktok', 'i-mdi-youtube', 'i-mdi-instagram', 'i-ion-logo-linkedin', 'i-ant-design-github-outlined',
                  'i-ic-baseline-reddit', 'i-ic-baseline-discord', 'i-mdi-twitch', 'i-mdi-spotify', 'i-ic-baseline-wechat', 'i-ic-baseline-whatsapp']

const contactContainerRef = ref<HTMLDivElement | null>(null)
const titleRef = ref<HTMLHeadingElement | null>(null)
const formRef = ref<HTMLFormElement | null>(null)
const socialsRef = ref<HTMLDivElement | null>(null)
const buttonRef = ref<HTMLButtonElement | null>(null)

interface BouncingIcon {
  id: number;
  icon: string;
  x: number;
  y: number;
  vx: number; 
  vy: number;
  size: number;
	opacity: number;
}
const backgroundIcons = ref<BouncingIcon[]>([])

onMounted(() => {
  const tl = gsap.timeline()

  gsap.set(contactContainerRef.value, { opacity: 0, yPercent: 20 })
  gsap.set(titleRef.value, { opacity: 0, y: -50 })
  gsap.set(formRef.value!.children, { opacity: 0, x: -30 })
  gsap.set(socialsRef.value!.children, { opacity: 0, y: 30 })
  gsap.set(buttonRef.value, { opacity: 0 })

  tl.to(contactContainerRef.value, {
    opacity: 1,
    yPercent: 0,
    duration: 1,
    ease: 'power4.out'
  })
  .to(titleRef.value, {
    opacity: 1,
    y: 0,
    duration: 0.8,
    ease: 'power3.out'
  }, "-=0.5")
  .to(formRef.value!.children, {
    opacity: 1,
    x: 0,
    duration: 0.5,
    stagger: 0.15,
    ease: 'back.out(1.4)'
  }, "-=0.5")
  .to(socialsRef.value!.children, {
    opacity: 1,
    y: 0,
    duration: 0.5,
    stagger: 0.1,
    ease: 'power2.out'
  }, "-=0.2")
  .to(buttonRef.value, {
    opacity: 1,
    duration: 0.5
  })

	nextTick(() => {
    createAndAnimateIcons();
  });
})

const reverseOut = () => {
	gsap.killTweensOf(backgroundIcons.value);
  const tl = gsap.timeline({onComplete: () => {emit('returnToSender')}})

  tl.to(buttonRef.value, {
		opacity: 0,
		duration: 1.5,
		scale: 0,
		ease: 'elastic.in(1,0.7)'
	})
	.to([formRef.value, socialsRef.value, titleRef.value], {
    opacity: 0,
    y: -40,
    duration: 0.5,
    stagger: 0.1,
    ease: 'power3.in'
  }, '-=1')
	.to(backgroundIcons.value, {
		opacity: 0,
		scale: 0,
		rotateZ: gsap.utils.random(-100, 100),
		duration: 1,
		stagger: 0.01
	}, '-=1.5')
  .to(contactContainerRef.value, {
    opacity: 0,
    scale: 0.95,
    duration: 0.6,
    ease: 'power4.in'
  }, "-=0.31")
}

const createAndAnimateIcons = () => {
  const container = contactContainerRef.value;
  if (!container) return;

  const bounds = container.getBoundingClientRect();
  const numIcons = 50;

  for (let i = 0; i < numIcons; i++) {
    const iconData: BouncingIcon = {
      id: i,
      icon: mediaIcons[Math.floor(Math.random() * mediaIcons.length)]!,
      x: Math.random() * bounds.width,
      y: Math.random() * bounds.height,
      vx: (Math.random() - 0.5) * 200, 
      vy: (Math.random() - 0.5) * 200,
      size: 40 + Math.random() * 30,
			opacity: 1
    };
    backgroundIcons.value.push(iconData);
    const reactiveIcon = backgroundIcons.value[i];
    animateIcon(reactiveIcon!, bounds);
  }
}

const animateIcon = (icon: BouncingIcon, bounds: DOMRect) => {
  const timeToXWall = icon.vx > 0 ? (bounds.width - icon.x - icon.size) / icon.vx : -icon.x / icon.vx;
  const timeToYWall = icon.vy > 0 ? (bounds.height - icon.y - icon.size) / icon.vy : -icon.y / icon.vy;

  const duration = Math.min(timeToXWall, timeToYWall);

  gsap.to(icon, {
    x: icon.x + icon.vx * duration,
    y: icon.y + icon.vy * duration,
    duration: duration,
    ease: 'none', 
    onComplete: () => {
      if (duration === timeToXWall) {
        icon.vx *= -1; 
      }
      if (duration === timeToYWall) {
        icon.vy *= -1; 
      }
      animateIcon(icon, bounds);
    }
  });
}
</script>

<template>
	<div ref="contactContainerRef" class="min-h-screen bg-slate-900 flex flex-col justify-center items-center p-4 sm:p-6 md:p-8 font-inter relative overflow-hidden">
			
			<div class="absolute inset-0 w-full h-full z-0">
					<UIcon 
							v-for="icon in backgroundIcons" 
							:key="icon.id"
							:name="icon.icon"
							class="text-slate-700/50 absolute"
							:style="{
									left: `${icon.x}px`,
									top: `${icon.y}px`,
									fontSize: `${icon.size}px`,
									opacity: icon.opacity
							}"
					/>
			</div>

			<div class="w-full max-w-xl md:max-w-2xl relative z-10">
					<h1 ref="titleRef" class="text-4xl sm:text-5xl md:text-6xl font-light text-center mb-8 sm:mb-10 md:mb-12 bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-500 tracking-wider">
							Get In Touch
						</h1>

					<form ref="formRef" action="#" @submit.prevent class="space-y-5 sm:space-y-6">
							<div class="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
									<div>
											<label for="name" class="block text-sm font-medium text-slate-300 mb-2">Name</label>
											<input type="text" id="name" class="block w-full rounded-md border-0 bg-white py-2 px-3 text-black shadow-lg">
									</div>
									<div>
											<label for="email" class="block text-sm font-medium text-slate-300 mb-2">Email</label>
											<input type="email" id="email" class="block w-full rounded-md border-0 bg-white py-2 px-3 text-black shadow-lg">
									</div>
							</div>

							<div>
									<label for="message" class="block text-sm font-medium text-slate-300 mb-2">Message</label>
									<textarea id="message" rows="4" class="block w-full rounded-md border-0 bg-white py-2 px-3 text-black shadow-lg"/>
							</div>

							<div class="mt-6 sm:mt-8 flex justify-center">
									<button type="submit" class="rounded-md bg-emerald-500 px-6 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base font-semibold text-white shadow-sm hover:bg-emerald-400 duration-300">
											Send Message
									</button>
							</div>
					</form>

					<div ref="socialsRef" class="mt-10 sm:mt-12 flex justify-center items-center gap-6 sm:gap-8">
						<a v-for="media in socialMediaLinks" :key="media.link" :href="media.link" external target="_blank" rel="noopener noreferrer" class="text-slate-400 hover:text-cyan-400 transition-colors duration-300">
							<UIcon :name="media.icon" class="size-8 sm:size-9 md:size-10"/>
						</a>
					</div>

					<div ref="buttonRef" class="block flex justify-center mt-10 sm:mt-12">
							<UButton class="py-2 px-8 text-lg md:text-xl font-light tracking-widest" label="Return" size="xl" variant="solid" color="secondary"  @click="reverseOut"/>
					</div>
			</div>
	</div>
</template>