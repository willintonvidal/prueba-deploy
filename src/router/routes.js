
import Login from "../components/Login.vue";
import Contenido from "../components/ContenidoExample.vue";
import DashBoardLayout from "../components/layout/DashBoardLayout.vue";
import ListProducts from "../components/ListProducts.vue";
import CreateProducts from "../components/CreateProduct.vue";
import ErrorMeanAtWork from "../components/layout/ErrorMeanAtWork.vue"
import PagNotFound from  "../components/layout/404.vue"
import NotConection from  "../components/layout/NotConection.vue"
import UpdateProduct from "../components/UpdateProduct.vue";
import CrudCategories from '../components/crudCategorie.vue'

import CrudProveedores from '../components/crudProveedores.vue'
import CrudTags from '../components/crudTags.vue'

const routes = [
  {
      path:"*",
      component:PagNotFound,
      name:"PaginaNoEncontrada",
      meta:{isPublic:true}
  },
    {
      path:"/",
      component:Login,
      name:"login",
      meta:{isPublic:true}
    },
    {
      path:"/404",
      component:PagNotFound,
      name:"404",
      meta:{isPublic:true}
    },
    {
      path:"/500",
      component:ErrorMeanAtWork,
      name:"500",
      meta:{isPublic:true}
    },{
      path:"/sin_conexion",
      component:NotConection,
      name:"NotConection",
      meta:{isPublic:true}
    },{
      path:"/dash",
      component:DashBoardLayout,
      name:"DashBoardLayout",
      children:[
        {
          path:"/contenido",
          component:Contenido,
          name:"Contenido",
        },
        {
          path:"/productos",
          component:ListProducts,
          name:"Products",
        },
        {
          path:"/crear_productos",
          component:CreateProducts,
          name:"CreateProducts",
        },
        {
          path:"/actualizar_producto",
          component:UpdateProduct,
          name:"UpdateProducto",
        },
        {
          path:"/crud_categorias",
          component:CrudCategories,
          name:"CrudCategories",
        },
        {
          path:"/crud_proveedores",
          component:CrudProveedores,
          name:"CrudProveedores",
        },
        {
          path:"/crud_tags",
          component:CrudTags,
          name:"CrudTags",
        }
        


      ]
    }
  ];
  

export default routes;
