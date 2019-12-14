<template>
  <div class="contenedor">
    <form @submit.prevent="addNameProduct">
      <div class="form-group">
        <label for="exampleInputEmail1">Agregar ingredientes del producto : {{createProduct.nombre}}</label>
        <input
          type="text"
          class="form-control"
          v-model="createProduct.ingredientes"
          placeholder="Ingredientes del producto"
        />
        
          <button type="submit" class="btn btn-primary" v-if="createProduct.ingredientes.length > 8">Siguiente</button>
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
    addNameProduct(){
        this.$emit('nextPag',6);
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