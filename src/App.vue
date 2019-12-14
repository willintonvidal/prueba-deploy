<template>
<div>
      <prim-preloader v-if="isLoading === false"></prim-preloader>
      <router-view :key="$route.fullPath"></router-view>
</div>
</template>
<script>
import PrimFooter from './components/layout/Footer.vue'
import PrimHeader from './components/layout/Header.vue'
import PrimNavigation from './components/layout/Navigation.vue'
import PrimPreloader from  './components/layout/Preloader.vue'
export default {
  name: 'app',
  components:{PrimFooter,PrimHeader,PrimNavigation,PrimPreloader},
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      isLoading:false
    }
    
  },
  created(){
    this.isLoading = true
  }
}
</script>
