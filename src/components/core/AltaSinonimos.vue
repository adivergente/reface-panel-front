<template>
  <v-dialog v-model="dialog" max-width="500">
    <template v-slot:activator="{ on }">
      <v-btn v-on="on" small color="#003b94" dark>Nuevo Sinonimo</v-btn>
    </template>
    <v-card>
      <v-form ref="form" v-on:submit.prevent="Update()" lazy-validation>
        <v-toolbar color="#003b94">
         <v-toolbar-title style="color:white;">Nuevo Sinonimo</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-layout row>
          <v-flex xs10 offset-xs1 >
            <h4> Palabra: </h4>
            <v-text-field
              v-model="sinonimo.palabra"
              class="purple-input"
              label="Palabra"
              name="palabra"
            />
            <h4> Sinonimos: </h4>
            <v-text-field
              v-model="sinonimo.sinonimo"
              class="purple-input"
              label="Sinonimos"
              name="sinonimos"
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
            Guardar Cambios
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
        sinonimo:{
          palabra:'',
          sinonimo:''
        },
        dialog: false,
      }
    },
    methods: {
       Update(){
         api.post('/sinonimos/alta', this.sinonimo)
         .then(response => {
           // JSON responses are automatically parsed.
//           this.models = response.data;
             this.mess  = response.data.message;
           //console.log(this.items);
           //alert(this.mess);
           this.$router.go()
         })
         .catch(e => {
//           this.errors.push(e)
         //  console.log("Error");
           console.log(e);
         })
       }
    },
    created(){
      this.usuario = localStorage.getItem("id")
    }
}
</script>
