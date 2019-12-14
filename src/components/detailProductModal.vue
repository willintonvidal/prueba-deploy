<template>
  <div
    class="modal fade"
    id="bd-example-modal-lg"
    tabindex="-1"
    role="dialog"
    aria-hidden="true"
    v-if="pro"
  >
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h6 class="modal-title">
            <img title width="30" :src="producto.imagen_principal.ruta" alt="..." />
            {{producto.nombre}}
          </h6>
          <!-- Estrellas -->
          <Stars :quantity="producto.estrellas"></Stars>
          <!-- Fin estrellas -->
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <i class="ti-close"></i>
          </button>
        </div>
        <!-- Imagen de carga cuando se esta actualiozando el producto-->
        <div class="modal-body" v-if="isLoadingUpdate == true">
          <div class="row">
              <div class="col-md-12">
                  <img src="https://acegif.com/wp-content/uploads/loading-103.gif"  width="100%" class="img-update"/>
              </div>
          </div>
          
        </div>
        <!-- Fin magen de carga cuando se esta actualiozando el producto-->

        <div class="modal-body" v-if="isLoadingUpdate == false">
          <div class="row">
            <div class="col">
              <div class="card text-primary bg-primary-bright">
                <div class="card-body text-center">
                  <h5 class="font-weight-bold">{{producto.precio_publico}}</h5>
                  <div>Precio Público</div>
                </div>
              </div>
            </div>
            <div class="col">
              <div class="card text-info bg-primary-bright">
                <div class="card-body text-center">
                  <h5 class="font-weight-bold">{{producto.precio_base}}</h5>
                  <div>Precio Base</div>
                </div>
              </div>
            </div>
            <div class="col">
              <div class="card text-success bg-primary-bright">
                <div class="card-body text-center">
                  <h5 class="font-weight-bold">{{producto.stock}}</h5>
                  <div>Productos</div>
                </div>
              </div>
            </div>

            <div class="col">
              <div class="card text-danger bg-primary-bright">
                <div class="card-body text-center">
                  <h5
                    class="font-weight-bold"
                  >{{(producto.precio_publico - producto.precio_base).toFixed(2)}}</h5>
                  <div>Retorna</div>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <div class="row">
                <h5 class="font-weight-bold">Imagen principal</h5>
                <img width="50%" height="50%" :src="producto.imagen_principal.ruta" />
              </div>

              <h5>Sub categoriaS</h5>

              <div
                class="alert alert-danger"
                role="alert"
                v-if="producto.sub_categorias.length === 0"
              >El producto debe tener por lo menos una sub categoria</div>
              <div class="style-2 over-flow">
                <div class="row text-center display-bloque">
                  <div
                    v-for="(sub,index) in this.producto.sub_categorias"
                    :key="index"
                    class="contenedor"
                  >
                    <img width="50" :src="sub.imagen" />
                    <br />
                    <small>{{sub.nombre}}</small>
                  </div>
                </div>
              </div>
            </div>

            <div class="col">
              <img
                width="60"
                :src="image.ruta"
                v-for="(image,index) in producto.imagenes"
                data-spy="scroll"
                :key="index"
              />
              <div class="row">
                <div class="col">
                  <h5>Contenido</h5>
                  <p>{{pro.contenido}}</p>
                  <h5>Ingredientes:</h5>
                  <p>{{pro.ingredientes}}</p>

                  <h5>Categoria:</h5>
                  <p>{{pro.categoria}}</p>
                  <h5>Proveedor:</h5>
                  <p>{{pro.nombre}}</p>
                </div>
              </div>

              <h5>Tags</h5>
              <div class="row">
                <div
                  class="alert alert-danger"
                  role="alert"
                  v-if="producto.tags.length ===0"
                >Debes agregar un tag</div>
                <div class="col">
                  <!-- <img width="40" :src="tag.imagen.ruta" :title="tag.descripcion"/> -->
                  <button
                    type="button"
                    class="btn btn-info"
                    style="margin:5px"
                    v-for="(tag,index) in producto.tags"
                    :key="index"
                  >
                    <!-- Crear un fichero de css-->
                    {{tag.palabra_clave}}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <h5>Descripciones:</h5>
          <div class="row">
            <div class="card col-md-6" v-for="(desc,index) in producto.descripciones" :key="index">
              <div class="card-header">{{desc.titulo}}</div>
              <div class="card-body">
                <h5 class="card-title">Contenido:</h5>
                <p class="card-text">{{desc.contenido}}</p>
                <h5 class="card-title">Ubicación:</h5>
                <p class="card-text">{{desc.ubicacion}}</p>
              </div>
            </div>
          </div>
        </div>

        <div class="modal-footer">
          <router-link
            :to="{ name: 'UpdateProducto', params: {product: producto} }"
            class="btn btn-primary"
            data-dismiss="modal"
            aria-label="Close"
            v-if="template === false"
          >Actualizar este producto!</router-link>
          <button
            @click="endUpdate"
            v-if="template === true"
            class="btn btn-warning"
          >Actualizar Producto</button>
          
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Stars from "./Stars.vue";
import apiPrimal from "../services/apiServicePrimal";
import { mapState } from "vuex";

export default {
  name: "DetailProduct",
  components: { Stars },
  props: {
    producto: { type: Object, required: true },
    template: { type: Boolean, required: true },
    isLoadingUpdate :{type: Boolean, required: true}
  },
  data() {
    return {
      visible: true,
      prueba: this.producto.estrellas
      //producto:this.productoSeleccionado
    };
  },
  computed: {
    ...mapState("productos", ["productoSeleccionado"]),
    pro() {
      return this.productoSeleccionado;
    }
  },
  methods: {
    endUpdate() {
      this.$emit("endUpdateProduct", 200);
    }
  },
  mounted() {},
  created() {}
};
</script>

<style scoped>
.img-update{
  padding: 0 20% 20% 20%;
}

.modal-footer {
  clear: both;
  overflow: hidden;
  position: sticky;
  bottom: 0;
  background-color: white;
}

.cursor-move {
  cursor: move;
}

.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}

.drag-icon-descripciones {
  font-size: 90%;
  padding: 0;
  margin: 0;
}

.over-flow {
  overflow-x: auto;
  overflow-y: hidden;
  white-space: nowrap;
  width: 400px;
}

.cut-text {
  width: 350px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.overflow-list-sub-categorias-container {
  height: 250px;
  overflow-y: auto;
  overflow-x: hidden;
}

.sub-unidad:hover {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
}

.display-bloque {
  display: block;
}

.contenedor {
  display: inline-block;
  float: none;
  padding: 15px;
}

.contenedor:hover {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
}

.cursor-pointer {
  cursor: pointer;
}

.margin-5 {
  margin: 5px;
}

.margin-titulo-sub {
  margin: 10px;
}

textarea {
  font-size: 0.875rem;
  border-color: #e1e1e1;
  display: block;
  color: #495057;
}

.tamanio-icon {
  color: red;
  font-size: 2em;
}
.padding-image {
  padding: 9px;
}

.flip-list-move {
  transition: transform 0.5s;
}
.no-move {
  transition: transform 0s;
}
.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}

.edit-icon-edit {
  font-size: 30px;
  padding: 0px;
  margin: 0px;
}
</style>