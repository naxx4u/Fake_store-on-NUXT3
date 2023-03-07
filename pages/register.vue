<template>
    <Head>
        <title>Fake Store | Registration</title>
    </Head>
    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">

        <form action="" method="post" @submit="e => e.preventDefault()"
        class=" gap-4 p-16 flex flex-col items-center justify-center  border-2 border-green-300 rounded-md shadow-lg">

        <h1 class="font-bold text-slate-800 text-2xl">Registration</h1>
        
        <label class="flex  flex-col items-start justify-center py-2" >
            <span class="font-semibold text-slate-800">Email:</span>
            <input 
            class="bg-gray-50 border-b-2 border-green-200 outline-none text-center focus:bg-green-100 focus:border-green-400 focus:rounded-t-sm"
            required="true"
            :value="state.email"
            @input="(e) => state.email = e.target.value"
            >
        </label>


        <label class="flex flex-col items-start justify-center  relative" >
            <span class="font-semibold text-slate-800"> Password:</span>
           
            <input :type="state.showPass ? 'text' : 'password'"
            class="bg-gray-50 border-b-2 border-green-200 outline-none text-center focus:bg-green-100 focus:border-green-400 focus:rounded-t-sm"
            required="true"
            @input="(e) => state.password = e.target.value"
            >
            <button class="absolute right-0 top-6">             
                <i v-if="!state.showPass" class="tiny material-icons h-1 " @click="showaPassword">no_encryption</i>
                <i v-else="state.showPass " class="tiny material-icons  h-1" @click="hidePassword">enhanced_encryption</i>                
            </button>
        </label>

        <label class="flex flex-col items-start justify-center  relative" >
            <span class="font-semibold text-slate-800">Confirm password:</span>
           
            <input :type="state.showPass ? 'text' : 'password'"
            class="bg-gray-50 border-b-2 border-green-200 outline-none text-center focus:bg-green-100 focus:border-green-400 focus:rounded-t-sm"
            required="true"
            @input="(e) => state.confirmPass = e.target.value"
            >
            <button class="absolute right-0 top-6">             
                <i v-if="!state.showPass" class="tiny material-icons h-1 " @click="showaPassword">no_encryption</i>
                <i v-else="state.showPass " class="tiny material-icons  h-1" @click="hidePassword">enhanced_encryption</i>                
            </button>
        </label>

        <button class="btn mt-6" @click="submit">
            Submit
        </button>

            <div v-if="state.error !== '' " >
                <p class="font-semibold text-red-500">{{ state.error }}</p>
            </div>
            <NuxtLink to="/auth">
                <span class="font-thin text-slate-800 text-sm hover:text-green-400">Alreary have acc?</span>
            </NuxtLink>
        </form>
    </div>
</template>

<script setup>
const state = reactive({
    email: '',
    password: '',
    error: '',
    showPass: false,
    confirmPass: ''
})


const showaPassword = () => {
    state.showPass = true
}

const hidePassword = () => {
    state.showPass = false
}

watch(
  [() => state.password, () => state.confirmPass],
  ([one, two]) => {
    if (one !== two) {
      state.error = 'passwords do not match...'

    }
    if (one === two) {
      state.error = ''

    }
  },
  { immediate: true }
)


// watchEffect(() => {
//     if(state.password !== state.confirmPass) {
//         state.error = 'passwords do not match...'
//     } else if(state.password === state.confirmPass) {
//          state.password = ''
//     }
    
// })

</script>

