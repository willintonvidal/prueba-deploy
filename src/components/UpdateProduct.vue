<template>
  <div class="main-content">
    <!-- Modal agregar descripción -->
      <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-hidden="true">
                        <div class="modal-dialog modal-dialog-centered" role="document">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="exampleModalCenterTitle">Agregando descripción a {{producto.nombre}}</h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <i class="ti-close"></i>
                                    </button>
                                </div>
                                <div class="modal-body">
                                    <form @submit.prevent="addDescription">
                                       <!-- <div class="form-group">
                                            <label  class="col-form-label">Ubicación:</label>
                                            <input type="text" class="form-control" v-model="descripcion.ubicacion"  id="ubicacion" name="ubicacion" @change="verificarUnidad" :class="{ 'is-invalid': submitted && $v.descripcion.ubicacion.$error }" autofocus>
                                            <div v-if="submitted && !$v.descripcion.ubicacion.required" class="invalid-feedback">La ubicación es requerida</div>
                                        </div>
                                        -->
                                        <div class="form-group">
                                          <label class="col-form-label">Título para la descripción:</label>
                                          <input type="text" class="form-control" v-model="descripcion.titulo" id="titulo" name="titulo" :class="{ 'is-invalid': submitted && $v.descripcion.titulo.$error }" >
                                          <div v-if="submitted && !$v.descripcion.titulo.required" class="invalid-feedback">En título para la descripción es requerido</div>
                                          <div v-if="submitted && !$v.descripcion.titulo.minLength" class="invalid-feedback">Debe contener al menos 4 letras letras</div>
                                        </div>
                                        <div class="form-group">
                                            <label class="col-form-label">Contenido de la descripción:</label>
                                            <input type="text" class="form-control" v-model="descripcion.contenido" id="contenido" name="contenido" :class="{ 'is-invalid': submitted && $v.descripcion.contenido.$error }" >
                                            <div v-if="submitted && !$v.descripcion.contenido.required" class="invalid-feedback">En contenido para la descripción es requerido</div>
                                        </div>
                                        <button type="submit" class="btn btn-primary">Agregar descripcion al producto {{producto.nombre}}</button>    
                                    </form>
                                    
                                </div>
                                <div class="modal-footer">
                                    
                                </div>
                            </div>
                        </div>
        </div>
    <!--End Modal agregar descripción-->

    <!-- begin::page-header -->
    <div class="page-header" data-backround-image="https://via.placeholder.com/1920X1080">
      <div class="container-fluid d-md-flex justify-content-between">
        <h4>Productos primal</h4>
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item">
              <a href="/">Inicio</a>
            </li>
            <li class="breadcrumb-item active" aria-current="page">Actualizar producto</li>
          </ol>
        </nav>
      </div>
    </div>
    <!-- end::page-header -->
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-12">
          <div class="row">
            <div class="col-md-12">
              <div class="card">
                <div class="card-body">
                  <div class="row">
                  <div class="col">
                    <div class="card text-primary bg-primary-bright">
                      <div class="card-body text-center">
                        <h4 class="font-weight-bold">{{this.producto.precio_publico}}
                          <a data-toggle="collapse" href="#precio_publico" role="button" aria-expanded="false" aria-controls="precio_publico">&nbsp<i class="ti-pencil"></i></a>
                        </h4>
                        <div class="collapse" id="precio_publico"><input type="number" class="form-control"  v-model="producto.precio_publico"></div>
                        <div>Precio Público</div>
                      </div>
                      
                    </div>
                  </div>
                  <div class="col">
                    <div class="card text-info bg-primary-bright">
                      <div class="card-body text-center">
                        <h4 class="font-weight-bold">{{this.producto.precio_base}}
                          <a data-toggle="collapse" href="#precio_base" role="button" aria-expanded="false" aria-controls="precio_base" >&nbsp<i class="ti-pencil"></i></a>
                        </h4>
                            <div class="collapse" id="precio_base"><input type="number" class="form-control" v-model="producto.precio_base"/></div>
                        <div>Precio Base</div>
                      </div>
                    </div>
                  </div>
                  <div class="col">
                    <div class="card text-success bg-primary-bright" >
                      <div class="card-body text-center">
                        <h4 class="font-weight-bold">{{this.producto.stock}}
                          <a data-toggle="collapse" href="#stock" role="button" aria-expanded="false" aria-controls="stock" >&nbsp<i class="ti-pencil"></i></a>
                        </h4>
                        <div class="collapse" id="stock"><input type="number" class="form-control" v-model="producto.stock"/></div>
                        <div>Productos</div>
                      </div>
                    </div>
                  </div>
                </div>

                <input style="display:none" type="file" ref="fileInput" @change="cahangeImagen">
                
                <div class="row">
                  <div class="col">
                      <!-- Actualizar imagen principal-->
                      <div class="row ">
                              <h2 class="font-weight-bold">Imagen principal</h2>
                              <a class="float-right cursor-pointer" @click="$refs.fileInput.click(),asignNumClick(-1)">&nbsp<i class="ti-pencil"></i></a>
                              <img width="100%" height="100%" :src="this.producto.imagen_principal.ruta" />
                          
                      </div>
                      <!-- Fin actualizar imagen principal-->

                      
                <!--      <subcategorias :listsubcategorias="this.subCategorias" :selectsubcategorias="producto.sub_categorias.data"></subcategorias>  -->

                      <!-- Inicio Categorias-->
                      <h4 class="margin-titulo-sub">Sub categorias de {{producto.nombre}}</h4>
                      <div class="alert alert-danger" role="alert" v-if="producto.sub_categorias.length === 0">El producto debe tener por lo menos una sub categoria</div>
                      <div class="row">
                        <div class="col-md-12">
                          <div class="row">
                          
                          <div  class="style-2 over-flow">
                          <div class="row text-center display-bloque"  >
                          <div v-for="(sub,index) in this.producto.sub_categorias" :key="index" class="contenedor">
                            
                                <a @click.prevent="deleteSubCategoriaListProduct(sub,index)" class="float-right cursor-pointer">&nbsp<i class="ti-close"></i></a>
                                <img width="50" :src="sub.imagen"/>
                                <br/>
                                <small>{{sub.nombre}}</small>
                            
                          </div>
                          </div>
                          </div>
                          

                          </div>
                          
                        </div>
                        <!-- <div class="col-md-11">
                          <h3 class="margin-titulo-sub">Listado de subcategorias</h3>
                          
                          <div class="style-2 row overflow-list-sub-categorias-container">
                              <div v-for="(sub,index) in this.subCategorias" class="col sub-unidad">
                                <a @click.prevent="deleteSubCategoriaListFull(sub,index)"  class="float-right cursor-pointer" >&nbsp<i class="ti-plus"></i></a>
                                <img width="90px" :src="sub.imagen" />
                                <br />
                                <small>{{sub.nombre}}</small>
                              </div>

                          </div>
                          <div class="row"></div>
                            <h1>Paginación</h1>
                        </div>
                        -->
                        <!-- Listado de subCategorias full-->
                        <div class="col-md-12">
                              <div class="card">
                                <div class="card-header ">Listado de subcategorias
                                  <a data-toggle="collapse" href="#list-sub-ca" role="button" aria-expanded="false" aria-controls="list-sub-ca" >&nbsp<i class="ti-pencil"></i></a>    
                                </div>
                                <div class="card-body collapse" id="list-sub-ca">
                                  <div class="card-scroll">
                                    <div v-for="(sub,index) in this.subCategorias" :key="index" class="col sub-unidad">
                                          <a @click.prevent="deleteSubCategoriaListFull(sub,index)"  class="float-right cursor-pointer" >&nbsp<i class="ti-plus"></i></a>
                                          <img class="padding-image" width="90px" :src="sub.imagen" />
                                          
                                          <small>{{sub.nombre}}</small>
                                   </div>

                                  </div>
                                </div>
                                <div class="card-footer">Card Footer</div>
                              </div>
                        </div>
                        <!--Fin listado de subCategorias full-->
                      </div>
                      <!-- Fin categorias-->

                      <h3>Tags</h3>
                      <div class="row">
                          <div class="col-md-12">
                                <!-- <img width="40" :src="tag.imagen.ruta" :title="tag.descripcion"/> -->
                              <div class="alert alert-danger" role="alert" v-if="producto.tags.length ===0 || 0">Debes agregar un tag</div> 
                                <button type="button" class="btn btn-info margin-5"  v-for="(tag,index) in this.producto.tags" :key="index"> <!-- Crear un fichero de css-->
                                  <small v-if="tag.nuevo === true" class="text-warning">Nuevo</small>
                                  &nbsp
                                  <span class="tag-letter">{{tag.palabra_clave}}</span>
                                  <a @click.prevent="deleteTagListTagsProduct(tag,index)">&nbsp<i class="ti-close"></i></a>
                                </button>
                          </div>
                          <!--Listado de todos los tags-->
                          
                          <div class="col-md-12">
                                  <div class="card">
                                    <div class="card-header">Listado de tags
                                      <a data-toggle="collapse" href="#list-tags" role="button" aria-expanded="false" aria-controls="list-tags" >&nbsp<i class="ti-pencil"></i></a>    
                                    </div>
                                    <div class="card-body collapse" id="list-tags">
                                      <div class="card-scroll">
                                            <div v-for="(tag,index) in this.tags" :key="index" class="btn btn-info margin-5">
                                                  {{tag.palabra_clave}}
                                                  <a @click.prevent="addListProductsTagsObject(tag,index)">&nbsp<i class="ti-plus"></i></a>
                                            </div>
                                      </div>
                                    </div>
                                    <div class="card-footer">
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
                          <!-- Fin de listar los tags-->
                      </div>

                      

                  </div>
                  <!-- Actualizando y eliminando imagenes del producto -->
                  <div class="col">
                    <!--renderizando las imagenes del producto -->
                    <div class="row">
                          
                          
                          <a class="float-right cursor-pointer" @click="$refs.fileInput.click(),asignNumClick(-101)">&nbsp<i class="ti-plus edit-icon-edit"></i></a>
                               &nbsp <small>Agregar imagenes:</small>
                               &nbsp<div class="spinner-border text-primary" role="status" v-if="gifLoadImage === true">
                                  <span class="sr-only">Loading...</span>
                                </div>
                           <div class="alert alert-danger" role="alert" v-if="producto.imagenes.length <= 0">El producto no tiene imagenes secundarias....</div> 
                          
                          <div class="col-md-10">
                          
                            
                                
                          <div  class="style-2 over-flow">
                            
                          <div class="row text-center display-bloque">
                          
                          <div v-for="(sub,index) in this.reverse" :key="index" class="contenedor">
                            
                                <a @click.prevent="deleteImageProduct(index,sub.id)" class="float-right cursor-pointer">&nbsp<i class="ti-close"></i></a>
                                <a  @click.prevent="$refs.fileInput.click(),asignNumClick(index,sub.id)" class="float-right cursor-pointer">&nbsp<i class="ti-pencil"></i></a>
                                <img width="80" :src="sub.ruta"/>
                                <br/>
                                <small>{{sub.nombre}}</small>
                            
                          </div>
                          </div>
                          </div>
                          

                          </div>
                          
                        </div>
                    <!-- fin derenderizado imagenes del producto -->
                      <br />
                      <div class="row">
                          <div class="col">
                            <div>
                              <h5>Nombre
                                <a data-toggle="collapse" href="#nombre" role="button" aria-expanded="false" aria-controls="nombre" >&nbsp<i class="ti-pencil"></i></a>
                              </h5>
                              <div id="nombre" class="collapse">
                                    <input type="text" class="form-control" v-model="producto.nombre"  />
                              </div>
                              
                              <p>{{producto.nombre}}</p>
                            </div>
                            <div>
                              <h5>Contenido
                                <a data-toggle="collapse" href="#contenido" role="button" aria-expanded="false" aria-controls="contenido" >&nbsp<i class="ti-pencil"></i></a>
                              </h5>
                              <div id="contenido" class="collapse">
                                    <input type="text" class="form-control" v-model="producto.contenido"/>
                              </div>
                              
                              <p>{{producto.contenido}}</p>
                              
                            </div>
                            <div>
                              <h5>Ingredientes:
                                  <a data-toggle="collapse" href="#ingredientes" role="button" aria-expanded="false" aria-controls="ingredientes" >&nbsp<i class="ti-pencil"></i></a>
                              </h5>
                              <div id="ingredientes" class="collapse">
                                  <input type="text" class="form-control" v-model="producto.ingredientes"/>
                              </div>
                              
                              <p>{{producto.ingredientes}}</p>
                            </div>
                            <div>
                                <h5>Marca:
                                      <a data-toggle="collapse" href="#marca" role="button" aria-expanded="false" aria-controls="marca" >&nbsp<i class="ti-pencil"></i></a>  
                                </h5>
                                
                              <p> {{producto.marca.nombre}}</p>

                                <!--Listado de las marcas -->
                                <div class="col-md-12 collapse" id="marca">
                                    <div class="card">
                                      <div class="card-header">Listado de marcas disponibles</div>
                                      <div class="card-body">
                                        <div class="card-scroll">
                                           <div v-for="(mar,index) in this.marcas" :key="index" class="col sub-unidad">
                                              <a @click.prevent="changeMarcaProduct(mar,index)"  class="float-right cursor-pointer" >&nbsp<i class="ti-plus"></i></a>
                                              <div class="row">
                                                  <div class="col">
                                                    <img  class="padding-image" width="90px" :src="mar.imagen" /> 
                                                  </div>
                                                  <div class="col">
                                                    <h6>{{mar.nombre}}</h6>
                                                  </div>
                                              </div>
                                          </div>
                                        </div>
                                      </div>
                                      <div class="card-footer">

                                          
                                          <!-- Paginación listado de Marcas -->
                                          <nav>
                                            <ul class="pagination">
                                                <li class="page-item" v-if="paginationMarcas.current_page > 1">
                                                    <a href="" class="page-link" @click.prevent="changePageMarcas(paginationMarcas.current_page - 1)">
                                                        <span>Atras</span>
                                                    </a>
                                                </li>
                                                <li class="page-item" v-for="(page,index) in pagesNumberMarcas" :key="index" v-bind:class="[page == isActivedMarcas?'active':'']">
                                                    <a href="" class="page-link" @click.prevent="changePageMarcas(page)">
                                                        {{page}}
                                                    </a>
                                                </li>
                                                <li class="page-item" v-if="paginationMarcas.current_page < paginationMarcas.last_page">
                                                    <a href="" class="page-link" @click.prevent="changePageMarcas(paginationMarcas.current_page + 1)">
                                                        <span>Adelante</span>
                                                    </a>
                                                </li>
                                            </ul>
                                        </nav>                 
                                      <!-- Fin paginación listado de Marcas -->

                                      </div>
                                    </div>
                                </div>
                                <!-- Fin listado de las marcas -->

                                
                            </div>
                            <div>
                              <h5>Categoria:
                                  <a data-toggle="collapse" href="#categoria" role="button" aria-expanded="false" aria-controls="categoria" >&nbsp<i class="ti-pencil"></i></a>  
                              </h5>
                              
                              <p>{{producto.categoria}}</p>
                              <!--Listado de las categoria -->
                                <div class="col-md-12 collapse" id="categoria">
                                    <div class="card">
                                      <div class="card-header">Listado de categoria disponibles</div>
                                      <div class="card-body">
                                        <div class="card-scroll">
                                           <div v-for="(cat,index) in this.categorias" :key="index" class="col sub-unidad">
                                              <a @click.prevent="changeCategoriaProduct(cat,index)"  class="float-right cursor-pointer" >&nbsp<i class="ti-plus"></i></a>
                                              <div class="row">
                                                  <div class="col">
                                                    <img  class="padding-image" width="90px" :src="cat.imagen[0].ruta" /> 
                                                  </div>
                                                  <div class="col">
                                                    <h6>{{cat.nombre}}</h6>
                                                    <small>{{cat.descripcion}}</small>
                                                  </div>
                                              </div>
                                          </div>
                                        </div>
                                      </div>
                                      <div class="card-footer">

                                          <!-- Paginación listado de categorias -->
                                          <nav>
                                            <ul class="pagination">
                                                <li class="page-item" v-if="paginationCategorias.current_page > 1">
                                                    <a href="" class="page-link" @click.prevent="changePageCategorias(paginationCategorias.current_page - 1)">
                                                        <span>Atras</span>
                                                    </a>
                                                </li>
                                                <li class="page-item" v-for="(page,index) in pagesNumberCategorias" :key="index" v-bind:class="[page == isActivedCategorias?'active':'']">
                                                    <a href="" class="page-link" @click.prevent="changePageCategorias(page)">
                                                        {{page}}
                                                    </a>
                                                </li>
                                                <li class="page-item" v-if="paginationCategorias.current_page < paginationCategorias.last_page">
                                                    <a href="" class="page-link" @click.prevent="changePageCategorias(paginationCategorias.current_page + 1)">
                                                        <span>Adelante</span>
                                                    </a>
                                                </li>
                                            </ul>
                                        </nav>                 
                                      <!-- Fin paginación listado de categorias -->

                                      </div>
                                    </div>
                                </div>
                                <!-- Fin listado de las categorias -->
                              
                            </div>

                            <div>
                              <h5>Proveedor:
                                  <a data-toggle="collapse" href="#proveedor" role="button" aria-expanded="false" aria-controls="proveedor" >&nbsp<i class="ti-pencil"></i></a>  
                              </h5>
                              
                              <p>{{producto.proveedor.nombre}}</p>
                              <!--Listado de las Proveedores -->
                                <div class="col-md-12 collapse" id="proveedor">
                                    <div class="card">
                                      <div class="card-header">Listado de los proveedores</div>
                                      <div class="card-body">
                                        <div class="card-scroll">
                                           <div v-for="(pro,index) in this.proveedores" :key="index" class="col sub-unidad">
                                              <a @click.prevent="changeProveedorProduct(pro,index)"  class="float-right cursor-pointer" >&nbsp<i class="ti-plus"></i></a>
                                              <div class="row">
                                                  <div class="col">
                                                    <h6>{{pro.nombre}}</h6>
                                                  </div>
                                              </div>
                                          </div>
                                        </div>
                                      </div>
                                      <div class="card-footer">

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
                                <!-- Fin listado de las Proveedores -->
                              
                            </div>
                            
                              <div id="accordion">
                                  <div class="card">
                                    <div class="card-header" id="headingOne">
                                      <h5 class="mb-0">
                                        Descripciones
                                       <a data-toggle="collapse" data-target="#collapseDescripciones" aria-expanded="true" aria-controls="collapseDescripciones">&nbsp<i class="ti-pencil"></i></a>
                                       <a class="float-right cursor-pointer" data-toggle="modal" data-target="#exampleModalCenter" data-dismiss="modal" data-backdrop="false"><i class="ti-plus"></i></a>
                                      </h5>
                                    </div>

                                    <div id="collapseDescripciones" class="collapse show" aria-labelledby="headingOne" data-parent="#collapseDescripciones">
                                             
                                      <draggable v-model="producto.descripciones"  v-bind="dragOptions" @start="isDragging = true"  @end="isDragging = false">
                                            <transition-group  type="transition" name="flip-list">
                                              <div v-for="(descrip,index) in producto.descripciones" :key="index" class="card form-group row cursor-move" >
                                                  <div class="card-header"  aria-hidden="true">
                                                      <!-- Cabecera de las descripciones-->
                                                      
                                                      <div class="row">                                                      
                                                        <div class="col-sm-1">
                                                            
                                                            {{index + 1}}    
                                                        </div> 
                                                        <div class="col-sm-10">
                                                            <ul>
                                                              <li>
                                                                <span>{{descrip.titulo}}</span>
                                                                <a data-toggle="collapse" :href="`#des${index}`" role="button" aria-expanded="false" :aria-controls="`des${index}`" >&nbsp<i class="ti-pencil"></i></a>
                                                                <a @click.prevent="deleteDescription(index)">&nbsp<i class="ti-trash cursor-pointer"></i></a>
                                                                
                                                                &nbsp<span v-if="!descrip.id" class="text-success">Nuevo  &nbsp</span>
                                                              </li>
                                                              <li class="cut-text">
                                                                <small >{{descrip.contenido}}</small>
                                                              </li>
                                                            </ul>
                                                          </div>
                                                          <div class="col-sm-1 ">
                                                            <a ><i class="ti-line-double cursor-pointer align-middle"></i></a>    
                                                          </div> 

                                                      </div>
                                                      
                                                      
                                                      
                                                  </div>
                                                  <div class="card-body collapse" :id="`des${index}`" >
                                                  <div class="form-group row">
                                                          <div class="col-sm-12">
                                                              <small  class="form-text text-muted">Título</small>
                                                              <input type="text" class="form-control"  v-model="descrip.titulo"/>
                                                          </div>
                                                        
                                                  </div>
                                                  <div class="form-group row" >
                                                      
                                                      <div class="col-sm-12">
                                                          <small  class="form-text text-muted">Contenido</small>
                                                          <textarea  class="col-md-12"  v-model="descrip.contenido" rows="10"></textarea>
                                                      </div>
                                                  </div>

                                                  <div class="form-group">
                                                      <small  class="form-text text-muted">Ubicación</small>
                                                      <input type="number" class="form-control"  :value="index + 1" @input="verifiUnidadPost(descrip.ubicacion,index)"/>
                                                      {{descrip.ubicacion}}
                                                  </div>

                                              </div>
                                          </div>
                                            </transition-group>
                                      </draggable>

                                          <!-- Descripciones -->                                    
                                    </div>

                                  </div>
                              </div>


                          </div>
                              
                          </div>
                              
                              
                              
                          </div>
                      </div>
                      
                      <!-- Aqui -->
                      
                  <button  class="btn btn-info btn-block" data-toggle="modal" data-target="#bd-example-modal-lg">Vista previa</button>
                  <!-- @click.prevent="updateProductById" --->
                    </div>
                  </div>
                  
                </div>
              </div>
            </div>
          </div>
        </div>
          
        <detail-product :producto="producto" :template="goUpdate" @endUpdateProduct="updateProductById" :isLoadingUpdate="isLoadingUpdateProduct"></detail-product>      
      </div>
