<template>
    
    <!-- begin::main-content -->
    <div class="main-content">
        <!-- Ventana Modal para mostrar los detalles del producto -->
        <detail-product :producto="productOne" :template="false" :isLoadingUpdate="false"></detail-product>      
        <!-- begin::page-header -->
        <div class="page-header" data-backround-image="https://via.placeholder.com/1920X1080">
            <div class="container-fluid d-md-flex justify-content-between">
                <h4>Listado de productos de Primal</h4>
                
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item">
                            <a href="#/">Inicio</a>
                        </li>
                        <li class="breadcrumb-item">
                            <a href="#/">Listado productos</a>
                        </li>
                        <li class="breadcrumb-item active" aria-current="page">Responsive Tables</li>
                    </ol>
                </nav>
                
            </div>
            
        <preloader-small class="text-center" v-if="load==true"></preloader-small>
        </div>
        <!-- end::page-header -->

        <div class="container-fluid">
                
                <div class="row" >
                    
                    
                    <div class="card text-center " style="width: 10rem; margin:10px;" v-for="(p,index) in products" >
                        <a href="#" data-toggle="modal" data-target="#bd-example-modal-lg" @click.prevent="searchProduct(p.id)">
                        <div class="card-header row clearfix float-lg-right">
                            {{p.nombre}}&nbsp&nbsp&nbsp&nbsp&nbsp
                            <div class="dropdown col">
                                <a href="#" data-toggle="dropdown">
                                    <i class="fa fa-ellipsis-v" aria-hidden="true"></i>
                                </a>
                                <div class="dropdown-menu dropdown-menu-left">
                                    <a href="#" class="dropdown-item" data-toggle="modal" data-target="#bd-example-modal-lg" @click.prevent="searchProduct(p.id)">Detalles</a>
                                    <a href="#" class="dropdown-item text-danger" @click.prevent="deleteProduct(p.id,index)">Eliminar</a>
                                </div>
                            </div>
                        </div>
                            <div class="justify-content-center">
                            <img :title="p.imagen_principal.tipo" width="60" :src="p.imagen_principal.ruta" alt="...">
                            </div>
                            <Stars :quantity="p.estrellas"></stars>
                            <p class="card-text">{{p.contenido}}</p>
                            <div class="card-footer text-muted">
                            Disponible: {{p.stock}}
                        </div>
                        </a>
                    </div>
                    
                                <nav>
                                    <ul class="pagination">
                                        <li class="page-item" v-if="pagination.current_page > 1">
                                            <a href="" class="page-link" @click.prevent="changePage(pagination.current_page - 1)">
                                                <span>Atras</span>
                                            </a>
                                        </li>
                                        <li class="page-item" v-for="page in pagesNumber" v-bind:class="[page == isActived?'active':'']">
                                            <a href="" class="page-link" @click.prevent="changePage(page)">
                                                {{page}}
                                            </a>
                                        </li>
                                        <li class="page-item" v-if="pagination.current_page < pagination.last_page">
                                            <a href="" class="page-link" @click.prevent="changePage(pagination.current_page + 1)">
                                                <span>Adelante</span>
                                            </a>
                                        </li>
                                    </ul>
                                </nav>

                </div>

    </div>
    <prim-preloader v-if="isLoading === true"></prim-preloader>
    </div>  
    <!-- end::main-content -->
</template>
<script>
import apiPrimal from '../services/apiServicePrimal'
import toastr from "toastr";
import DetailProduct from './detailProductModal.vue'
import Stars from './Stars.vue'
import {mapState,mapActions,mapGetters} from 'vuex'
import PrimPreloader from './layout/Preloader.vue'
import {mapMutations} from 'vuex'
import PreloaderSmall from './layout/PreloaderSmall.vue'

export default {
        components: {DetailProduct,Stars,PrimPreloader,PreloaderSmall},
    data() {
      return {
          load:false,
          isLoading:true,
          products:[],
          offset:3,
          pagination:{
                'current_page': 0,
                'from': 0,
                'last_page': 0,
                'path': '',
                'per_page': 0,
                'to': 0,
                'total': 0
          },
          productOne:{
                basado_en: 0,
                categoria: 0,
                contenido: 0,
                descripciones: '',
                estado: '',
                estrellas: 0,
                id: 0,
                imagen_principal: '',
                imagenes: [],
                ingredientes: '',
                marca: '',
                nombre: '',
                precio_base: 0,
                precio_publico: 0,
                proveedor: '',
                stock: 0,
                sub_categorias:[],
                tags: [],
                tipo: ''
          }
      }
    },
    computed:{
        isActived(){
            return this.pagination.current_page
        },
        pagesNumber(){
            if(!this.pagination.to){
                return [];
            }
            var from  = this.pagination.current_page - this.offset; 
            if(from < 1){
              from = 1;  
            }

            var to = from +(this.offset*2); 

            if(to >= this.pagination.last_page){
              to = this.pagination.last_page;  
            }

            var pagesArray = [];
            while (from <= to){
                pagesArray.push(from);
                from++;
            }

            return pagesArray;
        }
    },
    methods:{
        ...mapMutations(['setPagina']),
        loadProducts(page){
            apiPrimal.ListProducts(page)
            .then(res => {
                if(res.status == 200 && res.data.success === 'true'){
                        this.products = res.data.data
                        this.pagination = res.data.meta
                        this.load = false;
                        console.log(res)
                }else{
                    toastr.error('Error al cargar los productos!');
                }
            })
            .catch(err => console.log(err))
        },
        changePage(page){
            this.pagination.current_page = page;
            this.loadProducts(page);
        },
        deleteProduct(idProduct,index){
        this.$confirm("Se eliminara este proveedor!").then(() => {
            
            
            
            apiPrimal.deleteProduct(idProduct)
            .then(res => {
                
                console.log(res)
                if(res != undefined && res.status == 200 && res.statusText == 'OK' && res.data.success == true){
                    this.products.splice(index, 1);
                }else{
                    toastr.error("Error al eliminar el producto!");
                }
            })
        })
        },
        searchProduct(idProduct){
            apiPrimal.searchProductById(idProduct).then(res =>{
                console.log(res);
                
                if(res.data.message =='Producto encontrado' && res.status == 200) 
                this.productOne = res.data.data;
                }).catch(err =>{
                    console.log("[ERROR]:"+err);
                })
         },
         ...mapActions('productos',['getProductoById'])
    },
    mounted(){
        this.isLoading = false;
        this.loadProducts();
        //Diciendole a la dash en que componente nos encontramos
         this.setPagina('productos');
    },
    created(){
        this.load = true;
        //Limoiando basura de los modales
         var elementos = document.getElementsByClassName('overlay');
         elementos[0].classList.remove("show");
         elementos[0].click();
         
        
        const id = 1;
        this.getProductoById({id})
        .then((res) =>{

            console.log('Seleccionando producto')
            console.log(res.data.message)
            
        })
    }
}
</script>

<style scoped>
.page-header{
        background-image: url('/src/assets/media/image/fondo.png')
    }
</style>