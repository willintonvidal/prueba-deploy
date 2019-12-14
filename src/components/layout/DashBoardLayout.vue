<template>
<div>
      <PrimPreloader v-if="loading == false"></PrimPreloader>
      <prim-header></prim-header>
      <prim-navigation></prim-navigation>
      <prim-footer></prim-footer>
</div>
</template>
<script>
import PrimFooter from '../layout/Footer.vue'
import PrimHeader from '../layout/Header.vue'
import PrimNavigation from '../layout/Navigation.vue'
import PrimPreloader from  '../layout/Preloader.vue'

export default {
  name: 'app',
  components:{PrimFooter,PrimHeader,PrimNavigation,PrimPreloader},
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      loading:false
    }
  }
  ,created(){
    this.loading = true;
  }
}
</script>