</template>

<script>
import apiPrimal from '../services/apiServicePrimal'
import forsDescripciones from '../services/forDescripciones'
import { required, email, minLength, sameAs } from "vuelidate/lib/validators";
import toastr from "toastr";
import draggable from 'vuedraggable'
import subcategorias from './components_update_product/Subcategorias.vue'
import DetailProduct from './detailProductModal.vue'

export default {
  name: "UpdateProduct",
  components: {draggable,subcategorias,DetailProduct},
  props: {
    
  },
  data() {
    return {
        isLoadingUpdateProduct:false,
        producto: this.$route.params.product,
        goUpdate:true,
        clickNumero:false,
        descripcion:{
          tiulo:'',
          contenido:''
        },
        submitted:false,
        existUbication:false,
        tags:[],
        subCategorias:[],
        categorias:[],
        marcas:[],
        proveedores:[],
        //Paginación tags
        offset:3,
        paginationTags:{
                'current_page': 0,
                'from': 0,
                'last_page': 0,
                'path': '',
                'per_page': 0,
                'to': 0,
                'total': 0
          },
        paginationMarcas:{
                'current_page': 0,
                'from': 0,
                'last_page': 0,
                'path': '',
                'per_page': 0,
                'to': 0,
                'total': 0
          },
          paginationCategorias:{
                'current_page': 0,
                'from': 0,
                'last_page': 0,
                'path': '',
                'per_page': 0,
                'to': 0,
                'total': 0
          },
          paginationProveedores:{
                'current_page': 0,
                'from': 0,
                'last_page': 0,
                'path': '',
                'per_page': 0,
                'to': 0,
                'total': 0
          },

          updateImage:null,
          viewImage:null,
          numClickImage:null,
          idNewImage:null,
          gifLoadImage:false,
          sizeArrayImages: 0
    };
  },
    validations:{
            descripcion:{
              titulo:{required,minLength: minLength(4)},
              contenido:{required,minLength: minLength(4)}
              }
            
    },
    computed:{
      reverse(){
      return this.producto.imagenes.reverse()
    },
      //Opciones de drag and drop
       dragOptions() {
      return {
        animation: 0,
        group: "description",
        disabled: false,
        ghostClass: "ghost"
      };
    },
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
        },
      //Paginacion de las marcas para el producto
        isActivedMarcas(){
            return this.paginationMarcas.current_page
        },
        pagesNumberMarcas(){
            if(!this.paginationMarcas.to){
                return [];
            }
            var from  = this.paginationMarcas.current_page - this.offset; 
            if(from < 1){
              from = 1;  
            }

            var to = from +(this.offset*2); 

            if(to >= this.paginationMarcas.last_page){
              to = this.paginationMarcas.last_page;  
            }

            var pagesArray = [];
            while (from <= to){
                pagesArray.push(from);
                from++;
            }

            return pagesArray;
        },
      //Paginacion de las categorias para el producto
        isActivedCategorias(){
            return this.paginationCategorias.current_page
        },
        pagesNumberCategorias(){
            if(!this.paginationCategorias.to){
                return [];
            }
            var from  = this.paginationCategorias.current_page - this.offset; 
            if(from < 1){
              from = 1;  
            }

            var to = from +(this.offset*2); 

            if(to >= this.paginationCategorias.last_page){
              to = this.paginationCategorias.last_page;  
            }

            var pagesArray = [];
            while (from <= to){
                pagesArray.push(from);
                from++;
            }

            return pagesArray;
        },
        //Paginacion de las proveedores para el producto
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
  methods: {
    
        changePageTags(page){
            this.paginationTags.current_page = page;
            this.loadTags(page);
        },
        changePageMarcas(page){
            this.paginationMarcas.current_page = page;
            this.loadMarcas(page);
        },
        changePageCategorias(page){
            this.paginationCategorias.current_page = page;
            this.loadCategories(page);
        },
        
        changePageProveedores(page){
            this.paginationProveedores.current_page = page;
            this.loadProveedores(page);
        },

    updateProductById(data){
        console.log(data);
          this.$confirm("Se actualizaran los datos que has modificado!").then(() => {

                  var resultadoEspacios = forsDescripciones.searchSpacesEmpty(this.producto.descripciones);

                  if(resultadoEspacios){
                      toastr.error(resultadoEspacios);
                      return;
                  }

                  if(this.producto.sub_categorias.length === 0){
                      toastr.error("Debes agregar una sub categoria al producto");
                      return;
                  }

                  if(this.producto.tags.length === 0){
                      toastr.error("Debes agregar una tag al producto");
                      return;
                  }
                  
                  this.isLoadingUpdateProduct = true;
                  //console.log("E+l número repetidos son:"+aux);

                  let formData =  new URLSearchParams();
                  formData.append('nombre',this.producto.nombre);
                  formData.append('precio_base',this.producto.precio_base);
                  formData.append('precio_publico',this.producto.precio_publico);
                  formData.append('stock',this.producto.stock);
                  formData.append('contenido',this.producto.contenido);
                  formData.append('ingredientes',this.producto.ingredientes);

                  for(var i =0; i < this.producto.descripciones.length;i++){
                      formData.append(`descripcion[${i}][titulo]`,this.producto.descripciones[i].titulo);
                      formData.append(`descripcion[${i}][contenido]`,this.producto.descripciones[i].contenido);
                      formData.append(`descripcion[${i}][ubicacion]`,i+1);
                  }

                  for(var i =0; i < this.producto.tags.length;i++){
                      formData.append(`tags[${i}]`,this.producto.tags[i].id);
                  }

                  for(var i =0; i < this.producto.sub_categorias.data.length;i++){
                        formData.append(`sub_categorias[${i}]`,this.producto.sub_categorias.data[i].id);    
                  }
                  formData.append('proveedor_id',1);
                  formData.append('marca_id',this.producto.marca.id);
                  formData.append('categoria_id',1);

                  apiPrimal.updateProductById(formData,this.producto.id).then(res =>{
                    console.log(res);
                    if(res != undefined && res.status == 200  && res.data.success == true) {
                        this.producto = res.data.data;
                        this.isLoadingUpdateProduct = false;
                        toastr.success("Se actualizaron correctamente lo datos!");
                    }else{
                        toastr.error("Error al actualizar el producto!");
                    }
                            
                  }).catch(err =>{})
      });
    },prueba(){
      alert(this.producto.precio_publico);
    },
    deleteDescription(index){
        this.$confirm("Estas segur@ de eliminar la descripción?").then(() => {
              
     
                this.producto.descripciones.splice(index,1)
             
        });
        
    },
    addDescription(e){
      this.submitted = true;
      // stop here if form is invalid
                this.$v.$touch();
                if (this.$v.$invalid) {
                    return;
                }
                if(this.existUbication === true){
                  toastr.error("Esta ubicación ya existe!");
                  return;
                }

      console.log("___Descripción creada");
      console.log(this.descripcion);
      var a = this.descripcion;
      this.producto.descripciones.push(a);
      this.descripcion = [];
      this.submitted = false;
    },
    verificarUnidad(){

      for(var i =0; i < this.producto.descripciones.length;i++){
         
         var ubicacionForm = this.descripcion.ubicacion;
         var ubicacionJson = this.producto.descripciones[i].ubicacion;
         
        if(ubicacionForm.toString() === ubicacionJson.toString()){
            toastr.error("Esta ubicación ya existe!");
            this.existUbication = true;
            break;
        }else{
            this.existUbication = false;
        }
      }
      
    },
    verifiUnidadPost(e,index){

      var result = forsDescripciones.checkLocationInObject(e,index,this.producto.descripciones);

      if(result === true){
          toastr.error('Esta ubicacion ya existe');
      }
      
    },
    //Cargando tags al arreglo
    loadTags(page){
        apiPrimal.getAllTags(page).then(res =>{
                  //console.log("[CARGANDO TAGS]");
                  //console.log(res);
              if(res != undefined && res.status == 200  && res.data.message === 'lista Tags'){
                  this.tags = res.data.data;
                  this.paginationTags = res.data.meta;
                  //console.log("[CARGANDO TAGS]");
                  //console.log(res);
                  //console.log(res.data.meta);
              }else if(res.status == 202){
                toastr.error(""+res.data.message +" tags para el producto");
              }else{
                  toastr.error("No se logragron cargar los tags!");
              }
        }).catch(err=>{})
    },
//Añadiendo tags al objeto de producto y eliminandolo de la lista de tags!
    addListProductsTagsObject(tags,index){
          
              var tag = new Object();
              tag.id = tags.id;
              tag.palabra_clave = tags.palabra_clave;
              tag.nuevo = true;

          this.producto.tags.push(tag);
          this.tags.splice(index,1);
          console.log(this.producto.tags);
    },
    //Quitando de la lista el tag
    deleteTagListTagsProduct(tag,index){
          //var tagNew = new Object();
            //  tagNew.id = tag.id;
              //tagNew.nombre = tag.palabra_clave;
    this.$confirm("Estas seguro que quieres eliminar este tag?").then(() => {
        this.producto.tags.splice(index,1);
        this.tags.push(tag);
    })
          
          
    },

    loadSubCategorias(){
      apiPrimal.getAllSubCategorias(this.producto.categoria_id).then(res =>{
        //console.log('listando sub categorias');
        //console.log(res);
        if(res != undefined && res.status == 200 ) {
              this.subCategorias = res.data.data;
        }else if(res.status == 202){
            toastr.error('No hay categorias para listar!');
        }else{
          toastr.error('Error al cargar las sub categorias!');
        }
          
      }).catch(err =>{})
    },
    deleteSubCategoriaListFull(sub,index){
      console.log(this.producto);
      this.producto.sub_categorias.data.push(sub);
      this.subCategorias.splice(index,1);
    },
    deleteSubCategoriaListProduct(sub,index){
      this.$confirm("Estas seguro que quieres eliminar esta subcategoria de "+this.producto.nombre).then(() => {

        this.subCategorias.push(sub);
        this.producto.sub_categorias.data.splice(index,1);

      })
        
    },
    loadCategories(page){
        apiPrimal.getAllCategorias(page)
        .then(res =>{
          //console.log("Entro a la carga de categorias");
          //console.log(res.data.meta);
            if(res != undefined && res.status == 200  && res.data.success == 'true') {
              this.categorias = res.data.data;
              this.paginationCategorias = res.data.meta;
              //console.log(res.data.data);
              //console.log("Paginacion categoria");
              console.log(res.data.meta);
            }else if(res.status == 202){
                toastr.error("No hay categorias para listar");
            }else{
              toastr.error("Error al cargar las categorias");
            }

            console.log(res);
        })
        .catch( err => {})
    },
    loadMarcas(page){
      apiPrimal.getAllMarcas(page).then(res =>{
        //console.log("Listando marcas");
        //console.log(res.data);
        if(res != undefined && res.status == 200  && res.data.success == 'true') {
              this.marcas = res.data.data;
              this.paginationMarcas = res.data.meta;
              //console.log(res.data.data);
              //console.log("Paginacion Marcas");
              //console.log(res.data.meta);
            }else if(res.status == 202){
                toastr.error("No hay marcas para listar");
            }else{
              toastr.error("Error al cargar las categorias");
            }

      }).catch(err=>{});
    },
    changeMarcaProduct(marca,index){
        this.$confirm("Estas seguro que quieres cambiar la marca del producto "+this.producto.marca.nombre +" a "+marca.nombre).then(() => {
            this.marcas.push(this.producto.marca);
            this.marcas.splice(index,1);
            this.producto.marca = marca;
        });
    },
    changeCategoriaProduct(categoria,index){
    this.$confirm("Estas seguro que quieres cambiar la categoria  del producto "+this.producto.marca.categoria +" a "+categoria.nombre).then(() => {

      this.producto.categoria = categoria.nombre;
      this.producto.categoria_id = categoria.id;
      this.categorias.splice(index,1);
      this.loadSubCategorias();

      this.producto.sub_categorias.data.length = 0;

      console.log(categoria);
      console.log(this.producto.categoria_id);
        //this.producto.categoria = ''
        this.loadCategories();

    });    
      
    }
    ,
    loadProveedores(page){
      apiPrimal.getAllProveedores(page).then(res =>{
            if(res != undefined && res.status == 200 ) {
              this.proveedores = res.data.data;
              this.paginationProveedores= res.data.meta;
              //console.log(res.data.data);
              //console.log("paginacion proveedor");
              //console.log(res.data.meta);
            }else if(res.status == 202){
                toastr.error("No hay proveedores para listar");
            }else{
              toastr.error("Error al cargar los proveedores");
            }
      }).catch(err => {});
    },changeProveedorProduct(pro,index){
            this.$confirm("Estas seguro que quieres cambiar el proveedor  del producto "+this.producto.proveedor.nombre +" a "+pro.nombre).then(() => {
            
            this.proveedores.push(this.producto.proveedor);
            this.proveedores.splice(index,1);
            this.producto.proveedor = pro;
        });
    },
    cahangeImagen(e){
      console.log(this.numClickImage);
      if(this.numClickImage == -1){

        this.updateImage = e.target.files[0];
        this.$confirm("Estas seguro que quieres actualizar la imagen principal del producto?").then(() => {
                  const imagenBack = this.producto.imagen_principal.ruta;
                  this.producto.imagen_principal.ruta = 'https://acegif.com/wp-content/uploads/loading-103.gif';

                  let formData =  new FormData();
                  formData.append('_method','PUT');
                  formData.append('id',this.producto.id);
                  formData.append('imagen_id',this.producto.imagen_principal.id);
                  formData.append('imagen',e.target.files[0]);

            apiPrimal.updateImageProduct(formData,this.producto.id)
            .then(res =>{

              if(res != undefined && res.status == 200  && res.data.success == true && res.data.message === 'imagen actualizada') {                
                //console.log(res);
                this.producto.imagen_principal = res.data.data.imagen_principal;
                toastr.success("La imagen principal se ha actualizado correctamente");
              }else if(res.status == 460){
                  toastr.error("No se encontro el producto especificado");
              }else if(res.status == 461){
                  toastr.error("No se encontro la imagen en el servidor");
              }else if(res.status == 470){
                  toastr.error("Error en los datos del formulario");
              }else if(res.status == 472){  
                  toastr.error("El id de la imagen a actualizar no le pertenece al producto");
              }else{
                  this.producto.imagen_principal.ruta = imagenBack;
                  toastr.error("No se logro actualizar la imagen principal");
              }
                
            }).catch(err =>{
              console.log(err);
            });
        });


      }
      
      if(this.numClickImage === -101){
            this.gifLoadImage = true;
            let formData =  new FormData();
                  formData.append('id',this.producto.id);
                  formData.append('tipo','secundaria');
                  formData.append('imagen',e.target.files[0]);

            apiPrimal.createImageProduct(formData,this.producto.id)
            .then(res =>{

              if(res != undefined && res.status == 200  && res.data.success == true) {
                //console.log("Entro a la subida del archivo");
                //console.log(res);
                this.producto.imagenes = res.data.data.imagenes;     
                this.gifLoadImage = false;
                toastr.success("Se creo correctamente un imagen para el producto!");
              }else if(res.status == 460){
                  toastr.success("No se encontro el producto especificado");
              }else if(res.status == 470){
                  toastr.success("Error en los datos del formulario");
              }
                 
            }).catch(err =>{
              console.log(err);
            });

      }
      if(this.numClickImage >= 0){

        this.$confirm("Estas seguro que quieres actualizar esta imagen?").then(() => {
                  this.producto.imagenes[this.numClickImage].ruta = 'https://acegif.com/wp-content/uploads/loading-103.gif';
                  this.gifLoadImage = true;
                  let formData =  new FormData();
                  formData.append('_method','PUT');
                  formData.append('id',this.producto.id);
                  formData.append('imagen_id',this.idNewImage);
                  formData.append('imagen',e.target.files[0]);

            apiPrimal.updateImageProduct(formData,this.producto.id)
            .then(res =>{
              
              if(res != undefined && res.status == 200  && res.data.success == true) {
                console.log("Entro a la subida del archivo");
                this.gifLoadImage = false;
                console.log(res);
                this.producto.imagenes = res.data.data.imagenes;     
                this.producto.imagen_principal = res.data.data.imagen_principal;
                toastr.success("Se actualizo correctamente la imagen del producto!");
              }else if(res.status == 460){
                  toastr.error("No se encontro el producto especificado");
              }else if(res.status == 461){
                  toastr.error("No se encontro la imagen en el servidor");
              }else if(res.status == 470){
                  toastr.error("Error en los datos del formulario");
              }else if(res.status == 472){  
                  toastr.error("El id de la imagen a actualizar no le pertenece al producto");
              }else{
                  this.producto.imagen_principal.ruta = imagenBack;
                  toastr.error("No se logro actualizar la imagen principal");
              }
                
            }).catch(err =>{
              console.log(err);
            });
        });

      }
      
      this.renderingImages(e.target.files[0]);
    },
    renderingImages(file){
        let reader = new FileReader();
        reader.onload = (e) =>{
            this.viewImage  = e.target.result;
        }
        reader.readAsDataURL(file);
    },
    asignNumClick(index,id){
      console.log(index);
      this.numClickImage = index;
      this.idNewImage = id;
    },
    deleteImageProduct(index,id){
        this.$confirm("Estas seguro que quieres eliminar esta imagen?").then(() => {
          this.gifLoadImage = true;
              let data =  new URLSearchParams();
              data.append('id',this.producto.id);
              data.append('imagen_id',id);

              console.log("El id es:" +id);
              apiPrimal.deleteImageProduct(data,this.producto.id).then(res =>{
              if(res.status == 200){
                  this.producto.imagenes = res.data.data.imagenes;
                  console.log(res);
                  this.gifLoadImage = false;
                  toastr.success("Se elimino correctamente la imagen");
              }else if(res.status == 460){
                  toastr.error("No se encontro el producto especificado");
              }else if(res.status == 461){
                  toastr.error("No se encontro la imagen en el servidor");
              }else if(res.status == 470){
                  toastr.error("Error en los datos del formulario");
              }else if(res.status == 470){
                  toastr.error("No se puede borrar la imagen principal cuando no hay imagenes secundarias");
              }else if(res.status == 472){  
                  toastr.error("El id de la imagen a actualizar no le pertenece al producto");
              }else{
                  this.producto.imagen_principal.ruta = imagenBack;
                  toastr.error("No se logro actualizar la imagen principal");
              }
        }).catch(err =>{})
        });
        
    },
    asignNumberClick(num){
        console.log(num);
    }


    
  },
  mounted(){
     
  },
  created(){

    this.loadTags();
    this.loadSubCategorias();
    this.loadCategories();
    this.loadMarcas();
    this.loadProveedores();
    console.log("Imprimiendo producto");
    console.log(this.producto);
      if(!this.producto){
          this.$router.push('/productos')
      }
     
  }
};
</script>

