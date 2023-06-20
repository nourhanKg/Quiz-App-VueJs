<template>
    <div class="text-start shadow-md cursor-pointer pb-3 hover:shadow-2xl" @click="goToQuiz">
        <img :src="catData.img" class=" w-full h-48">
        <h2 class="px-5 py-3 text-lg font-semibold">{{ catData.name }}</h2>
        <span class="px-5 text-sm text-red-400">{{catData.questions
    .length}} Questions &rarr;</span>
    </div>
</template>

<script>
import { defineProps } from 'vue';
import {router} from "../../main";
export default {
    name: "QuizCard",
    props: {
    catData: {
      type: Object,
      required: true
    }
  },
    setup (props) {      
        defineProps(props);
        function goToQuiz() {
            const quizId = props.catData.id;
            router.push(`quiz/${quizId}`);
        }
        return {
            goToQuiz
        }
    }
}
</script>

<style lang="scss" scoped>

</style>