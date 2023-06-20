<template>
    <!-- home -->
    <!-- header -->
    <HeaderComp @searchCat="searchQuizes"/>
    <!-- categorys -->
    <div class="my-10 container px-2 mx-auto grid gap-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <QuizCard v-for="cat in filteredQuizes" :catData="cat" :key="cat.id"></QuizCard>
    </div>
</template>

<script>
import { computed } from "@vue/reactivity";
import HeaderComp from "../layout/HeaderComp.vue"
import QuizCard from "../layout/QuizCard.vue";
import axios from 'axios';
import { onMounted, reactive } from 'vue';
export default {
    name: "HomePage",
    components:{HeaderComp, QuizCard},
  setup() {
    let quizes = reactive({cats:[], search: ""});
    const filteredQuizes = computed(() => {
      return quizes.cats.filter(cat => cat.name.toLowerCase().includes(quizes.search));
    });
    onMounted(async () => {
      const res = await axios.get("http://localhost:3000/categories");
      quizes.cats = res.data;
    }) ;
    function searchQuizes(str) {
      quizes.search = str.toLowerCase();
    }
    return {
      quizes,
      searchQuizes,
      filteredQuizes
    }
  }
}
</script>

<style lang="scss" scoped>

</style>