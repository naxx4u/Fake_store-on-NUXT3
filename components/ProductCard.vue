<template>
    <div class="flex flex-col items-center justify-between gap-5 border border-green-300 rounded-md hover:shadow-2xl">
        <NuxtLink :to="`/product/${product.id}`">
            <img :src="product.images[0]" :alt="product.title" class="h-52 w-64">
            <h2 class="text-center mt-2 text-lg text-slate-800 font-semibold">{{ product.title }}</h2>
        </NuxtLink>

        <div class="mt-2 flex flex-1 w-full px-4  justify-between items-center">
            <span class="font-bold text-slate-800">${{ product.price }}</span>
            <div>      
                    <button class="mediun material-icons px-3 text-green-300 cursor-pointer hover:text-green-500 active:scale-105" @click="addFavClick">favorite_border</button>
                    <button class="mediun material-icons px-1 text-green-300 cursor-pointer hover:text-green-500 active:scale-105" @click="addCartClick">
                        add_shopping_cart
                    </button>              
            </div>
        </div>
    </div>
</template>

<script setup>
import { useCartStore } from '~~/states/cartState';
import {useFavsStore} from '~~/states/favState'
const { product } = defineProps(['product'])

const cartStore = useCartStore()
const favStore = useFavsStore()


const addCartClick = () => {
    cartStore.addProduct({
        title: product.title,
        price: product.price,
        image: product.images[0],
        id: product.id
    })
}
const addFavClick = () => {
    favStore.addProduct({
        title: product.title,
        price: product.price,
        image: product.images[0],
        id: product.id
    })
}

</script>

<style  scoped></style>