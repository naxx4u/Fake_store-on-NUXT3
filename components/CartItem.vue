<template>
    <div class="w-full flex items-center justify-between bg-slate-100 py-4 px-4 border-2 border-green-200 shadow-xl rounded-md">
        <div class=" gap-10 flex items-center justify-start">
           <NuxtLink :to="`/product/${cartItem.id}`">
            <img :src="cartItem.image" :alt="cartItem.title"
                class="h-20 w-20"
            >
            <h2>{{ cartItem.title }}</h2>
           </NuxtLink>
        </div>
        <div class="flex items-center justify-center">
            <span class="text-slate-800  font-bold text-lg">$ {{ cartItem.price }}</span>
            <button class="mediun material-icons px-3 text-green-300 cursor-pointer hover:text-red-500 active:scale-105 "
            @click="deleteItem">
                delete
            </button>
        </div>
    </div>
</template>

<script setup>
import { useCartStore } from '~~/states/cartState';

const cartStore = useCartStore()
const { cartItem } = defineProps(['cartItem'])

const deleteItem = () => {
    cartStore.deleteProduct(cartItem.id)
}

</script>

<style scoped>

</style>