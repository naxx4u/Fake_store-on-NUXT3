<template>
    <Head>
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    </Head>
    <div class="flex px-7 justify-between items-center container bg-green-200 h-14 rounded-b-sm shadow-sm relative">

        <NuxtLink to="/">
            <div class="flex items-center justify-center text-gray-900  font-black uppercase">
                <img src="@/assets/platzi_favicon.png" alt="thumb platzi_favicon" class="h-8">
                Fake store
            </div>
        </NuxtLink>


        <div class="flex gap-2 items-center justify-center">

            <Search />

            <NuxtLink to="/cart">
                <button class="flex items-center justify-center relative">
                    <i
                        class="medium material-icons px-1 text-green-600 cursor-pointer hover:text-green-800 hover:scale-105 ">add_shopping_cart
                    </i>

                    <span
                        class=" absolute top-3 right-3 h-4 w-4 rounded-full bg-lime-500 flex items-center justify-center text-xs text-white  animate-pulse">
                        {{ cartStore.count}}
                    </span>
                </button>
            </NuxtLink>

            <div v-if="!state.isLogin">
                <NuxtLink to="auth">
                    <button class="btn">
                        <span>Login</span>
                        <span class="material-icons ">login</span>
                    </button>
                </NuxtLink>
            </div>

            <div v-else class="flex z-10 items-center justify-center">
                <ClientOnly>
                    <button class="large material-icons text-gray-800 z-10" @mouseover="showMenu" :on-blur="showMenu">
                        account_circle
                    </button>
                </ClientOnly>

                <Transition>
                    <ul v-if="state.isOpen" class="w-40 absolute z-10 top-9 right-5 bg-gray-50  shadow-lg rounded-md"
                        @mouseleave="hideMenu" @blur="hideMenu">
                        <li class="p-2 cursor-pointer text-lg hover:bg-green-300 hover:rounded-t-md">Profile</li>
                        
                        <NuxtLink to="favourites">
                            <li class="p-2 cursor-pointer text-lg hover:bg-green-300 flex items-center justify-between"  @click="hideMenu">
                                Favorites
                                <span
                                    class="h-4 w-4 rounded-full bg-lime-500 flex items-center justify-center text-xs text-white  animate-pulse">
                                    {{favStore.count}}
                                </span>

                            </li>
                        </NuxtLink>

                        <NuxtLink to="/cart">
                            <li class="p-2 cursor-pointer text-lg hover:bg-green-300 flex items-center justify-between"  @click="hideMenu">

                                Cart
                                <span
                                    class="h-4 w-4 rounded-full bg-lime-500 flex items-center justify-center text-xs text-white  animate-pulse">
                                    {{cartStore.count}}
                                </span>
                            </li>
                        </NuxtLink>
                        <li class="p-2 cursor-pointer text-lg hover:bg-green-300 hover:rounded-b-md border-t"
                            @click="logout">Log out</li>
                    </ul>
                </Transition>
            </div>

        </div>

    </div>
</template>

<script setup>
import { useCartStore } from '~~/states/cartState';
import {useFavsStore} from '~~/states/favState'

const cartStore = useCartStore()
const favStore = useFavsStore()

//state
const state = shallowReactive({
    isLogin: false,
    products: [],
    acces: null,
    isOpen: false
})

const showMenu = () => {
    state.isOpen = true
}
const hideMenu = () => {
    state.isOpen = false
}

const router = useRouter()

const logout = () => {
    localStorage.removeItem('token')
    state.acces = null
    router.push({ path: "/auth" })
}




const cheackAuth = () => {
    if (process.client) {
        state.acces = localStorage.getItem('token')
    }

    if (state.acces !== null) {
        state.isLogin = true
    } else {
        state.isLogin = false
    }
}

watchEffect(() => {
    setInterval(() => {
        cheackAuth()
    }, 200);
    
})  

</script>


<style scoped>
.v-enter-active,
.v-leave-active {
    transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
}</style>
