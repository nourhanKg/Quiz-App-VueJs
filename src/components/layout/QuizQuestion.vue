<template>
    <!-- questions -->
    <div class="container px-2 mx-auto my-5">
        <h3 class="text-start text-2xl mb-5">{{ question.text }}</h3>
        <div 
            :class="['flex', 'mb-5', 'rounded-lg', 'overflow-hidden', 'hover:drop-shadow-lg', {'selected': option.text === selectedOption}]" 
            @click="chooseAnswer({value: option.text, isCorrect: option.isCorrect})"
            v-for="option in question.options"
            :key="option.id" class="flex mb-5 rounded-lg overflow-hidden hover:drop-shadow-lg"
        >
            <span class="p-3 bg-orange-300">{{ option.label }}</span>
            <span class="p-3 bg-slate-400 flex-grow text-start">{{ option.text }}</span>
        </div>
    </div>
</template>

<script>
/* eslint-disable */
import { defineProps, ref } from 'vue';
export default {
    name: "QuizQuestion",
    emits: ["answer-chosen"],
    props: {
        question: {
            type: Object,
            required: true
        }
    },
    setup(props, { emit}) {
        defineProps(props);
        const selectedOption = ref("");
        function chooseAnswer(answer) {
            console.log(answer);
            selectedOption.value = answer.value;
            emit("answer-chosen", answer);
        }
        return {
            chooseAnswer,
            selectedOption
        }
    }
}
</script>

<style scoped>
    .selected span:first-child{
    background-color: #0db974;
}
</style>