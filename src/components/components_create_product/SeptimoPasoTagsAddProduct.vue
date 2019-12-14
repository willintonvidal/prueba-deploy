<template>
  <div class="container">
    <div class="col-md-12">
      <div class="card-scroll">
        <div
          v-for="(tag,index) in createProduct.tags"
          :key="index"
          class="btn btn-info margin-5"
          style="margin:5px"
        >
          {{tag.palabra_clave}}
          <a @click.prevent="addListProductsTagsObject(tag,index)">  &nbsp <i class="ti-plus"></i>
          </a>
        </div>
      </div>
    </div>
    <div class="col-md-12">selecciona algunos tags</div>
    <div class="col-md-12">
      <div class="card-scroll">
        <div
          v-for="(tag,index) in this.tags"
          :key="index"
          class="btn btn-info margin-5"
          style="margin:5px"
        >
          {{tag.palabra_clave}}
          <a @click.prevent="addListProductsTagsObject(tag,index)">&nbsp<i class="ti-plus"></i>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations, mapActions } from "vuex";

export default {
  name: "CreateTagsProduct",
  data() {
    return {
      tagsProduct:null
    };
  },
  computed: {
    ...mapState("productos", ["createProduct"]),
    ...mapState("productos", ["tags"])
  },
  methods: {
    ...mapMutations("productos", ["cambiarNombre","addTagsProductCreate"]),
    ...mapActions("productos", ["getTagsProduct"]),


    addNameProduct() {
      this.$emit("nextPag", 8);
    },addListProductsTagsObject(tag,index){
        this.addTagsProductCreate(tag)
    }
  },
  created() {
    console.log("Se creo el componente septimo");
    var page = 1;
    this.getTagsProduct(page);
  },
  mounted(){
    
  }
};
</script>

<style scoped>
.form-group {
  width: 100%;
}

.contenedor {
  width: 90%;
}
</style>