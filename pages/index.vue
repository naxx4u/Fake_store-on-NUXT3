<template>
    <Head>
        <title>Fake Store | Main Page</title>
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    </Head>
    <div class="flex flex-col items-center justify-center mb-14 relative">
        <ul class="flex items-center justify-between w-3/4 mt-10">
            <li :class="state.firstTab ? activeTab : pasiveTab" @click="firstTabFetch">
                <span>Clothes</span>
            </li>

            <li  :class="state.secondTab ? activeTab : pasiveTab" @click="secondTabFetch">
                <span>Shoes</span>
            </li>


            <li :class="state.thirdTab ? activeTab : pasiveTab" @click="thirdTabFetch">
                <span>Electronics</span>
            </li>


            <li  :class="state.fourthTab ? activeTab : pasiveTab" @click="fourthTabFetch">
                <span>Furniture</span>
            </li>         

            <li  :class="state.fifthTab ? activeTab : pasiveTab" @click="fifthTabFetch">
                <span>Others</span>
            </li>
        </ul>

        <div v-if="state.products.length" class="flex justify-center items-center mt-10 flex-wrap gap-4">
            <div v-for="product of state.products" :key="product.id">
                <ProductCard :product="product" />
            </div>
        </div>

        <div v-else class="h-[100vh]">
            <Loader />
        </div>
        <div v-if="state.products.length < 38">
            <button class="btn mt-10" @click="getMore">
                get more
            </button>
        </div>

        <div v-if="state.showTop">
            <button @click="goToTop" class=" fixed bottom-16 right-28 flex justify-center items-center h-10 w-10 rounded-full bg-green-300 hover:bg-green-500 hover:border hover:border-slate-800 animate-bounce active:animate-spin">
                <ClientOnly><i  class="large material-icons text-white ">navigation</i></ClientOnly>
            </button>
        </div>
    </div>
</template>


<script setup>
//tw consts
const activeTab = 'px-2 py-0.5 border-2 border-green-500 hover:border-green-600 hover:shadow-md  rounded-md bg-green-200 text-slate-800 font-medium cursor-pointer'
const pasiveTab = 'font-medium border-b border-green-200 cursor-pointer'


//state
const state = shallowReactive({
    products: [],
    firstTab: true,
    secondTab: false,
    thirdTab: false,
    fourthTab: false,
    fifthTab: false,

    pageCount:1,
    limit: 20,

    showTop: false
})
const link =  shallowReactive({
    url:  `https://api.escuelajs.co/api/v1/products/?categoryId=${state.pageCount}&offset=10&limit=${state.limit}`
})




//func

const setPageCountAndGetData = (newPageCount) => {
    state.pageCount = newPageCount
    link.url = `https://api.escuelajs.co/api/v1/products/?categoryId=${state.pageCount}&offset=10&limit=20`
    getData()
}



const firstTabFetch = () => {
    state.firstTab = true,
    state.secondTab = false,
    state.thirdTab = false,
    state.fourthTab = false,
    state.fifthTab = false

    state.products = []
    setPageCountAndGetData(1)
}

const secondTabFetch = () => {
    state.firstTab = false,
    state.secondTab = true,
    state.thirdTab = false,
    state.fourthTab = false,
    state.fifthTab = false

    state.products = []
    setPageCountAndGetData(4)
}

const thirdTabFetch = () => {
    state.firstTab = false,
    state.secondTab = false,
    state.thirdTab = true,
    state.fourthTab = false,
    state.fifthTab = false

    state.products = []
    setPageCountAndGetData(2)
}

const fourthTabFetch = () => {
    state.firstTab = false,
    state.secondTab = false,
    state.thirdTab = false,
    state.fourthTab = true,
    state.fifthTab = false
    
    state.products = []
    setPageCountAndGetData(3)
}

const fifthTabFetch = () => {
    state.firstTab = false,
    state.secondTab = false,
    state.thirdTab = false,
    state.fourthTab = false,
    state.fifthTab = true

    state.products = []
    setPageCountAndGetData(5)
}


//fetch

 const getData = async ()  =>  {
  await  useFetch(link.url)
    .then(res => state.products = [...res.data.value])

 }

const getMore = () => {
    state.limit = state.limit + 20
    link.url = `https://api.escuelajs.co/api/v1/products/?categoryId=${state.pageCount}&offset=10&limit=${state.limit}`
    getData()   
   
}
//scroll func
const goToTop = () => {
        window.scrollTo({
            top:0,
            behavior: 'smooth'
        })
    }
const showUpBtn = () => {        
  if(process.client){
    window.addEventListener('scroll', () => {
    window.scrollY > 180 ? state.showTop = true :  state.showTop = false 
})
  }
}

watchEffect( () => {    
    getData()
    showUpBtn()   
})   
</script>

