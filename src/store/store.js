import Vue from 'vue'
import Vuex from 'vuex'

import productos from './productos'

Vue.use(Vuex)

const store = new Vuex.Store({
    state:{
        prueba:'prueba',
        pagina:''
    },
    mutations:{
        setPagina(state,payload){
            state.pagina = payload
        }
    },
    actions:{
        

    },modules:{
        productos
    }
})

export default store