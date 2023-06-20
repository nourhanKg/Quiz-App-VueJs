<template>
     <header class="bg-red-400 h-16 flex items-center">
        <div class="container px-2 mx-auto flex justify-between">
        <h1 class="text-4xl font-bold">Quizlet</h1>
        <div class="flex items-center">
            <input v-model="searchVal" class="px-3 rounded-sm py-1 mr-2 focus:outline-none hover:drop-shadow-xl" placeholder="Search">
            <!-- <img src="../../assets/magnifying-glass.png" class="h-6 w-6"> -->
        </div>
        </div>
    </header>
</template>

<script>
/* eslint-disable */
import { ref, watch} from 'vue';
export default {
    name: "HeaderComp",
    emits: ["searchCat"],
    setup(_, {emit}) {
        const searchVal = ref("");
        watch(searchVal, (newVal, oldVal) => {
            emit("searchCat", newVal);
        });
        return {
            searchVal
        }
    }
}
</script>

<style lang="scss" scoped>

</style>