<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'


const socialMediaLinks = [
	{
		icon: 'i-ant-design-github-outlined',
		link: 'https://github.com/Jowohny'
	},
	{
		icon: 'i-ion-logo-linkedin',
		link: 'https://www.linkedin.com/in/johny-vu-2620182aa/'
	},
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
	}
]

const contactContainerRef = ref<HTMLDivElement | null>(null)
const titleRef = ref<HTMLHeadingElement | null>(null)
const formRef = ref<HTMLFormElement | null>(null)
const socialsRef = ref<HTMLDivElement | null>(null)

onMounted(() => {
  const tl = gsap.timeline()

  gsap.set(contactContainerRef.value, { opacity: 0, yPercent: 20 })
  gsap.set(titleRef.value, { opacity: 0, y: -50 })
  gsap.set(formRef.value!.children, { opacity: 0, x: -30 })
  gsap.set(socialsRef.value!.children, { opacity: 0, y: 30 })

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
})
</script>

<template>
    <div ref="contactContainerRef" class="min-h-screen bg-slate-900 flex flex-col justify-center items-center p-8 font-inter">
        <div class="w-full max-w-2xl">
            <h1 ref="titleRef" class="text-6xl font-light text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-500 tracking-wider">
                Get In Touch
            </h1>

            <form ref="formRef" @submit.prevent class="space-y-6">
                <div class="grid grid-cols-2 gap-6">
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

                <div class="mt-8 flex justify-center">
                    <button type="submit" class="rounded-md bg-emerald-500 px-8 py-3 text-sm font-semibold text-white shadow-sm hover:bg-emerald-400 duration-300">
                        Send Message
                    </button>
                </div>
            </form>

            <div ref="socialsRef" class="mt-12 flex justify-center items-center gap-8">
							<a v-for="media in socialMediaLinks" :key="media.link" :href="media.link" external target="_blank" rel="noopener noreferrer" class="text-slate-400 hover:text-cyan-400 transition-colors duration-300">
								<UIcon :name="media.icon" class="size-10"/>
							</a>
            </div>
        </div>
    </div>
</template>