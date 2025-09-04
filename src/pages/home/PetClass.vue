<template>
  <div class="wrapper">
    <div class="cols">
      <div v-for="(card, index) in cards" :key="index" class="col" @click="handleCardClick(index)">
        <div class="container">
          <div class="front" :style="{ backgroundImage: `url(${card.frontImage})` }">
            <div class="inner">
              <p>{{ card.title }}</p>
              <span>{{ card.subtitle }}</span>
            </div>
          </div>
          <div class="back">
            <div class="inner">
              <p>
                {{
                  card.content.length > 45
                    ? card.content.substring(0, 45) + "..."
                    : card.content
                }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <back-fab :fabShow="true" />
</template>

<script setup>
  import { ref, onMounted, onUnmounted } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import { getPetPageData } from '@/api/home.js';
  import BackFab from "@/components/BackFab.vue";
  import getImageUrl from "@/utils/getImageUrl.js";

  const cards = ref([]);
  const cardIds = ref([]);
  const activeCardIndex = ref(-1);
  const categoryId = ref(0);
  const currentPage = ref(1);

  const route = useRoute();
  const router = useRouter();

  const fetchData = async () => {
    const { list: response } = await getPetPageData({
      page: currentPage.value,
      size: 10,
      cid: categoryId.value,
    });

    const newCards = response.map(item => ({
      frontImage: getImageUrl(item.englishName),
      title: item.name,
      subtitle: item.englishName,
      content: item.culture,
    }));

    cardIds.value = [...cardIds.value, ...response.map(item => item.id)]
    cards.value = [...cards.value, ...newCards];
  };

  const handleCardClick = (index) => {
    if (activeCardIndex.value === index) {
      const id = cardIds.value[index];
      router.push({ name: "petdetail", params: { id } });
    }
    activeCardIndex.value = index;
  };

  const handleScroll = () => {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;

    if (scrollTop + window.innerHeight + 20 >= scrollHeight) {
      currentPage.value++;
      fetchData();
    }
  };

  onMounted(() => {
    categoryId.value = route.query.cid;
    fetchData();
    window.addEventListener('scroll', handleScroll);
  });

  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll);
  });
</script>

<style scoped>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  h1 {
    font-size: 2.5rem;
    font-family: "Montserrat";
    font-weight: normal;
    color: #444;
    text-align: center;
    margin: 2rem 0;
  }

  .box {
    font-size: 20px;
    width: 68px;
    border: 3px solid #f5f5f5;
    background-color: #f5f5f5;
    border-radius: 12px;
  }

  .wrapper {
    width: 100%;
    margin: 0 auto;
    max-width: 80rem;
  }

  .cols {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }

  .col {
    width: calc(25% - 2rem);
    margin: 8px;
    cursor: pointer;
  }

  .container {
    transform-style: preserve-3d;
    perspective: 1000px;
  }

  .front,
  .back {
    background-size: cover;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.25);
    border-radius: 10px;
    background-position: center;
    transition: transform 0.7s cubic-bezier(0.4, 0.2, 0.2, 1);
    backface-visibility: hidden;
    text-align: center;
    min-height: 208px;
    height: auto;
    color: #fff;
    font-size: 1.5rem;
  }

  .back {
    background: linear-gradient(45deg, #ffa3c2 0%, #f8e5ec 100%);
  }

  .front:after {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    width: 100%;
    height: 100%;
    content: "";
    display: block;
    opacity: 0.4;
    background-color: #000;
    border-radius: 10px;
  }

  .container:hover .front,
  .container:hover .back {
    transition: transform 0.7s cubic-bezier(0.4, 0.2, 0.2, 1);
  }

  .back {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
  }

  .inner {
    transform: translateY(-50%) translateZ(60px) scale(0.94);
    top: 50%;
    position: absolute;
    left: 0;
    width: 100%;
    padding: 1rem;
    box-sizing: border-box;
    outline: 1px solid transparent;
    perspective: inherit;
    z-index: 2;
    font-size: 16px;
  }

  .container .back {
    transform: rotateY(180deg);
    transform-style: preserve-3d;
  }

  .container .front {
    transform: rotateY(0deg);
    transform-style: preserve-3d;
  }

  .container:hover .back {
    transform: rotateY(0deg);
    transform-style: preserve-3d;
  }

  .container:hover .front {
    transform: rotateY(-180deg);
    transform-style: preserve-3d;
  }

  .front .inner p {
    font-size: 26px;
    margin-bottom: 2rem;
    position: relative;
    font-family: ali;
  }

  .front .inner p:after {
    content: "";
    width: 68px;
    height: 3px;
    position: absolute;
    background: #ffa3c2;
    display: block;
    left: 0;
    right: 0;
    margin: 0 auto;
    bottom: -0.75rem;
  }

  .front .inner span {
    color: rgba(255, 255, 255, 0.7);
    font-family: "Montserrat";
    font-weight: 300;
  }

  @media screen and (max-width: 48rem) {
    .col {
      width: calc(50% - 2rem);
    }
  }

  @media screen and (max-width: 32rem) {
    .col {
      width: calc(50% - 1rem);
    }
  }
</style>