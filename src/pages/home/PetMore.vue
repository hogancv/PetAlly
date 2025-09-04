<template>
  <div style="height: 100vh">
    <div class="grid">
      <div class="item" id="container" v-for="(pet, index) in pets" :key="index" :class="{
        'is-clicked': selectedPetIndex === index,
        'apply-effect': true,
      }" @click="navigateToPetDetail(index)" :style="{
        '--innerTrack': pet.innerTrack,
        'background-image': `url(${backgroundImages[index]})`,
      }">
        <p>{{ petNamesCn[index] }}</p>
        <div class="img-wrapper">
          <img :src="petImages[index]" :alt="pet.title" />
        </div>
      </div>
    </div>
    <back-fab :fabShow="true" />
  </div>
</template>

<script setup>
  import { ref, onMounted, onUnmounted, watch, nextTick } from 'vue';
  import gsap from 'gsap';
  import { useRouter } from 'vue-router';
  import getImageUrl from "@/utils/getImageUrl.js";
  import { getPetPageData } from '@/api/home.js';
  import BackFab from "@/components/BackFab.vue";


  const backgroundImages = ref([]);
  const petImages = ref([]);
  const pets = ref([]);
  const selectedPetIndex = ref(-1);
  const currentPage = ref(1);
  const petIndex = ref(0);
  const scrollTopPosition = ref(0);
  const containerHeight = ref(0);
  const petNamesEn = ref([]);
  const petNamesCn = ref([]);
  const petIds = ref([]);
  const router = useRouter();

  const navigateToPetDetail = (index) => {
    const id = petIds.value[index];
    router.push({ name: "petdetail", params: { id } });
  };

  const fetchPetData = async () => {
    pets.value = pets.value.concat(Array.from({ length: 10 }, () => ({ innerTrack: '0fr' })));
    const { list: petPageList } = await getPetPageData({ page: currentPage.value, size: 10 });
    petPageList.forEach(pet => {
      petNamesEn.value.push(pet.englishName);
      petNamesCn.value.push(pet.name);
      petIds.value.push(pet.id);
      backgroundImages.value.push(getImageUrl(pet.englishName));
      petImages.value.push(getImageUrl(pet.englishName, 1));
    });
    handleMouseEnter(0);
  };

  const handleMouseEnter = (index) => {
    selectedPetIndex.value = index;
    gsap.to(pets.value[index], {
      innerTrack: '1fr',
      duration: 1,
    });
  };

  // 触底加载
  const handleScroll = () => {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
    if (scrollTop + window.innerHeight + 20 >= scrollHeight) {
      currentPage.value++;
      fetchPetData();
    }
    scrollTopPosition.value = scrollTop;
  };

  onMounted(() => {
    fetchPetData();
    window.addEventListener('scroll', handleScroll);
    nextTick(() => {
      containerHeight.value = document.getElementById('container').offsetHeight;
    });
  });

  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll);
  });

  watch(scrollTopPosition, (newVal, oldVal) => {
    if (newVal > oldVal) {
      if (newVal > containerHeight.value * 0.7 * petIndex.value && petIndex.value < 5) {
        handleMouseEnter(petIndex.value++);
      } else if (newVal > (containerHeight.value) * (petIndex.value - 1) && petIndex.value >= 5) {
        handleMouseEnter(petIndex.value++);
      }
    }
    else {
      if (newVal < containerHeight.value * 0.3 * petIndex.value && petIndex.value > 0) {
        handleMouseEnter(--petIndex.value);
      } else if (newVal < containerHeight.value * (petIndex.value - 1) && petIndex.value >= 5) {
        handleMouseEnter(--petIndex.value);
      }
    }
  });
</script>

<style scoped>
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    transform: translate3d(100%, 0, 0);
    transition: transform 300ms;
    pointer-events: none;
    border-radius: 24px;
  }

  .img-wrapper {
    position: relative;
    width: 100%;
    height: 100%;
  }

  .grid {
    --track: 1;
    display: grid;
    max-width: 85rem;
    width: 100%;
    transition: grid-template 300ms;
    padding-top: 8px;
  }

  .item {
    display: grid;
    place-items: center;
    grid-template: 1fr / 1fr var(--innerTrack, 0);
    overflow: hidden;
    aspect-ratio: 7 / 3;
    transition: filter 200ms;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    margin: 5px 10px;
    border-radius: 24px;
  }

  .is-clicked .img-wrapper {
    grid-template: 1fr / 1fr var(--innerTrack, 0);
  }

  .is-clicked .img-wrapper img {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }

  .item p {
    background: #ffbcd3c7;
    color: white;
    padding: 0.5rem 0.75rem;
    font-size: 30px;
    transition: opacity 300ms;
    border-radius: 12px;
    font-family: ali;
  }

  .grid .item.apply-effect {
    filter: grayscale(30%) brightness(90%) contrast(50%);
  }

  .grid .item.apply-effect p {
    opacity: 0;
  }

  /* Remove filter effect for clicked item */
  .grid .item.is-clicked {
    filter: none;
  }

  .grid .item.is-clicked p {
    opacity: 1;
  }
</style>