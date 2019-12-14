<template>
<body class="form-membership">
    <Preloader v-if="loading == false"></Preloader>
    <div class="form-wrapper">

    <!-- logo -->
    <div id="logo">
        <h1>Primal</h1>
        
    </div>
    <!-- ./ logo -->

    <h5>Iniciar sesión</h5>
    <!-- form -->
    <form @submit.prevent="accesToDashBoard">
        <div class="form-group">
            <input type="email" v-model="username" id="username" name="username" class="form-control" :class="{ 'is-invalid': submitted && $v.username.$error }" placeholder="Username o email"  autofocus>
            <div v-if="submitted && !$v.username.required" class="invalid-feedback">Email es requerido...</div>
        </div>
        <div class="form-group">
            <input type="password" v-model="password" id="password" name="password" class="form-control" :class="{ 'is-invalid': submitted && $v.password.$error }" placeholder="Password" >
            <div v-if="submitted && !$v.password.required" class="invalid-feedback">la contraseña es requerida...</div>
        </div>
        <div class="form-group d-flex justify-content-between">
            <div class="custom-control custom-checkbox">
                <input type="checkbox" class="custom-control-input" checked="" id="customCheck1">
                <label class="custom-control-label" for="customCheck1">Recordarme</label>
            </div>
            <a href="recover-password.html">Resetear password</a>
        </div>
        <button class="btn btn-primary btn-block" type="submit">Ingresar</button>
        <hr>
        
    </form>
    <!-- ./ form -->

</div>
</body>
</template>

<script>
  import { required, email, minLength, sameAs } from "vuelidate/lib/validators";
  import apiPrimal from '../services/apiServicePrimal'
  import toastr from "toastr";
  import Preloader from '../components/layout/Preloader.vue'
  import {mapState,mapMutations} from 'vuex'
  export default {
    components: {Preloader},
    data() {
      return {
        username:"",
        password:"",
        submitted:false,
        loading:false
      }
    },
    computed:{
        ...mapState(['prueba']),
        ...mapState('productos',['nombre'])
    },
    validations:{
            username:{required,email},
            password: { required, minLength: minLength(6) }
    },
    methods:{
        //Metodo submit para dar llamado a la accion de evnvio de datos
        accesToDashBoard(e){

            this.submitted = true;
            
                // stop here if form is invalid
                this.$v.$touch();
                if (this.$v.$invalid) {
                    return;
                }
            this.loading = false;
            let formData = new FormData();
            formData.append('username',this.username);
            formData.append('password',this.password);
              apiPrimal.LoginPrimal(formData)
                .then(res=>{
                    console.log(res);
                        if(res === undefined) toastr.error('Error!')

                        if(res != undefined && res.status == 200 && res.data.message === 'Tokens creados correctamente'){
                            window.localStorage.token = res.data.data.access_token
                            window.localStorage.refresh_token = res.data.data.refresh_token
                            window.localStorage.role = res.data.data.roles[0]
                            this.$router.push('/contenido')
                            this.loading = true;
                        }

                        if(res.status == 500) this.$router.push('/500') 
                        
                    })
                    .catch(err =>{
                        console.log("errorrrr..."+err.status);
                        //this.loading = true;
                        //toastr.error('Datos incorrectos!')
                    })
                
            },
            ...mapMutations('productos',['cambiarNombre'])
        
    },
    mounted(){
        this.loading = true;
    },
    created(){
        this.loading = true;
        
        console.log(this.nombre);
    }
    
  }
</script>
<style>



</style>