<style lang="" scoped>
 /* 
  /*.cursor-move{
    cursor:move;
  }*/
/*
  .ghost {
  opacity: 0.5;
  background: #c8ebfb;
}


    .drag-icon-descripciones{
      font-size: 90%;
      padding: 0;
      margin: 0;
    }

  .over-flow{
    overflow-x: auto;
    overflow-y: hidden;
    white-space: nowrap;
    width:400px
  }

  .cut-text{
    width:350px;
    text-overflow:ellipsis;
  white-space:nowrap; 
  overflow:hidden; 

  }

  .overflow-list-sub-categorias-container{
    height: 250px; overflow-y: auto; overflow-x:hidden;
  }

    .sub-unidad:hover{
        -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
    }

  .display-bloque{
    display:block;
  }

  .contenedor{
    display: inline-block;float: none;padding: 15px;
  }

  
  .contenedor:hover{
	-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
  }

  .cursor-pointer{
    cursor:pointer;
  }

  .margin-5{
    margin:5px
  }

  .margin-titulo-sub{
    margin:10px;
  }


textarea {
    font-size: .875rem;
    border-color:#e1e1e1;
    display: block;
    color:#495057;
}

.tamanio-icon{
  color:red;
  font-size:2em;
}
.padding-image{
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

.edit-icon-edit{
  font-size: 30px;
  padding: 0px;
  margin: 0px;
}


*/
</style>