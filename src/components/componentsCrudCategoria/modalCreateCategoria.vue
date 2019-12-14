<template>
<form @submit.prevent="CreateCategorie">
  <div
    class="modal fade"
    id="modalCreate"
    tabindex="-1"
    role="dialog"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h6 class="modal-title">
          Crear categoria:
          
          </h6>
          
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
                
                        <div class="form-group">
                            <label for="exampleInputEmail1">Nombre de la categoria:</label>
                            <input
                            type="text"
                            class="form-control"
                            v-model="nombre"
                            id="nombre"
                            name="nombre"
                            :class="{ 'is-invalid': submitted && $v.nombre.$error }"
                            />
                            <div v-if="submitted && !$v.nombre.required" class="invalid-feedback">Nombre de la categoria  es requerido</div>


                            <label >Descripcion de la catergoria:</label>
                            <input
                            type="text"
                            class="form-control"
                            v-model="descripcion"
                            id="descripcion"
                            name="descripcion"
                            :class="{ 'is-invalid': submitted && $v.descripcion.$error }"
                            />
                            <div v-if="submitted && !$v.nombre.required" class="invalid-feedback">Descripción de la categoria  es requerido</div>

                            

                            <br />
                            <label for="exampleInputEmail1">Actualizar imagen: </label>
                            <br />
                            <div class="alert alert-danger" role="alert" v-if="submitted == true && viewImage == null">Debes subir una imagen para la categoria</div>
                            <img width="30%" :src="viewImage"/>
                            <input
                            type="file"
                            class="form-control"
                            @change="changeImage"
                            />
                            
                        </div>
                
        </div>

        <div class="modal-footer">
          <button
            type="submit"
            class="btn btn-warning"
          >Crear categoria</button>
          
        </div>
      </div>
    </div>
  </div>
  </form>
</template>
<script>

import apiPrimal from '../../services/apiServicePrimal'
import toastr from "toastr";
import { required, email, minLength, sameAs } from "vuelidate/lib/validators";

export default {
  name: "ModalCategorie",
  components: {  },
  props: {

  },
  data() {
    return {

        viewImage:null,
        dataImage:null,
        isLoadingUpdate:false,
        submitted:false,
        
          nombre:'',
          descripcion:''
        
    };
  },
  validations:{
    nombre:{required,minLength: minLength(6)},
    descripcion:{required,minLength: minLength(6)}
  },
  computed: {
    
  },
  methods: {
    CreateCategorie(e) {

                this.submitted = true;
            
                // stop here if form is invalid
                this.$v.$touch();
                if (this.$v.$invalid) {
                    return;
                }

                if(this.viewImage == null){
                  return;
                }
        
      this.isLoadingUpdate = true;
      let data =  new FormData();
      
        data.append('nombre',this.nombre);
        data.append('descripcion',this.descripcion);        
        data.append('imagen',this.dataImage);

        console.log(this.dataImage);
        apiPrimal.createCategorie(data).then(res =>{
                if(res != undefined && res.status == 200  && res.data.message != 'Se actualizo la categoria correctamente') {   
                   toastr.success("Se creo correctamente la categoria");
                      this.isLoadingUpdate = false;
                      this.$emit('updateCategoria',res.data.data);
                }else{
                    toastr.error("Datos incorrectos");
                    this.isLoadingUpdate = false;
                }
                console.log(res);
        }).catch(err =>{})


    },
    changeImage(e){
        this.dataImage = e.target.files[0];
        this.renderingImages(e.target.files[0]);
    },
    renderingImages(file){
        let reader = new FileReader();
        reader.onload = (e) =>{
            this.viewImage  = e.target.result;
            //this.categoria.imagen[0].ruta = e.target.result;
        }
        reader.readAsDataURL(file);
    },
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