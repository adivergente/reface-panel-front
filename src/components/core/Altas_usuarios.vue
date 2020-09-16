<template>
  <v-dialog v-model="dialog" max-width="500">
    <template v-slot:activator="{ on }">
      <v-btn v-on="on" small color="#003b94" dark> Añadir Usuario </v-btn>
    </template>
    <v-card>
      <v-form ref="form" v-on:submit.prevent="Update()" lazy-validation>
        <v-toolbar color="#003b94">
         <v-toolbar-title style="color:white;">Nuevo Usuario</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-layout row>
          <v-flex xs10 offset-xs1 >
            <h4> Nombres: </h4>
            <v-text-field
              v-model="usuario.nombres"
              class="purple-input"
              label="Nombres"
              name="codigo"
              :rules="rules1"
            />
            <h4> Apellidos: </h4>
            <v-text-field
              v-model="usuario.apellidos"
              class="purple-input"
              label="Apellidos"
              name="clave_interna"
              :rules="rules1"
            />
            <h4> Email: </h4>
            <v-text-field
              v-model="usuario.email"
              class="purple-input"
              label="Email"
              name="nombre"
              :rules="rules4"
            />
            <h4> Constraseña: </h4>
            <v-text-field
              v-model="usuario.password"
              label="Contraseña"
              name="password"
              :append-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
              :rules="[passwordRules.required, passwordRules.min]"
              :type="showPassword ? 'text' : 'password'"
              hint="Ingresa al menos 8 caracteres"
              @click:append="showPassword = !showPassword"
            />
            <h4> Rol: </h4>
            <v-select
              :items="roles"
              v-model="usuario.rol"
              class="purple-input"
              label="Roles"
              item-text="nombre"
            />
          </v-flex>
        </v-layout>
        <v-card-actions>
          <v-btn
            color="red darken-1"
            flat="flat"
            @click="dialog = false"
          >
            Cancelar
          </v-btn>
          <v-spacer></v-spacer>

          <v-btn
            color="green darken-1"
            flat="flat"
            type="submit"
            @click="dialog = false"
          >
            Guardar
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
import {api} from '@/api'
import $ from 'jquery'

export default {
    name: 'Frame',
    data () {
      return {
        cant: 0,
        info:null,
        dialog: false,
        mess: null,
        usuario:{
          nombres: '',
          apellidos: '',
          password: '',
          email: '',
          rol: ''
        },
        passwordRules: {
          required: value => !!value || "Campo obligatorio",
          min: v => v.length >= 6 || "Type at least 8 characters"
        },
        showPassword: false,
        rules1: [
          value => !!value || 'Required.',
          value => (value || '').length <= 50 || 'Max 50 characters',
          value => {
            const pattern = /^(?!\s)+([A-Za-zÑñáéíóúÁÉÍÓÚ]{3,})+([\s{1}]+([A-Za-zÑñáéíóúÁÉÍÓÚ]{3,}))*$/;
            return pattern.test(value) || 'Nombre(s) invalido(s).'
          },
        ],
        rules4: [
          value => !!value || 'Required.',
          value => (value || '').length <= 50 || 'Max 50 characters',
          value => {
            const pattern = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
            return pattern.test(value) || 'Email invalido.'
          },
        ],
        roles:[]
      }
    },
    methods: {
       Update(){
         api.post('/ad-usuarios/nuevo', this.usuario)
         .then(response => {
           // JSON responses are automatically parsed.
//           this.models = response.data;
              if(response.data.success==true){
                this.$router.go()
              }else{
                alert(response.data.message)
              }
             //this.mess  = response.data.message;
           //console.log(this.items);
           //alert(this.mess);

         })
         .catch(e => {
//           this.errors.push(e)
         //  console.log("Error");
           console.log(e);
         })
       }
    },
    created(){
      api.get('/roles/todos')
      .then(response => {
        // JSON responses are automatically parsed.
//           this.models = response.data;
          if(response.data.success==true){
            this.roles=response.data.data
          }else{
            alert(response.data.message)
          }
          //this.mess  = response.data.message;
        //console.log(this.items);
        //alert(this.mess);

      })
      .catch(e => {
//           this.errors.push(e)
      //  console.log("Error");
        console.log(e);
      })
    }
}
</script>
