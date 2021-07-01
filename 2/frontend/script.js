
const vm = new Vue({
    
    el:'#app',
    data:{
        products:[],
        name:'',
        description:'',
        price:0,
        modal:false,
        nameModal:'',
        descriptionModal:'',
        priceModal:0,
        idModal:''
    },
    methods:{
        submitForm(){
            axios.post('http://localhost:3030/products',{
                name: this.name,
                description:this.description,
                price:this.price
            })
            .then(res=>{
                console.log(res)
                this.products.push(res.data)
                
            })
            .catch(err=>{
                console.log(err)
            })
        },
        deleteProduct(id){
            console.log(id)
            axios.delete('http://localhost:3030/products/'+id)
            .then(res=>{
                console.log(res)
                this.products = this.products.filter(product => product.id!=id)
            })
            .catch(err=>{
                console.error(err)
            })
            
        },
        updateProduct(){
            let data ={
                name: this.nameModal,
                description: this.descriptionModal,
                price: this.priceModal
            }
            axios.put('http://localhost:3030/products/'+this.idModal, data)
            .then(res=>{
                console.log(res)
                this.products = this.products.map(e=>{
                    if(e.id == this.idModal){
                        e = {id:this.idModal,...data}
                    }
                    return e
                })
                console.log(this.products)
            }).catch(err=>{
                console.error(err)
            })
        },
        openModal(product){
            this.nameModal = product.name
            this.priceModal = product.price
            this.descriptionModal = product.description
            this.idModal = product.id
            $(".modal").modal('show')
            $(".close").click(()=>{
                $(".modal").modal('hide')
            })

        }
    },
    created(){
        axios.get('http://localhost:3030/products')
        .then(res =>{
            console.log(res.data)

            for(key in res.data){
                var {name, description,price} = res.data[key]
                var product = {
                    id: key,
                    name: name,
                    description: description,
                    price: price
                }
                this.products.push(product)
            }
            console.log(this.products)
        })
    }
})