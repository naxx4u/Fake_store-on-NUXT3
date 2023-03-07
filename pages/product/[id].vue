<template>
    <Head>
        <title>{{ product.title }}</title>
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    </Head>
    <div class="flex p-4 gap-10 justify-between my-10 mx-10 border border-green-200 ">    
        <div class="w-1/2  flex flex-col justify-between items-center">
            <img :src="product.images[state.currentIamge]" :alt="product.title" class="rounded-md">
            <div class="mt-4 p-2 flex  justify-between items-center w-1/2 border border-green-200 rounded-sm shadow-sm bg-slate-100">
                <img :src="product.images[0]" :alt="product.title" class="h-20 w-20 hover:scale-110 hover:ease-linear cursor-pointer rounded-md" @click="state.currentIamge = 0">
                <img :src="product.images[1]" :alt="product.title" class="h-20 w-20 hover:scale-110 hover:ease-linear cursor-pointer rounded-md" @click="state.currentIamge = 1">
                <img :src="product.images[2]" :alt="product.title" class="h-20 w-20 hover:scale-110 hover:ease-linear cursor-pointer rounded-md" @click="state.currentIamge = 2">
            </div>
        </div>

        <div class="flex flex-col items-center justify-between w-1/2 text-slate-800 ">
            <h1 class="font-bold text-2xl">{{ product.title }}</h1>
           
                <p class="text-lg text-center font-semibold">{{ product.description }}</p>
                <p class="text-lg font-bold">$ {{ product.price }}</p>           
    
            <div class="flex w-1/2 items-center justify-between">        
                <button class="btn">
                    add to favs
                    <i class="mediun material-icons px-3 text-pink-500 cursor-pointer hover:scale-110 ">favorite_border</i>
                </button >
                
                <button class="btn">
                    add to cart
                    <i class="mediun material-icons px-1 text-pink-500 cursor-pointer hover:scale-110">add_shopping_cart</i>
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>

const { id } = useRoute().params
const url = 'https://api.escuelajs.co/api/v1/products/' + id
const { data: product } = await useFetch(url, { key: id })

const state = shallowReactive({
         currentIamge: 0
    })



</script>


<style scoped></style>