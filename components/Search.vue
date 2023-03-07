<template>
    <div class="flex items-center justify-center relative">
   <TransitionGroup>
    <div v-if="state.searchShow">
            <input type="text"
                class=" w-72 bg-green-100 border-b-2 border-green-200 outline-none text-center focus:bg-green-100 focus:border-green-400 focus:rounded-t-sm font-semibold placeholder:font-normal placeholder:text-slate-400"
                placeholder="type something..." @input="(e) => state.text = e.target.value"
                @click="state.showlist = true">
        </div>
   </TransitionGroup>
        <button class="medium material-icons px-1 text-green-600 cursor-pointer active:scale-110" @click="searchClick">
            search
        </button>

        <div v-if="state.text.length >= 3 && state.showlist"   @mouseleave="hidelist"
            class="absolute z-20 top-6 right-8 max-h-60 overflow-y-auto overflow-x-hidden  w-72 flex flex-col items-start justify-between ">
          <TransitionGroup>
            <div v-for="value of searchList" :key="value.id" @click="hidelist">
                <NuxtLink :to="`/product/${value.id}`"
                    class="flex items-center justify-between px-4 py-1 bg-green-200 w-72 border-b-2 border-green-300 hover:bg-green-300 ">
                    <p class="text-sm font-semibold">{{ value.title }}</p>
                    <p class="text-sm font-semibold">$ {{ value.price }}</p>
                </NuxtLink>
            </div>
          </TransitionGroup>


        </div>

    </div>
</template>

<script setup>
import axios from 'axios';

const state = shallowReactive({
    searchShow: false,
    allProducts: [],
    text: '',
    showlist: false
})

const searchClick = () => {

    state.searchShow = !state.searchShow
    state.showlist = !state.showlist
    axios.get('https://api.escuelajs.co/api/v1/products')
        .then(res => state.allProducts = res.data)
}

// const showlist = () => {state.showlist = !state.showlist}
const hidelist = () => {
    state.showlist = false
    state.searchShow = false
}

const searchList = computed(() => state.allProducts.filter((item) => {
    return item.title.toLowerCase().includes(state.text.toLowerCase())
}))
</script>

<style  scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>