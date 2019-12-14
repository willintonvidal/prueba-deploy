<template>
  <div
    class="modal fade"
    id="modalCreateTag"
    tabindex="-1"
    role="dialog"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h6 class="modal-title">
          Creando Tag: {{palabra_clave}}
          
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
                <form >
                        <div class="form-group">
                            <label for="exampleInputEmail1">Descripción del tag:</label>
                            <input type="text" class="form-control" v-model="descripcion" placeholder="Descripción del tag"
                            :class="{ 'is-invalid': submitted && $v.descripcion.$error }"
                            />
                            <div v-if="submitted && !$v.descripcion.required" class="invalid-feedback">Descripción del tag es requerido</div>
                        </div>

                        <div class="form-group">
                            <label for="exampleInputEmail1">Palabra clave del tag:</label>
                            <input type="text" class="form-control" v-model="palabra_clave" placeholder="Palabra clave del tag"
                            :class="{ 'is-invalid': submitted && $v.palabra_clave.$error }"
                            />
                            <div v-if="submitted && !$v.palabra_clave.required" class="invalid-feedback">Palabra clave es requerida</div>
                        </div>


                        <div class="form-group">
                            <label for="exampleInputEmail1">Imagen para el tag:</label>
                            <br />
                            <div class="alert alert-danger" role="alert" v-if="submitted == true && viewImage == null">Debes subir una imagen para el tag</div>
                            <img width="50%" :src="this.viewImage" />
                            <input type="file" class="form-control" @change="changeImage"/>
                        </div>

                        <!-- <div class="form-group">
                            <label for="exampleInputEmail1">Value para el tag:</label>
                            <br />
                            <div v-for="(val,index) in values" :key="index">
                                {{val.id}}
                            </div>
                        </div> -->

                </form>
        </div>

        <div class="modal-footer">
          <button
            @click="endUpdate"
            class="btn btn-warning"
          >Crear tag</button>
          
        </div>
      </div>
    </div>
  </div>
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
        values:[],
        palabra_clave:'',
        descripcion:'',
        submitted:false
    };
  },
  validations:{
    palabra_clave:{required,minLength: minLength(6)},
    descripcion:{required,minLength: minLength(6)}
  },
  computed: {
    
  },
  methods: {
    endUpdate(e) {
        
        this.submitted = true;
            
                // stop here if form is invalid
                this.$v.$touch();
                if (this.$v.$invalid) {
                    return;
                }

                if(this.viewImage == null){
                  return;
                }

      //this.$emit("endUpdateProduct", 200);
    this.isLoadingUpdate = true;
    let data =  new FormData();
        data.append('palabra_clave',this.palabra_clave);
        data.append('descripcion',this.descripcion);
        data.append('value_id',1);
        data.append('imagen',this.dataImage);

        console.log(this.dataImage);
        apiPrimal.createTag(data).then(res =>{
                if(res != undefined && res.status == 200  && res.data.message != 'Se actualizo la categoria correctamente') {   
                   toastr.success("Se creo correctamente el tag");
                    this.isLoadingUpdate = false;
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
        }
        reader.readAsDataURL(file);
    },
    listValue(){
      apiPrimal.listValue().then(res =>{
        this.listValue = res.data.data;
        console.log(res);
      }).catch(err =>{})
    }
  },
  mounted() {
    
  },
  created() {
      this.listValue();
  }
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