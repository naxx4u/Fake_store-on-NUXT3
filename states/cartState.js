import { defineStore } from 'pinia';

export const useCartStore = defineStore('cart', {
    state: () => ({
        products: []
    }), 
    getters: {
        count(){         
          return this.products.length
        }
    },
    actions:{
        addProduct(product) {
            this.products.push(product)
            localStorage.setItem('cart', JSON.stringify( this.products))
        },
        deleteProduct(id){
          this.products =  this.products.filter(product => {
             return   product.id  !== id
            })
        },
         getAllProducts() {
            if(process.client) {
                this.products = [... JSON.parse(localStorage.getItem('cart')) ]
            }
        }
        
    }
})


// export const useFavsStore = defineStore('favourites', {
//     state: () => ({
//         favourites: []
//     }), 
//     getters: {
//        count(){
//         return this.favourites.length
//        },    
//     },
//     actions:{
//         addProduct(product) {
//             this.favourites.push(product)
//             localStorage.setItem('favourite', JSON.stringify( this.favourites))
//         },
//         deleteProduct(id){
//           this.favourites =  this.favourites.filter(product => {
//              return   product.id  !== id
//             })
//         },
//          getAllProducts() {
//             if(process.client) {
//                 this.favourites = [... JSON.parse(localStorage.getItem('favourite')) ]
//             }
//         },
//         pushToCart(){
//             // useCartStore.products.push(...this.favourites)
//             // this.addToCartAll.push(this.favourites)
//             useCartStore
//         }
        
//     }
// })