import apiPrimal from '../services/apiServicePrimal'

export default{

    namespaced:true,
    state:{
        nombre:'Wilinton',
        productoSeleccionado:[],
        subCategorias:[],
        tagsProduct:[],
        createProduct:{
            nombre:'',
            precio_base:0,
            precio_publico:0,
            precio_primal:0,
            stock:0,
            contenido:'',
            ingredientes:'',
            descripcion:{
                titulo:'',
                contenido:'',
                ubicacion:1
            },
            tags:[]
        }
    },
    mutations:{
        cambiarNombre(state,payload){
             state.nombre = payload;   
        },
        setProductoSeleccionado(state,producto){
            state.productoSeleccionado = producto
        },
        setSubCategorias(state,subCategoria){
            state.subCategorias = subCategoria
        },
        changeNameProduct(state,payload){
            state.createProduct.nombre = payload;   
       },
       setLoadTags(state,payload){
         state.tags = payload;   
        },
       addTagsProductCreate(state,payload){
          state.createProduct.tags.push(payload);   
        },
        spliceTagsListtags(state,payload){
           state.createProduct.tags.splice(payload,1);   
         }

    },
    actions:{

        getProductoById(context,payload){
            return apiPrimal.searchProductById(payload.id).then(res =>{
                context.commit('setProductoSeleccionado',res.data.data)
                return res;
            })
            .catch(err =>{
                return err;
            })
        },
        gestSubCategoriasProducto(context,payload){
            return apiPrimal.getAllSubCategorias(payload.id).then(res =>{
                context.commit('setSubCategorias',res.data.data)
                return res;
            })
            .catch(err =>{
                return err;
            })
        },
        getTagsProduct(context,payload){
            return apiPrimal.getAllTags(payload.page).then(res =>{
                context.commit('setLoadTags',res.data.data)
                return res;
            })
            .catch(err =>{
                return err;
            })
        }

    },
    getters:{

    }


}