<template>
  <v-dialog v-model="dialog" max-width="500">
    <template v-slot:activator="{ on }">
      <v-btn v-on="on" small color="#003b94" dark> Nueva Caja </v-btn>
    </template>
    <v-card>
      <v-form ref="form" v-on:submit.prevent="Update()" lazy-validation>
        <v-toolbar color="#003b94">
         <v-toolbar-title style="color:white;">Agregar Caja</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-layout row>
          <v-flex xs10 offset-xs1 >
            <v-text-field
              v-model="caja.codigo"
              class="purple-input"
              label="Código"
              name="codigo"
              type="text"
            />
            <v-text-field
              v-model="caja.ancho"
              class="purple-input"
              label="Ancho"
              name="ancho"
              min="0"
              type="number"
              suffix="m"
            />
            <v-text-field
              v-model="caja.largo"
              class="purple-input"
              label="Largo"
              name="largo"
              min="0"
              type="number"
              suffix="m"
            />
             <v-text-field
              v-model="caja.alto"
              class="purple-input"
              label="Alto"
              name="alto"
              min="0"
              type="number"
              suffix="m"
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
            Guardar Caja
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
    // props: {
    //   nombre: String,
    //   codigo: String,
    //   clave_interna: String,
    //   descripcion: String,
    //   categoria: String,
    //   tipo: String,
    //   marca: String,
    //   precio: Number,
    //   stock: Number,
    //   status: String,
    //   autos: String
    // },
    data () {
      return {
        cant: 0,
        info:null,
        dialog: false,
        mess: null,
        caja:{
          codigo:null,
          largo:null,
          alto:null,
          ancho:null,
        }
      }
    },
    methods: {
      close(datos){
        this.varautos = false
        //this.autos = []
        console.log('cerrar')
        this.$emit('close',datos)
      },
       Update(){
         api.post('/cajas/add_cajas', this.caja)
         .then(response => {
           // JSON responses are automatically parsed.
//           this.models = response.data;
           //console.log(this.items);
           //alert(this.mess);
           //this.$router.go()
           this.close(response.data.success)
           this.dialog=false
         })
         .catch(e => {
//           this.errors.push(e)
         //  console.log("Error");
           console.log(e);
         })
       }
    }
}
</script>
