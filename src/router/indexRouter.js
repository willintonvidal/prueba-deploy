import VueRouter from "vue-router";
import routes from "./routes";


// configure router
const router = new VueRouter({
  routes, // short for routes: routes
});


const isAuthenticated = function(){
  return window.localStorage.token
}


router.beforeEach((to, from, next) => {

  if (to.name === 'login' && isAuthenticated()) {
    console.log("Ya estas autenticado");
    return next({ name: 'Contenido' })
  }

  if(to.name === 'DashBoardLayout'  && !isAuthenticated() && window.localStorage.role !== 'administrador'){
    console.log("No tienes acceso");
    return next({ name: 'login' })
  }

  if(to.name === 'Contenido'  && !isAuthenticated() && window.localStorage.role !== 'administrador'){
    console.log("No tienes acceso");
    return next({ name: 'login' })
  }

  if(to.name === 'Products'  && !isAuthenticated() && window.localStorage.role !== 'administrador'){
    console.log("No tienes acceso");
    return next({ name: 'login' })
  }

  if(to.name === 'UpdateProduct'  && !isAuthenticated() && window.localStorage.role !== 'administrador'){
    console.log("No tienes acceso");
    return next({ name: 'login' })
  }

  if(to.name === 'CrudProveedores'  && !isAuthenticated() && window.localStorage.role !== 'administrador'){
    console.log("No tienes acceso");
    return next({ name: 'login' })
  }

  if(to.name === 'CrudTags'  && !isAuthenticated() && window.localStorage.role !== 'administrador'){
    console.log("No tienes acceso");
    return next({ name: 'login' })
  }

  return next();
});


export default router;
