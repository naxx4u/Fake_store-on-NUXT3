import { defineStore } from 'pinia'
import { useCartStore } from './cartState'
const  cartStore = useCartStore()

export const useFavsStore = defineStore('favourites', {
    state: () => ({
        favourites: []
    }), 
    getters: {
       count(){
        return this.favourites.length
       },    
    },
    actions:{
        addProduct(product) {
            this.favourites.push(product)
            localStorage.setItem('favourite', JSON.stringify( this.favourites))
        },
        deleteProduct(id){
          this.favourites =  this.favourites.filter(product => {
             return   product.id  !== id
            })
        },
         getAllProducts() {
            if(process.client) {
                this.favourites = [... JSON.parse(localStorage.getItem('favourite')) ]
            }
        },
        delete(){
           this.$reset
           localStorage.removeItem('favourite')
        }
        
    }
})