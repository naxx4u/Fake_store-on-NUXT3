<template>
    <Head>
        <title>Fake Store | Favourites</title>
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    </Head>

    <div v-if="favStore.favourites.length > 0" class="flex w-full px-20 py-6 my-10 justify-center items-center   ">
        <div class="flex  gap-4  w-1/2 flex-col mx-auto">
            <div v-for="cartItem in favStore.favourites" :key="cartItem.id"
                class=" flex items-center justify-center">
                <CartItem :cartItem="cartItem" />
            </div>

            <div class="w-full h-20 flex   items-center justify-between">
             <h2 class="text-slate-800 font-bold text-xl">Total Price: ${{ totalPrice }}</h2>
            <button class="btn w-1/4" @click="deleteAll">remove</button>
        </div>
        </div>
      
    </div>

    <div v-else class="flex flex-col items-center justify-center">
       
        <img src="../assets/cart_empty.png" alt="cart_empty">
    </div>
</template>

<script setup>
import {useFavsStore} from '~~/states/favState'

const favStore = useFavsStore()
favStore.getAllProducts()

const totalPrice = computed(() =>
favStore.favourites.reduce((acc, product) => acc += product.price, 0)
)


const deleteAll = () => {
    favStore.delete()
}

</script>

<style lang="scss" scoped></style>