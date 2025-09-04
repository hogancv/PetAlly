<template>
	<div>
		<main id="app" :style="{
			'--r': animationStyles.r,
			'--p': animationStyles.p,
			'--o': animationStyles.o,
			'--h': animationStyles.h,
		}" @click="click" class="animate__animated" :class="!state ? 'animate__shakeX' : ''">
			<section class="ticket">
				<header class="front">
					<div class="holo"></div>
					<img class="logo" src="@/assets/images/logo_transparent.png" />
					<aside class="divider"></aside>
				</header>
				<section class="back">
					<div class="holo"></div>
					<img class="logo" src="@/assets/images/logo_transparent.png" />
					<div class="data">
						<h3>宠物名</h3>

						<p spellcheck="false">{{ item.name }}</p>
						<h3>宠物性质</h3>

						<p spellcheck="false">{{ item.commonUsers }}</p>
						<h3>性格</h3>

						<p spellcheck="false">{{ item.temperament }}</p>
						<h3>喜爱度</h3>

						<div style="display: flex">
							<t-icon v-for="(item, index) in item.linkingDegree" :key="index" name="heart-filled"
								color="#ffa3c2" size="32" style="margin-right: 8px; margin-top: 10px"></t-icon>
						</div>
					</div>
					<img :src="getImageUrl(itemName)" alt="" class="img" />
					<aside class="divider">
						<div class="username">
							<span spellcheck="false">{{ item.englishName }}</span>
						</div>
					</aside>
				</section>
			</section>
		</main>
	</div>
	<back-fab :fabShow="true" />
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue';
import gsap from 'gsap';
import { useRoute, useRouter } from 'vue-router';
import getImageUrl from "@/utils/getImageUrl.js";
import { getPetDetailData } from "@/api/home.js";

const router = useRouter();
const item = reactive({});
const itemName = ref('');
const state = ref(0);
const route = useRoute();

const animationStyles = reactive({
	r: '180deg',
	p: '100%',
	o: 0,
});




const runAnimation = () => {
	const r = gsap.timeline({ repeat: -1 });
	const o = gsap.timeline({ repeat: -1 });

	r.to(animationStyles, {
		r: '0deg',
		p: '0%',
		duration: 5,
		ease: 'power1.out',
	});

	r.to(animationStyles, {
		r: '-180deg',
		p: '100%',
		duration: 5,
		delay: 2,
		ease: 'power1.in',
	});

	o.to(animationStyles, {
		o: 0.3,
		duration: 2.5,
		ease: 'power1.Out',
	});

	o.to(animationStyles, {
		o: 0,
		duration: 2.5,
		ease: 'power1.in',
	});

	o.to(animationStyles, {
		delay: 2,
	});

	o.to(animationStyles, {
		o: 0.3,
		duration: 2.5,
		ease: 'power1.Out',
	});

	o.to(animationStyles, {
		o: 0,
		duration: 2.5,
		ease: 'power1.in',
	});
};

const click = () => {
	if (state.value == 0) {
		runAnimation();
		state.value = 1;
	} else {
		router.push({ name: 'petdetail', params: { id: item.id } });
	}
};

import useUserInfoStore from "@/store/user.js";


const fetchPetData = async () => {
	let id = route.query.id;
	let petInfo = await getPetDetailData(id);
	Object.assign(item, petInfo);
	item.linkingDegree = parseInt(item.linkingDegree);
	itemName.value = item.englishName;
	useUserInfoStore().addItemName(item.englishName);

};

onMounted(() => {
	fetchPetData()
});
</script>
<style scoped>
#app {
	perspective: 1200px;
	--o: 0;
	--p: 100%;
	--h: 50%;
	--r: 0;
	transform: translate3d(0, 0, 0.1px);
}

.ticket {
	--scale: 1;
	transform: translate3d(0, 0, 0.1px) scale(var(--scale)) rotateY(var(--r));
	transform-style: preserve-3d;
	pointer-events: auto;
}

.front,
.back {
	grid-area: 1/1;
	background-color: #6e6176;
	background-image: radial-gradient(circle at var(--p) 50%,
			#fff 10%,
			transparent 100%);
	background-size: 100% 220vh;
	background-position: center;
	background-repeat: no-repeat;
	border-radius: 15px;
	display: grid;
	backface-visibility: visible;
	transform: translateZ(1px);
	transform-style: preserve-3d;
	mask-image: var(--ticket);
	mask-size: cover;
	mask-repeat: no-repeat;
}

