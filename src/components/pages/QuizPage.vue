<template>
    <!-- quiz page -->
    <!-- score -->
    <div class="text-center my-5">
        <h2 class="text-cyan-600 text-4xl">Your Score:</h2>
        <span class="text-2xl"><span class="text-red-400">{{ currentScore }}</span><span class="text-slate-700">/{{ totalScore || "-"}}</span></span>
    </div>
    <div class="w-4/5 h-6 rounded-full mx-auto border-green-500 border overflow-hidden mb-7">
        <div class="h-full bg-green-500" :style="progressStyle"></div>
    </div>
    <!-- questions -->
    <div v-if="!finished">
        <QuizQuestion :question="currQuestion || {}" @answer-chosen="updateAnswer"></QuizQuestion>
        <button class="w-36 rounded-full bg-green-500 py-2 text-white text-lg d" @click="goToNextQuestion">Next &rarr;</button>
        <P v-if="showErr" class="text-red-500 p-3">You must choose an answer first!</P>
    </div>
    <div v-if="finished">
        <RouterLink to="/" class="w-36 rounded-full bg-yellow-500 p-2 text-white text-lg d">Take another Quiz &rarr;</RouterLink>
    </div>
</template>

<script> 
/* eslint-disable */
import { onMounted, reactive, computed, ref } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import QuizQuestion from "../layout/QuizQuestion.vue";
export default {
    name: "QuizPage",
    components: {QuizQuestion},
    setup () {
        let quiz = reactive({questions:[]});
        let currAnswer = reactive({value: "", isCorrect: null});
        let currentScore = ref(0);
        let currentIndex = ref(0);
        let showErr = ref(false);
        let finished = ref(false);
        const totalScore = computed(() => {
            return quiz.questions.length;
        });
        let currQuestion = computed(() => {
            return quiz.questions[currentIndex.value];
        });
        let progressStyle = computed(() => {
            return {
                width: `${currentIndex.value / totalScore.value * 100}%`
            }
        })
        //fetching data
        onMounted(async () => {
            const route = useRoute();
            const quizId = route.params.id;
            const res = await axios.get(`http://localhost:3000/categories/${quizId}`);
            quiz.questions = res.data.questions;
        });
        //updating answer
        function updateAnswer(answer) {
            Object.assign(currAnswer, answer);
        }
        function goToNextQuestion() {
            if(currentIndex.value <= totalScore.value - 2) {
                if(currAnswer.value !== "") {
                currentIndex.value++;
                if(currAnswer.isCorrect) currentScore.value++;
                Object.assign(currAnswer, {value: "", isCorrect: null})
                showErr.value = false;
            }
                else {
                    showErr.value = true;
                }
            }
            else {
                currentIndex.value++;
                if(currAnswer.isCorrect) currentScore.value++;
                finished.value = true;
            }
        }
        return {
            currQuestion,
            totalScore,
            currentScore,
            updateAnswer,
            progressStyle,
            goToNextQuestion,
            showErr,
            finished
        }
    }
}
</script>

<style lang="scss" scoped>

</style>