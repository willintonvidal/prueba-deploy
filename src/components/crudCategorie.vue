<template>
    
    <!-- begin::main-content -->
    <div class="main-content">    
        <modal-update  :categoria="catSeleccionada"></modal-update>
        <modal-create @updateCategoria="dataUpdate"></modal-create>
        <!-- begin::page-header -->
        <div class="page-header" data-backround-image="https://via.placeholder.com/1920X1080">
            <div class="container-fluid d-md-flex justify-content-between">
                <h4>Listado de categorias primal</h4>
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
            <a href="#" data-toggle="modal" data-target="#modalCreate" class="float-right" ><img width="40px" src=""/></a>
            <!-- public/assets/media/plus.png -->
            
        <preloader-small class="text-center" v-if="load==true"></preloader-small>
        </div>
        <!-- end::page-header -->

        <div class="container-fluid">

                <div class="row" >
                    <div class="card text-center " style="width: 10rem; margin:10px;" v-for="(cat,index) in categorias" :key="index">
                        
                        <div class="card-header row clearfix float-right">
                            {{cat.id}}-Categoria&nbsp&nbsp&nbsp
                            <div class=" clearfix float-lg-right">
                                <a @click.prevent="deleteCategorie(cat.id,index)" class="">&nbsp<i class="ti-trash cursor-pointer "></i></a>
                                <!-- <a href="#" data-toggle="dropdown">
                                    <i class="fa fa-ellipsis-v" aria-hidden="true"></i>
                                </a>
                                <div class="dropdown-menu dropdown-menu-left">
                                    <a href="#" class="dropdown-item" data-toggle="modal" data-target="#bd-example-modal-lg" @click.prevent="openModalUpdate(cat,index)">Detalles</a>
                                    <a href="#" class="dropdown-item text-danger" @click.prevent="deleteCategorie(cat.id,index)">Eliminar</a>
                                </div> -->
                            </div>
                        </div>
                        <a href="#" data-toggle="modal" data-target="#bd-example-modal-lg" @click.prevent="openModalUpdate(cat,index)">
                            <div class="card-body justify-content-center">
                                    {{cat.nombre}}<br />
                                    <img  width="60" :src="cat.imagen[0].ruta" alt="...">
                                    <p class="card-text">{{cat.descripcion}}</p>
                            </div>
                            
                        </a>
                    </div>
                     
                </div>

                <div class="row">
                        <!-- Paginación listado de categorias -->
                                          <nav>
                                            <ul class="pagination">
                                                <li class="page-item" v-if="paginationCategorias.current_page > 1">
                                                    <a href="" class="page-link" @click.prevent="changePageCategorias(paginationCategorias.current_page - 1)">
                                                        <span>Atras</span>
                                                    </a>
                                                </li>
                                                <li class="page-item" v-for="(page,index) in pagesNumberCategorias" :key="index" v-bind:class="[page == isActivedCategorias?'active':'']">
                                                    <a href="" class="page-link" @click.prevent="changePageCategorias(page)">
                                                        {{page}}
                                                    </a>
                                                </li>
                                                <li class="page-item" v-if="paginationCategorias.current_page < paginationCategorias.last_page">
                                                    <a href="" class="page-link" @click.prevent="changePageCategorias(paginationCategorias.current_page + 1)">
                                                        <span>Adelante</span>
                                                    </a>
                                                </li>
                                            </ul>
                                        </nav>                 
                                      <!-- Fin paginación listado de categorias -->
                </div>

    </div>
    </div>  
    <!-- end::main-content -->
</template>
<script>

import apiPrimal from "../services/apiServicePrimal";
import toastr from "toastr";
import ModalUpdate from './componentsCrudCategoria/modalUpdateCategoria.vue'
import ModalCreate from './componentsCrudCategoria/modalCreateCategoria.vue'
import {mapMutations} from 'vuex'
import PreloaderSmall from './layout/PreloaderSmall.vue'


export default {
        
    data() {
      return {
          load:true,
          categorias:[],
          catSeleccionada:{
              descripcion:'',
              id:'',
              nombre:'',
              imagen:[],
              
          },
          offset:3,
          paginationCategorias:{
                'current_page': 0,
                'from': 0,
                'last_page': 0,
                'path': '',
                'per_page': 0,
                'to': 0,
                'total': 0
          }
      }
    },
    components:{ModalUpdate,ModalCreate,PreloaderSmall},
    computed:{

      //Paginacion de las categorias para el producto
        isActivedCategorias(){
            return this.paginationCategorias.current_page
        },
        pagesNumberCategorias(){
            if(!this.paginationCategorias.to){
                return [];
            }
            var from  = this.paginationCategorias.current_page - this.offset; 
            if(from < 1){
              from = 1;  
            }

            var to = from +(this.offset*2); 

            if(to >= this.paginationCategorias.last_page){
              to = this.paginationCategorias.last_page;  
            }

            var pagesArray = [];
            while (from <= to){
                pagesArray.push(from);
                from++;
            }

            return pagesArray;
        },
        
    },
    methods:{
        ...mapMutations(['setPagina']),
        loadCategories(page){
        apiPrimal.getAllCategorias(page)
        .then(res =>{
            console.log(res);
            if(res != undefined && res.status == 200 && res.statusText === '' && res.data.success == 'true') {
              this.categorias = res.data.data;
              this.paginationCategorias = res.data.meta;
              this.load = false;
              console.log(res);
            }else if(res.status == 202){
                toastr.error("No hay categorias para listar");
            }else{
              toastr.error("Error al cargar las categorias");
            }
        })
        .catch( err => {})
        },
        openModalUpdate(cat,index){
            this.catSeleccionada = cat;
            console.log(cat);
        },
        deleteCategorie(id,index){
            this.$confirm("Se eliminara esta categoria!").then(() => {
            apiPrimal.deleteCategorie(id).then(res =>{
                if(res.status == 200 && res.data.success ==true){
                    toastr.success("Se eliminocorrectamente la categoria");
                    console.log(res);
                    this.categorias.splice(index,1);
                }else if(res.status == 200 && res.data.success ==false){
                    toastr.error("Tiene elementos ligados, no se puede eliminar");
                }else if(res.status == 460){
                    toastr.error("No se encontro la categoria especificada");
                }else if(res.status == 841){
                    toastr.error("Tiene elementos ligados, no se puede eliminar");
                }
                
            }).catch(err =>{

            })

            })
        },
        changePageCategorias(page){
            this.paginationCategorias.current_page = page;
            this.loadCategories(page);
        },dataUpdate(data){
            this.categorias.push(data);
        }
    },
    mounted(){
        
    },
    created(){
        //Limoiando basura de los modales
         var elementos = document.getElementsByClassName('overlay');
         if( elementos[0] != null){
         elementos[0].classList.remove("show");
         elementos[0].click();
         }
        this.loadCategories();
        //Diciendole a la dash en que pagina o componente estamos
         this.setPagina('crud_categorias');
    }
}
</script>

<style scoped>
.page-header{
        background-image: url('/src/assets/media/image/fondo.png')
    }

</style>