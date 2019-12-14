<template>
  <!-- begin::main-content -->
    <div class="main-content">

        
        <div class="page-header" data-backround-image="https://via.placeholder.com/1920X1080">
            <div class="container-fluid d-md-flex justify-content-between">
                <h4>Responsive Tables</h4>
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item">
                            <a href="#">Home</a>
                        </li>
                        <li class="breadcrumb-item">
                            <a href="#">Producto</a>
                        </li>
                        <li class="breadcrumb-item active" aria-current="page">Creación de productos</li>
                    </ol>
                </nav>
            </div>
        </div>
 <!-- end::page-header-->

  <div class="container-fluid">
    <h1>Creando producto:</h1>
    Nombre:{{createProduct.nombre}}
    <nav>
      <a href="#1">1</a>
      <a href="#2">2</a>
      <a href="#3">3</a>
    </nav>

    <div class="scrolling-box">
      <section id="1">
          <add-name-product @nextPag="nextPag"></add-name-product>
      </section>
      <section id="2">
        <add-price-product @nextPag="nextPag"></add-price-product>
      </section>
      <section id="3">
        <add-stock-product @nextPag="nextPag"></add-stock-product>
      </section>
      <section id="4">
        <add-content-product @nextPag="nextPag"></add-content-product>
      </section>
      <section id="5">
        <add-ingredients-product @nextPag="nextPag"></add-ingredients-product>
      </section>
      <section id="6">
        <add-descriptions-product @nextPag="nextPag"></add-descriptions-product>
      </section>
      <section id="7">
        <add-tags-product @nextPag="nextPag"></add-tags-product>
      </section>
    </div>
  </div>
</div>

  <!-- end::main-content -->
</template>

<script>
import AddNameProduct from './components_create_product/primerPasoAddNameProduct.vue'
import AddPriceProduct from './components_create_product/SegundoPasoAddPriceProduct.vue'
import AddStockProduct from './components_create_product/TercerPasoAddStockProduct.vue'
import AddContentProduct from './components_create_product/CuartoPasoContenidoAddProduct.vue'
import AddIngredientsProduct from './components_create_product/QuintoPasoIngredientsAddProduct.vue'
import AddDescriptionsProduct from './components_create_product/SextoPasoDescriptionsAddProduct.vue'
import AddTagsProduct from './components_create_product/SeptimoPasoTagsAddProduct.vue'

import {mapState,mapMutations} from 'vuex'

export default {
    name:'CreateProduct',
    components:{AddNameProduct,AddPriceProduct,AddStockProduct,AddContentProduct,AddIngredientsProduct,
    AddDescriptionsProduct,AddTagsProduct},
    data(){
        return{
          click:null
        }
    },computed:{
      ...mapState('productos',['createProduct'])
    },methods:{
      nextPag(data){
        console.log(data);
       //this.click.click();
       window.scrollTo(0,0)
       document.location.href = "#"+data;
       console.log(this.click);
      },
      ...mapMutations(['setPagina'])
    },
    created(){
          //Eliminando clase basura de las modales  
          var elementos = document.getElementsByClassName('overlay');
          if(elementos[0] != null){
            elementos[0].classList.remove("show");
            elementos[0].click();
         }

       this.click = document.getElementById("2");

      //Diciendole a la dash en que componente estamos
       this.setPagina('crear_productos');
    }

}
</script>

<style scoped>
 body {
  background-color: #333;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
 
} 

/* .container-fluid {
  height: 100%;
  margin: 0;
  display: flex;
  flex-direction: column;
}

*/


.scrolling-box {
  background-color: #eaeaea;
  display: block;
  height: 400px;
  overflow-y: scroll;
  scroll-behavior: smooth;
  text-align: center;
  width: 100%;
}

section {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.page-header{
        background-image: url('/src/assets/media/image/fondo.png')
    }

</style>

