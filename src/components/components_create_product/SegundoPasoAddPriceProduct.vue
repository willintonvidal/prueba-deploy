<template>
  <div class="contenedor">
    <form @submit.prevent="addPriceProduct">
      <div class="form-group">
        <label for="exampleInputEmail1">Precio base para el producto:</label>
        <input
          type="number"
          class="form-control"
          v-model="createProduct.precio_base"
          placeholder="Digita el precio para este producto"
        />


        <label for="exampleInputEmail1">Precio para el publico:</label>
        <input
          type="number"
          class="form-control"
          v-model="createProduct.precio_publico"
          placeholder="Digita un precio para el publico"
        />

        <label for="exampleInputEmail1">Precio primal para compararlo con otras tiendas:</label>
        <input
          type="number"
          class="form-control"
          v-model="createProduct.precio_primal"
          placeholder="Digita el precio primal"
        />
        
          <button type="submit" class="btn btn-primary" v-if="createProduct.precio_base != 0 && createProduct.precio_publico != 0 && createProduct.precio_primal != 0">Siguiente</button>
      </div>
    </form>
  </div>
</template>
<script>

import {mapState,mapMutations} from 'vuex'

export default {
  name:'CreateNameProduct',
  data(){
    return{

    }
  },
  computed:{
    ...mapState('productos',['createProduct'])
  },
  methods:{
    ...mapMutations('productos',['cambiarNombre']),
    addPriceProduct(){
        this.$emit('nextPag',3);
    }
  }
}
</script>

<style scoped>
  .form-group{
    width: 100%;
  }

  .contenedor{
    width: 90%;
  }
</style>