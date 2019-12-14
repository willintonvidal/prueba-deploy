<template>
    
    <!-- begin::main-content -->
    <div class="main-content">    
        <modal-update  :proveedor="proSeleccionada"></modal-update>
        <modal-create></modal-create>
        
        <!-- begin::page-header -->
        <div class="page-header" data-backround-image="https://via.placeholder.com/1920X1080">
            <div class="container-fluid d-md-flex justify-content-between">
                <h4>Listado de provedores primal</h4>
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
            <!-- <a href="#" data-toggle="modal" data-target="#modalCreateProveedor" class="float-right"><img width="40px" src="src/assets/media/plus.png"/></a> -->
        </div>
        <!-- end::page-header -->

        <div class="container-fluid">

                <div class="row" >
                    <div class="card text-center " style="width: 10rem; margin:10px;" v-for="(cat,index) in proveedores" :key="index">
                        <a href="#" data-toggle="modal" data-target="#modalUpdateProve" @click.prevent="openModalUpdate(cat,index)">
                        <div class="card-header row ">
                            {{cat.id}}&nbsp&nbsp&nbsp&nbsp&nbsp
                            <div class="dropdown col clearfix float-lg-right" style="padding:0;margin:0;width:10%">
                                <a href="#" data-toggle="dropdown">
                                    <i class="fa fa-ellipsis-v" aria-hidden="true"></i>
                                </a>
                                <div class="dropdown-menu dropdown-menu-left">
                                    <a href="#" class="dropdown-item" data-toggle="modal" data-target="#bd-example-modal-lg" @click.prevent="openModalUpdate(cat,index)">Detalles</a>
                                    <a href="#" class="dropdown-item text-danger" @click.prevent="deleteProveedor(cat.id,index)">Eliminar</a>
                                </div>
                            </div>
                        </div>
                            <div class="card-body justify-content-center">
                                    
                                    <p class="card-text">{{cat.nombre}}</p>
                            </div>
                            
                        </a>
                    </div>
                     
                </div>
                <div class="row">
                    <!-- Paginación listado de proveedores -->
                                          <nav>
                                            <ul class="pagination">
                                                <li class="page-item" v-if="paginationProveedores.current_page > 1">
                                                    <a href="" class="page-link" @click.prevent="changePageProveedores(paginationProveedores.current_page - 1)">
                                                        <span>Atras</span>
                                                    </a>
                                                </li>
                                                <li class="page-item" v-for="(page,index) in pagesNumberProveedores" :key="index" v-bind:class="[page == isActivedProveedores?'active':'']">
                                                    <a href="" class="page-link" @click.prevent="changePageProveedores(page)">
                                                        {{page}}
                                                    </a>
                                                </li>
                                                <li class="page-item" v-if="paginationProveedores.current_page < paginationProveedores.last_page">
                                                    <a href="" class="page-link" @click.prevent="changePageProveedores(paginationProveedores.current_page + 1)">
                                                        <span>Adelante</span>
                                                    </a>
                                                </li>
                                            </ul>
                                        </nav>                 
                                      <!-- Fin paginación listado de proveedores -->
                </div>

    </div>
    </div>  
    <!-- end::main-content -->
</template>
<script>
import apiPrimal from "../services/apiServicePrimal";
import toastr from "toastr";
import ModalUpdate from './componentsCrudProveedores/modalUpdateProveedor.vue'
import ModalCreate from './componentsCrudProveedores/modalCrateProveedor.vue'
import {mapMutations} from 'vuex'
import PreloaderSmall from './layout/PreloaderSmall.vue'


export default {
        
    data() {
      return {
          load:true,
          proveedores:[],
          proSeleccionada:{
              id:'',
              nombre:'',
              descripcion:'',
              elementos:[],
              imagen:'',
              telefono:0
              
          },
          offset:3,
          paginationProveedores:{
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
        isActivedProveedores(){
            return this.paginationProveedores.current_page
        },
        pagesNumberProveedores(){
            if(!this.paginationProveedores.to){
                return [];
            }
            var from  = this.paginationProveedores.current_page - this.offset; 
            if(from < 1){
              from = 1;  
            }

            var to = from +(this.offset*2); 

            if(to >= this.paginationProveedores.last_page){
              to = this.paginationProveedores.last_page;  
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
        loadProveedores(page){
        apiPrimal.getAllProveedores(page)
        .then(res =>{
            if(res != undefined && res.status == 200) {
              this.proveedores = res.data.data;
              this.paginationProveedores = res.data.meta;
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
            apiPrimal.searchProveedorById(cat.id).then(res =>{
                console.log(res);
                
            this.proSeleccionada = res.data.data;
            }).catch(err =>{

            })
            console.log(cat);
        },
        deleteProveedor(id,index){
        this.$confirm("Se eliminara este proveedor!").then(() => {
            apiPrimal.deleteProveedor(id).then(res =>{
                if(res.status == 200){
                    toastr.success("Se elimino correctamente el proveedor");
                    this.categorias.splice(index,1);
                }else if(res.status == 460){
                    toastr.error("No se encontro el proveedor especificado");
                }else if(res.status == 481){
                    toastr.error("Tiene elementos ligados, no se puede eliminar");
                }
                
            }).catch(err =>{

            })
        })
        },
        changePageProveedores(page){
            this.paginationProveedores.current_page = page;
            this.loadProveedores(page);
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
         
        this.loadProveedores();

        //Diciendole a la dash en que pagina o componente estamos
         this.setPagina('crud_proveedores');
    }
}
</script>

<style scoped>
.page-header{
        background-image: url('/src/assets/media/image/fondo.png')
    }

</style>