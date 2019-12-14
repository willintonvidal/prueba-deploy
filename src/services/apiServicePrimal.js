import instanceAxios from './configAxios'
var version = 1;

const apiPrimal = {}

//Login de la aplicación
apiPrimal.LoginPrimal = function(formData){
  //version de la api dinamica revisar
    return instanceAxios.post(`login`,formData)
    .then(res => res) 
    .catch(err =>err)
  }

  //Listado de productos
apiPrimal.ListProducts = function(page){
    //version de la api dinamica revisar
      return instanceAxios.get(`dashboard/producto/listar?page=${page}`)
      .then(res => res) 
      .catch(err =>err)
    }

//Logout 
apiPrimal.logoutPrimalReokeAccesToken = function(){
    return instanceAxios.post(`logout`).then(res => res
    ).catch(err =>err)
}

//Eliminar productos
apiPrimal.deleteProduct = function(idProduct){
  return instanceAxios.delete(`dashboard/producto/eliminar/${idProduct}`).then(res => res
  ).catch(err =>console.log("[ERROR] "+err))
}

//Buscar un producto por id
apiPrimal.searchProductById = function(idProduct){
  return instanceAxios.get(`dashboard/producto/buscar/${idProduct}`).then(res => res
  ).catch(err =>console.log("[ERROR] "+err))
}

//Retornar todos los tags
apiPrimal.getAllTags = function(page){
  return instanceAxios.get(`dashboard/tag/listar?page=${page}`).then(res =>res).catch(err =>err)
}


//Retornar todas las subcategorias filtrado por el id de la categoria
apiPrimal.getAllSubCategorias = function(id_categoria){
  return instanceAxios.get(`dashboard/categoria/listar/sub_categorias/${id_categoria}`).then(res =>res).catch(err =>err)
}

//Listando las categorias existentes 
apiPrimal.getAllCategorias = function(page){
  return instanceAxios.get(`dashboard/categoria/listar?page=${page}`).then(res =>res).catch(err =>err)
}

//Listando marcas para seleccionar una y asignarle al producto!
apiPrimal.getAllMarcas = function(page){
  return instanceAxios.get(`dashboard/marca/listar?page=${page}`).then(res =>res).catch(err =>err)
}

//Listando de proveedores 
apiPrimal.getAllProveedores = function(page){
  return instanceAxios.get(`dashboard/proveedor/listar?page=${page}`).then(res =>res).catch(err =>err)
}


//actualizando producto
apiPrimal.updateProductById = function(data,idProduct){
  return instanceAxios.put(`dashboard/producto/actualizar/${idProduct}`,data).then(res => res
  ).catch(err =>console.log("[ERROR] "+err))
}

apiPrimal.updateImageProduct = function(data,idProduct){
  return instanceAxios.post(`dashboard/producto/actualizar_imagen/${idProduct}`,data).then(res => res
    ).catch(err =>console.log("[ERROR] "+err))
}

apiPrimal.createImageProduct = function(data,idProduct){
  return instanceAxios.post(`dashboard/producto/crear_imagen/${idProduct}`,data,{
    onUploadProgress: uploadEvent =>{
      console.log(uploadEvent.loaded / uploadEvent.total);
  }}).then(res => res
    ).catch(err =>console.log("[ERROR] "+err))
}


apiPrimal.deleteImageProduct = function(data,idProduct){
  return instanceAxios.delete(`dashboard/producto/eliminar_imagen/${idProduct}`,{data}).then(res => res
    ).catch(err =>console.log("[ERROR] "+err))
}


apiPrimal.updateCategorie = function(data,idCategoria){
  return instanceAxios.post(`dashboard/categoria/actualizar/${idCategoria}`,data)
    .then(res => res
    ).catch(err =>console.log("[ERROR] "+err))
}

apiPrimal.createCategorie = function(data){
  return instanceAxios.post(`dashboard/categoria/crear`,data)
    .then(res => res
    ).catch(err =>console.log("[ERROR] "+err))
}

apiPrimal.deleteCategorie = function(id){
  return instanceAxios.delete(`dashboard/categoria/eliminar/${id}`)
    .then(res => res
    ).catch(err =>console.log("[ERROR] "+err))
}


apiPrimal.searchProveedorById = function(id){
  return instanceAxios.get(`dashboard/proveedor/buscar/${id}`).then(res => res
  ).catch(err =>console.log("[ERROR] "+err))
}

apiPrimal.updateProveedor = function(data,idProveedor){
  return instanceAxios.post(`dashboard/proveedor/actualizar/${idProveedor}`,data)
    .then(res => res
    ).catch(err =>console.log("[ERROR] "+err))
}

apiPrimal.createProveedor = function(data){
  return instanceAxios.post(`dashboard/proveedor/crear`,data)
    .then(res => res
    ).catch(err =>console.log("[ERROR] "+err))
}

apiPrimal.deleteProveedor = function(id){
  return instanceAxios.delete(`dashboard/proveedor/eliminar/${id}`)
    .then(res => res
    ).catch(err =>console.log("[ERROR] "+err))
}

apiPrimal.searchTagById = function(id){
  return instanceAxios.get(`dashboard/tag/buscar/${id}`)
    .then(res => res
    ).catch(err =>console.log("[ERROR] "+err))
}

apiPrimal.updateTag = function(data,idTag){
  return instanceAxios.post(`dashboard/tag/actualizar/${idTag}`,data)
    .then(res => res
    ).catch(err =>console.log("[ERROR] "+err))
}


apiPrimal.listValue = function(){
  return instanceAxios.get(`dashboard/value/listar`)
    .then(res => res
    ).catch(err =>console.log("[ERROR] "+err))
}


apiPrimal.createTag = function(data){
  return instanceAxios.post(`dashboard/tag/crear`,data)
    .then(res => res
    ).catch(err =>console.log("[ERROR] "+err))
}

apiPrimal.deleteTag = function(id){
  return instanceAxios.delete(`dashboard/tag/eliminar/${id}`)
    .then(res => res
    ).catch(err =>console.log("[ERROR] "+err))
}

export default apiPrimal