.img {
	width: 100%;
	height: 100%;
	object-fit: cover;
	object-position: center;
	border-radius: 15px;
	position: absolute;
	z-index: -100;
}

.cutout {
	position: absolute;
}

.front::after,
.back::after {
	content: "";
	position: absolute;
	inset: 0;
	background-image: linear-gradient(-70deg,
			transparent 40%,
			rgba(255, 255, 255, 0.5) 40.5%,
			transparent);
	background-size: 200% 200%;
	background-position: var(--p) var(--p);
	z-index: 5;
	opacity: calc(var(--o) + 0.5);
	pointer-events: none;
}

.front {
	transform: rotateY(180deg) translateZ(1px);
}

.holo {
	display: block;
	position: absolute;
	inset: 0;
	border-radius: 15px;
}

.holo {
	--space: 12%;
	--red: hsl(0, 100%, 50%);
	--orange: hsl(30, 100%, 50%);
	--yellow: hsl(60, 100%, 50%);
	--green: hsl(120, 100%, 50%);
	--cyan: hsl(150, 100%, 50%);
	--blue: hsl(222, 100%, 50%);
	--purple: hsl(258, 100%, 50%);
	--magenta: hsl(300, 100%, 50%);
	background-image: repeating-linear-gradient(-45deg,
			var(--red) 0%,
			var(--orange) calc(var(--space) * 1),
			var(--yellow) calc(var(--space) * 2),
			var(--green) calc(var(--space) * 3),
			var(--cyan) calc(var(--space) * 4),
			var(--blue) calc(var(--space) * 5),
			var(--purple) calc(var(--space) * 6),
			var(--magenta) calc(var(--space) * 7),
			var(--red) calc(var(--space) * 8));
	background-size: 150vw 150vh;
	background-position: calc(var(--h)) calc(var(--h));
	background-repeat: no-repeat;
	mask-image: var(--logopng);
	mask-size: 4% 4%;
	mask-repeat: repeat;
	mix-blend-mode: plus-lighter;
	filter: brightness(0.9) contrast(0.7) saturate(2);
	opacity: var(--o);
}

.logo,
.data {
	position: relative;
	z-index: 2;
}

.logo {
	width: 56%;
	height: 26%;
	place-self: center;
	transform: translateY(-14%);
}

.back .logo {
	position: absolute;
	right: var(--gutter);
	top: 18%;
	width: 30%;
	height: 15%;
	image-rendering: optimize-speed;
	image-rendering: crisp-edges;
	opacity: 0.5;
}

.data {
	margin: 8%;
	text-transform: uppercase;
}

h3 {
	font-size: 16px;
	font-weight: 400;
	line-height: 1;
	margin: 0.2em 0;
}

p {
	font-size: 24px;
	font-weight: bold;
	line-height: 1;
	margin: 0.2em 0 1em;
}

.qr {
	max-width: 30%;
	display: block;
	image-rendering: optimize-speed;
	image-rendering: crisp-edges;
}

.divider {
	position: absolute;
	display: flex;
	align-items: center;
	justify-content: center;
	bottom: 2%;
	left: 0;
	right: 0;
	height: 18%;

	background-image: repeating-linear-gradient(90deg,
			#fff0 0px,
			#fff0 8px,
			#0005 8px,
			#0005 16px),
		radial-gradient(ellipse at center center, #fff0 10%, transparent 50%);
	background-size: 100% 1.5px, 250% 1.5px;
	background-repeat: no-repeat;
	background-position: -4px top, var(--h) top;
	background-blend-mode: overlay;
	z-index: 2;
}

.username {
	display: flex;
	align-items: center;
	font-weight: bolder;
	font-size: 28px;
}

.profile {
	border-radius: 100%;
	width: 40px;
	box-shadow: 0 0 0 1.33px black;
	margin-right: 10px;
	image-rendering: optimize-speed;
	image-rendering: crisp-edges;
}

.verified {
	width: 18px;
	margin-left: 5px;
}

.usernum {
	font-size: 20px;
}

img {
	display: block;
	max-width: 100%;
}

h1 {
	position: fixed;
	top: 20px;
	text-align: center;
	z-index: 1;
}

* {
	box-sizing: border-box;
}

body,
html {
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 100%;
	margin: 0;
	padding: 0;
}

#app {
	color: black;

	display: grid;
	grid: 1fr/1fr;
	place-content: center;
	overflow: hidden;
	padding: 50px;
	z-index: 999;
}

.ticket {
	display: grid;
	grid-area: 1/1;
	width: 90vw;
	aspect-ratio: var(--ar);
}
</style>
