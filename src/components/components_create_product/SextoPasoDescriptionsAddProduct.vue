<template>
  <div class="contenedor">
    <form @submit.prevent="addNameProduct">
      <div class="form-group">
        <label for="exampleInputEmail1">Agregar titulo  para la descriipción del producto: {{createProduct.nombre}}</label>
        <input
          type="text"
          class="form-control"
          v-model="createProduct.descripcion.titulo"
          placeholder="Titulo para la descripcion del producto"
        />

        <label for="exampleInputEmail1">Agregar contenido para la descripción del producto: {{createProduct.nombre}}</label>
        <input
          type="text"
          class="form-control"
          v-model="createProduct.descripcion.contenido"
          placeholder="Contenido para la descripción del producto"
        />

        <label for="exampleInputEmail1">Ubicacion para la descripción del producto: {{createProduct.nombre}}</label>
        <input
          type="text"
          class="form-control"
          v-model="createProduct.descripcion.ubicacion"
          placeholder="Ubicación para la descripción del producto"
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
        this.$emit('nextPag',7);
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