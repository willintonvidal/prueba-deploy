<template>
    
    <!-- begin::main-content -->
    <div class="main-content">    
        <modal-update  :tag="tagSeleccionado"></modal-update>
        <modal-create></modal-create>
        
        <!-- begin::page-header -->
        <div class="page-header" data-backround-image="https://via.placeholder.com/1920X1080">
            <div class="container-fluid d-md-flex justify-content-between">
                <h4>Listado de Tags primal</h4>
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item">
                            <a href="#/">Inicio</a>
                        </li>
                        <li class="breadcrumb-item active" aria-current="page">Listado de tags</li>
                    </ol>
                </nav>
            </div>
            
        <preloader-small class="text-center" v-if="load==true"></preloader-small>
           <!-- <a href="#" data-toggle="modal" data-target="#modalCreateTag" class="float-right"><img width="40px" alt="Agregar tag" src="src/assets/media/plus.png"/></a> -->
        </div>
        <!-- end::page-header -->

        <div class="container-fluid">

                <div class="row" >
                    <div class="card text-center " style="width: 10rem; margin:10px;" v-for="(cat,index) in tags" :key="index">
                        <a href="#" data-toggle="modal" data-target="#modalUpdateProve" @click.prevent="openModalUpdate(cat,index)">
                        <div class="card-header row ">
                            {{cat.id}}&nbsp&nbsp&nbsp&nbsp&nbsp
                            <div class="dropdown col clearfix float-lg-right">
                                <a href="#" data-toggle="dropdown">
                                    <i class="fa fa-ellipsis-v" aria-hidden="true"></i>
                                </a>
                                <div class="dropdown-menu dropdown-menu-left">
                                    <a href="#" class="dropdown-item" data-toggle="modal" data-target="#bd-example-modal-lg" @click.prevent="openModalUpdate(cat,index)">Detalles</a>
                                    <a href="#" class="dropdown-item text-danger" @click.prevent="deleteTag(cat.id,index)">Eliminar</a>
                                </div>
                            </div>
                        </div>
                            <div class="card-body justify-content-center">
                                    
                                    <p class="card-text">{{cat.palabra_clave}}</p>
                            </div>
                            
                        </a>
                    </div>
                     
                </div>

                <div>
                    <!-- Paginación listado de tags -->
                                          <nav>
                                    <ul class="pagination">
                                        <li class="page-item" v-if="paginationTags.current_page > 1">
                                            <a href="" class="page-link" @click.prevent="changePageTags(paginationTags.current_page - 1)">
                                                <span>Atras</span>
                                            </a>
                                        </li>
                                        <li class="page-item" v-for="page in pagesNumberTags" v-bind:class="[page == isActivedTags?'active':'']">
                                            <a href="" class="page-link" @click.prevent="changePageTags(page)">
                                                {{page}}
                                            </a>
                                        </li>
                                        <li class="page-item" v-if="paginationTags.current_page < paginationTags.last_page">
                                            <a href="" class="page-link" @click.prevent="changePageTags(paginationTags.current_page + 1)">
                                                <span>Adelante</span>
                                            </a>
                                        </li>
                                    </ul>
                                </nav>                 
                                      <!-- Fin paginación listado de tags -->
                </div>

    </div>
    </div>  
    <!-- end::main-content -->
</template>
<script>
import apiPrimal from "../services/apiServicePrimal";
import toastr from "toastr";
import ModalUpdate from './componentsCrudTags/modalUpdateTag.vue'
import ModalCreate from './componentsCrudTags/modalCreateTag.vue'
import {mapMutations} from 'vuex'
import PreloaderSmall from './layout/PreloaderSmall.vue'

export default {
        
    data() {
      return {
          load:true,
          tags:[],
          tagSeleccionado:{
              id:'',
              descripcion:'',
              elementos:[],
              imagen:[],
              palabra_clave:'',

          },
        offset:3,
        paginationTags:{
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
        
      isActivedTags(){
            return this.paginationTags.current_page
        },
        pagesNumberTags(){
            if(!this.paginationTags.to){
                return [];
            }
            var from  = this.paginationTags.current_page - this.offset; 
            if(from < 1){
              from = 1;  
            }

            var to = from +(this.offset*2); 

            if(to >= this.paginationTags.last_page){
              to = this.paginationTags.last_page;  
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
        loadTags(page){
        apiPrimal.getAllTags(page)
        .then(res =>{
            if(res != undefined && res.status == 200) {
              this.tags = res.data.data;
              this.paginationTags = res.data.meta;
              this.load = false;
              console.log(res);
            }else if(res.status == 202){
                toastr.error("No hay categorias para listar");
            }else{
              toastr.error("Error al cargar los proveedores");
            }
        })
        .catch( err => {})
        },
        openModalUpdate(cat,index){
            apiPrimal.searchTagById(cat.id).then(res =>{
                console.log(res);
                
            this.tagSeleccionado = res.data.data;
            }).catch(err =>{

            })
            console.log(cat);
        },
        deleteTag(id,index){
            this.$confirm("Se eliminara esta categoria!").then(() => {
            console.log("Eliminando tag");
            apiPrimal.deleteTag(id).then(res =>{
                if(res.status == 200){
                    toastr.success("Se elimino correctamente el tag");
                    this.tags.splice(index,1);
                }else if(res.status == 460){
                    toastr.error("No se encontro el proveedor especificado");
                }else if(res.status == 481){
                    toastr.error("Tiene elementos ligados, no se puede eliminar");
                }
                
            }).catch(err =>{

            })
        })
        },
        changePageTags(page){
            this.paginationTags.current_page = page;
            this.loadTags(page);
        }
    },
    mounted(){
        
    },
    created(){
        //Limoiando basura de los modales
         var elementos = document.getElementsByClassName('overlay');
         if(elementos[0] != null){
            elementos[0].classList.remove("show");
            elementos[0].click();
         }
         
        this.loadTags();

         //Diciendole a la dash en que pagina o componente estamos
         this.setPagina('crud_tags');
    }
}
</script>
<style scoped>
    .page-header{
        background-image: url('/src/assets/media/image/fondo.png')
    }
</style>